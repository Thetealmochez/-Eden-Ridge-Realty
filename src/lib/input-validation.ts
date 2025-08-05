import { z } from 'zod';

// Enhanced input validation schemas with security considerations
export const schemas = {
  // Email validation with stricter rules
  email: z.string()
    .email('Invalid email format')
    .min(5, 'Email must be at least 5 characters')
    .max(254, 'Email must not exceed 254 characters')
    .refine(
      (email) => !email.includes('<script>') && !email.includes('javascript:'),
      'Invalid characters in email'
    ),

  // Password with strong security requirements
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must not exceed 128 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),

  // Name validation
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name contains invalid characters'),

  // Phone validation
  phone: z.string()
    .optional()
    .refine(
      (phone) => !phone || /^[\+]?[1-9][\d]{0,15}$/.test(phone),
      'Invalid phone number format'
    ),

  // Message/content validation
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must not exceed 2000 characters')
    .refine(
      (content) => !containsXSSPatterns(content),
      'Message contains potentially harmful content'
    ),

  // URL validation
  url: z.string()
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
    ),

  // Search query validation
  searchQuery: z.string()
    .min(1, 'Search query cannot be empty')
    .max(100, 'Search query must not exceed 100 characters')
    .refine(
      (query) => !containsSQLInjectionPatterns(query),
      'Search query contains invalid characters'
    ),
};

// Combined schemas for common forms
export const formSchemas = {
  // Contact form
  contact: z.object({
    name: schemas.name,
    email: schemas.email,
    phone: schemas.phone,
    message: schemas.message,
    propertyId: z.string().uuid().optional(),
  }),

  // Auth forms
  login: z.object({
    email: schemas.email,
    password: z.string().min(1, 'Password is required'),
  }),

  register: z.object({
    email: schemas.email,
    password: schemas.password,
    confirmPassword: z.string(),
  }).refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }
  ),

  // Property search
  propertySearch: z.object({
    query: schemas.searchQuery.optional(),
    location: z.string().max(100).optional(),
    minPrice: z.number().min(0).optional(),
    maxPrice: z.number().min(0).optional(),
    bedrooms: z.number().min(0).max(20).optional(),
    bathrooms: z.number().min(0).max(20).optional(),
    propertyType: z.enum(['house', 'apartment', 'villa', 'land', 'commercial']).optional(),
  }),
};

// Security helper functions
function containsXSSPatterns(input: string): boolean {
  const xssPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe[^>]*>.*?<\/iframe>/gi,
    /<object[^>]*>.*?<\/object>/gi,
    /<embed[^>]*>.*?<\/embed>/gi,
    /<link[^>]*>.*?<\/link>/gi,
    /<style[^>]*>.*?<\/style>/gi,
    /data:\s*text\/html/gi,
    /vbscript:/gi,
  ];

  return xssPatterns.some(pattern => pattern.test(input));
}

function containsSQLInjectionPatterns(input: string): boolean {
  const sqlPatterns = [
    /(\bUNION\b|\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b|\bCREATE\b|\bALTER\b)/gi,
    /(\bOR\b|\bAND\b)\s+\d+\s*=\s*\d+/gi,
    /;\s*--/gi,
    /\/\*.*?\*\//gi,
    /'.*?OR.*?'/gi,
    /".*?OR.*?"/gi,
  ];

  return sqlPatterns.some(pattern => pattern.test(input));
}

// Sanitization utilities
export const sanitization = {
  // Sanitize HTML content (remove potentially harmful tags)
  sanitizeHtml(input: string): string {
    return input
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
      .replace(/<object[^>]*>.*?<\/object>/gi, '')
      .replace(/<embed[^>]*>.*?<\/embed>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  },

  // Sanitize file names
  sanitizeFileName(filename: string): string {
    return filename
      .replace(/[^a-zA-Z0-9\-_\.]/g, '_')
      .replace(/\.{2,}/g, '.')
      .substring(0, 255);
  },

  // Sanitize user input for display
  sanitizeUserInput(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, (match) => ({ '<': '&lt;', '>': '&gt;' }[match] || match));
  },
};

// Rate limiting key generators
export const rateLimitKeys = {
  login: (ip: string) => `login:${ip}`,
  register: (ip: string) => `register:${ip}`,
  contact: (ip: string) => `contact:${ip}`,
  search: (ip: string) => `search:${ip}`,
  admin: (userId: string) => `admin:${userId}`,
};

// Get client IP (best effort)
export function getClientIdentifier(): string {
  if (typeof window === 'undefined') return 'server';
  
  // Use a combination of factors for client identification
  const userAgent = navigator.userAgent;
  const language = navigator.language;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Create a simple hash for rate limiting purposes
  const identifier = `${userAgent}-${language}-${timezone}`;
  return btoa(identifier).substring(0, 16);
}