import { useEffect } from 'react';
import { SECURITY_CONFIG } from '@/lib/security';

/**
 * SecurityHeaders Component
 * Applies security headers and CSP policies to the application
 * This component should be included in the root of the application
 */
const SecurityHeaders = () => {
  useEffect(() => {
    // Apply Content Security Policy
    const cspValue = Object.entries(SECURITY_CONFIG.CSP)
      .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
      .join('; ');

    // Create meta tag for CSP if not already present
    let cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (!cspMeta) {
      cspMeta = document.createElement('meta');
      cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');
      document.head.appendChild(cspMeta);
    }
    cspMeta.setAttribute('content', cspValue);

    // Apply other security headers via meta tags where possible
    const securityHeaders = [
      { name: 'X-Content-Type-Options', value: SECURITY_CONFIG.HEADERS['X-Content-Type-Options'] },
      { name: 'X-Frame-Options', value: SECURITY_CONFIG.HEADERS['X-Frame-Options'] },
      { name: 'X-XSS-Protection', value: SECURITY_CONFIG.HEADERS['X-XSS-Protection'] },
      { name: 'Referrer-Policy', value: SECURITY_CONFIG.HEADERS['Referrer-Policy'] },
      { name: 'Permissions-Policy', value: SECURITY_CONFIG.HEADERS['Permissions-Policy'] },
    ];

    securityHeaders.forEach(({ name, value }) => {
      let meta = document.querySelector(`meta[http-equiv="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('http-equiv', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', value);
    });

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

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default SecurityHeaders;