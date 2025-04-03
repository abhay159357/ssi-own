
import React, { useState } from 'react';
import { Save, RefreshCw, Shield, Key, Lock, Database, FileJson } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SystemSettings: React.FC = () => {
  const [blockchainNetwork, setBlockchainNetwork] = useState('ethereum');
  const [nodeUrl, setNodeUrl] = useState('https://mainnet.infura.io/v3/your-api-key');
  const [contractAddress, setContractAddress] = useState('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
  const [autoRenew, setAutoRenew] = useState(true);
  const [expiryNotifications, setExpiryNotifications] = useState(true);
  const [defaultExpiry, setDefaultExpiry] = useState('365');
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSave = () => {
    setIsLoading(true);
    // Simulate saving settings
    setTimeout(() => {
      setIsLoading(false);
      // Show success notification
      console.log('Settings saved successfully');
    }, 1500);
  };

  return (
    <Tabs defaultValue="blockchain">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="blockchain">
          <Database className="h-4 w-4 mr-2" />
          Blockchain
        </TabsTrigger>
        <TabsTrigger value="verification">
          <Shield className="h-4 w-4 mr-2" />
          Verification
        </TabsTrigger>
        <TabsTrigger value="security">
          <Lock className="h-4 w-4 mr-2" />
          Security
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="blockchain" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Blockchain Configuration</CardTitle>
            <CardDescription>
              Configure the blockchain network and smart contract settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="network">Blockchain Network</Label>
              <select 
                id="network"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={blockchainNetwork}
                onChange={(e) => setBlockchainNetwork(e.target.value)}
              >
                <option value="ethereum">Ethereum</option>
                <option value="polygon">Polygon</option>
                <option value="solana">Solana</option>
                <option value="avalanche">Avalanche</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="node-url">Node URL</Label>
              <Input 
                id="node-url" 
                value={nodeUrl} 
                onChange={(e) => setNodeUrl(e.target.value)}
                placeholder="Enter blockchain node URL"
              />
              <p className="text-xs text-muted-foreground">
                The URL for your blockchain node provider (e.g., Infura, Alchemy)
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contract-address">Smart Contract Address</Label>
              <Input 
                id="contract-address" 
                value={contractAddress} 
                onChange={(e) => setContractAddress(e.target.value)}
                placeholder="Enter smart contract address"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="schema">Credential Schema</Label>
              <div className="relative">
                <textarea
                  id="schema"
                  className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono"
                  placeholder="Paste your credential schema JSON here"
                  defaultValue={`{
  "type": "VerifiableCredential",
  "properties": {
    "issuer": { "type": "string" },
    "issuanceDate": { "type": "string", "format": "date-time" },
    "credentialSubject": {
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "name": { "type": "string" },
        "documentType": { "type": "string" }
      }
    }
  }
}`}
                />
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="absolute top-2 right-2"
                >
                  <FileJson className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                JSON schema defining the structure of your verifiable credentials
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="verification" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Verification Policies</CardTitle>
            <CardDescription>
              Configure how credentials are verified and managed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-renew">Automatic Credential Renewal</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically notify users when their credentials are about to expire
                </p>
              </div>
              <Switch 
                id="auto-renew" 
                checked={autoRenew} 
                onCheckedChange={setAutoRenew} 
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="expiry-notifications">Expiry Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send notifications when credentials are close to expiration
                </p>
              </div>
              <Switch 
                id="expiry-notifications" 
                checked={expiryNotifications} 
                onCheckedChange={setExpiryNotifications} 
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label htmlFor="default-expiry">Default Expiry Period (days)</Label>
              <Input 
                id="default-expiry" 
                type="number" 
                value={defaultExpiry} 
                onChange={(e) => setDefaultExpiry(e.target.value)}
                min="1"
              />
              <p className="text-xs text-muted-foreground">
                Default validity period for newly issued credentials in days
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label>Trusted Issuers</Label>
              <div className="bg-muted p-3 rounded-md max-h-40 overflow-y-auto space-y-2">
                <div className="flex items-center justify-between bg-background p-2 rounded-md">
                  <div className="text-sm">Ministry of Foreign Affairs</div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
                <div className="flex items-center justify-between bg-background p-2 rounded-md">
                  <div className="text-sm">Department of Immigration</div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
                <div className="flex items-center justify-between bg-background p-2 rounded-md">
                  <div className="text-sm">National Identity Authority</div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-2">
                Add Trusted Issuer
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="security" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Configure security settings for your authority
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="authority-key">Authority Public Key</Label>
              <div className="relative">
                <Input 
                  id="authority-key" 
                  type="text" 
                  value="04a5c13b82f39a84b57c55c6f38527ae25e6fc46f5a3224dfc1ff9db46230255..." 
                  readOnly
                />
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="absolute top-0 right-0 h-full px-3"
                >
                  <Key className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Your authority's public key used to sign issued credentials
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label>Key Rotation</Label>
              <div className="flex items-center space-x-2">
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Rotate Keys
                </Button>
                <p className="text-sm text-muted-foreground">
                  Last rotated: 45 days ago
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Regularly rotating keys improves security. We recommend rotation every 90 days.
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label>Admin Access Control</Label>
              <div className="bg-muted p-3 rounded-md max-h-40 overflow-y-auto space-y-2">
                <div className="flex items-center justify-between bg-background p-2 rounded-md">
                  <div className="text-sm">Sarah Johnson (Admin)</div>
                  <Button variant="ghost" size="sm">Manage</Button>
                </div>
                <div className="flex items-center justify-between bg-background p-2 rounded-md">
                  <div className="text-sm">Michael Chen (Verifier)</div>
                  <Button variant="ghost" size="sm">Manage</Button>
                </div>
                <div className="flex items-center justify-between bg-background p-2 rounded-md">
                  <div className="text-sm">Elena Rodriguez (Issuer)</div>
                  <Button variant="ghost" size="sm">Manage</Button>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-2">
                Add Admin User
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <div className="flex justify-end mt-6">
        <Button 
          variant="default" 
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </Tabs>
  );
};

export default SystemSettings;
