
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileCheck, UserCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import IssueCredentialForm from '@/components/admin/IssueCredentialForm';
import ManageIssuersForm from '@/components/admin/ManageIssuersForm';
import CredentialTypesForm from '@/components/admin/CredentialTypesForm';

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
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Issue and manage verifiable credentials for your users
          </p>
        </div>
        <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full">
          <Shield className="h-8 w-8 text-primary" />
        </div>
      </div>

      <Tabs defaultValue="issue" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="issue" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span>Issue Credentials</span>
          </TabsTrigger>
          <TabsTrigger value="issuers" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            <span>Manage Issuers</span>
          </TabsTrigger>
          <TabsTrigger value="types" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Credential Types</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="issue" className="space-y-4">
          <Card className="backdrop-blur-sm bg-card/50 border-primary/10">
            <CardHeader>
              <CardTitle>Issue New Credential</CardTitle>
              <CardDescription>
                Create and issue a new verifiable credential to a user
              </CardDescription>
            </CardHeader>
            <CardContent>
              <IssueCredentialForm />
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
      </Tabs>
    </motion.div>
  );
};

export default Admin;
