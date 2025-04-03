
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, FileText, Download, Share2 } from 'lucide-react';
import { VerificationRequest } from '@/types/verification';
import QRCode from '@/components/shared/QRCode';
import { toast } from 'sonner';

interface CredentialDetailModalProps {
  credential: VerificationRequest;
  isOpen: boolean;
  onClose: () => void;
}

const CredentialDetailModal: React.FC<CredentialDetailModalProps> = ({
  credential,
  isOpen,
  onClose,
}) => {
  const handleDownload = () => {
    toast.success('Credential downloaded successfully');
  };

  const handleShare = () => {
    toast.success('Credential sharing link created');
  };

  const getStatusBadge = (status: "pending" | "approved" | "rejected") => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-amber-100 text-amber-800 border-amber-300">
            <Clock className="h-3 w-3" />
            Pending Verification
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-green-100 text-green-800 border-green-300">
            <CheckCircle className="h-3 w-3" />
            Verified
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-red-100 text-red-800 border-red-300">
            <AlertCircle className="h-3 w-3" />
            Rejected
          </Badge>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <DialogTitle>{credential.documentType}</DialogTitle>
          </div>
          <DialogDescription className="flex items-center justify-between">
            <span>Submitted on {new Date(credential.submittedDate).toLocaleDateString()}</span>
            {getStatusBadge(credential.status)}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {credential.status === "approved" && (
              <>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Credential Data</h4>
                  <div className="space-y-2">
                    {credential.credentialData && Object.entries(credential.credentialData).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                        <span className="text-sm font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Issuer Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Issuer Name</span>
                      <span className="text-sm font-medium">{credential.issuer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Digital Signature</span>
                      <span className="text-sm font-mono text-xs truncate max-w-[180px]">{credential.issuerSignature}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Verification Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Blockchain Hash</span>
                      <span className="text-sm font-mono text-xs truncate max-w-[180px]">{credential.blockchainHash}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Expiration Date</span>
                      <span className="text-sm font-medium">{credential.expiryDate ? new Date(credential.expiryDate).toLocaleDateString() : "No expiration"}</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {credential.status === "rejected" && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Rejection Information</h4>
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-800">{credential.rejectionReason}</p>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  You can resubmit this document with the necessary corrections.
                </p>
              </div>
            )}

            {credential.status === "pending" && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Verification Status</h4>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                  <p className="text-sm text-amber-800">
                    Your document is currently being verified. This process typically takes 1-3 business days.
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  You'll receive a notification once the verification is complete.
                </p>
              </div>
            )}
          </div>

          {credential.status === "approved" && (
            <div className="flex flex-col items-center justify-center">
              <QRCode 
                data={JSON.stringify({
                  type: credential.documentType,
                  id: credential.id,
                  issuer: credential.issuer,
                  blockchainHash: credential.blockchainHash
                })} 
                title="Scan to verify this credential" 
              />
              <p className="text-xs text-muted-foreground mt-2">
                QR code for verification
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {credential.status === "rejected" && (
            <Button className="w-full sm:w-auto">Resubmit Document</Button>
          )}

          {credential.status === "approved" && (
            <>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </>
          )}

          <Button
            variant={credential.status === "approved" ? "default" : "outline"}
            className="w-full sm:w-auto"
            onClick={onClose}
          >
            {credential.status === "approved" ? "Close" : "Cancel"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CredentialDetailModal;
