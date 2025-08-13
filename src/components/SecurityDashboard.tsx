import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, AlertTriangle, Activity, Database, Users } from 'lucide-react';

interface SecurityMetrics {
  authFailures: number;
  rateLimitExceeded: number;
  suspiciousActivity: number;
  criticalEvents: number;
}

interface RateLimitEntry {
  id: string;
  identifier: string;
  request_count: number;
  rate_limit_type: string;
  window_start: string;
}

const SecurityDashboard = () => {
  const { isAdmin } = useAuth();
  const [metrics, setMetrics] = useState<SecurityMetrics>({ 
    authFailures: 0, 
    rateLimitExceeded: 0, 
    suspiciousActivity: 0, 
    criticalEvents: 0 
  });
  const [rateLimits, setRateLimits] = useState<RateLimitEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;
    
    loadSecurityData();
    const interval = setInterval(loadSecurityData, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [isAdmin]);

  const loadSecurityData = async () => {
    try {
      // Load security metrics from local security monitor
      const { securityMonitor } = await import('@/lib/security-monitor');
      const clientMetrics = securityMonitor.getSecurityMetrics();
      
      // Load rate limit data from database
      const { data: rateLimitData } = await supabase
        .from('rate_limits')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      setMetrics(clientMetrics);
      setRateLimits(rateLimitData || []);
    } catch (error) {
      const { secureLogger } = await import('@/lib/secure-logger');
      secureLogger.error('Failed to load security data', {
        component: 'SecurityDashboard',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearOldRateLimits = async () => {
    try {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      
      const { error } = await supabase
        .from('rate_limits')
        .delete()
        .lt('window_start', oneHourAgo);

      if (!error) {
        loadSecurityData();
      }
    } catch (error) {
      const { secureLogger } = await import('@/lib/secure-logger');
      secureLogger.error('Failed to clear rate limits', {
        component: 'SecurityDashboard',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  if (!isAdmin) {
    return (
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Admin access required to view security dashboard.
        </AlertDescription>
      </Alert>
    );
  }

  const getThreatLevel = () => {
    const totalThreats = metrics.authFailures + metrics.rateLimitExceeded + metrics.suspiciousActivity;
    if (totalThreats === 0) return { level: 'Low', color: 'green', variant: 'default' as const };
    if (totalThreats < 10) return { level: 'Medium', color: 'yellow', variant: 'secondary' as const };
    return { level: 'High', color: 'red', variant: 'destructive' as const };
  };

  const threatLevel = getThreatLevel();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-luxury-navy">Security Dashboard</h2>
        <div className="flex items-center gap-2">
          <Badge variant={threatLevel.variant}>
            Threat Level: {threatLevel.level}
          </Badge>
          <Button onClick={loadSecurityData} size="sm" variant="outline">
            <Activity className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Auth Failures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{metrics.authFailures}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rate Limits Hit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{metrics.rateLimitExceeded}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Suspicious Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{metrics.suspiciousActivity}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Critical Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-800">{metrics.criticalEvents}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rate-limits">
        <TabsList>
          <TabsTrigger value="rate-limits">Rate Limits</TabsTrigger>
          <TabsTrigger value="security-config">Security Config</TabsTrigger>
        </TabsList>

        <TabsContent value="rate-limits">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Rate Limits</CardTitle>
                  <CardDescription>Current rate limiting status</CardDescription>
                </div>
                <Button onClick={clearOldRateLimits} size="sm" variant="outline">
                  Clear Old Entries
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div>Loading...</div>
              ) : rateLimits.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No active rate limits
                </div>
              ) : (
                <div className="space-y-4">
                  {rateLimits.map((limit) => (
                    <div key={limit.id} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">{limit.rate_limit_type}</div>
                        <div className="text-sm text-muted-foreground">
                          Identifier: {limit.identifier.substring(0, 20)}...
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{limit.request_count} requests</div>
                        <div className="text-sm text-muted-foreground">
                          Since: {new Date(limit.window_start).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security-config">
          <Card>
            <CardHeader>
              <CardTitle>Security Configuration Status</CardTitle>
              <CardDescription>Current security measures in place</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    <strong>CSP:</strong> Configured in index.html
                  </AlertDescription>
                </Alert>
                
                <Alert>
                  <Database className="h-4 w-4" />
                  <AlertDescription>
                    <strong>RLS:</strong> Enabled on all tables
                  </AlertDescription>
                </Alert>
                
                <Alert>
                  <Activity className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Rate Limiting:</strong> Server & client-side active
                  </AlertDescription>
                </Alert>
                
                <Alert>
                  <Users className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Auth:</strong> Supabase with enhanced validation
                  </AlertDescription>
                </Alert>
              </div>
              
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Security monitoring is active. All events are logged and analyzed for threats.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityDashboard;