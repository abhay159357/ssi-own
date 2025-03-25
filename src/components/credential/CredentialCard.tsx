
import React from 'react';
import { CheckCircle, Clock, FileText, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Credential } from '@/data/mockCredentials';
import { useNavigate } from 'react-router-dom';

interface CredentialCardProps {
  credential: Credential;
}

const CredentialCard: React.FC<CredentialCardProps> = ({ credential }) => {
  const navigate = useNavigate();
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <div className="badge badge-verified">
            <CheckCircle className="h-3 w-3 mr-1" />
            <span>Verified</span>
          </div>
        );
      case 'pending':
        return (
          <div className="badge badge-pending">
            <Clock className="h-3 w-3 mr-1" />
            <span>Pending</span>
          </div>
        );
      case 'expired':
        return (
          <div className="badge badge-expired">
            <XCircle className="h-3 w-3 mr-1" />
            <span>Expired</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card 
      className="glass-card hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/credential/${credential.id}`)}
    >
      <CardContent className="p-0">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h3 className="font-medium">{credential.title}</h3>
          <div className="rounded-full p-2 bg-secondary/70">
            <FileText className="h-4 w-4" />
          </div>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Issuer</span>
            <span className="text-sm font-medium">{credential.issuer}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Issued Date</span>
            <span className="text-sm">{new Date(credential.issuedDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Expiry Date</span>
            <span className="text-sm">{new Date(credential.expiryDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm text-muted-foreground">Status</span>
            {getStatusBadge(credential.status)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CredentialCard;
