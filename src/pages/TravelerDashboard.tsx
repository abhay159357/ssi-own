
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, User, CheckCircle, Clock, FileCheck } from 'lucide-react';
import ActionButtons from '@/components/dashboard/ActionButtons';
import CredentialSummary from '@/components/dashboard/CredentialSummary';
import { mockCredentials } from '@/data/mockCredentials';

const TravelerDashboard: React.FC = () => {
  // Get the first 3 credentials for the summary
  const recentCredentials = mockCredentials.slice(0, 3);
  
  // Calculate credential stats
  const totalCredentials = mockCredentials.length;
  const verifiedCredentials = mockCredentials.filter(c => c.status === 'verified').length;
  const pendingCredentials = mockCredentials.filter(c => c.status === 'pending').length;
  const expiredCredentials = mockCredentials.filter(c => c.status === 'expired').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="container py-8 max-w-6xl mx-auto px-4 sm:px-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Traveler Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your identity credentials and verification
          </p>
        </div>
        <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full">
          <User className="h-8 w-8 text-primary" />
        </div>
      </div>

      {/* Quick action buttons */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-3">Quick Actions</h2>
        <ActionButtons />
      </div>

      {/* Stats overview */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-3">Credential Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="backdrop-blur-sm bg-card/50 border-primary/10">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{totalCredentials}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Shield className="h-5 w-5 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="backdrop-blur-sm bg-card/50 border-primary/10">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Verified</p>
                <p className="text-2xl font-bold">{verifiedCredentials}</p>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="backdrop-blur-sm bg-card/50 border-primary/10">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingCredentials}</p>
              </div>
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="backdrop-blur-sm bg-card/50 border-primary/10">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Expired</p>
                <p className="text-2xl font-bold">{expiredCredentials}</p>
              </div>
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                <FileCheck className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent credentials section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CredentialSummary credentials={recentCredentials} />
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Upcoming Verifications</CardTitle>
            <CardDescription>Scheduled identity verification requests</CardDescription>
          </CardHeader>
          <CardContent>
            {/* For now, just a placeholder */}
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
              <p className="text-muted-foreground mb-4">No upcoming verification requests</p>
              <Link to="/verification">
                <Button variant="outline">Start New Verification</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default TravelerDashboard;
