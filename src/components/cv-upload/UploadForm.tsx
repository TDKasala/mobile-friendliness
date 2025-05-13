
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DragAndDropArea from './DragAndDropArea';
import JobDescriptionToggle from './JobDescriptionToggle';

interface UploadFormProps {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  showJobDescription: boolean;
  toggleJobDescription: () => void;
  setFile: (file: File) => void;
  setError: (error: string | null) => void;
  setAnalysisStatus: (status: string) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({
  jobDescription,
  setJobDescription,
  showJobDescription,
  toggleJobDescription,
  setFile,
  setError,
  setAnalysisStatus,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <DragAndDropArea
        setFile={setFile}
        setError={setError}
        setAnalysisStatus={setAnalysisStatus}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
        fileInputRef={fileInputRef}
      />

      <JobDescriptionToggle
        showJobDescription={showJobDescription}
        toggleJobDescription={toggleJobDescription}
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
      />
    </>
  );
};

export default UploadForm;
