
import React, { useState } from 'react';
import { 
  FileCheck, 
  FileX, 
  MessageSquare,
  ExternalLink,
  FileText,
  User
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

// Mock data for document review
const mockPendingDocuments = [
  {
    id: "doc-001",
    type: "Passport",
    userId: "user-123",
    userName: "Jane Smith",
    submittedDate: "2025-03-20T10:30:00Z",
    status: "pending",
    ipfsHash: "QmX7b5jTn4LTCcjy7HZxvCFrD8CeY2hWUW6GLvYU8qT3NN",
  },
  {
    id: "doc-002",
    type: "Visa Application",
    userId: "user-456",
    userName: "John Doe",
    submittedDate: "2025-03-21T09:15:00Z",
    status: "pending",
    ipfsHash: "QmPK1s3pNYLi9ERiq3BDxKa4XosgWwFRQUydHUtz4YgpqB",
  },
  {
    id: "doc-003",
    type: "Driver's License",
    userId: "user-789",
    userName: "Alex Johnson",
    submittedDate: "2025-03-22T14:45:00Z",
    status: "pending",
    ipfsHash: "QmNdjThuj3nj8XTSj6WJXwQxhK9rSAqp9jtk1hjbL5yF8p",
  },
];

const DocumentReview: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<string>("pending");
  const [feedback, setFeedback] = useState<string>("");
  
  const handleApprove = () => {
    // Logic to approve document
    console.log("Document approved:", selectedDocument);
  };
  
  const handleReject = () => {
    // Logic to reject document
    console.log("Document rejected:", selectedDocument, "Feedback:", feedback);
  };
  
  const handleRequestInfo = () => {
    // Logic to request additional information
    console.log("Additional info requested:", selectedDocument, "Message:", feedback);
  };
  
  const getSelectedDocument = () => {
    return mockPendingDocuments.find(doc => doc.id === selectedDocument);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="pending" onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4 mt-4">
          <div className="flex justify-between mb-4">
            <Input
              placeholder="Search documents..."
              className="max-w-xs"
            />
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Filter</Button>
              <Button variant="outline" size="sm">Sort</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockPendingDocuments.map((doc) => (
              <Card 
                key={doc.id}
                className={`cursor-pointer hover:border-primary/50 transition-all ${
                  selectedDocument === doc.id ? 'border-primary' : ''
                }`}
                onClick={() => setSelectedDocument(doc.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <div className="bg-secondary/70 p-2 rounded-md">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{doc.type}</h3>
                        <p className="text-xs text-muted-foreground">
                          {new Date(doc.submittedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{doc.userName}</span>
                  </div>
                  
                  <div className="flex justify-end mt-2">
                    <Button variant="ghost" size="sm">
                      View Details <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </TabsContent>
        
        <TabsContent value="approved">
          <div className="p-8 text-center text-muted-foreground">
            <FileCheck className="h-12 w-12 mx-auto mb-4 text-primary/50" />
            <h3 className="text-lg font-medium">No approved documents to display</h3>
            <p className="mt-1">Approved documents will appear here</p>
          </div>
        </TabsContent>
        
        <TabsContent value="rejected">
          <div className="p-8 text-center text-muted-foreground">
            <FileX className="h-12 w-12 mx-auto mb-4 text-destructive/50" />
            <h3 className="text-lg font-medium">No rejected documents to display</h3>
            <p className="mt-1">Rejected documents will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
      
      {selectedDocument && (
        <Card className="mt-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-4">Document Preview</h3>
                <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center p-6">
                    <FileText className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Document preview would appear here</p>
                    <p className="text-xs mt-2">IPFS Hash: {getSelectedDocument()?.ipfsHash}</p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Document Type</p>
                      <p className="font-medium">{getSelectedDocument()?.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Submitted</p>
                      <p className="font-medium">
                        {new Date(getSelectedDocument()?.submittedDate || "").toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-muted-foreground">User</p>
                      <p className="font-medium">{getSelectedDocument()?.userName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">User ID</p>
                      <p className="font-medium">{getSelectedDocument()?.userId}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-4">Verification Actions</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="feedback" className="text-sm font-medium">
                      Feedback / Additional Information Request
                    </label>
                    <textarea
                      id="feedback"
                      className="min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Enter feedback or request more information..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      className="w-full"
                      onClick={handleApprove}
                    >
                      <FileCheck className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button 
                      variant="destructive"
                      className="w-full"
                      onClick={handleReject}
                    >
                      <FileX className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                  
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={handleRequestInfo}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Request More Info
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DocumentReview;
