// Security configuration and utilities

export const SECURITY_CONFIG = {
  // Content Security Policy
  CSP: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "https://api.mapbox.com"],
    'style-src': ["'self'", "'unsafe-inline'", "https://api.mapbox.com"],
    'img-src': ["'self'", "data:", "https:", "blob:"],
    'font-src': ["'self'", "https:"],
    'connect-src': ["'self'", "https:", "wss:"],
    'worker-src': ["'self'", "blob:"],
    'frame-src': ["'none'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
  },

  // Security headers
  HEADERS: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  },

  // Rate limiting - enhanced security
  RATE_LIMITS: {
    auth: { requests: 3, window: 15 * 60 * 1000 }, // 3 requests per 15 minutes
    api: { requests: 60, window: 15 * 60 * 1000 }, // 60 requests per 15 minutes  
    contact: { requests: 2, window: 60 * 60 * 1000 }, // 2 requests per hour
    session: { requests: 10, window: 60 * 1000 }, // 10 session checks per minute
    admin: { requests: 20, window: 60 * 1000 }, // 20 admin actions per minute
  },
};

// Enhanced rate limiting implementation with security monitoring
class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();

  async isAllowed(key: string, limit: { requests: number; window: number }): Promise<boolean> {
    // In production, use server-side rate limiting when possible
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      try {
        const { supabase } = await import('@/integrations/supabase/client');
        const { data } = await supabase.rpc('check_rate_limit', {
          _identifier: key,
          _rate_limit_type: 'client_request',
          _max_requests: limit.requests,
          _window_minutes: Math.floor(limit.window / (60 * 1000))
        });
        return data || false;
      } catch (error) {
        // Fallback to client-side rate limiting
        console.warn('Server-side rate limiting failed, using client-side fallback');
      }
    }

    // Client-side fallback rate limiting
    const now = Date.now();
    const attempt = this.attempts.get(key);

    if (!attempt || now > attempt.resetTime) {
      this.attempts.set(key, { count: 1, resetTime: now + limit.window });
      return true;
    }

    if (attempt.count >= limit.requests) {
      // Log rate limit exceeded event
      this.logRateLimitExceeded(key, attempt.count);
      return false;
    }

    attempt.count++;
    return true;
  }

  private logRateLimitExceeded(key: string, attemptCount: number): void {
    // Import here to avoid circular dependencies
    import('@/lib/security-monitor').then(({ securityMonitor }) => {
      securityMonitor.logEvent({
        type: 'rate_limit_exceeded',
        severity: attemptCount > 10 ? 'high' : 'medium',
        details: { key, attemptCount }
      });
    });
  }

  cleanup(): void {
    const now = Date.now();
    for (const [key, attempt] of this.attempts.entries()) {
      if (now > attempt.resetTime) {
        this.attempts.delete(key);
      }
    }
  }
}

export const rateLimiter = new RateLimiter();

// Clean up expired rate limit entries every 5 minutes
setInterval(() => rateLimiter.cleanup(), 5 * 60 * 1000);

// Secure storage utilities
export const secureStorage = {
  setItem(key: string, value: string): void {
    try {
      // In production, consider encrypting sensitive data
      localStorage.setItem(key, value);
    } catch (error) {
      // Handle storage quota exceeded or other errors silently
      // In production, logging is disabled for security
    }
  },

  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  },

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      // Handle errors silently
    }
  },

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      // Handle errors silently
    }
  },
};

// Input validation utilities
export const security = {
  // Validate file uploads
  validateFile(file: File, allowedTypes: string[], maxSize: number): boolean {
    if (!allowedTypes.includes(file.type)) {
      return false;
    }
    if (file.size > maxSize) {
      return false;
    }
    return true;
  },

  // Generate secure random strings
  generateSecureId(): string {
    return crypto.randomUUID();
  },

  // Hash sensitive data (for comparison, not storage)
  async hashData(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },
};