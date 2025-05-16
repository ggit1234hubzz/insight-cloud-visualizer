
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
  acceptedTypes?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onUpload, 
  isUploading, 
  acceptedTypes = "image/*,application/pdf,text/plain" 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    
    if (file.size > MAX_SIZE) {
      toast({
        title: "File too large",
        description: "Maximum file size is 10MB",
        variant: "destructive"
      });
      return;
    }
    
    const fileType = file.type;
    if (!acceptedTypes.includes(fileType.split('/')[0]) && 
        !acceptedTypes.includes(fileType)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a supported file format",
        variant: "destructive"
      });
      return;
    }
    
    onUpload(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="p-6 border border-border shadow-sm">
      <div
        className={`file-drop-area ${isDragging ? 'drag-active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept={acceptedTypes}
        />
        
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="rounded-full bg-primary/10 p-4">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-lg font-semibold">Upload your file</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Drag and drop your file here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supported formats: Images, PDFs, Text files (Max 10MB)
            </p>
          </div>
          
          <Button 
            onClick={handleButtonClick}
            disabled={isUploading}
            className="mt-2"
          >
            {isUploading ? 'Uploading...' : 'Select File'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FileUpload;
