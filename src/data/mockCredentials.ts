
export interface Credential {
  id: string;
  type: 'passport' | 'visa' | 'driverLicense' | 'nationalId' | 'healthCard' | 'professionalLicense';
  title: string;
  issuer: string;
  issuedDate: string;
  expiryDate: string;
  status: 'verified' | 'pending' | 'expired';
  documentNumber: string;
  country: string;
  image?: string;
  details: Record<string, string>;
}

export const mockCredentials: Credential[] = [
  {
    id: '1',
    type: 'passport',
    title: 'International Passport',
    issuer: 'Department of State',
    issuedDate: '2020-05-15',
    expiryDate: '2030-05-14',
    status: 'verified',
    documentNumber: 'P123456789',
    country: 'United States',
    image: '/placeholder.svg',
    details: {
      fullName: 'John Doe',
      birthDate: '1985-08-12',
      gender: 'Male',
      nationality: 'United States',
      placeOfBirth: 'New York',
      dateOfIssue: '2020-05-15',
      dateOfExpiry: '2030-05-14',
      authorityOfIssue: 'Department of State'
    }
  },
  {
    id: '2',
    type: 'visa',
    title: 'Tourist Visa',
    issuer: 'Japanese Immigration',
    issuedDate: '2023-02-10',
    expiryDate: '2023-08-09',
    status: 'expired',
    documentNumber: 'V987654321',
    country: 'Japan',
    image: '/placeholder.svg',
    details: {
      fullName: 'John Doe',
      visaType: 'Tourist',
      entryType: 'Single',
      validFrom: '2023-02-10',
      validUntil: '2023-08-09',
      issuingAuthority: 'Embassy of Japan',
      remarks: 'Not valid for employment'
    }
  },
  {
    id: '3',
    type: 'driverLicense',
    title: 'Driver\'s License',
    issuer: 'Department of Motor Vehicles',
    issuedDate: '2022-11-25',
    expiryDate: '2027-11-24',
    status: 'verified',
    documentNumber: 'DL54321678',
    country: 'United States',
    image: '/placeholder.svg',
    details: {
      fullName: 'John Doe',
      address: '123 Main St, Anytown, USA',
      dateOfBirth: '1985-08-12',
      issueDate: '2022-11-25',
      expiryDate: '2027-11-24',
      class: 'C',
      restrictions: 'None',
      endorsements: 'None'
    }
  },
  {
    id: '4',
    type: 'nationalId',
    title: 'National ID Card',
    issuer: 'National Identity Authority',
    issuedDate: '2021-03-18',
    expiryDate: '2031-03-17',
    status: 'verified',
    documentNumber: 'NID1234567890',
    country: 'United States',
    image: '/placeholder.svg',
    details: {
      fullName: 'John Doe',
      dateOfBirth: '1985-08-12',
      placeOfBirth: 'New York',
      gender: 'Male',
      nationality: 'United States',
      issueDate: '2021-03-18',
      expiryDate: '2031-03-17'
    }
  },
  {
    id: '5',
    type: 'healthCard',
    title: 'Health Insurance Card',
    issuer: 'National Health Service',
    issuedDate: '2023-01-01',
    expiryDate: '2024-01-01',
    status: 'pending',
    documentNumber: 'HC789456123',
    country: 'United States',
    image: '/placeholder.svg',
    details: {
      fullName: 'John Doe',
      policyNumber: 'POL-1234567',
      groupNumber: 'GRP-7890',
      planType: 'Comprehensive',
      effectiveDate: '2023-01-01',
      expirationDate: '2024-01-01',
      provider: 'National Health Service'
    }
  }
];

export const getCredentialById = (id: string): Credential | undefined => {
  return mockCredentials.find(credential => credential.id === id);
};

export const getCredentialsByStatus = (status: Credential['status']): Credential[] => {
  return mockCredentials.filter(credential => credential.status === status);
};

export const getCredentialsCountByStatus = (): Record<Credential['status'], number> => {
  return {
    verified: getCredentialsByStatus('verified').length,
    pending: getCredentialsByStatus('pending').length,
    expired: getCredentialsByStatus('expired').length
  };
};
