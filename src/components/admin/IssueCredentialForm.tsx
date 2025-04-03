
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Upload } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const formSchema = z.object({
  userId: z.string().min(1, { message: 'User ID is required' }),
  credentialType: z.string().min(1, { message: 'Credential type is required' }),
  issuerId: z.string().min(1, { message: 'Issuer is required' }),
  issueDate: z.date(),
  expiryDate: z.date().optional(),
  additionalData: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const IssueCredentialForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: '',
      credentialType: '',
      issuerId: '',
      issueDate: new Date(),
      additionalData: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Credential issuance data:', data);
    
    // Simulate API call to issue credential
    setTimeout(() => {
      toast.success('Credential issued successfully');
      form.reset();
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter user identifier" {...field} />
                </FormControl>
                <FormDescription>
                  The ID of the user who will receive this credential
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="credentialType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Credential Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select credential type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="drivingLicense">Driving License</SelectItem>
                    <SelectItem value="nationalId">National ID</SelectItem>
                    <SelectItem value="visa">Visa</SelectItem>
                    <SelectItem value="workPermit">Work Permit</SelectItem>
                    <SelectItem value="educationCertificate">Education Certificate</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The type of credential to issue
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="issuerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issuing Authority</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issuing authority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="gov-immigration">Government Immigration</SelectItem>
                    <SelectItem value="gov-transport">Transportation Authority</SelectItem>
                    <SelectItem value="gov-education">Ministry of Education</SelectItem>
                    <SelectItem value="gov-labor">Department of Labor</SelectItem>
                    <SelectItem value="university">University Registrar</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Authority responsible for issuing this credential
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="issueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Issue Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  When this credential is issued
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Expiry Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => 
                        date < new Date()
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  When this credential will expire (optional)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="additionalData"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Data (JSON)</FormLabel>
              <FormControl>
                <Input placeholder='{"key": "value"}' {...field} />
              </FormControl>
              <FormDescription>
                Additional credential data in JSON format
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center space-x-4">
          <Button type="button" variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            <span>Upload Document</span>
          </Button>
          <Button type="submit" className="flex-1">Issue Credential</Button>
        </div>
      </form>
    </Form>
  );
};

export default IssueCredentialForm;
