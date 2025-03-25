
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatsCard from '@/components/dashboard/StatsCard';
import ActionButtons from '@/components/dashboard/ActionButtons';
import CredentialSummary from '@/components/dashboard/CredentialSummary';
import { mockCredentials, getCredentialsCountByStatus } from '@/data/mockCredentials';
import { Shield } from 'lucide-react';

const Index = () => {
  const stats = getCredentialsCountByStatus();
  const totalCredentials = mockCredentials.length;
  const recentUsage = 5; // Mock value for recent credential uses

  return (
    <div className="page-container animate-fade-in">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <Shield className="h-12 w-12 text-primary animate-pulse-subtle" />
        </div>
        <h1 className="text-4xl font-bold gradient-text mb-2">
          Identity Hub
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your secure digital wallet for managing all your verifiable credentials in one place
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <StatsCard title="Total Credentials" value={totalCredentials} type="total" />
        <StatsCard title="Verified" value={stats.verified} type="verified" />
        <StatsCard title="Pending" value={stats.pending} type="pending" />
        <StatsCard title="Recent Uses" value={recentUsage} type="uses" />
      </div>

      <div className="mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
        <ActionButtons />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
        <div className="lg:col-span-2">
          <CredentialSummary credentials={mockCredentials} />
        </div>
        <div>
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Recent verifications and credential uses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mock activity items */}
                <div className="flex items-start space-x-3 pb-3 border-b border-border/50">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Passport verified at Security Checkpoint</p>
                    <p className="text-xs text-muted-foreground">Today, 10:30 AM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 pb-3 border-b border-border/50">
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Driver's License shared with Rental Service</p>
                    <p className="text-xs text-muted-foreground">Yesterday, 2:15 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Health Card verified at Medical Center</p>
                    <p className="text-xs text-muted-foreground">Sep 21, 9:45 AM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
