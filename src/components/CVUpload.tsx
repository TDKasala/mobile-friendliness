import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, AlertCircle, Smartphone, MessagesSquare, Loader2 } from "lucide-react";
import { CVScore } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import ATSScore from "@/components/ATSScore";
import WhatsAppSupport from "@/components/WhatsAppSupport";
import { useCVValidation } from "@/hooks/use-cv-validation";

const CVUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [score, setScore] = useState<CVScore | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { isValidating, validateCV } = useCVValidation();

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
    processFile(droppedFile);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  }, []);

  const processFile = async (file: File) => {
    // Check file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.oasis.opendocument.text'];
    
    if (!validTypes.includes(file.type)) {
      setError("Please upload a PDF, DOCX, TXT, or ODT file.");
      setFile(null);
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB. Please upload a smaller file.");
      setFile(null);
      return;
    }
    
    // Validate if the file is actually a CV
    const isValid = await validateCV(file);
    if (!isValid) {
      setError("The uploaded file doesn't appear to be a CV. Please check and try again.");
      setFile(null);
      return;
    }

    setFile(file);
    setError(null);
    
    toast({
      title: "CV Received!",
      description: "Your CV was uploaded successfully.",
    });
  };

  const analyzeCV = () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    // Simulate API call to analyze CV with enhanced ATS scoring
    setTimeout(() => {
      // Enhanced mock result with more detailed scoring
      setScore({
        overall: 68,
        keywordMatch: 62,
        formatting: 75,
        sectionPresence: 80,
        readability: 70,
        length: 55
      });
      setIsAnalyzing(false);
      
      toast({
        title: "CV Analysis Complete",
        description: "Your CV has been scored against ATS criteria.",
      });
    }, 2000);
  };

  const getDetailedReport = () => {
    toast({
      title: "Premium Feature",
      description: "This will redirect to payment for the detailed report.",
    });
    // Here you would typically redirect to a payment page or modal
  };

  const openWhatsAppUpload = () => {
    // Open WhatsApp with pre-filled message
    window.open("https://wa.me/+27123456789?text=I'd like to upload my CV for analysis", "_blank");
    
    toast({
      title: "WhatsApp Upload",
      description: "Send your CV as a file attachment to this number to analyze it.",
    });
  };

  return (
    <section className="py-16 bg-white dark:bg-sa-blue">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-sa-blue dark:text-white">
              Analyze Your CV
            </h2>
            <p className="text-sa-gray dark:text-gray-300">
              Upload your CV to get an instant ATS score and actionable feedback to improve your chances of getting hired.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-sa-blue/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-sa-blue/70">
            {!file ? (
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
                    <Button
                      variant="outline"
                      className="border-sa-gray text-sa-gray hover:bg-sa-gray/10 flex items-center justify-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        openWhatsAppUpload();
                      }}
                      disabled={isValidating}
                    >
                      <MessagesSquare className="h-4 w-4" /> Upload via WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="bg-sa-blue/10 dark:bg-sa-blue/30 rounded-lg p-4 mb-6">
                  <p className="font-medium text-sa-blue dark:text-white">
                    {file.name}
                  </p>
                  <p className="text-sm text-sa-gray dark:text-gray-300">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                {score ? (
                  <ATSScore 
                    score={score} 
                    onGetDetailedReport={getDetailedReport}
                    onUploadNew={() => {
                      setFile(null);
                      setScore(null);
                    }}
                  />
                ) : (
                  <div className="space-y-4">
                    <Button
                      variant="default"
                      className="bg-sa-green hover:bg-sa-green/90 text-white dark:bg-sa-yellow dark:hover:bg-sa-yellow/90 w-full"
                      onClick={analyzeCV}
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                        </>
                      ) : (
                        "Analyze CV"
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-sa-gray text-sa-gray hover:bg-sa-gray/10 dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gray-700/30 w-full"
                      onClick={() => setFile(null)}
                      disabled={isAnalyzing}
                    >
                      Choose Another File
                    </Button>
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="mt-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-3 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex items-center gap-2 mb-2 sm:mb-0">
                <Smartphone size={20} className="text-sa-gray dark:text-gray-400" />
                <span className="text-sm text-sa-gray dark:text-gray-300">
                  Prefer using WhatsApp? Send your CV to
                </span>
              </div>
              <Button 
                variant="link"
                className="text-sa-blue dark:text-sa-green font-medium p-0 h-auto"
                onClick={openWhatsAppUpload}
              >
                +27 12 345 6789
              </Button>
            </div>

            <div className="mt-4 text-center text-xs text-sa-gray dark:text-gray-400">
              <p>Supported formats: PDF, DOCX, TXT, ODT | Maximum file size: 5MB</p>
            </div>
            
            {/* Add WhatsApp support button */}
            <div className="mt-6 flex justify-center border-t border-gray-200 dark:border-gray-700 pt-6">
              <WhatsAppSupport 
                position="static" 
                message="Hi, I need help uploading my CV to ATSBoost"
                className="flex items-center px-4 py-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CVUpload;
