/**
 * Enhanced Production Security Utilities
 * Advanced security measures for production environments
 */

import { secureLogger } from './secure-logger';
import { DataRetentionManager } from './data-retention';
import { securityMonitor } from './security-monitor';
import { supabase } from '@/integrations/supabase/client';

export class ProductionSecurityManager {
  private static isInitialized = false;
  private static securityCheckInterval: NodeJS.Timeout | null = null;

  /**
   * Initialize comprehensive production security
   */
  static async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // 1. Disable console logging in production
      this.disableProductionConsole();

      // 2. Set up enhanced error handling
      this.setupEnhancedErrorHandling();

      // 3. Initialize data retention policies
      this.initializeDataRetention();

      // 4. Set up security monitoring
      this.setupSecurityMonitoring();

      // 5. Configure production-specific security headers
      this.configureSecurityHeaders();

      // 6. Set up automated security checks
      this.setupPeriodicSecurityChecks();

      this.isInitialized = true;
      
      secureLogger.info('Production security initialized successfully', {
        component: 'ProductionSecurityManager',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      secureLogger.error('Failed to initialize production security', {
        component: 'ProductionSecurityManager',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Enhanced console disabling with better detection
   */
  private static disableProductionConsole(): void {
    if (process.env.NODE_ENV !== 'production') return;

    const originalConsole = { ...console };
    const noOp = () => {};

    // Override all console methods
    Object.keys(console).forEach((method) => {
      if (typeof (console as any)[method] === 'function') {
        (console as any)[method] = noOp;
      }
    });

    // Hide the override from casual inspection
    Object.defineProperty(window, '__CONSOLE_DISABLED__', {
      value: true,
      writable: false,
      enumerable: false,
      configurable: false,
    });

    // Store original console in a hard-to-find location for emergency debugging
    (window as any).__emergency_console__ = originalConsole;
  }

  /**
   * Enhanced error handling with security focus
   */
  private static setupEnhancedErrorHandling(): void {
    // Global error handler
    window.addEventListener('error', (event) => {
      secureLogger.error('Global error caught', {
        component: 'ProductionSecurityManager',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: process.env.NODE_ENV === 'production' ? '[REDACTED]' : event.error?.stack,
      });

      // Check if error might be security-related
      if (this.isSecurityRelatedError(event.error)) {
        securityMonitor.logEvent({
          type: 'suspicious_activity',
          severity: 'high',
          details: {
            errorType: 'security_related_error',
            message: event.message,
            filename: event.filename,
          },
        });
      }
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      secureLogger.error('Unhandled promise rejection', {
        component: 'ProductionSecurityManager',
        reason: event.reason instanceof Error ? event.reason.message : String(event.reason),
      });

      if (this.isSecurityRelatedError(event.reason)) {
        securityMonitor.logEvent({
          type: 'suspicious_activity',
          severity: 'medium',
          details: {
            errorType: 'security_related_promise_rejection',
            reason: String(event.reason),
          },
        });
      }
    });
  }

  /**
   * Check if an error might be security-related
   */
  private static isSecurityRelatedError(error: any): boolean {
    if (!error) return false;
    
    const errorString = typeof error === 'string' ? error : error.message || '';
    const securityKeywords = [
      'csp', 'violation', 'blocked', 'unauthorized', 'permission', 'cors',
      'xss', 'injection', 'csrf', 'security', 'breach', 'attack'
    ];

    return securityKeywords.some(keyword => 
      errorString.toLowerCase().includes(keyword)
    );
  }

  /**
   * Initialize data retention and PII protection
   */
  private static async initializeDataRetention(): Promise<void> {
    if (process.env.NODE_ENV !== 'production') return;

    try {
      // Only schedule anonymization for authenticated admins
      const { data: isAdmin, error: adminCheckError } = await supabase.rpc('is_admin');
      if (adminCheckError || !isAdmin) {
        return;
      }
    } catch {
      return;
    }

    setInterval(async () => {
      try {
        const result = await DataRetentionManager.anonymizeExpiredData('leads');
        if (result.anonymizedCount > 0) {
          secureLogger.info('Expired data anonymized', {
            component: 'ProductionSecurityManager',
            anonymizedCount: result.anonymizedCount,
          });
        }
      } catch (error) {
        secureLogger.error('Failed to anonymize expired data', {
          component: 'ProductionSecurityManager',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }, 24 * 60 * 60 * 1000); // Run daily
  }

  /**
   * Set up enhanced security monitoring
   */
  private static setupSecurityMonitoring(): void {
    // Monitor for suspicious DOM modifications
    if ('MutationObserver' in window) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            // Check for suspicious script injections
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element;
                if (element.tagName === 'SCRIPT' && !element.getAttribute('data-approved')) {
                  securityMonitor.logEvent({
                    type: 'suspicious_activity',
                    severity: 'high',
                    details: {
                      type: 'suspicious_script_injection',
                      src: element.getAttribute('src'),
                      content: element.textContent?.substring(0, 100),
                    },
                  });
                }
              }
            });
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    // Monitor for devtools usage in production
    if (process.env.NODE_ENV === 'production') {
      this.detectDevTools();
    }
  }

  /**
   * Detect if developer tools are open
   */
  private static detectDevTools(): void {
    let devtools = { open: false, orientation: null };
    const threshold = 160;

    setInterval(() => {
      if (
        window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold
      ) {
        if (!devtools.open) {
          devtools.open = true;
          securityMonitor.logEvent({
            type: 'suspicious_activity',
            severity: 'medium',
            details: {
              type: 'devtools_detected',
              timestamp: new Date().toISOString(),
            },
          });
        }
      } else {
        devtools.open = false;
      }
    }, 500);
  }

  /**
   * Configure additional security headers via meta tags
   */
  private static configureSecurityHeaders(): void {
    const securityHeaders = [
      { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' },
      { 'http-equiv': 'X-Frame-Options', content: 'DENY' },
      { 'http-equiv': 'X-XSS-Protection', content: '1; mode=block' },
      { 'http-equiv': 'Referrer-Policy', content: 'strict-origin-when-cross-origin' },
    ];

    securityHeaders.forEach((header) => {
      if (!document.querySelector(`meta[http-equiv="${header['http-equiv']}"]`)) {
        const meta = document.createElement('meta');
        meta.setAttribute('http-equiv', header['http-equiv']);
        meta.setAttribute('content', header.content);
        document.head.appendChild(meta);
      }
    });
  }

  /**
   * Set up periodic security checks
   */
  private static setupPeriodicSecurityChecks(): void {
    this.securityCheckInterval = setInterval(() => {
      this.performSecurityHealthCheck();
    }, 5 * 60 * 1000); // Every 5 minutes
  }

  /**
   * Perform a comprehensive security health check
   */
  private static performSecurityHealthCheck(): void {
    const issues: string[] = [];

    // Check if console is still disabled
    if (process.env.NODE_ENV === 'production' && typeof console.log === 'function') {
      const logStr = console.log.toString();
      if (logStr.includes('native code') || logStr.length > 20) {
        issues.push('Console logging re-enabled');
      }
    }

    // Check for suspicious global variables
    const suspiciousGlobals = ['eval', '__proto__', 'constructor'];
    suspiciousGlobals.forEach((global) => {
      if ((window as any)[global] && typeof (window as any)[global] !== 'function') {
        issues.push(`Suspicious global variable: ${global}`);
      }
    });

    // Check CSP status
    const csp = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (!csp) {
      issues.push('CSP header missing');
    }

    if (issues.length > 0) {
      securityMonitor.logEvent({
        type: 'suspicious_activity',
        severity: 'medium',
        details: {
          type: 'security_health_check_failed',
          issues,
          timestamp: new Date().toISOString(),
        },
      });
    }
  }

  /**
   * Clean up security resources
   */
  static cleanup(): void {
    if (this.securityCheckInterval) {
      clearInterval(this.securityCheckInterval);
      this.securityCheckInterval = null;
    }
    this.isInitialized = false;
  }

  /**
   * Get security status report
   */
  static getSecurityStatus(): {
    isSecure: boolean;
    issues: string[];
    lastCheck: string;
  } {
    const issues: string[] = [];

    // Check production mode
    if (process.env.NODE_ENV !== 'production') {
      issues.push('Not running in production mode');
    }

    // Check console status
    if (process.env.NODE_ENV === 'production' && !((window as any).__CONSOLE_DISABLED__)) {
      issues.push('Console not properly disabled');
    }

    // Check CSP
    const csp = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (!csp) {
      issues.push('CSP not configured');
    }

    return {
      isSecure: issues.length === 0,
      issues,
      lastCheck: new Date().toISOString(),
    };
  }
}

export const productionSecurity = ProductionSecurityManager;