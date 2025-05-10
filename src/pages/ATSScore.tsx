
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft } from "lucide-react";
import ATSMatchReport from "@/components/ats-report/ATSMatchReport";
import { useATSMatchReport } from "@/hooks/use-ats-match-report";
import ATSScore from "@/components/ATSScore";

const ATSScorePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { downloadPdf } = useATSMatchReport();
  
  // Get data from location state
  const { score, recommendations, jobMatch, explanations, reportData, tier = "free" } = location.state || {};
  
  // Handle going back to upload page
  const handleBackToUpload = () => {
    navigate("/");
  };
  
  // Handle getting a detailed report
  const handleGetDetailedReport = () => {
    navigate("/pricing");
  };
  
  // If no score data is available, show an error
  if (!score) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No CV analysis data found. Please analyze your CV first.
            </AlertDescription>
          </Alert>
          
          <div className="flex justify-center">
            <Button onClick={handleBackToUpload}>
              Return to CV Upload
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-sa-blue">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="outline"
            className="mb-6"
            onClick={handleBackToUpload}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Upload
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4 text-sa-blue dark:text-white">
              Your CV Analysis Results
            </h1>
            <p className="text-sa-gray dark:text-gray-300">
              See how your CV performs against ATS systems and get recommendations to improve it
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-sa-blue/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-sa-blue/70">
            {/* CV Score section */}
            <div className="mb-10">
              <div className="bg-white dark:bg-sa-blue/20 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-sa-blue/70">
                <ATSScore 
                  score={score}
                  recommendations={recommendations}
                  onGetDetailedReport={handleGetDetailedReport}
                  onUploadNew={handleBackToUpload}
                  tier={tier}
                  explanations={explanations}
                />
              </div>
            </div>
            
            {/* ATS Match Report section - only show if match report data is available */}
            {reportData && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-6 text-center text-sa-blue dark:text-white">
                  ATS Match Report
                </h2>
                <ATSMatchReport 
                  data={reportData}
                  onDownloadPdf={downloadPdf}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ATSScorePage;
