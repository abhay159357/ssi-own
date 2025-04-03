
export interface VerificationRequest {
  id: string;
  documentType: string;
  submittedDate: string;
  status: "pending" | "approved" | "rejected";
  issuer?: string;
  issuerSignature?: string;
  blockchainHash?: string;
  expiryDate?: string;
  rejectionReason?: string;
  credentialData?: Record<string, string>;
}
