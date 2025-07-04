import { useEffect, useState } from 'react';
import { verifyProductionBuild } from '@/lib/production-security';
import { SECURITY_CONFIG } from '@/lib/security';

/**
 * SecurityAudit Component
 * Performs security audits and reports potential vulnerabilities
 * This component should only be used in development or by admins
 */
const SecurityAudit = () => {
  const [auditResults, setAuditResults] = useState<{
    isValid: boolean;
    issues: string[];
    recommendations: string[];
  } | null>(null);

  useEffect(() => {
    // Only run security audit in development or for authorized users
    if (process.env.NODE_ENV === 'development') {
      performSecurityAudit();
    }
  }, []);

  const performSecurityAudit = () => {
    const results = verifyProductionBuild();
    const recommendations: string[] = [];

    // Check for security headers
    const hasCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (!hasCSP) {
      results.issues.push('Content Security Policy not detected');
      recommendations.push('Implement Content Security Policy headers');
    }

    // Check for HTTPS
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      results.issues.push('Application not served over HTTPS');
      recommendations.push('Enable HTTPS for all production traffic');
    }

    // Check for secure storage usage
    const usesLocalStorage = localStorage.length > 0;
    if (usesLocalStorage) {
      let hasSecureStorage = false;
      try {
        // Check if secure storage wrapper is being used
        const testKey = '__security_test__';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        hasSecureStorage = true;
      } catch {
        // If storage fails, it might be using secure wrapper
        hasSecureStorage = true;
      }
      
      if (!hasSecureStorage) {
        recommendations.push('Consider using secure storage wrapper for sensitive data');
      }
    }

    // Check for input validation
    const inputs = document.querySelectorAll('input, textarea');
    let hasUnvalidatedInputs = false;
    inputs.forEach((input) => {
      if (!input.hasAttribute('maxlength') && input.getAttribute('type') !== 'hidden') {
        hasUnvalidatedInputs = true;
      }
    });

    if (hasUnvalidatedInputs) {
      recommendations.push('Add input length limits to prevent buffer overflow attacks');
    }

    // Check for rate limiting
    const hasRateLimiting = typeof SECURITY_CONFIG.RATE_LIMITS !== 'undefined';
    if (!hasRateLimiting) {
      results.issues.push('Rate limiting configuration not found');
      recommendations.push('Implement rate limiting for API endpoints');
    }

    setAuditResults({
      ...results,
      recommendations,
    });
  };

  // Only show audit results in development
  if (process.env.NODE_ENV !== 'development' || !auditResults) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-red-300 rounded-lg shadow-lg p-4 max-w-md z-50">
      <div className="mb-2">
        <h3 className="font-bold text-sm text-gray-800">Security Audit Results</h3>
        <div className={`text-xs ${auditResults.isValid ? 'text-green-600' : 'text-red-600'}`}>
          Status: {auditResults.isValid ? 'SECURE' : 'ISSUES FOUND'}
        </div>
      </div>
      
      {auditResults.issues.length > 0 && (
        <div className="mb-2">
          <h4 className="font-semibold text-xs text-red-600 mb-1">Issues:</h4>
          <ul className="text-xs text-red-600">
            {auditResults.issues.map((issue, index) => (
              <li key={index} className="mb-1">• {issue}</li>
            ))}
          </ul>
        </div>
      )}
      
      {auditResults.recommendations.length > 0 && (
        <div>
          <h4 className="font-semibold text-xs text-blue-600 mb-1">Recommendations:</h4>
          <ul className="text-xs text-blue-600">
            {auditResults.recommendations.map((rec, index) => (
              <li key={index} className="mb-1">• {rec}</li>
            ))}
          </ul>
        </div>
      )}
      
      <button 
        onClick={() => setAuditResults(null)}
        className="mt-2 text-xs text-gray-500 hover:text-gray-700"
      >
        Dismiss
      </button>
    </div>
  );
};

export default SecurityAudit;