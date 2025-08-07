// Enhanced security validation utilities
import { z } from 'zod';

// Security patterns to detect potential threats
const SECURITY_PATTERNS = {
  XSS: [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
    /<form/gi,
    /data:text\/html/gi,
    /vbscript:/gi,
  ],
  SQL_INJECTION: [
    /('|(\\')|(;|(\s*(--|#))))/gi,
    /(union\s+(all\s+)?select)/gi,
    /(select\s+.*\s+from)/gi,
    /(insert\s+into)/gi,
    /(delete\s+from)/gi,
    /(update\s+.*\s+set)/gi,
    /(drop\s+(table|database))/gi,
  ],
  PATH_TRAVERSAL: [
    /\.\.\//gi,
    /\.\.[\\/]/gi,
    /%2e%2e%2f/gi,
    /%252e%252e%252f/gi,
  ],
  COMMAND_INJECTION: [
    /[;&|`$]/gi,
    /\$\(/gi,
    /\|\s*sh/gi,
    /\|\s*bash/gi,
  ],
};

// Enhanced validation schemas
export const secureValidation = {
  // Secure string validation with threat detection
  secureString: (maxLength = 1000) => 
    z.string()
      .max(maxLength, `Input too long (max ${maxLength} characters)`)
      .refine(
        (value) => !SECURITY_PATTERNS.XSS.some(pattern => pattern.test(value)),
        'Potentially unsafe content detected'
      )
      .refine(
        (value) => !SECURITY_PATTERNS.SQL_INJECTION.some(pattern => pattern.test(value)),
        'Invalid characters detected'
      ),

  // Secure HTML content validation
  secureHtml: (maxLength = 5000) =>
    z.string()
      .max(maxLength)
      .refine(
        (value) => {
          // Allow only safe HTML tags
          const allowedTags = /<\/?(p|br|strong|em|u|ol|ul|li|h[1-6]|blockquote)\b[^>]*>/gi;
          const cleanValue = value.replace(allowedTags, '');
          return !/<[^>]+>/g.test(cleanValue);
        },
        'Contains unsafe HTML tags'
      ),

  // Secure URL validation
  secureUrl: z.string()
    .url('Invalid URL format')
    .refine(
      (url) => {
        try {
          const parsed = new URL(url);
          return ['http:', 'https:'].includes(parsed.protocol);
        } catch {
          return false;
        }
      },
      'Only HTTP and HTTPS URLs are allowed'
    )
    .refine(
      (url) => !SECURITY_PATTERNS.XSS.some(pattern => pattern.test(url)),
      'URL contains unsafe content'
    ),

  // Secure file name validation
  secureFileName: z.string()
    .min(1, 'File name required')
    .max(255, 'File name too long')
    .refine(
      (name) => !/[<>:"/\\|?*\x00-\x1f]/g.test(name),
      'File name contains invalid characters'
    )
    .refine(
      (name) => !SECURITY_PATTERNS.PATH_TRAVERSAL.some(pattern => pattern.test(name)),
      'File name contains unsafe path elements'
    ),

  // Secure search query validation
  secureSearchQuery: z.string()
    .max(200, 'Search query too long')
    .refine(
      (query) => !SECURITY_PATTERNS.SQL_INJECTION.some(pattern => pattern.test(query)),
      'Search query contains invalid characters'
    )
    .refine(
      (query) => !SECURITY_PATTERNS.COMMAND_INJECTION.some(pattern => pattern.test(query)),
      'Search query contains unsafe content'
    ),
};

// Security validation functions
export const securityValidation = {
  // Validate and sanitize user input
  validateInput: (input: string, type: 'string' | 'html' | 'url' | 'filename' | 'search' = 'string'): { isValid: boolean; sanitized: string; errors: string[] } => {
    const errors: string[] = [];
    let sanitized = input.trim();

    try {
      switch (type) {
        case 'string':
          secureValidation.secureString().parse(sanitized);
          break;
        case 'html':
          secureValidation.secureHtml().parse(sanitized);
          break;
        case 'url':
          secureValidation.secureUrl.parse(sanitized);
          break;
        case 'filename':
          secureValidation.secureFileName.parse(sanitized);
          break;
        case 'search':
          secureValidation.secureSearchQuery.parse(sanitized);
          break;
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.push(...error.errors.map(e => e.message));
      } else {
        errors.push('Validation failed');
      }
    }

    // Additional sanitization
    if (type === 'string' || type === 'html') {
      // Remove null bytes and control characters
      sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
      
      // Encode potential XSS characters
      sanitized = sanitized
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
    }

    return {
      isValid: errors.length === 0,
      sanitized,
      errors,
    };
  },

  // Check for potential security threats
  detectThreats: (input: string): { threats: string[]; riskLevel: 'low' | 'medium' | 'high' } => {
    const threats: string[] = [];

    Object.entries(SECURITY_PATTERNS).forEach(([type, patterns]) => {
      if (patterns.some(pattern => pattern.test(input))) {
        threats.push(type.toLowerCase().replace('_', ' '));
      }
    });

    const riskLevel = threats.length === 0 ? 'low' : 
                     threats.length <= 1 ? 'medium' : 'high';

    return { threats, riskLevel };
  },

  // Validate file uploads
  validateFileUpload: (file: File): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'text/plain',
    ];

    if (file.size > maxSize) {
      errors.push('File too large (max 10MB)');
    }

    if (!allowedTypes.includes(file.type)) {
      errors.push('File type not allowed');
    }

    const nameValidation = securityValidation.validateInput(file.name, 'filename');
    if (!nameValidation.isValid) {
      errors.push(...nameValidation.errors);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  // Generate secure random tokens
  generateSecureToken: (length = 32): string => {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  },

  // Validate CSRF tokens
  validateCSRFToken: (token: string, expectedToken: string): boolean => {
    if (!token || !expectedToken || token.length !== expectedToken.length) {
      return false;
    }

    // Constant time comparison to prevent timing attacks
    let result = 0;
    for (let i = 0; i < token.length; i++) {
      result |= token.charCodeAt(i) ^ expectedToken.charCodeAt(i);
    }
    return result === 0;
  },
};