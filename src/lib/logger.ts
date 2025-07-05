// Secure logging utility that prevents sensitive data exposure

interface LogEntry {
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  timestamp: Date;
  userId?: string;
  sessionId?: string;
}

class SecureLogger {
  private sensitiveKeys = [
    'password', 'token', 'secret', 'key', 'auth', 'credential',
    'api_key', 'access_token', 'refresh_token', 'session_token'
  ];

  private isDevelopment = import.meta.env.DEV;

  private sanitizeData(data: any): any {
    if (typeof data === 'string') {
      return this.containsSensitiveInfo(data) ? '[REDACTED]' : data;
    }

    if (Array.isArray(data)) {
      return data.map(item => this.sanitizeData(item));
    }

    if (data && typeof data === 'object') {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(data)) {
        if (this.isSensitiveKey(key)) {
          sanitized[key] = '[REDACTED]';
        } else {
          sanitized[key] = this.sanitizeData(value);
        }
      }
      return sanitized;
    }

    return data;
  }

  private isSensitiveKey(key: string): boolean {
    const lowerKey = key.toLowerCase();
    return this.sensitiveKeys.some(sensitiveKey => 
      lowerKey.includes(sensitiveKey)
    );
  }

  private containsSensitiveInfo(str: string): boolean {
    const lowerStr = str.toLowerCase();
    return this.sensitiveKeys.some(sensitiveKey => 
      lowerStr.includes(sensitiveKey)
    );
  }

  private createLogEntry(
    level: LogEntry['level'],
    message: string,
    data?: any,
    userId?: string
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date(),
      userId,
      sessionId: crypto.randomUUID(),
    };
  }

  info(message: string, data?: any, userId?: string): void {
    const logEntry = this.createLogEntry('info', message, data, userId);
    
    if (this.isDevelopment && typeof console.info === 'function') {
      try {
        console.info(`[${logEntry.timestamp.toISOString()}] INFO: ${message}`, 
          data ? this.sanitizeData(data) : '');
      } catch {
        // Console might be disabled in production
      }
    }
  }

  warn(message: string, data?: any, userId?: string): void {
    const logEntry = this.createLogEntry('warn', message, data, userId);
    
    if (this.isDevelopment && typeof console.warn === 'function') {
      try {
        console.warn(`[${logEntry.timestamp.toISOString()}] WARN: ${message}`, 
          data ? this.sanitizeData(data) : '');
      } catch {
        // Console might be disabled in production
      }
    }
  }

  error(message: string, error?: Error | any, userId?: string): void {
    const logEntry = this.createLogEntry('error', message, error, userId);
    
    // Only log errors in development or if console is available
    if (typeof console.error === 'function') {
      try {
        console.error(`[${logEntry.timestamp.toISOString()}] ERROR: ${message}`, 
          error ? this.sanitizeData(error) : '');
      } catch {
        // Console might be disabled in production
      }
    }
  }

  debug(message: string, data?: any, userId?: string): void {
    if (!this.isDevelopment) return;
    
    const logEntry = this.createLogEntry('debug', message, data, userId);
    if (typeof console.debug === 'function') {
      try {
        console.debug(`[${logEntry.timestamp.toISOString()}] DEBUG: ${message}`, 
          data ? this.sanitizeData(data) : '');
      } catch {
        // Console might be disabled in production
      }
    }
  }

  // Security-specific logging
  securityEvent(event: string, details?: any, userId?: string): void {
    const logEntry = this.createLogEntry('warn', `SECURITY: ${event}`, details, userId);
    
    // In production, this would be sent to a security monitoring service
    if (typeof console.warn === 'function') {
      try {
        console.warn(`[SECURITY] ${event}`, this.sanitizeData(details));
      } catch {
        // Console might be disabled in production
      }
    }
  }
}

export const logger = new SecureLogger();