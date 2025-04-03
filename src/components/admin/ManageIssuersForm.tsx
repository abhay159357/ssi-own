
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, Edit, Check, X } from 'lucide-react';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Issuer name must be at least 2 characters' }),
  id: z.string().min(3, { message: 'ID must be at least 3 characters' }),
  description: z.string().optional(),
  website: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

// Mock initial data
const initialIssuers = [
  { id: 'gov-immigration', name: 'Government Immigration', description: 'National immigration authority', website: 'https://immigration.gov' },
  { id: 'gov-transport', name: 'Transportation Authority', description: 'National driving license issuer', website: 'https://transport.gov' },
  { id: 'gov-education', name: 'Ministry of Education', description: 'Education certificate verification', website: 'https://education.gov' },
];

const ManageIssuersForm = () => {
  const [issuers, setIssuers] = useState(initialIssuers);
  const [editingIssuerId, setEditingIssuerId] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      id: '',
      description: '',
      website: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('New issuer data:', data);
    
    if (issuers.some(issuer => issuer.id === data.id)) {
      toast.error('An issuer with this ID already exists');
      return;
    }
    
    setIssuers([...issuers, data]);
    toast.success('Issuer added successfully');
    form.reset();
  };

  const startEditing = (issuer: typeof issuers[0]) => {
    setEditingIssuerId(issuer.id);
    form.reset({
      name: issuer.name,
      id: issuer.id,
      description: issuer.description,
      website: issuer.website,
    });
  };

  const cancelEditing = () => {
    setEditingIssuerId(null);
    form.reset({
      name: '',
      id: '',
      description: '',
      website: '',
    });
  };

  const saveEdit = () => {
    if (editingIssuerId && form.formState.isValid) {
      const updatedData = form.getValues();
      
      setIssuers(issuers.map(issuer => 
        issuer.id === editingIssuerId ? { ...updatedData } : issuer
      ));
      
      toast.success('Issuer updated successfully');
      setEditingIssuerId(null);
      form.reset({
        name: '',
        id: '',
        description: '',
        website: '',
      });
    }
  };

  const deleteIssuer = (id: string) => {
    setIssuers(issuers.filter(issuer => issuer.id !== id));
    toast.success('Issuer removed successfully');
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issuer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Government Agency" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issuer ID</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="gov-agency" 
                      {...field} 
                      disabled={editingIssuerId !== null}
                    />
                  </FormControl>
                  <FormDescription>
                    Unique identifier for this issuer
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief description of the issuer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.gov" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end space-x-2">
            {editingIssuerId ? (
              <>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={cancelEditing}
                  className="flex items-center gap-1"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  onClick={saveEdit}
                  className="flex items-center gap-1"
                >
                  <Check className="h-4 w-4" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button type="submit" className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                Add Issuer
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="space-y-4 mt-8">
        <h3 className="text-lg font-medium">Current Issuers</h3>
        <div className="grid grid-cols-1 gap-4">
          {issuers.map((issuer) => (
            <Card key={issuer.id} className="overflow-hidden">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{issuer.name}</h4>
                  <p className="text-sm text-muted-foreground">{issuer.id}</p>
                  {issuer.description && (
                    <p className="text-sm mt-1">{issuer.description}</p>
                  )}
                  {issuer.website && (
                    <a 
                      href={issuer.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline mt-1 block"
                    >
                      {issuer.website}
                    </a>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => startEditing(issuer)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    onClick={() => deleteIssuer(issuer.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageIssuersForm;
