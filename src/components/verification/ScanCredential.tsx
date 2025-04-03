
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Shield } from 'lucide-react';
import { mockCredentials } from '@/data/mockCredentials';

const ScanCredential = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate QR code scanning process
    setTimeout(() => {
      setIsScanning(false);
      
      // Randomly select a credential to simulate scanning
      const randomCredential = mockCredentials[Math.floor(Math.random() * mockCredentials.length)];
      
      // Redirect to the verification result page
      navigate(`/verification/result/${randomCredential.id}`);
    }, 2000);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Scan a Credential</CardTitle>
        <CardDescription>
          Scan a QR code to verify someone else's credential
        </CardDescription>
      </CardHeader>
      <CardContent>
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
          
          <RecentVerifications />
        </div>
      </CardContent>
    </Card>
  );
};

const RecentVerifications = () => {
  return (
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
  );
};

export default ScanCredential;
