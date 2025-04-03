
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Issuer } from '@/types/issuer';

interface IssuerListProps {
  issuers: Issuer[];
  onEdit: (issuer: Issuer) => void;
  onDelete: (id: string) => void;
}

const IssuerList = ({ issuers, onEdit, onDelete }: IssuerListProps) => {
  return (
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
                  onClick={() => onEdit(issuer)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  onClick={() => onDelete(issuer.id)}
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
  );
};

export default IssuerList;
