
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield } from 'lucide-react';
import { getCredentialById } from '@/data/mockCredentials';
import CredentialDetail from '@/components/credential/CredentialDetail';
import { toast } from 'sonner';

const VerificationResult = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  const credential = id ? getCredentialById(id) : undefined;
  
  useEffect(() => {
    if (!credential) {
      navigate('/verification', { replace: true });
      toast.error('Invalid credential ID');
      return;
    }

    // Simulate verification process
    const timer = setTimeout(() => {
      setIsVerifying(false);
      setVerificationResult({
        success: true,
        message: `Credential verified successfully. Issued by ${credential.issuer}.`
      });
      toast.success('Credential verified successfully!');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [credential, navigate]);
  
  if (!credential) {
    return null;
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="pl-1" 
          onClick={() => navigate('/verification')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Verification
        </Button>
      </div>
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Verification Result</h1>
        <p className="text-muted-foreground">Viewing verification details for the scanned credential</p>
      </div>
      
      {isVerifying ? (
        <Card className="glass-card animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle>Verifying Credential</CardTitle>
            <CardDescription>
              Please wait while we verify the authenticity of this credential...
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <p className="text-center text-muted-foreground">Checking digital signatures and validity...</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          {verificationResult && (
            <div className={`p-6 rounded-lg mb-6 ${verificationResult.success ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
              <div className="flex items-center space-x-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${verificationResult.success ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Verification Result</p>
                  <p className={`text-sm ${verificationResult.success ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>{verificationResult.message}</p>
                </div>
              </div>
            </div>
          )}
          
          <CredentialDetail credential={credential} />
        </div>
      )}
    </div>
  );
};

export default VerificationResult;
