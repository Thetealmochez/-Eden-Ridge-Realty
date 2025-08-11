/**
 * Secure Logging Utility
 * Provides production-safe logging that doesn't expose sensitive information
 */

import { securityMonitor } from './security-monitor';

export interface LogContext {
  component?: string;
  action?: string;
  userId?: string;
  [key: string]: any;
}

export class SecureLogger {
  private static sanitizeMessage(message: string): string {
    // Remove potentially sensitive patterns
    const sensitivePatterns = [
      /password[=:]\s*[^\s,}]+/gi,
      /token[=:]\s*[^\s,}]+/gi,
      /key[=:]\s*[^\s,}]+/gi,
      /secret[=:]\s*[^\s,}]+/gi,
      /auth[=:]\s*[^\s,}]+/gi,
      /bearer\s+[^\s,}]+/gi,
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, // emails
      /\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}/g, // credit card patterns
    ];

    let sanitized = message;
    sensitivePatterns.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '[REDACTED]');
    });

    return sanitized;
  }

  private static sanitizeContext(context: LogContext): LogContext {
    const sensitiveKeys = ['password', 'token', 'key', 'secret', 'auth', 'email'];
    const sanitized: LogContext = {};

    for (const [key, value] of Object.entries(context)) {
      if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeContext(value as LogContext);
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  static error(message: string, context?: LogContext): void {
    const sanitizedMessage = this.sanitizeMessage(message);
    const sanitizedContext = context ? this.sanitizeContext(context) : {};

    // In production, use secure logging
    if (process.env.NODE_ENV === 'production') {
      // Report to security monitor for production tracking
      securityMonitor.logEvent({
        type: 'suspicious_activity',
        severity: 'medium',
        details: {
          logLevel: 'error',
          message: sanitizedMessage,
          context: sanitizedContext,
          timestamp: new Date().toISOString(),
        },
      });
    } else {
      // In development, use console for debugging
      console.error(`[SecureLogger] ${sanitizedMessage}`, sanitizedContext);
    }
  }

  static warn(message: string, context?: LogContext): void {
    const sanitizedMessage = this.sanitizeMessage(message);
    const sanitizedContext = context ? this.sanitizeContext(context) : {};

    if (process.env.NODE_ENV === 'production') {
      securityMonitor.logEvent({
        type: 'suspicious_activity',
        severity: 'low',
        details: {
          logLevel: 'warn',
          message: sanitizedMessage,
          context: sanitizedContext,
          timestamp: new Date().toISOString(),
        },
      });
    } else {
      console.warn(`[SecureLogger] ${sanitizedMessage}`, sanitizedContext);
    }
  }

  static info(message: string, context?: LogContext): void {
    const sanitizedMessage = this.sanitizeMessage(message);
    const sanitizedContext = context ? this.sanitizeContext(context) : {};

    if (process.env.NODE_ENV === 'production') {
      // Info logs are typically not sent to security monitor unless needed
      // Store in local storage for debugging if needed
      try {
        const logs = JSON.parse(localStorage.getItem('app_logs') || '[]');
        logs.push({
          level: 'info',
          message: sanitizedMessage,
          context: sanitizedContext,
          timestamp: new Date().toISOString(),
        });
        // Keep only last 100 logs
        if (logs.length > 100) {
          logs.splice(0, logs.length - 100);
        }
        localStorage.setItem('app_logs', JSON.stringify(logs));
      } catch {
        // Silently fail if localStorage is not available
      }
    } else {
      console.info(`[SecureLogger] ${sanitizedMessage}`, sanitizedContext);
    }
  }

  static debug(message: string, context?: LogContext): void {
    // Debug logs are only shown in development
    if (process.env.NODE_ENV !== 'production') {
      const sanitizedMessage = this.sanitizeMessage(message);
      const sanitizedContext = context ? this.sanitizeContext(context) : {};
      console.debug(`[SecureLogger] ${sanitizedMessage}`, sanitizedContext);
    }
  }
}

export const secureLogger = SecureLogger;
