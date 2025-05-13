
import React, { useState, useCallback, RefObject } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Loader2, Upload } from "lucide-react";

interface DragAndDropAreaProps {
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  fileInputRef: RefObject<HTMLInputElement>;
  setFile: (file: File) => void;
  setError: (error: string | null) => void;
  setAnalysisStatus: (status: string) => void;
}

/**
 * Drag and drop file upload area component
 */
const DragAndDropArea: React.FC<DragAndDropAreaProps> = ({ 
  isDragging, 
  setIsDragging, 
  fileInputRef, 
  setFile, 
  setError, 
  setAnalysisStatus 
}) => {
  // Handle drag events
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, [setIsDragging]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, [setIsDragging]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging, setIsDragging]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelection(droppedFile);
    }
  }, [setIsDragging]);

  // Handle file selection
  const handleFileSelection = (selectedFile: File) => {
    setAnalysisStatus("validating");
    
    // Validate file type
    const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain", "application/vnd.oasis.opendocument.text"];
    if (!validTypes.includes(selectedFile.type)) {
      setError("Please upload a PDF, DOCX, TXT, or ODT file");
      setAnalysisStatus("idle");
      return;
    }
    
    // Validate file size (5MB max)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      setAnalysisStatus("idle");
      return;
    }
    
    // Set file if it passes validation
    setFile(selectedFile);
    setError(null);
    setAnalysisStatus("ready");
  };

  // Handle file input change
  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  }, []);

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
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        id="file-input"
        type="file"
        className="hidden"
        ref={fileInputRef}
        accept=".pdf,.docx,.doc,.txt,.odt"
        onChange={handleFileInput}
      />
      <div className="flex flex-col items-center justify-center py-6">
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
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            variant="default" 
            className="bg-sa-blue hover:bg-sa-blue/90 text-white dark:bg-sa-green dark:hover:bg-sa-green/90"
          >
            <FileText className="mr-2 h-4 w-4" /> Select File
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DragAndDropArea;
