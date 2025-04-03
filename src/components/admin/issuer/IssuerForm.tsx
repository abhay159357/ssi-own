
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Plus, X } from 'lucide-react';
import { Issuer } from '@/types/issuer';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Issuer name must be at least 2 characters' }),
  id: z.string().min(3, { message: 'ID must be at least 3 characters' }),
  description: z.string().optional(),
  website: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal('')),
});

export type IssuerFormValues = z.infer<typeof formSchema>;

interface IssuerFormProps {
  onSubmit: (data: IssuerFormValues) => void;
  onSaveEdit: () => void;
  onCancelEditing: () => void;
  editingIssuerId: string | null;
  existingIssuers: Issuer[];
}

const IssuerForm = ({ 
  onSubmit, 
  onSaveEdit, 
  onCancelEditing, 
  editingIssuerId,
  existingIssuers 
}: IssuerFormProps) => {
  const form = useForm<IssuerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      id: '',
      description: '',
      website: '',
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
                onClick={onCancelEditing}
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
              Add Issuer
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default IssuerForm;
