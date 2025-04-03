
import React, { useState } from 'react';
import { toast } from 'sonner';
import IssuerForm, { IssuerFormValues } from './issuer/IssuerForm';
import IssuerList from './issuer/IssuerList';
import { Issuer } from '@/types/issuer';

// Mock initial data
const initialIssuers: Issuer[] = [
  { id: 'gov-immigration', name: 'Government Immigration', description: 'National immigration authority', website: 'https://immigration.gov' },
  { id: 'gov-transport', name: 'Transportation Authority', description: 'National driving license issuer', website: 'https://transport.gov' },
  { id: 'gov-education', name: 'Ministry of Education', description: 'Education certificate verification', website: 'https://education.gov' },
];

const ManageIssuersForm = () => {
  const [issuers, setIssuers] = useState<Issuer[]>(initialIssuers);
  const [editingIssuerId, setEditingIssuerId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<IssuerFormValues>({
    name: '',
    id: '',
    description: '',
    website: '',
  });

  const handleSubmit = (data: IssuerFormValues) => {
    console.log('New issuer data:', data);
    
    if (issuers.some(issuer => issuer.id === data.id)) {
      toast.error('An issuer with this ID already exists');
      return;
    }
    
    // Ensure all required fields have values
    const newIssuer: Issuer = {
      id: data.id,
      name: data.name,
      description: data.description || '',
      website: data.website || '',
    };
    
    setIssuers([...issuers, newIssuer]);
    toast.success('Issuer added successfully');
    resetForm();
  };

  const startEditing = (issuer: Issuer) => {
    setEditingIssuerId(issuer.id);
    setFormValues({
      name: issuer.name,
      id: issuer.id,
      description: issuer.description,
      website: issuer.website,
    });
  };

  const cancelEditing = () => {
    setEditingIssuerId(null);
    resetForm();
  };

  const saveEdit = () => {
    if (editingIssuerId && isValidFormData(formValues)) {
      // Ensure all required fields have values
      const updatedIssuer: Issuer = {
        id: formValues.id,
        name: formValues.name,
        description: formValues.description || '',
        website: formValues.website || '',
      };
      
      setIssuers(issuers.map(issuer => 
        issuer.id === editingIssuerId ? updatedIssuer : issuer
      ));
      
      toast.success('Issuer updated successfully');
      setEditingIssuerId(null);
      resetForm();
    }
  };

  const deleteIssuer = (id: string) => {
    setIssuers(issuers.filter(issuer => issuer.id !== id));
    toast.success('Issuer removed successfully');
  };

  const resetForm = () => {
    setFormValues({
      name: '',
      id: '',
      description: '',
      website: '',
    });
  };

  const isValidFormData = (data: IssuerFormValues): data is Issuer => {
    return !!data.id && !!data.name;
  };

  return (
    <div className="space-y-6">
      <IssuerForm
        onSubmit={handleSubmit}
        onSaveEdit={saveEdit}
        onCancelEditing={cancelEditing}
        editingIssuerId={editingIssuerId}
        existingIssuers={issuers}
      />
      
      <IssuerList
        issuers={issuers}
        onEdit={startEditing}
        onDelete={deleteIssuer}
      />
    </div>
  );
};

export default ManageIssuersForm;
