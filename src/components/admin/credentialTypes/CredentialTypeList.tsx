
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Award, Calendar, Eye } from 'lucide-react';
import { CredentialType } from '@/types/credentialType';

interface CredentialTypeListProps {
  types: CredentialType[];
  onEdit: (type: CredentialType) => void;
  onDelete: (id: string) => void;
}

const CredentialTypeList = ({ types, onEdit, onDelete }: CredentialTypeListProps) => {
  return (
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
                    onClick={() => onEdit(type)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    onClick={() => onDelete(type.id)}
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
  );
};

export default CredentialTypeList;
