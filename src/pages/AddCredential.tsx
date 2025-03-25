
import React from 'react';
import CredentialForm from '@/components/credential/CredentialForm';

const AddCredential = () => {
  return (
    <div className="page-container animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Add New Credential</h1>
        <p className="text-muted-foreground">Add a new credential to your digital identity wallet</p>
      </div>
      
      <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <CredentialForm />
      </div>
    </div>
  );
};

export default AddCredential;
