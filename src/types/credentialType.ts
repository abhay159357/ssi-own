
export interface CredentialType {
  id: string;
  name: string;
  description: string;
  hasExpiryDate: boolean;
  isRevocable: boolean;
  schemaDefinition: string;
}

export interface CredentialTypeFormValues {
  id: string;
  name: string;
  description: string;
  hasExpiryDate: boolean;
  isRevocable: boolean;
  schemaDefinition: string;
}
