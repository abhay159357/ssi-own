
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, FileCheck, UserCheck, BarChart3, Settings, Scan, FileSearch } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import IssueCredentialForm from '@/components/admin/IssueCredentialForm';
import ManageIssuersForm from '@/components/admin/ManageIssuersForm';
import CredentialTypesForm from '@/components/admin/CredentialTypesForm';
import DocumentReview from '@/components/admin/DocumentReview';
import QRValidator from '@/components/admin/QRValidator';
import AdminAnalytics from '@/components/admin/AdminAnalytics';
import SystemSettings from '@/components/admin/SystemSettings';

const Admin = () => {
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
          <h1 className="text-3xl font-bold tracking-tight">Authority Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Verify documents and issue credentials for travelers
          </p>
        </div>
        <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full">
          <Shield className="h-8 w-8 text-primary" />
        </div>
      </div>

      <Tabs defaultValue="review" className="w-full">
        <TabsList className="grid w-full grid-cols-7 mb-8">
          <TabsTrigger value="review" className="flex items-center gap-2">
            <FileSearch className="h-4 w-4" />
            <span>Document Review</span>
          </TabsTrigger>
          <TabsTrigger value="issue" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span>Issue Credentials</span>
          </TabsTrigger>
          <TabsTrigger value="validate" className="flex items-center gap-2">
            <Scan className="h-4 w-4" />
            <span>QR Validation</span>
          </TabsTrigger>
          <TabsTrigger value="issuers" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            <span>Manage Issuers</span>
          </TabsTrigger>
          <TabsTrigger value="types" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Credential Types</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="review" className="space-y-4">
          <Card className="backdrop-blur-sm bg-card/50 border-primary/10">
            <CardHeader>
              <CardTitle>Document Review</CardTitle>
              <CardDescription>
                Review submitted documents and verify their authenticity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentReview />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="issue" className="space-y-4">
          <Card className="backdrop-blur-sm bg-card/50 border-primary/10">
            <CardHeader>
              <CardTitle>Issue New Credential</CardTitle>
              <CardDescription>
                Create and issue a new verifiable credential to a traveler
              </CardDescription>
            </CardHeader>
            <CardContent>
              <IssueCredentialForm />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="validate" className="space-y-4">
          <Card className="backdrop-blur-sm bg-card/50 border-primary/10">
            <CardHeader>
              <CardTitle>QR Code Validation</CardTitle>
              <CardDescription>
                Scan and validate QR codes presented by travelers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QRValidator />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="issuers" className="space-y-4">
          <Card className="backdrop-blur-sm bg-card/50 border-primary/10">
            <CardHeader>
              <CardTitle>Manage Trusted Issuers</CardTitle>
              <CardDescription>
                Add or remove organizations that can issue credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ManageIssuersForm />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="types" className="space-y-4">
          <Card className="backdrop-blur-sm bg-card/50 border-primary/10">
            <CardHeader>
              <CardTitle>Credential Types</CardTitle>
              <CardDescription>
                Define the types of credentials that can be issued
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CredentialTypesForm />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card className="backdrop-blur-sm bg-card/50 border-primary/10">
            <CardHeader>
              <CardTitle>Admin Analytics</CardTitle>
              <CardDescription>
                View statistics and reports on verification activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminAnalytics />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card className="backdrop-blur-sm bg-card/50 border-primary/10">
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure blockchain settings and verification policies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SystemSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Admin;
