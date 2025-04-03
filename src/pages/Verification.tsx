
import React from 'react';
import ShareCredential from '@/components/verification/ShareCredential';

const Verification = () => {
  return (
    <div className="page-container animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Share Credential</h1>
        <p className="text-muted-foreground">Share your credentials with others for verification</p>
      </div>
      
      <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <ShareCredential />
      </div>
    </div>
  );
};

export default Verification;
