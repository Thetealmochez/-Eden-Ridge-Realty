import { useState, useCallback } from 'react';
import { useSecurity } from '@/components/SecurityProvider';
import { useToast } from '@/hooks/use-toast';

interface SecureFormOptions {
  rateLimit?: {
    key: string;
    action: 'auth' | 'api' | 'contact' | 'session' | 'admin';
  };
  validation?: {
    [key: string]: 'string' | 'html' | 'url' | 'filename' | 'search';
  };
}

export const useSecureForm = (options: SecureFormOptions = {}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { validateInput, checkRateLimit, reportSecurityEvent } = useSecurity();
  const { toast } = useToast();

  const validateForm = useCallback((data: Record<string, any>): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (options.validation) {
      Object.entries(options.validation).forEach(([field, type]) => {
        const value = data[field];
        if (value) {
          const validation = validateInput(value.toString(), type);
          if (!validation.isValid) {
            newErrors[field] = validation.errors[0] || 'Invalid input';
            isValid = false;
          } else {
            // Use sanitized value
            data[field] = validation.sanitized;
          }
        }
      });
    }

    setErrors(newErrors);
    return isValid;
  }, [options.validation, validateInput]);

  const submitForm = useCallback(async (
    data: Record<string, any>,
    submitFunction: (data: Record<string, any>) => Promise<any>
  ) => {
    try {
      setIsSubmitting(true);
      setErrors({});

      // Rate limiting check
      if (options.rateLimit) {
        const isAllowed = await checkRateLimit(
          options.rateLimit.key,
          options.rateLimit.action
        );

        if (!isAllowed) {
          reportSecurityEvent({
            type: 'rate_limit_exceeded',
            severity: 'medium',
            details: { action: options.rateLimit.action, key: options.rateLimit.key }
          });
          
          toast({
            title: "Too Many Requests",
            description: "Please wait before trying again.",
            variant: "destructive",
          });
          return { success: false, error: 'Rate limit exceeded' };
        }
      }

      // Validate form data
      if (!validateForm(data)) {
        reportSecurityEvent({
          type: 'suspicious_activity',
          severity: 'medium',
          details: { errors: Object.keys(errors), eventType: 'form_validation_failed' }
        });
        return { success: false, error: 'Validation failed' };
      }

      // Add CSRF protection token if available
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      if (csrfToken) {
        data._token = csrfToken;
      }

      // Submit the form
      const result = await submitFunction(data);
      
      return { success: true, data: result };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      
      reportSecurityEvent({
        type: 'suspicious_activity',
        severity: 'low',
        details: { error: errorMessage, eventType: 'form_submission_error' }
      });

      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  }, [options, validateForm, checkRateLimit, reportSecurityEvent, toast, errors]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const setFieldError = useCallback((field: string, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  return {
    isSubmitting,
    errors,
    submitForm,
    validateForm,
    clearErrors,
    setFieldError,
  };
};