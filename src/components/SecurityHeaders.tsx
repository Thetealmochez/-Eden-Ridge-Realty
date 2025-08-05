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
      // CSP is already set in index.html, skip client-side override
      console.log('CSP already configured in index.html');
    } else {
      console.warn('CSP not found in index.html, this should be configured server-side');
    }

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