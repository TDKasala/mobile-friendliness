
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
      />

      {showJobDescription && (
        <div className={`transition-all duration-300 ease-in-out mt-4 ${showJobDescription ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-sa-gray dark:text-gray-300 mb-1">
            Paste Job Description (Optional)
          </label>
          <Textarea
            id="jobDescription"
            placeholder="Paste the job description here to get a personalized match report..."
            className="min-h-[120px] mb-2"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <p className="text-xs text-sa-gray dark:text-gray-400">
            Adding a job description allows us to analyze how well your CV matches the specific role requirements.
          </p>
        </div>
      )}
    </>
  );
};

export default UploadForm;
