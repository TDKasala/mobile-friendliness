
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useATSMatchReport } from "@/hooks/use-ats-match-report";
import ATSMatchReport from "@/components/ats-report/ATSMatchReport";
import { FileText, Building2, Globe, ArrowDown } from "lucide-react";

interface ATSMatchReportSectionProps {
  cvText: string;
  jobDescription: string;
  isReady: boolean;
}

const ATSMatchReportSection: React.FC<ATSMatchReportSectionProps> = ({
  cvText,
  jobDescription,
  isReady
}) => {
  const [showCompanyInfo, setShowCompanyInfo] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  
  const {
    isGenerating,
    reportData,
    generateReport,
    downloadPdf,
    error
  } = useATSMatchReport();

  const handleGenerateReport = () => {
    generateReport(cvText, jobDescription, {
      companyName: companyName || undefined,
      companyWebsite: companyWebsite || undefined
    });
  };

  if (!isReady) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="mb-6 text-center">
        <h3 className="text-xl font-bold text-sa-blue dark:text-white">
          Generate ATS Match Report
        </h3>
        <p className="text-sa-gray dark:text-gray-300 mt-2">
          Get a detailed analysis of how well your CV matches the job description and recommendations to improve it.
        </p>
      </div>
      
      <div className="bg-white dark:bg-sa-blue/20 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-sa-blue/70">
        {!reportData && !isGenerating ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-sa-blue/10 dark:bg-sa-blue/20 p-3 rounded-full">
                <FileText className="h-8 w-8 text-sa-blue dark:text-sa-green" />
              </div>
              <div className="text-center">
                <h4 className="text-lg font-medium text-sa-blue dark:text-white">
                  Generate ATS Match Report
                </h4>
                <p className="text-sm text-sa-gray dark:text-gray-400 mt-1 max-w-md mx-auto">
                  Our AI will analyze your CV against the job description and provide a detailed match report with improvement suggestions.
                </p>
              </div>
            </div>
            
            <div 
              className="border border-dashed border-gray-300 dark:border-gray-600 rounded-md p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-sa-blue/30 transition-colors"
              onClick={() => setShowCompanyInfo(!showCompanyInfo)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-sa-blue dark:text-sa-green" />
                  <span className="text-sm font-medium text-sa-gray dark:text-gray-300">
                    {showCompanyInfo ? "Hide company information" : "Add company information (optional)"}
                  </span>
                </div>
                <ArrowDown className={`h-4 w-4 text-sa-gray dark:text-gray-400 transition-transform ${showCompanyInfo ? 'rotate-180' : ''}`} />
              </div>
              
              {showCompanyInfo && (
                <div className="mt-4 space-y-3">
                  <div>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                      id="company-name"
                      placeholder="Enter company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="company-website">Company Website</Label>
                    <div className="flex items-center mt-1">
                      <Globe className="h-4 w-4 text-gray-400 mr-2" />
                      <Input
                        id="company-website"
                        placeholder="www.example.com"
                        value={companyWebsite}
                        onChange={(e) => setCompanyWebsite(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Adding company information helps provide more targeted recommendations for their specific ATS system.
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={handleGenerateReport} 
                className="w-full max-w-xs"
                disabled={!cvText || !jobDescription}
              >
                Generate Match Report
              </Button>
            </div>
            
            {error && (
              <div className="text-center text-sm text-red-500 dark:text-red-400">
                {error}
              </div>
            )}
          </div>
        ) : (
          <ATSMatchReport 
            data={reportData}
            isLoading={isGenerating}
            onDownloadPdf={downloadPdf}
          />
        )}
      </div>
    </div>
  );
};

export default ATSMatchReportSection;
