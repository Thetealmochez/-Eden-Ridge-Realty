import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { securityValidation } from '@/lib/security-validation';
import { rateLimiter, SECURITY_CONFIG } from '@/lib/security';
import { securityMonitor } from '@/lib/security-monitor';

interface SecurityContextType {
  validateInput: (input: string, type?: 'string' | 'html' | 'url' | 'filename' | 'search') => { isValid: boolean; sanitized: string; errors: string[] };
  checkRateLimit: (key: string, action: keyof typeof SECURITY_CONFIG.RATE_LIMITS) => Promise<boolean>;
  reportSecurityEvent: (event: { type: 'auth_failure' | 'rate_limit_exceeded' | 'suspicious_activity' | 'admin_action' | 'data_access'; severity: 'low' | 'medium' | 'high'; details: any }) => void;
  securityScore: number;
  isSecureBrowser: boolean;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

interface SecurityProviderProps {
  children: ReactNode;
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  const [securityScore, setSecurityScore] = useState(100);
  const [isSecureBrowser, setIsSecureBrowser] = useState(true);

  useEffect(() => {
    // Check browser security features
    const checkBrowserSecurity = () => {
      let score = 100;
      let isSecure = true;

      // Check for HTTPS
      if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        score -= 30;
        isSecure = false;
      }

      // Check for CSP support
      if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
        score -= 20;
      }

      // Check for secure storage
      try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
      } catch {
        score -= 10;
      }

      // Check for Web Crypto API
      if (!window.crypto || !window.crypto.subtle) {
        score -= 20;
        isSecure = false;
      }

      // Check for modern security headers
      const securityFeatures = [
        'referrerPolicy' in document,
        'crossOriginIsolated' in window,
        'isSecureContext' in window,
      ];

      const supportedFeatures = securityFeatures.filter(Boolean).length;
      score -= (3 - supportedFeatures) * 5;

      setSecurityScore(Math.max(0, score));
      setIsSecureBrowser(isSecure);
    };

    checkBrowserSecurity();

    // Monitor for security events
    const handleSecurityViolation = (event: SecurityPolicyViolationEvent) => {
      securityMonitor.logEvent({
        type: 'suspicious_activity',
        severity: 'high',
        details: {
          violatedDirective: event.violatedDirective,
          blockedURI: event.blockedURI,
          documentURI: event.documentURI,
          eventType: 'csp_violation'
        }
      });
      setSecurityScore(prev => Math.max(0, prev - 10));
    };

    document.addEventListener('securitypolicyviolation', handleSecurityViolation);

    return () => {
      document.removeEventListener('securitypolicyviolation', handleSecurityViolation);
    };
  }, []);

  const validateInput = (input: string, type: 'string' | 'html' | 'url' | 'filename' | 'search' = 'string') => {
    const result = securityValidation.validateInput(input, type);
    
    if (!result.isValid) {
      securityMonitor.logEvent({
        type: 'suspicious_activity',
        severity: 'medium',
        details: { inputType: type, errors: result.errors, eventType: 'input_validation_failed' }
      });
    }

    return result;
  };

  const checkRateLimit = async (key: string, action: keyof typeof SECURITY_CONFIG.RATE_LIMITS) => {
    const limit = SECURITY_CONFIG.RATE_LIMITS[action];
    const clientId = securityValidation.generateSecureToken(16);
    const rateLimitKey = `${key}:${clientId}:${action}`;
    
    return await rateLimiter.isAllowed(rateLimitKey, limit);
  };

  const reportSecurityEvent = (event: { type: 'auth_failure' | 'rate_limit_exceeded' | 'suspicious_activity' | 'admin_action' | 'data_access'; severity: 'low' | 'medium' | 'high'; details: any }) => {
    securityMonitor.logEvent(event);
    
    // Adjust security score based on event severity
    const scoreReduction = {
      low: 1,
      medium: 5,
      high: 15,
    };
    
    setSecurityScore(prev => Math.max(0, prev - scoreReduction[event.severity]));
  };

  const contextValue: SecurityContextType = {
    validateInput,
    checkRateLimit,
    reportSecurityEvent,
    securityScore,
    isSecureBrowser,
  };

  return (
    <SecurityContext.Provider value={contextValue}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = (): SecurityContextType => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};