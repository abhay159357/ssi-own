
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { getCredentialById } from '@/data/mockCredentials';
import CredentialDetail from '@/components/credential/CredentialDetail';

const CredentialDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const credential = id ? getCredentialById(id) : undefined;
  
  useEffect(() => {
    if (!credential) {
      navigate('/wallet', { replace: true });
    }
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
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{credential.title}</h1>
        <p className="text-muted-foreground">View and manage your credential details</p>
      </div>
      
      <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <CredentialDetail credential={credential} />
      </div>
    </div>
  );
};

export default CredentialDetailPage;
