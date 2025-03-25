
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

type CredentialFormValues = {
  type: string;
  title: string;
  issuer: string;
  documentNumber: string;
  country: string;
  expiryDate: string;
};

const CredentialForm: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<CredentialFormValues>({
    defaultValues: {
      type: '',
      title: '',
      issuer: '',
      documentNumber: '',
      country: '',
      expiryDate: '',
    },
  });

  const onSubmit = (data: CredentialFormValues) => {
    // In a real app, this would send data to a server
    console.log('Form submitted:', data);
    
    toast.success('Credential submitted for verification!');
    // Simulate a delay before navigating
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate file upload process
      setTimeout(() => {
        setIsUploading(false);
        toast.success('Document uploaded successfully!');
      }, 1500);
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Add New Credential</CardTitle>
        <CardDescription>
          Fill in the credential details and upload any supporting documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Credential Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select credential type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="visa">Visa</SelectItem>
                        <SelectItem value="driverLicense">Driver's License</SelectItem>
                        <SelectItem value="nationalId">National ID</SelectItem>
                        <SelectItem value="healthCard">Health Card</SelectItem>
                        <SelectItem value="professionalLicense">Professional License</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The type of credential you are adding
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g. International Passport" {...field} />
                    </FormControl>
                    <FormDescription>
                      A descriptive name for this credential
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="issuer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issuer</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g. Department of State" {...field} />
                    </FormControl>
                    <FormDescription>
                      The organization that issued this credential
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="documentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Number</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g. P123456789" {...field} />
                    </FormControl>
                    <FormDescription>
                      The unique number of this document
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g. United States" {...field} />
                    </FormControl>
                    <FormDescription>
                      The country that issued this credential
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>
                      When this credential expires
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-3">
              <FormLabel>Upload Document</FormLabel>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary/80 border-border"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-muted-foreground"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, PNG, JPG or JPEG (MAX. 10MB)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".pdf,.png,.jpg,.jpeg"
                  />
                </label>
              </div>
              <FormDescription>
                Upload a scan or photo of your credential for verification
              </FormDescription>
            </div>
            
            <CardFooter className="px-0 pt-6">
              <Button variant="outline" type="button" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" className="ml-2" disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Submit for Verification'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CredentialForm;
