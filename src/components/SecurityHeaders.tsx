import { useEffect } from 'react';
import { SECURITY_CONFIG } from '@/lib/security';

/**
 * SecurityHeaders Component
 * Applies security headers and CSP policies to the application
 * This component should be included in the root of the application
 */
const SecurityHeaders = () => {
  useEffect(() => {
    // Check if CSP is already set in index.html (preferred approach)
    const existingCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (existingCSP) {
      // CSP is already configured, verify it's secure
      const cspContent = existingCSP.getAttribute('content');
      if (cspContent && !cspContent.includes("'unsafe-eval'")) {
        // Use secure logging instead of console
        import('@/lib/secure-logger').then(({ secureLogger }) => {
          secureLogger.info('Secure CSP configuration detected', {
            component: 'SecurityHeaders',
            cspDirectives: cspContent?.split(';').length || 0,
          });
        });
      }
    } else {
      import('@/lib/secure-logger').then(({ secureLogger }) => {
        secureLogger.warn('CSP not found in index.html', {
          component: 'SecurityHeaders',
          recommendation: 'Configure CSP server-side for better security',
        });
      });
    }

    // Add security event listeners
    const handleSecurityPolicyViolation = (event: SecurityPolicyViolationEvent) => {
      // Report CSP violations using secure logging
      import('@/lib/secure-logger').then(({ secureLogger }) => {
        secureLogger.error('CSP Violation detected', {
          component: 'SecurityHeaders',
          violatedDirective: event.violatedDirective,
          blockedURI: event.blockedURI,
          documentURI: event.documentURI,
          timestamp: new Date().toISOString(),
        });
      });
    };

    document.addEventListener('securitypolicyviolation', handleSecurityPolicyViolation);

    // Disable right-click context menu in production
    const handleContextMenu = (e: MouseEvent) => {
      if (process.env.NODE_ENV === 'production') {
        e.preventDefault();
      }
    };

    // Disable common developer shortcuts in production
    const handleKeyDown = (e: KeyboardEvent) => {
      if (process.env.NODE_ENV === 'production') {
        // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
          (e.ctrlKey && e.key === 'u')
        ) {
          e.preventDefault();
        }
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('securitypolicyviolation', handleSecurityPolicyViolation);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('securitypolicyviolation', handleSecurityPolicyViolation);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default SecurityHeaders;