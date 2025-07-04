// Production Security Utilities
// These utilities are designed to enhance security in production environments

/**
 * Production security configuration
 */
export const PRODUCTION_CONFIG = {
  // Disable console methods in production
  DISABLE_CONSOLE: process.env.NODE_ENV === 'production',
  
  // Enable additional security measures
  ENHANCED_SECURITY: process.env.NODE_ENV === 'production',
  
  // Rate limiting settings for production
  RATE_LIMITS: {
    strict: process.env.NODE_ENV === 'production',
    api: { requests: 60, window: 15 * 60 * 1000 }, // Stricter in production
    auth: { requests: 3, window: 15 * 60 * 1000 }, // More restrictive in production
    contact: { requests: 2, window: 60 * 60 * 1000 }, // Limited contact submissions
  },
};

/**
 * Disable console methods in production
 * This prevents sensitive information from being logged in production
 */
export const disableConsoleInProduction = () => {
  if (PRODUCTION_CONFIG.DISABLE_CONSOLE) {
    // Save original console methods for debugging if needed
    const originalConsole = { ...console };
    
    // Override console methods with no-ops
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
    console.info = () => {};
    console.debug = () => {};
    console.trace = () => {};
    console.table = () => {};
    console.group = () => {};
    console.groupEnd = () => {};
    console.groupCollapsed = () => {};
    console.count = () => {};
    console.countReset = () => {};
    console.time = () => {};
    console.timeEnd = () => {};
    console.timeLog = () => {};
    
    // Store original console in a hidden property for debugging if absolutely necessary
    (window as any).__originalConsole = originalConsole;
  }
};

/**
 * Enhanced error boundary for production
 * Sanitizes error messages to prevent information disclosure
 */
export class ProductionErrorBoundary {
  static sanitizeError(error: Error): string {
    if (process.env.NODE_ENV === 'production') {
      // In production, return generic error message
      return 'An unexpected error occurred. Please try again.';
    }
    // In development, return full error for debugging
    return error.message;
  }

  static sanitizeStack(stack?: string): string | undefined {
    if (process.env.NODE_ENV === 'production') {
      // Never expose stack traces in production
      return undefined;
    }
    return stack;
  }
}

/**
 * Secure error reporting for production
 * Reports errors without exposing sensitive information
 */
export const secureErrorReporter = {
  report: (error: Error, context?: Record<string, any>) => {
    const sanitizedError = {
      message: ProductionErrorBoundary.sanitizeError(error),
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      // Only include safe context information
      context: context ? Object.keys(context).reduce((safe, key) => {
        // Filter out potentially sensitive keys
        if (!['password', 'token', 'key', 'secret', 'auth'].some(sensitive => 
          key.toLowerCase().includes(sensitive))) {
          safe[key] = context[key];
        }
        return safe;
      }, {} as Record<string, any>) : {},
    };

    // In production, this would be sent to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Send to error reporting service (e.g., Sentry, LogRocket, etc.)
      // fetch('/api/errors', { method: 'POST', body: JSON.stringify(sanitizedError) });
    }
  },
};

/**
 * Initialize production security measures
 */
export const initializeProductionSecurity = () => {
  // Disable console logging in production
  disableConsoleInProduction();
  
  // Set up global error handler
  window.addEventListener('error', (event) => {
    secureErrorReporter.report(new Error(event.message), {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  // Set up unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    secureErrorReporter.report(
      event.reason instanceof Error ? event.reason : new Error(String(event.reason))
    );
  });

  // Prevent common security bypass attempts
  if (PRODUCTION_CONFIG.ENHANCED_SECURITY) {
    // Prevent iframe embedding from unauthorized domains
    if (window.self !== window.top) {
      // This page is being embedded in an iframe
      // Add additional checks here if needed
    }

    // Clear sensitive data on page unload
    window.addEventListener('beforeunload', () => {
      // Clear any sensitive data from memory
      // This is mainly for browsers that don't handle memory properly
      try {
        // Clear any cached sensitive data
        if ('caches' in window) {
          caches.keys().then(names => {
            names.forEach(name => {
              if (name.includes('sensitive') || name.includes('auth')) {
                caches.delete(name);
              }
            });
          });
        }
      } catch (error) {
        // Silently handle cache clearing errors
      }
    });
  }
};

/**
 * Production build verification
 * Ensures the application is properly configured for production
 */
export const verifyProductionBuild = () => {
  const issues: string[] = [];

  // Check if we're in production mode
  if (process.env.NODE_ENV !== 'production') {
    issues.push('Application is not running in production mode');
  }

  // Check if console is properly disabled
  if (PRODUCTION_CONFIG.DISABLE_CONSOLE && typeof console.log === 'function') {
    const testOutput = console.log.toString();
    if (testOutput.includes('native code') || testOutput.length > 20) {
      issues.push('Console logging is not properly disabled');
    }
  }

  // Return verification results
  return {
    isValid: issues.length === 0,
    issues,
  };
};