
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, FileText, AlertCircle, Shield, ExternalLink } from 'lucide-react';
import { VerificationRequest } from '@/types/verification';
import CredentialDetailModal from '@/components/verification/CredentialDetailModal';

// Mock data for verification requests
const mockVerificationRequests: VerificationRequest[] = [
  {
    id: "ver-001",
    documentType: "Passport",
    submittedDate: "2025-03-15T10:30:00Z",
    status: "pending",
  },
  {
    id: "ver-002",
    documentType: "Driver's License",
    submittedDate: "2025-03-10T14:45:00Z",
    status: "approved",
    issuer: "Department of Transportation",
    issuerSignature: "0xd4c89e4f8b0c6a7b9d2e5f6a8c7b9d2e5f6a8c7b",
    blockchainHash: "0x7f5e3b4c2d1a8f9e0b6c7d8e9f0a1b2c3d4e5f6a",
    expiryDate: "2030-03-10T14:45:00Z",
    credentialData: {
      name: "John Doe",
      licenseNumber: "DL-123456789",
      issueDate: "2025-03-10",
      category: "B",
      restrictions: "None"
    }
  },
  {
    id: "ver-003",
    documentType: "National ID",
    submittedDate: "2025-03-05T09:15:00Z",
    status: "rejected",
    rejectionReason: "The document appears to be expired. Please submit a current ID."
  },
  {
    id: "ver-004",
    documentType: "Student Visa",
    submittedDate: "2025-03-01T11:20:00Z",
    status: "approved",
    issuer: "Immigration Department",
    issuerSignature: "0xe5f6a8c7b9d2e5f6a8c7b9d2e5f6a8c7b9d2e5f6",
    blockchainHash: "0x8c7b9d2e5f6a8c7b9d2e5f6a8c7b9d2e5f6a8c7b",
    expiryDate: "2026-03-01T11:20:00Z",
    credentialData: {
      name: "Jane Smith",
      visaNumber: "SV-987654321",
      issueDate: "2025-03-01",
      institution: "University of Technology",
      program: "Computer Science"
    }
  },
  {
    id: "ver-005",
    documentType: "Work Permit",
    submittedDate: "2025-02-25T13:40:00Z",
    status: "pending",
  }
];

const VerifyIdentity: React.FC = () => {
  const [selectedCredential, setSelectedCredential] = useState<VerificationRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pendingRequests = mockVerificationRequests.filter(req => req.status === "pending");
  const approvedCredentials = mockVerificationRequests.filter(req => req.status === "approved");
  const rejectedCredentials = mockVerificationRequests.filter(req => req.status === "rejected");

  const handleCredentialClick = (credential: VerificationRequest) => {
    setSelectedCredential(credential);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status: "pending" | "approved" | "rejected") => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-amber-100 text-amber-800 border-amber-300">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-green-100 text-green-800 border-green-300">
            <CheckCircle className="h-3 w-3" />
            Verified
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-red-100 text-red-800 border-red-300">
            <AlertCircle className="h-3 w-3" />
            Rejected
          </Badge>
        );
    }
  };

  const renderCredentialCard = (credential: VerificationRequest) => (
    <Card 
      key={credential.id}
      className="overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
      onClick={() => handleCredentialClick(credential)}
    >
      <CardContent className="p-0">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="font-medium">{credential.documentType}</h3>
          </div>
          {getStatusBadge(credential.status)}
        </div>
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Submitted</span>
            <span className="text-sm">{new Date(credential.submittedDate).toLocaleDateString()}</span>
          </div>
          
          {credential.status === "approved" && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Issuer</span>
                <span className="text-sm font-medium">{credential.issuer}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Expires</span>
                <span className="text-sm">{credential.expiryDate ? new Date(credential.expiryDate).toLocaleDateString() : "No expiration"}</span>
              </div>
            </>
          )}
          
          {credential.status === "rejected" && (
            <div className="flex justify-between items-start">
              <span className="text-sm text-muted-foreground">Reason</span>
              <span className="text-sm text-right max-w-[200px]">{credential.rejectionReason}</span>
            </div>
          )}
          
          <div className="flex justify-end pt-1">
            <Button variant="ghost" size="sm" className="text-xs">
              View Details <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <motion.div 
      className="container max-w-6xl py-8 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Verify Identity</h1>
        <p className="text-muted-foreground">
          Track verification status and manage your credentials
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="all">All Credentials</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingRequests.length})</TabsTrigger>
          <TabsTrigger value="verified">Verified ({approvedCredentials.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedCredentials.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockVerificationRequests.map(renderCredentialCard)}
          </div>
        </TabsContent>
        
        <TabsContent value="pending" className="mt-6">
          {pendingRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingRequests.map(renderCredentialCard)}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-1">No Pending Requests</h3>
              <p className="text-muted-foreground max-w-sm">
                You don't have any credentials pending verification at the moment.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="verified" className="mt-6">
          {approvedCredentials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {approvedCredentials.map(renderCredentialCard)}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-1">No Verified Credentials</h3>
              <p className="text-muted-foreground max-w-sm">
                You don't have any verified credentials yet. Submit your documents for verification.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="rejected" className="mt-6">
          {rejectedCredentials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rejectedCredentials.map(renderCredentialCard)}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-1">No Rejected Credentials</h3>
              <p className="text-muted-foreground max-w-sm">
                None of your verification requests have been rejected.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="mt-8 p-6 bg-secondary/30 rounded-lg">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-1">Secure Verification Process</h3>
            <p className="text-muted-foreground">
              All submitted documents are cryptographically secured and verified through our blockchain network. 
              Your personal information is encrypted and only accessible to authorized verifiers.
            </p>
          </div>
        </div>
      </div>
      
      {isModalOpen && selectedCredential && (
        <CredentialDetailModal 
          credential={selectedCredential} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </motion.div>
  );
};

export default VerifyIdentity;
