
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { mockCredentials } from '@/data/mockCredentials';
import CredentialCard from '@/components/credential/CredentialCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Wallet = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCredentials = mockCredentials.filter(credential => 
    credential.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    credential.issuer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const verifiedCredentials = filteredCredentials.filter(c => c.status === 'verified');
  const pendingCredentials = filteredCredentials.filter(c => c.status === 'pending');
  const expiredCredentials = filteredCredentials.filter(c => c.status === 'expired');

  return (
    <div className="page-container animate-fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Identity Wallet</h1>
          <p className="text-muted-foreground">Manage and organize all your digital credentials</p>
        </div>
        <div className="w-full md:w-64 mt-4 md:mt-0 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search credentials..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All ({filteredCredentials.length})</TabsTrigger>
          <TabsTrigger value="verified">Verified ({verifiedCredentials.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingCredentials.length})</TabsTrigger>
          <TabsTrigger value="expired">Expired ({expiredCredentials.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {filteredCredentials.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCredentials.map((credential) => (
                <CredentialCard key={credential.id} credential={credential} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-40">
                <p className="text-muted-foreground">No credentials found</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="verified" className="mt-0">
          {verifiedCredentials.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {verifiedCredentials.map((credential) => (
                <CredentialCard key={credential.id} credential={credential} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-40">
                <p className="text-muted-foreground">No verified credentials found</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="pending" className="mt-0">
          {pendingCredentials.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingCredentials.map((credential) => (
                <CredentialCard key={credential.id} credential={credential} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-40">
                <p className="text-muted-foreground">No pending credentials found</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="expired" className="mt-0">
          {expiredCredentials.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {expiredCredentials.map((credential) => (
                <CredentialCard key={credential.id} credential={credential} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-40">
                <p className="text-muted-foreground">No expired credentials found</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Wallet;
