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

  // Rate limiting
  RATE_LIMITS: {
    auth: { requests: 5, window: 15 * 60 * 1000 }, // 5 requests per 15 minutes
    api: { requests: 100, window: 15 * 60 * 1000 }, // 100 requests per 15 minutes
    contact: { requests: 3, window: 60 * 60 * 1000 }, // 3 requests per hour
  },
};

// Rate limiting implementation
class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();

  isAllowed(key: string, limit: { requests: number; window: number }): boolean {
    const now = Date.now();
    const attempt = this.attempts.get(key);

    if (!attempt || now > attempt.resetTime) {
      this.attempts.set(key, { count: 1, resetTime: now + limit.window });
      return true;
    }

    if (attempt.count >= limit.requests) {
      return false;
    }

    attempt.count++;
    return true;
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
      // Handle storage quota exceeded or other errors
      console.warn('Storage operation failed');
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