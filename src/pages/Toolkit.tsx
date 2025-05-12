import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, FileSpreadsheet, AlignJustify, FilePlus2 } from "lucide-react";
import { downloadJobSeekerToolkit } from "@/utils/pdf-toolkit-generator";

const Toolkit = () => {
  const [downloading, setDownloading] = useState<string | null>(null);
  
  const handleDownload = (toolkitId: string) => {
    setDownloading(toolkitId);
    
    setTimeout(() => {
      if (toolkitId === "main-toolkit") {
        downloadJobSeekerToolkit();
      }
      setDownloading(null);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Job Seeker Toolkit | ATSBoost</title>
        <meta name="description" content="Download free job seeker resources to help you optimize your CV and improve your job search" />
      </Helmet>
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-sa-blue mb-4">
                Free Job Seeker Resources
              </h1>
              <p className="text-lg text-sa-gray">
                Download our comprehensive toolkits to boost your job search in South Africa
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card className="border border-sa-green/20">
                <CardHeader className="bg-sa-green/5 border-b border-sa-green/10 pb-4">
                  <CardTitle className="flex items-center gap-2 text-sa-blue">
                    <FileText className="h-5 w-5 text-sa-green" />
                    Job Seeker Toolkit
                  </CardTitle>
                  <CardDescription>
                    Our main comprehensive guide for job seekers
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <ul className="space-y-2 text-sm text-sa-gray mb-4">
                      <li className="flex items-start gap-2">
                        <span className="text-sa-green text-lg leading-none">•</span>
                        <span>CV optimization tips specific for South African job market</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sa-green text-lg leading-none">•</span>
                        <span>Top South African job search platforms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sa-green text-lg leading-none">•</span>
                        <span>Interview preparation guide</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sa-green text-lg leading-none">•</span>
                        <span>Contact resources for further assistance</span>
                      </li>
                    </ul>
                    <Button
                      className="w-full bg-sa-green hover:bg-sa-green/90 text-white"
                      onClick={() => handleDownload('main-toolkit')}
                      disabled={downloading === 'main-toolkit'}
                    >
                      {downloading === 'main-toolkit' ? (
                        <span className="flex items-center">
                          <Download className="mr-2 h-4 w-4 animate-bounce" />
                          Downloading...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF Toolkit
                        </span>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-sa-blue/5 border-b border-sa-blue/10 pb-4">
                  <CardTitle className="flex items-center gap-2 text-sa-blue">
                    <FileSpreadsheet className="h-5 w-5 text-sa-blue" />
                    ATS Keywords Template
                  </CardTitle>
                  <CardDescription>
                    Industry-specific keywords for ATS optimization
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <ul className="space-y-2 text-sm text-sa-gray mb-4">
                      <li className="flex items-start gap-2">
                        <span className="text-sa-blue text-lg leading-none">•</span>
                        <span>Spreadsheet with ATS-friendly keywords by industry</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sa-blue text-lg leading-none">•</span>
                        <span>South African specific terminology</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sa-blue text-lg leading-none">•</span>
                        <span>Skills categorization by experience level</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sa-blue text-lg leading-none">•</span>
                        <span>Guidance on keyword density and placement</span>
                      </li>
                    </ul>
                    <Button
                      variant="outline"
                      className="w-full border-sa-blue text-sa-blue hover:bg-sa-blue/10"
                      onClick={() => handleDownload('ats-keywords')}
                      disabled={downloading === 'ats-keywords'}
                    >
                      {downloading === 'ats-keywords' ? (
                        <span className="flex items-center">
                          <Download className="mr-2 h-4 w-4 animate-bounce" />
                          Downloading...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Download className="mr-2 h-4 w-4" />
                          Download Spreadsheet
                        </span>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="bg-gray-100 border-b pb-4">
                  <CardTitle className="flex items-center gap-2 text-sa-blue text-lg">
                    <AlignJustify className="h-4 w-4 text-gray-600" />
                    CV Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-sa-gray mb-4">
                    One-page checklist to ensure your CV meets all basic requirements before submission
                  </p>
                  <Button variant="outline" className="w-full" onClick={() => handleDownload('cv-checklist')}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Checklist
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-gray-100 border-b pb-4">
                  <CardTitle className="flex items-center gap-2 text-sa-blue text-lg">
                    <FilePlus2 className="h-4 w-4 text-gray-600" />
                    Cover Letter Templates
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-sa-gray mb-4">
                    Three customizable cover letter templates for different job types
                  </p>
                  <Button variant="outline" className="w-full" onClick={() => handleDownload('cover-letters')}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Templates
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-gray-100 border-b pb-4">
                  <CardTitle className="flex items-center gap-2 text-sa-blue text-lg">
                    <FileText className="h-4 w-4 text-gray-600" />
                    Interview Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-sa-gray mb-4">
                    Comprehensive guide to ace interviews with South African employers
                  </p>
                  <Button variant="outline" className="w-full" onClick={() => handleDownload('interview-guide')}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Guide
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-12 bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <h2 className="text-xl font-bold text-sa-blue mb-3">Need More Personalized Help?</h2>
              <p className="text-sa-gray mb-4">
                Our premium members get access to additional resources and personalized feedback on their job search materials.
              </p>
              <Button className="bg-sa-green hover:bg-sa-green/90 text-white">
                Upgrade to Premium
              </Button>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default Toolkit;
