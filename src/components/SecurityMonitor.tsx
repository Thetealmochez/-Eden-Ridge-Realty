import { useEffect } from 'react';
import { rateLimiter, SECURITY_CONFIG } from '@/lib/security';
import { secureErrorReporter } from '@/lib/production-security';

/**
 * SecurityMonitor Component
 * Monitors and tracks security-related events and potential threats
 */
const SecurityMonitor = () => {
  useEffect(() => {
    // Monitor for potential security threats
    let suspiciousActivityCount = 0;
    let lastSuspiciousActivity = 0;

    // Monitor for rapid API calls (potential abuse)
    const monitorApiCalls = () => {
      const userKey = 'user_session'; // In real app, use user ID or session ID
      
      // Check if user is making too many requests
      if (!rateLimiter.isAllowed(userKey, SECURITY_CONFIG.RATE_LIMITS.api)) {
        suspiciousActivityCount++;
        lastSuspiciousActivity = Date.now();
        
        secureErrorReporter.report(new Error('Rate limit exceeded'), {
          type: 'security_threat',
          threat: 'rate_limit_exceeded',
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        });
      }
    };

    // Monitor for suspicious JavaScript injection attempts
    const monitorDOMChanges = (mutations: MutationRecord[]) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              
              // Check for suspicious script injections
              if (element.tagName === 'SCRIPT' && !element.hasAttribute('data-trusted')) {
                secureErrorReporter.report(new Error('Unauthorized script injection detected'), {
                  type: 'security_threat',
                  threat: 'script_injection',
                  scriptContent: element.textContent?.substring(0, 100) || '',
                  timestamp: new Date().toISOString(),
                });
              }
              
              // Check for suspicious iframe injections
              if (element.tagName === 'IFRAME' && !element.hasAttribute('data-trusted')) {
                secureErrorReporter.report(new Error('Unauthorized iframe injection detected'), {
                  type: 'security_threat',
                  threat: 'iframe_injection',
                  src: element.getAttribute('src') || '',
                  timestamp: new Date().toISOString(),
                });
              }
            }
          });
        }
      });
    };

    // Set up DOM mutation observer
    const observer = new MutationObserver(monitorDOMChanges);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Monitor for console access attempts in production
    if (process.env.NODE_ENV === 'production') {
      const originalConsole = (window as any).__originalConsole;
      if (originalConsole) {
        // Monitor if someone tries to access the original console
        Object.defineProperty(window, '__originalConsole', {
          get: () => {
            secureErrorReporter.report(new Error('Console access attempt in production'), {
              type: 'security_threat',
              threat: 'console_access',
              timestamp: new Date().toISOString(),
            });
            return originalConsole;
          },
          configurable: false,
        });
      }
    }

    // Monitor for localStorage tampering
    const originalSetItem = localStorage.setItem;
    const originalGetItem = localStorage.getItem;
    const originalRemoveItem = localStorage.removeItem;

    localStorage.setItem = function(key: string, value: string) {
      // Monitor for attempts to set suspicious keys
      if (key.includes('admin') || key.includes('token') || key.includes('secret')) {
        secureErrorReporter.report(new Error('Suspicious localStorage access'), {
          type: 'security_threat',
          threat: 'storage_tampering',
          key: key,
          timestamp: new Date().toISOString(),
        });
      }
      return originalSetItem.call(this, key, value);
    };

    // Monitor for potential XSS attempts
    const monitorInputs = (event: Event) => {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        const value = target.value;
        
        // Check for common XSS patterns
        const xssPatterns = [
          /<script[^>]*>.*?<\/script>/gi,
          /javascript:/gi,
          /on\w+\s*=/gi,
          /<iframe[^>]*>/gi,
          /eval\s*\(/gi,
        ];

        const hasXSSPattern = xssPatterns.some(pattern => pattern.test(value));
        
        if (hasXSSPattern && value.length > 10) {
          secureErrorReporter.report(new Error('Potential XSS attempt detected'), {
            type: 'security_threat',
            threat: 'xss_attempt',
            inputType: target.tagName,
            pattern: value.substring(0, 50),
            timestamp: new Date().toISOString(),
          });
        }
      }
    };

    // Add event listeners
    document.addEventListener('input', monitorInputs, true);
    
    // Set up periodic monitoring
    const monitoringInterval = setInterval(() => {
      monitorApiCalls();
      
      // Reset suspicious activity counter if enough time has passed
      if (Date.now() - lastSuspiciousActivity > 5 * 60 * 1000) { // 5 minutes
        suspiciousActivityCount = 0;
      }
      
      // Report if too much suspicious activity
      if (suspiciousActivityCount > 5) {
        secureErrorReporter.report(new Error('Multiple security threats detected'), {
          type: 'security_alert',
          threat: 'multiple_threats',
          count: suspiciousActivityCount,
          timestamp: new Date().toISOString(),
        });
        suspiciousActivityCount = 0; // Reset after reporting
      }
    }, 30000); // Check every 30 seconds

    // Cleanup function
    return () => {
      observer.disconnect();
      document.removeEventListener('input', monitorInputs, true);
      clearInterval(monitoringInterval);
      
      // Restore original localStorage methods
      localStorage.setItem = originalSetItem;
      localStorage.getItem = originalGetItem;
      localStorage.removeItem = originalRemoveItem;
    };
  }, []);

  return null; // This component doesn't render anything
};

export default SecurityMonitor;