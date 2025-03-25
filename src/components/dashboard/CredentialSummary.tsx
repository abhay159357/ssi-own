
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Credential } from '@/data/mockCredentials';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface CredentialSummaryProps {
  credentials: Credential[];
}

const CredentialSummary: React.FC<CredentialSummaryProps> = ({ credentials }) => {
  const navigate = useNavigate();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'expired':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Recent Credentials</CardTitle>
        <CardDescription>Your most recently added or updated credentials</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {credentials.slice(0, 3).map((credential) => (
            <div 
              key={credential.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:border-border hover:bg-secondary/50 transition-all duration-200 cursor-pointer"
              onClick={() => navigate(`/credential/${credential.id}`)}
            >
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-md bg-secondary/70 flex items-center justify-center">
                  <img 
                    src={credential.image || '/placeholder.svg'} 
                    alt={credential.title}
                    className="h-8 w-8 object-contain" 
                  />
                </div>
                <div>
                  <p className="font-medium text-sm">{credential.title}</p>
                  <p className="text-xs text-muted-foreground">{credential.issuer}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  {getStatusIcon(credential.status)}
                  <span className="text-xs capitalize">{credential.status}</span>
                </div>
                <p className="text-xs text-muted-foreground">Exp: {new Date(credential.expiryDate).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
          {credentials.length > 3 && (
            <Button 
              variant="outline" 
              className="w-full mt-2" 
              onClick={() => navigate('/wallet')}
            >
              View All Credentials
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CredentialSummary;
