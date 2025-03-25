
import React from 'react';
import { 
  Calendar, 
  Download, 
  Link, 
  Share2, 
  Shield, 
  Trash2, 
  User 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Credential } from '@/data/mockCredentials';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import QRCode from '@/components/shared/QRCode';

interface CredentialDetailProps {
  credential: Credential;
}

const CredentialDetail: React.FC<CredentialDetailProps> = ({ credential }) => {
  const handleShare = () => {
    // In a real app, this would generate a sharing link or open a sharing dialog
    toast.success('Credential sharing link created!');
  };

  const handleDownload = () => {
    // In a real app, this would generate a PDF or similar
    toast.success('Credential downloaded successfully!');
  };

  const handleRevoke = () => {
    // In a real app, this would initiate credential revocation
    toast.success('Credential revocation initiated. Awaiting confirmation.');
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle>{credential.title}</CardTitle>
          <CardDescription>
            Issued by <span className="font-medium">{credential.issuer}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Document Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Document Number</span>
                    <span className="text-sm font-medium">{credential.documentNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Country</span>
                    <span className="text-sm font-medium">{credential.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Issued Date</span>
                    <span className="text-sm font-medium">{new Date(credential.issuedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Expiry Date</span>
                    <span className="text-sm font-medium">{new Date(credential.expiryDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Credential Details</h3>
                <div className="space-y-2">
                  {Object.entries(credential.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</span>
                      <span className="text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center py-4">
              <QRCode 
                data={JSON.stringify({
                  type: credential.type,
                  id: credential.id,
                  documentNumber: credential.documentNumber,
                  issuer: credential.issuer
                })} 
                title="Scan to verify this credential" 
              />
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Verification Status</h3>
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">This credential has been cryptographically verified</p>
                  <p className="text-xs text-muted-foreground">Last verified: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-0">
          <Button 
            variant="destructive" 
            className="space-x-1"
            onClick={handleRevoke}
          >
            <Trash2 className="h-4 w-4" />
            <span>Revoke</span>
          </Button>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              className="space-x-1"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
            <Button
              variant="default"
              className="space-x-1"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CredentialDetail;
