// Enhanced Security Monitoring and Logging
import { supabase } from '@/integrations/supabase/client';

export interface SecurityEvent {
  type: 'auth_failure' | 'rate_limit_exceeded' | 'suspicious_activity' | 'admin_action' | 'data_access';
  severity: 'low' | 'medium' | 'high' | 'critical';
  userId?: string;
  details: Record<string, any>;
  timestamp: string;
  userAgent: string;
  ipAddress?: string;
  location: string;
}

class SecurityMonitor {
  private events: SecurityEvent[] = [];
  private readonly MAX_EVENTS = 1000;

  // Log security events
  logEvent(event: Omit<SecurityEvent, 'timestamp' | 'userAgent' | 'location'>): void {
    const securityEvent: SecurityEvent = {
      ...event,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      location: window.location.href,
    };

    this.events.push(securityEvent);
    
    // Keep only recent events in memory
    if (this.events.length > this.MAX_EVENTS) {
      this.events = this.events.slice(-this.MAX_EVENTS);
    }

    // In production, send critical events to monitoring service
    if (process.env.NODE_ENV === 'production' && event.severity === 'critical') {
      this.reportCriticalEvent(securityEvent);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Security Event:', securityEvent);
    }
  }

  // Report critical security events
  private async reportCriticalEvent(event: SecurityEvent): Promise<void> {
    try {
      // In a real application, this would send to a security monitoring service
      // For now, we'll store in a local security log
      await this.storeSecurityEvent(event);
    } catch (error) {
      // Silently handle reporting errors to prevent cascading failures
    }
  }

  // Store security events (in production, this would be sent to external service)
  private async storeSecurityEvent(event: SecurityEvent): Promise<void> {
    try {
      // Store critical events in browser storage as fallback
      const existingEvents = JSON.parse(localStorage.getItem('security_events') || '[]');
      existingEvents.push(event);
      
      // Keep only last 100 critical events
      const recentEvents = existingEvents.slice(-100);
      localStorage.setItem('security_events', JSON.stringify(recentEvents));
    } catch (error) {
      // Storage might be full or disabled
    }
  }

  // Check for suspicious patterns
  detectSuspiciousActivity(userId?: string): boolean {
    const recentEvents = this.events.filter(
      event => Date.now() - new Date(event.timestamp).getTime() < 5 * 60 * 1000 // Last 5 minutes
    );

    // Check for rapid auth failures
    const authFailures = recentEvents.filter(
      event => event.type === 'auth_failure' && event.userId === userId
    );
    if (authFailures.length >= 3) {
      this.logEvent({
        type: 'suspicious_activity',
        severity: 'high',
        userId,
        details: { pattern: 'rapid_auth_failures', count: authFailures.length }
      });
      return true;
    }

    // Check for excessive rate limiting
    const rateLimitEvents = recentEvents.filter(
      event => event.type === 'rate_limit_exceeded'
    );
    if (rateLimitEvents.length >= 5) {
      this.logEvent({
        type: 'suspicious_activity',
        severity: 'medium',
        userId,
        details: { pattern: 'excessive_rate_limiting', count: rateLimitEvents.length }
      });
      return true;
    }

    return false;
  }

  // Get security metrics for admin dashboard
  getSecurityMetrics(timeframe: number = 24 * 60 * 60 * 1000): {
    authFailures: number;
    rateLimitExceeded: number;
    suspiciousActivity: number;
    criticalEvents: number;
  } {
    const cutoff = Date.now() - timeframe;
    const recentEvents = this.events.filter(
      event => new Date(event.timestamp).getTime() > cutoff
    );

    return {
      authFailures: recentEvents.filter(e => e.type === 'auth_failure').length,
      rateLimitExceeded: recentEvents.filter(e => e.type === 'rate_limit_exceeded').length,
      suspiciousActivity: recentEvents.filter(e => e.type === 'suspicious_activity').length,
      criticalEvents: recentEvents.filter(e => e.severity === 'critical').length,
    };
  }

  // Clear old events (data retention)
  cleanupOldEvents(maxAge: number = 30 * 24 * 60 * 60 * 1000): void {
    const cutoff = Date.now() - maxAge;
    this.events = this.events.filter(
      event => new Date(event.timestamp).getTime() > cutoff
    );
  }
}

export const securityMonitor = new SecurityMonitor();

// Auto-cleanup old events daily
setInterval(() => {
  securityMonitor.cleanupOldEvents();
}, 24 * 60 * 60 * 1000);
