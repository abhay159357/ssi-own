
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { 
  Bell, 
  Fingerprint, 
  Key, 
  Lock, 
  Save, 
  Shield, 
  SmartphoneCharging, 
  User 
} from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileFormValues {
  name: string;
  email: string;
  phone: string;
}

interface SecurityFormValues {
  twoFactorAuth: boolean;
  biometricAuth: boolean;
  notificationsEnabled: boolean;
  autoBackup: boolean;
}

const Profile = () => {
  const profileForm = useForm<ProfileFormValues>({
    defaultValues: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
    },
  });

  const securityForm = useForm<SecurityFormValues>({
    defaultValues: {
      twoFactorAuth: true,
      biometricAuth: false,
      notificationsEnabled: true,
      autoBackup: true,
    },
  });

  const onProfileSubmit = (data: ProfileFormValues) => {
    console.log('Profile update:', data);
    toast.success('Profile updated successfully!');
  };

  const onSecuritySubmit = (data: SecurityFormValues) => {
    console.log('Security settings:', data);
    toast.success('Security settings updated!');
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Profile & Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and security preferences</p>
      </div>
      
      <div className="flex flex-col md:flex-row items-start gap-6 mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <Card className="w-full md:w-64 glass-card">
          <CardContent className="p-6 flex flex-col items-center">
            <Avatar className="h-20 w-20 mb-4">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h3 className="font-medium text-lg">John Doe</h3>
            <p className="text-sm text-muted-foreground mb-6">ID: user123456</p>
            <div className="flex items-center space-x-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs mb-6">
              <Shield className="h-3 w-3 mr-1" />
              <span>Verified Account</span>
            </div>
            <div className="w-full pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-1">Member Since</p>
              <p className="text-sm">January 15, 2023</p>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex-1">
          <Tabs defaultValue="profile">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-0">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                            <FormDescription>
                              This is used for account recovery and notifications
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              Used for two-factor authentication
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="pt-3">
                        <Button type="submit" className="space-x-1">
                          <Save className="h-4 w-4" />
                          <span>Save Changes</span>
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="mt-0">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your security preferences and authentication methods
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...securityForm}>
                    <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
                      <FormField
                        control={securityForm.control}
                        name="twoFactorAuth"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <div className="flex items-center">
                                <Key className="h-4 w-4 mr-2 text-muted-foreground" />
                                <FormLabel className="font-medium">Two-Factor Authentication</FormLabel>
                              </div>
                              <FormDescription>
                                Enhance your account security with 2FA
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={securityForm.control}
                        name="biometricAuth"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <div className="flex items-center">
                                <Fingerprint className="h-4 w-4 mr-2 text-muted-foreground" />
                                <FormLabel className="font-medium">Biometric Authentication</FormLabel>
                              </div>
                              <FormDescription>
                                Use fingerprint or face ID for quick access
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={securityForm.control}
                        name="notificationsEnabled"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <div className="flex items-center">
                                <Bell className="h-4 w-4 mr-2 text-muted-foreground" />
                                <FormLabel className="font-medium">Security Notifications</FormLabel>
                              </div>
                              <FormDescription>
                                Receive alerts about important security events
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={securityForm.control}
                        name="autoBackup"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <div className="flex items-center">
                                <SmartphoneCharging className="h-4 w-4 mr-2 text-muted-foreground" />
                                <FormLabel className="font-medium">Automatic Backup</FormLabel>
                              </div>
                              <FormDescription>
                                Regularly backup your credentials to secure storage
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <div className="pt-3">
                        <Button type="submit" className="space-x-1">
                          <Lock className="h-4 w-4" />
                          <span>Update Security Settings</span>
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
