
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Edit, Check, X, Eye, Award, Calendar } from 'lucide-react';
import { toast } from 'sonner';

// Define the type for a credential type
interface CredentialType {
  id: string;
  name: string;
  description: string;
  hasExpiryDate: boolean;
  isRevocable: boolean;
  schemaDefinition: string;
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'Type name must be at least 2 characters' }),
  id: z.string().min(3, { message: 'ID must be at least 3 characters' }),
  description: z.string().optional(),
  hasExpiryDate: z.boolean().default(false),
  isRevocable: z.boolean().default(true),
  schemaDefinition: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Mock initial data
const initialTypes: CredentialType[] = [
  { 
    id: 'passport', 
    name: 'Passport', 
    description: 'Government issued travel document', 
    hasExpiryDate: true, 
    isRevocable: true,
    schemaDefinition: '{"type":"object","properties":{"passportNumber":{"type":"string"},"country":{"type":"string"},"fullName":{"type":"string"},"dateOfBirth":{"type":"string","format":"date"},"issueDate":{"type":"string","format":"date"},"expiryDate":{"type":"string","format":"date"}}}',
  },
  { 
    id: 'drivingLicense', 
    name: 'Driving License', 
    description: 'Permission to drive motor vehicles', 
    hasExpiryDate: true, 
    isRevocable: true,
    schemaDefinition: '{"type":"object","properties":{"licenseNumber":{"type":"string"},"fullName":{"type":"string"},"categories":{"type":"array","items":{"type":"string"}},"issueDate":{"type":"string","format":"date"},"expiryDate":{"type":"string","format":"date"}}}',
  },
  { 
    id: 'educationCertificate', 
    name: 'Education Certificate', 
    description: 'Academic qualification proof', 
    hasExpiryDate: false, 
    isRevocable: true,
    schemaDefinition: '{"type":"object","properties":{"degree":{"type":"string"},"institution":{"type":"string"},"graduationDate":{"type":"string","format":"date"},"fieldOfStudy":{"type":"string"}}}',
  },
];

const CredentialTypesForm = () => {
  const [types, setTypes] = useState<CredentialType[]>(initialTypes);
  const [editingTypeId, setEditingTypeId] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      id: '',
      description: '',
      hasExpiryDate: false,
      isRevocable: true,
      schemaDefinition: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('New credential type data:', data);
    
    if (types.some(type => type.id === data.id)) {
      toast.error('A credential type with this ID already exists');
      return;
    }
    
    // Ensure all required fields have values
    const newType: CredentialType = {
      id: data.id,
      name: data.name,
      description: data.description || '',
      hasExpiryDate: data.hasExpiryDate || false,
      isRevocable: data.isRevocable || true,
      schemaDefinition: data.schemaDefinition || '',
    };
    
    setTypes([...types, newType]);
    toast.success('Credential type added successfully');
    form.reset();
  };

  const startEditing = (type: CredentialType) => {
    setEditingTypeId(type.id);
    form.reset({
      name: type.name,
      id: type.id,
      description: type.description,
      hasExpiryDate: type.hasExpiryDate,
      isRevocable: type.isRevocable,
      schemaDefinition: type.schemaDefinition,
    });
  };

  const cancelEditing = () => {
    setEditingTypeId(null);
    form.reset({
      name: '',
      id: '',
      description: '',
      hasExpiryDate: false,
      isRevocable: true,
      schemaDefinition: '',
    });
  };

  const saveEdit = () => {
    if (editingTypeId && form.formState.isValid) {
      const formData = form.getValues();
      
      // Ensure all required fields have values
      const updatedType: CredentialType = {
        id: formData.id,
        name: formData.name,
        description: formData.description || '',
        hasExpiryDate: formData.hasExpiryDate || false,
        isRevocable: formData.isRevocable || true,
        schemaDefinition: formData.schemaDefinition || '',
      };
      
      setTypes(types.map(type => 
        type.id === editingTypeId ? updatedType : type
      ));
      
      toast.success('Credential type updated successfully');
      setEditingTypeId(null);
      form.reset({
        name: '',
        id: '',
        description: '',
        hasExpiryDate: false,
        isRevocable: true,
        schemaDefinition: '',
      });
    }
  };

  const deleteType = (id: string) => {
    setTypes(types.filter(type => type.id !== id));
    toast.success('Credential type removed successfully');
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
                  <FormLabel>Type Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Passport" {...field} />
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
                  <FormLabel>Type ID</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="passport" 
                      {...field} 
                      disabled={editingTypeId !== null}
                    />
                  </FormControl>
                  <FormDescription>
                    Unique identifier for this credential type
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Brief description of the credential type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="hasExpiryDate"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Has Expiration Date</FormLabel>
                    <FormDescription>
                      Whether this credential type can expire
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
              control={form.control}
              name="isRevocable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Is Revocable</FormLabel>
                    <FormDescription>
                      Whether this credential can be revoked
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
          </div>

          <FormField
            control={form.control}
            name="schemaDefinition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Schema Definition (JSON)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder='{"type":"object","properties":{...}}' 
                    className="font-mono text-sm h-32"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  JSON Schema defining the structure of this credential type
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-2">
            {editingTypeId ? (
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
                Add Credential Type
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="space-y-4 mt-8">
        <h3 className="text-lg font-medium">Current Credential Types</h3>
        <div className="grid grid-cols-1 gap-4">
          {types.map((type) => (
            <Card key={type.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">{type.name}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{type.id}</p>
                    {type.description && (
                      <p className="text-sm mt-1">{type.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Expires: {type.hasExpiryDate ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Eye className="h-3 w-3 mr-1" />
                        <span>Revocable: {type.isRevocable ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => startEditing(type)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      onClick={() => deleteType(type.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
                {type.schemaDefinition && (
                  <div className="mt-3 pt-3 border-t">
                    <details className="text-xs">
                      <summary className="cursor-pointer text-primary hover:underline">View Schema</summary>
                      <pre className="mt-2 p-2 bg-muted rounded-md overflow-x-auto text-xs">
                        {JSON.stringify(JSON.parse(type.schemaDefinition), null, 2)}
                      </pre>
                    </details>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CredentialTypesForm;
