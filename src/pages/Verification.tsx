
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ScanCredential from '@/components/verification/ScanCredential';
import ShareCredential from '@/components/verification/ShareCredential';

const Verification = () => {
  return (
    <div className="page-container animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Verification</h1>
        <p className="text-muted-foreground">Verify credentials or share yours for verification</p>
      </div>
      
      <Tabs defaultValue="scan" className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <TabsList className="mb-6">
          <TabsTrigger value="scan">Scan QR Code</TabsTrigger>
          <TabsTrigger value="share">Share Credential</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scan" className="mt-0">
          <ScanCredential />
        </TabsContent>
        
        <TabsContent value="share" className="mt-0">
          <ShareCredential />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Verification;
