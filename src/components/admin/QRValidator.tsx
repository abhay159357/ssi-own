
import React, { useState } from 'react';
import { Shield, QrCode, CheckCircle, XCircle, FileText, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const QRValidator: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCredential, setScannedCredential] = useState<any>(null);
  const [verificationResult, setVerificationResult] = useState<'valid' | 'invalid' | null>(null);
  
  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate scanning a QR code
    setTimeout(() => {
      setIsScanning(false);
      
      // Mock credential data
      const mockCredential = {
        id: "vc-123456",
        type: "Passport",
        issuer: "Ministry of Foreign Affairs",
        subject: {
          name: "Jane Smith",
          nationality: "United States",
          dob: "1985-04-12"
        },
        issuanceDate: "2025-01-15T10:30:00Z",
        expirationDate: "2035-01-15T10:30:00Z",
        blockchainHash: "0x7f5e3b4c2d1a8f9e0b6c7d8e9f0a1b2c3d4e5f6a",
      };
      
      setScannedCredential(mockCredential);
      // Random verification result for demo purposes
      setVerificationResult(Math.random() > 0.3 ? 'valid' : 'invalid');
    }, 2000);
  };
  
  const resetScan = () => {
    setScannedCredential(null);
    setVerificationResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">QR Code Scanner</h3>
            
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 bg-secondary/30 h-64">
              {isScanning ? (
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse mb-4">
                    <QrCode className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-center text-muted-foreground mb-2">Scanning QR code...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <QrCode className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-center text-muted-foreground mb-4">
                    Scan a traveler's QR code to verify their credentials
                  </p>
                  {!scannedCredential && (
                    <Button onClick={handleStartScan}>
                      Start Scanning
                    </Button>
                  )}
                  {scannedCredential && (
                    <Button variant="outline" onClick={resetScan}>
                      Scan Another
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Verification Result</h3>
            
            {!scannedCredential ? (
              <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                <Shield className="h-12 w-12 mb-4" />
                <p>Scan a QR code to see verification results</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-center">
                  {verificationResult === 'valid' ? (
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-2">
                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <Badge className="bg-green-500">Valid Credential</Badge>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-2">
                        <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                      </div>
                      <Badge variant="destructive">Invalid Credential</Badge>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Credential Type</p>
                      <p className="font-medium flex items-center">
                        <FileText className="h-3 w-3 mr-1" />
                        {scannedCredential.type}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Issuer</p>
                      <p className="font-medium">{scannedCredential.issuer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Issued Date</p>
                      <p className="font-medium">
                        {new Date(scannedCredential.issuanceDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expiry Date</p>
                      <p className="font-medium">
                        {new Date(scannedCredential.expirationDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <User className="h-4 w-4 mr-1" />
                      <p className="font-medium">Subject Information</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 pl-5">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">{scannedCredential.subject.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Nationality</p>
                        <p className="font-medium">{scannedCredential.subject.nationality}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date of Birth</p>
                        <p className="font-medium">{scannedCredential.subject.dob}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground overflow-hidden text-ellipsis">
                    <p>Blockchain Hash</p>
                    <code className="block bg-muted p-1 rounded text-[10px] overflow-x-auto">
                      {scannedCredential.blockchainHash}
                    </code>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Recent Verifications</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3 pb-3 border-b border-border/50">
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                <Shield className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">Japanese Tourist Visa</p>
                  <Badge className="bg-green-500 text-xs">Valid</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Akira Tanaka • Apr 3, 2025, 10:30 AM</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 pb-3 border-b border-border/50">
              <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                <Shield className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">Work Permit</p>
                  <Badge variant="destructive" className="text-xs">Invalid</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Carlos Mendez • Apr 3, 2025, 9:15 AM</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                <Shield className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">Student Visa</p>
                  <Badge className="bg-green-500 text-xs">Valid</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Priya Sharma • Apr 2, 2025, 2:45 PM</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRValidator;
