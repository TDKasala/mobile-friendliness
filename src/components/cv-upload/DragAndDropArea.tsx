
import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Loader2, Upload } from "lucide-react";

interface DragAndDropAreaProps {
  onFileSelected: (file: File) => void;
  isValidating: boolean;
}

/**
 * Drag and drop file upload area component
 */
const DragAndDropArea: React.FC<DragAndDropAreaProps> = ({ onFileSelected, isValidating }) => {
  const [isDragging, setIsDragging] = useState(false);

  // Handle drag events
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      onFileSelected(droppedFile);
    }
  }, [onFileSelected]);

  // Handle file input change
  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelected(e.target.files[0]);
    }
  }, [onFileSelected]);

  return (
    <div
      className={`border-2 border-dashed rounded-lg ${
        isDragging
          ? "border-sa-green bg-sa-green/5 dark:border-sa-yellow dark:bg-sa-yellow/5"
          : "border-gray-300 dark:border-gray-600"
      } p-8 text-center cursor-pointer transition-colors duration-200`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => document.getElementById("file-input")?.click()}
    >
      <input
        id="file-input"
        type="file"
        className="hidden"
        accept=".pdf,.docx,.doc,.txt,.odt"
        onChange={handleFileInput}
      />
      <div className="flex flex-col items-center justify-center py-6">
        {isValidating ? (
          <>
            <Loader2 size={48} className="animate-spin text-sa-gray dark:text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2 text-sa-blue dark:text-white">
              Validating your CV...
            </h3>
            <p className="text-sa-gray dark:text-gray-400 mb-4">
              We're checking that your file is a valid CV
            </p>
          </>
        ) : (
          <>
            <Upload 
              size={48} 
              className="text-sa-gray dark:text-gray-400 mb-4" 
            />
            <h3 className="text-lg font-medium mb-2 text-sa-blue dark:text-white">
              Drag & drop your CV here
            </h3>
            <p className="text-sa-gray dark:text-gray-400 mb-4">
              Supports PDF, DOCX, TXT, and ODT files (max 5MB)
            </p>
          </>
        )}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            variant="default" 
            className="bg-sa-blue hover:bg-sa-blue/90 text-white dark:bg-sa-green dark:hover:bg-sa-green/90"
            disabled={isValidating}
          >
            {isValidating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Validating...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" /> Select File
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DragAndDropArea;
