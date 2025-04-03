
import React, { useState } from 'react';
import { toast } from 'sonner';
import CredentialTypeForm, { FormValues } from './credentialTypes/CredentialTypeForm';
import CredentialTypeList from './credentialTypes/CredentialTypeList';
import { CredentialType } from '@/types/credentialType';

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
  const [formRef, setFormRef] = useState<React.RefObject<HTMLFormElement>>(React.createRef());

  const handleSubmit = (data: FormValues) => {
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
  };

  const handleEdit = (type: CredentialType) => {
    setEditingTypeId(type.id);
  };

  const handleCancelEdit = () => {
    setEditingTypeId(null);
  };

  const handleSaveEdit = () => {
    if (editingTypeId && formRef.current) {
      // Trigger form validation and submission
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      );
    }
  };

  const handleDelete = (id: string) => {
    setTypes(types.filter(type => type.id !== id));
    toast.success('Credential type removed successfully');
  };

  return (
    <div className="space-y-6">
      <CredentialTypeForm
        onSubmit={handleSubmit}
        editingTypeId={editingTypeId}
        onCancelEdit={handleCancelEdit}
        onSaveEdit={handleSaveEdit}
      />
      <CredentialTypeList
        types={types}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CredentialTypesForm;
