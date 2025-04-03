
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import QRCode from '@/components/shared/QRCode';
import { mockCredentials } from '@/data/mockCredentials';

const ShareCredential = () => {
  const [selectedCredential, setSelectedCredential] = useState<string | null>(null);
  const verifiableCredentials = mockCredentials.filter(c => c.status === 'verified');

  return (
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
  );
};

export default ShareCredential;
