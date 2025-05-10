
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { generatePdfReport } from "@/utils/report-generator";
import { generateATSMatchReportPrompt } from "@/utils/cv-analysis/deepseek-prompts";
import { callDeepSeekAPI } from "@/utils/cv-analysis/api-client";

export interface ATSMatchReportOptions {
  companyName?: string;
  companyWebsite?: string;
  detailedAnalysis?: boolean;
}

interface UseATSMatchReportReturn {
  isGenerating: boolean;
  reportData: any | null;
  generateReport: (cvText: string, jobDescription: string, options?: ATSMatchReportOptions) => Promise<void>;
  downloadPdf: () => void;
  error: string | null;
}

const mockReportData = {
  reportTitle: "ATS Boost Match Report",
  jobTitle: "Senior Software Developer",
  company: "TechCorp SA",
  overallScore: {
    score: 65,
    explanation: "Your resume has moderate alignment with the job description. Aim for 75% or higher to increase interview chances.",
    recommendation: "Add missing technical skills and quantify your achievements."
  },
  searchability: {
    score: 80,
    issuesFound: 2,
    atsTip: "Add your LinkedIn profile to improve online presence.",
    contactInformation: {
      status: "Partial",
      feedback: "Complete contact details help recruiters reach you easily.",
      recommendation: "Add your phone number to your contact section."
    },
    summary: {
      status: "Found",
      feedback: "A clear summary helps set the context for your application.",
      recommendation: ""
    },
    sectionHeadings: {
      status: "Good",
      feedback: "Well-organized sections make your resume easy to scan.",
      recommendation: ""
    },
    jobTitleMatch: {
      status: "Not Found",
      feedback: "Including the exact job title improves ATS matching.",
      recommendation: "Include 'Senior Software Developer' in your resume."
    }
  },
  hardSkills: {
    score: 60,
    issuesFound: 5,
    skills: [
      { skill: "React", resumeCount: 3, jobCount: 4 },
      { skill: "TypeScript", resumeCount: 2, jobCount: 3 },
      { skill: "Node.js", resumeCount: "×", jobCount: 2 },
      { skill: "AWS", resumeCount: "×", jobCount: 3 },
      { skill: "Docker", resumeCount: 1, jobCount: 2 }
    ],
    feedback: "Your resume mentions some key technical skills, but is missing several important requirements.",
    recommendation: "Add missing skills like Node.js and AWS, and provide examples of using them in projects."
  },
  softSkills: {
    score: 70,
    issuesFound: 2,
    skills: [
      { skill: "Team leadership", resumeCount: 2, jobCount: 3 },
      { skill: "Communication", resumeCount: 1, jobCount: 2 },
      { skill: "Problem-solving", resumeCount: "×", jobCount: 3 },
      { skill: "Time management", resumeCount: 1, jobCount: 1 }
    ],
    feedback: "You've included most soft skills, but are missing some key interpersonal abilities.",
    recommendation: "Add problem-solving examples to your work experience descriptions."
  },
  recommendations: [
    "Add missing technical skills like Node.js and AWS",
    "Include quantifiable achievements in your work experience",
    "Add problem-solving examples to demonstrate this key soft skill"
  ]
};

export function useATSMatchReport(): UseATSMatchReportReturn {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [reportData, setReportData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const generateReport = useCallback(async (cvText: string, jobDescription: string, options?: ATSMatchReportOptions) => {
    if (!cvText || !jobDescription) {
      setError("Both CV and job description are required");
      toast({
        title: "Missing Information",
        description: "Both CV and job description are required to generate a match report",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      // Generate the prompt for DeepSeek
      const prompt = generateATSMatchReportPrompt(
        cvText, 
        jobDescription,
        options?.companyName,
        options?.companyWebsite
      );

      try {
        // Call DeepSeek API
        const response = await callDeepSeekAPI(prompt, 3000);
        
        try {
          const parsedResponse = JSON.parse(response);
          setReportData(parsedResponse);
          
          toast({
            title: "Report Generated",
            description: `ATS Match Report successfully generated with score: ${parsedResponse.overallScore?.score || 0}%`
          });
        } catch (parseError) {
          console.error("Error parsing DeepSeek response:", parseError);
          
          // Use mock data for development or when parsing fails
          setReportData(mockReportData);
          
          toast({
            title: "Report Generated",
            description: "ATS Match Report generated using fallback data",
            variant: "default"
          });
        }
      } catch (apiError) {
        console.error("Error calling DeepSeek API:", apiError);
        
        // Use mock data for development or when API fails
        setReportData(mockReportData);
        
        toast({
          title: "Using Sample Report",
          description: "Could not generate custom report, showing sample data instead",
          variant: "default"
        });
      }
    } catch (error) {
      console.error("Error generating ATS match report:", error);
      setError("Failed to generate ATS match report");
      
      toast({
        title: "Error",
        description: "Failed to generate the ATS match report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  }, [toast]);

  const downloadPdf = useCallback(() => {
    if (!reportData) {
      toast({
        title: "No Report Available",
        description: "Please generate a report before downloading",
        variant: "destructive"
      });
      return;
    }

    try {
      // Generate PDF using the report data
      // This is a simplified version - would need to enhance generatePdfReport to handle the full match report format
      const mockCVScore = {
        overall: reportData.overallScore?.score || 0,
        keywordMatch: reportData.hardSkills?.score || 0,
        formatting: reportData.searchability?.score || 0,
        sectionPresence: reportData.searchability?.score || 0,
        readability: 75, // Not directly available in ATS report
        length: reportData.recruiterTips?.wordCount?.score || 70,
        contentRelevance: reportData.hardSkills?.score || 0,
        saQualifications: reportData.southAfricanSpecific?.score || 65,
        bbbeeCompliance: reportData.southAfricanSpecific?.bbbeeStatus?.score || 60
      };

      // Convert recommendations to CVTip format
      const mockTips = (reportData.recommendations || []).map((rec: string, index: number) => ({
        id: `tip-${index}`,
        text: rec,
        category: index % 3 === 0 ? "Hard Skills" : index % 3 === 1 ? "Soft Skills" : "Formatting",
        priority: index < 2 ? "high" : "medium"
      }));

      // Create mock explanations
      const mockExplanations = {
        keywordMatch: reportData.hardSkills?.feedback || "Keyword match measures how well your CV includes relevant keywords.",
        formatting: reportData.searchability?.sectionHeadings?.feedback || "Formatting score measures structure and organization.",
        sectionPresence: reportData.searchability?.feedback || "Section presence evaluates if all required sections are included.",
        overall: reportData.overallScore?.explanation || "Overall score represents total ATS compatibility."
      };

      generatePdfReport(mockCVScore, mockTips, "premium", mockExplanations);
      
      toast({
        title: "Report Downloaded",
        description: "Your ATS Match Report has been downloaded as a PDF",
      });
    } catch (error) {
      console.error("Error downloading PDF report:", error);
      
      toast({
        title: "Download Failed",
        description: "Failed to download the report. Please try again.",
        variant: "destructive"
      });
    }
  }, [reportData, toast]);

  return {
    isGenerating,
    reportData,
    generateReport,
    downloadPdf,
    error
  };
}
