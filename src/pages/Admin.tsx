
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import LeadsDashboard from "@/components/LeadsDashboard";
import { BarChart3, Users, Building, MessageSquare, Shield, AlertTriangle } from 'lucide-react';
import { securityMonitor } from '@/lib/security-monitor';
import { dataRetentionManager } from '@/lib/data-retention';

const Admin = () => {
  const [securityMetrics, setSecurityMetrics] = useState<any>(null);
  const [retentionStats, setRetentionStats] = useState<any[]>([]);

  useEffect(() => {
    // Log admin access
    securityMonitor.logEvent({
      type: 'admin_action',
      severity: 'medium',
      details: { action: 'admin_dashboard_access' }
    });

    // Load security metrics
    const metrics = securityMonitor.getSecurityMetrics();
    setSecurityMetrics(metrics);

    // Load data retention stats
    dataRetentionManager.getRetentionStats().then(setRetentionStats);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta 
        title="Admin Dashboard | Eden Ridge Realty"
        description="Admin dashboard for managing Eden Ridge Realty operations"
      />
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your real estate business operations</p>
        </div>

        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="leads" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Leads</span>
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <span>Properties</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="ai-assistant" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>AI Assistant</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            <LeadsDashboard />
          </TabsContent>

          <TabsContent value="properties">
            <Card>
              <CardHeader>
                <CardTitle>Properties Management</CardTitle>
                <CardDescription>Manage your property listings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Properties management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>View business performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Security Dashboard</span>
                  </CardTitle>
                  <CardDescription>Monitor security events and system health</CardDescription>
                </CardHeader>
                <CardContent>
                  {securityMetrics && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-red-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-red-600">Auth Failures</p>
                            <p className="text-2xl font-bold text-red-700">{securityMetrics.authFailures}</p>
                          </div>
                          <AlertTriangle className="h-8 w-8 text-red-500" />
                        </div>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-yellow-600">Rate Limits</p>
                            <p className="text-2xl font-bold text-yellow-700">{securityMetrics.rateLimitExceeded}</p>
                          </div>
                          <AlertTriangle className="h-8 w-8 text-yellow-500" />
                        </div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-orange-600">Suspicious Activity</p>
                            <p className="text-2xl font-bold text-orange-700">{securityMetrics.suspiciousActivity}</p>
                          </div>
                          <AlertTriangle className="h-8 w-8 text-orange-500" />
                        </div>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-red-600">Critical Events</p>
                            <p className="text-2xl font-bold text-red-700">{securityMetrics.criticalEvents}</p>
                          </div>
                          <AlertTriangle className="h-8 w-8 text-red-500" />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Retention Status</CardTitle>
                  <CardDescription>Monitor data retention and cleanup policies</CardDescription>
                </CardHeader>
                <CardContent>
                  {retentionStats.length > 0 ? (
                    <div className="space-y-4">
                      {retentionStats.map((stat, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <div>
                            <p className="font-medium">{stat.table}</p>
                            <p className="text-sm text-gray-600">
                              {stat.totalRecords} total records, {stat.eligibleForCleanup} eligible for cleanup
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">
                              Oldest: {stat.oldestRecord ? new Date(stat.oldestRecord).toLocaleDateString() : 'N/A'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No retention policies configured</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai-assistant">
            <Card>
              <CardHeader>
                <CardTitle>AI Assistant Configuration</CardTitle>
                <CardDescription>Configure Eden AI assistant settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">✅ AI Assistant Status: Active</h3>
                    <p className="text-sm text-green-700">
                      Eden AI assistant is currently active and collecting leads from website visitors.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Current Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 24/7 availability for customer inquiries</li>
                      <li>• Automated lead qualification and data collection</li>
                      <li>• Integration with leads database</li>
                      <li>• Mobile-responsive chat interface</li>
                      <li>• Conversation history tracking</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
