
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Check, X } from 'lucide-react';
import { CredentialType } from '@/types/credentialType';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Type name must be at least 2 characters' }),
  id: z.string().min(3, { message: 'ID must be at least 3 characters' }),
  description: z.string().optional(),
  hasExpiryDate: z.boolean().default(false),
  isRevocable: z.boolean().default(true),
  schemaDefinition: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

interface CredentialTypeFormProps {
  onSubmit: (data: FormValues) => void;
  editingTypeId: string | null;
  onCancelEdit: () => void;
  onSaveEdit: () => void;
}

const CredentialTypeForm = ({ 
  onSubmit, 
  editingTypeId, 
  onCancelEdit, 
  onSaveEdit 
}: CredentialTypeFormProps) => {
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

  return (
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
                onClick={onCancelEdit}
                className="flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <Button 
                type="button" 
                onClick={onSaveEdit}
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
  );
};

export default CredentialTypeForm;
