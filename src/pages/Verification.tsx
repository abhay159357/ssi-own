
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCode, Shield, Upload } from 'lucide-react';
import QRCode from '@/components/shared/QRCode';
import { mockCredentials } from '@/data/mockCredentials';
import { toast } from 'sonner';

const Verification = () => {
  const [selectedCredential, setSelectedCredential] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<null | { success: boolean; message: string }>(null);

  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate QR code scanning process
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        success: true,
        message: 'Credential verified successfully. Issued by Department of State.'
      });
      toast.success('Credential verified successfully!');
    }, 2000);
  };

  const handleReset = () => {
    setScanResult(null);
  };

  const verifiableCredentials = mockCredentials.filter(c => c.status === 'verified');

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
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Scan a Credential</CardTitle>
              <CardDescription>
                Scan a QR code to verify someone else's credential
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!scanResult ? (
                <div className="space-y-6">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 bg-secondary/50 h-64">
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
                          Position the QR code within the scanner area to verify a credential
                        </p>
                        <Button onClick={handleScan}>
                          Start Scanning
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Recent Verifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 pb-3 border-b border-border/50">
                        <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                          <Shield className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Japanese Tourist Visa</p>
                          <p className="text-xs text-muted-foreground">Today, 10:30 AM</p>
                        </div>
                        <div className="badge badge-verified">
                          <Shield className="h-3 w-3 mr-1" />
                          <span>Valid</span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                          <Shield className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Professional License</p>
                          <p className="text-xs text-muted-foreground">Yesterday, 2:15 PM</p>
                        </div>
                        <div className="badge badge-expired">
                          <Shield className="h-3 w-3 mr-1" />
                          <span>Expired</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className={`p-6 rounded-lg ${scanResult.success ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${scanResult.success ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Verification Result</p>
                        <p className={`text-sm ${scanResult.success ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>{scanResult.message}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Credential Type</span>
                        <span className="text-sm font-medium">International Passport</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Document Number</span>
                        <span className="text-sm font-medium">P123456789</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Issuing Authority</span>
                        <span className="text-sm font-medium">Department of State</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Verification Time</span>
                        <span className="text-sm font-medium">{new Date().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button onClick={handleReset}>
                      Scan Another Credential
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="share" className="mt-0">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Share a Credential</CardTitle>
              <CardDescription>
                Generate a QR code to share one of your verified credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Select a Credential to Share</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {verifiableCredentials.map((credential) => (
                      <div
                        key={credential.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedCredential === credential.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedCredential(credential.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-md bg-secondary/70 flex items-center justify-center">
                            <img
                              src={credential.image || '/placeholder.svg'}
                              alt={credential.title}
                              className="h-6 w-6 object-contain"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{credential.title}</p>
                            <p className="text-xs text-muted-foreground">{credential.issuer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedCredential && (
                  <div className="flex flex-col items-center">
                    <QRCode 
                      data={JSON.stringify({
                        credentialId: selectedCredential,
                        timestamp: new Date().toISOString()
                      })}
                      title="Scan this code to verify the credential"
                      size={200}
                    />
                    <p className="text-sm mt-4 text-center text-muted-foreground">
                      This QR code expires in 5 minutes for security reasons
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Verification;
