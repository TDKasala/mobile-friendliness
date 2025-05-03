
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, AlertCircle, Smartphone, MessagesSquare } from "lucide-react";
import { CVScore } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

const CVUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [score, setScore] = useState<CVScore | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

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

  const processFile = (file: File) => {
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

    // Simulate API call to analyze CV
    setTimeout(() => {
      // Mock result
      setScore({
        overall: 68,
        keywordMatch: 62,
        formatting: 75,
        sectionPresence: 80,
        readability: 70,
        length: 55
      });
      setIsAnalyzing(false);
    }, 2000);
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
                    <Button
                      variant="outline"
                      className="border-sa-gray text-sa-gray hover:bg-sa-gray/10 flex items-center justify-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        openWhatsAppUpload();
                      }}
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
                  <div className="space-y-6">
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 rounded-full bg-white dark:bg-sa-blue/50 border-4 border-sa-green dark:border-sa-yellow flex items-center justify-center mb-4">
                        <span className="text-4xl font-bold text-sa-blue dark:text-white">
                          {score.overall}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-sa-blue dark:text-white">
                        Your ATS Score
                      </h3>
                      <p className="text-sa-gray dark:text-gray-300 mt-1">
                        {score.overall >= 80
                          ? "Excellent! Your CV is ATS-friendly."
                          : score.overall >= 60
                          ? "Good start. Follow our tips to improve further."
                          : "Needs improvement. See our recommendations below."}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-sa-blue/20 p-4 rounded-lg">
                        <p className="text-sm text-sa-gray dark:text-gray-300">
                          Keyword Match
                        </p>
                        <div className="flex items-center">
                          <div className="text-xl font-semibold text-sa-blue dark:text-white">
                            {score.keywordMatch}%
                          </div>
                          <div className="ml-2 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-sa-green dark:bg-sa-yellow h-2 rounded-full"
                              style={{ width: `${score.keywordMatch}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white dark:bg-sa-blue/20 p-4 rounded-lg">
                        <p className="text-sm text-sa-gray dark:text-gray-300">
                          Formatting
                        </p>
                        <div className="flex items-center">
                          <div className="text-xl font-semibold text-sa-blue dark:text-white">
                            {score.formatting}%
                          </div>
                          <div className="ml-2 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-sa-green dark:bg-sa-yellow h-2 rounded-full"
                              style={{ width: `${score.formatting}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white dark:bg-sa-blue/20 p-4 rounded-lg">
                        <p className="text-sm text-sa-gray dark:text-gray-300">
                          Section Presence
                        </p>
                        <div className="flex items-center">
                          <div className="text-xl font-semibold text-sa-blue dark:text-white">
                            {score.sectionPresence}%
                          </div>
                          <div className="ml-2 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-sa-green dark:bg-sa-yellow h-2 rounded-full"
                              style={{ width: `${score.sectionPresence}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white dark:bg-sa-blue/20 p-4 rounded-lg">
                        <p className="text-sm text-sa-gray dark:text-gray-300">
                          Readability
                        </p>
                        <div className="flex items-center">
                          <div className="text-xl font-semibold text-sa-blue dark:text-white">
                            {score.readability}%
                          </div>
                          <div className="ml-2 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-sa-green dark:bg-sa-yellow h-2 rounded-full"
                              style={{ width: `${score.readability}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                      <Button 
                        variant="default"
                        className="bg-sa-green hover:bg-sa-green/90 text-white dark:bg-sa-yellow dark:hover:bg-sa-yellow/90 flex-1"
                      >
                        Get Detailed Report (R30)
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-sa-blue text-sa-blue hover:bg-sa-blue/10 dark:border-sa-green dark:text-sa-green dark:hover:bg-sa-green/10 flex-1"
                        onClick={() => {
                          setFile(null);
                          setScore(null);
                        }}
                      >
                        Upload New CV
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Button
                      variant="default"
                      className="bg-sa-green hover:bg-sa-green/90 text-white dark:bg-sa-yellow dark:hover:bg-sa-yellow/90 w-full"
                      onClick={analyzeCV}
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? "Analyzing..." : "Analyze CV"}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default CVUpload;
