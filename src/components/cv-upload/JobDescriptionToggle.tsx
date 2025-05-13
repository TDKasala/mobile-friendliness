
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, ChevronUp, ChevronDown } from "lucide-react";

interface JobDescriptionToggleProps {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  showJobDescription: boolean;
  toggleJobDescription: () => void;
}

/**
 * Job description toggle and input component
 */
const JobDescriptionToggle: React.FC<JobDescriptionToggleProps> = ({
  jobDescription,
  setJobDescription,
  showJobDescription,
  toggleJobDescription
}) => {
  return (
    <>
      <Button
        variant="outline"
        className="w-full mb-4 justify-between py-2.5 text-sa-blue dark:text-gray-300"
        onClick={toggleJobDescription}
      >
        <div className="flex items-center">
          <Briefcase className="h-4 w-4 mr-2" />
          <span>{showJobDescription ? "Hide Job Description" : "Add Job Description"}</span>
        </div>
        {showJobDescription ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
      
      {showJobDescription && (
        <div className="mb-4">
          <Textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste a job description to get tailored feedback on how well your CV matches the requirements..."
            className="min-h-[100px] mb-1"
          />
          <p className="text-xs text-sa-gray dark:text-gray-400">
            Adding a job description allows us to analyze how well your CV matches the specific role requirements
          </p>
        </div>
      )}
    </>
  );
};

export default JobDescriptionToggle;
