import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle2, FileX, Download, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ATSMatchReportProps {
  data: any;
  isLoading?: boolean;
  onDownloadPdf?: () => void;
}

const ATSMatchReport: React.FC<ATSMatchReportProps> = ({
  data,
  isLoading = false,
  onDownloadPdf
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-t-sa-blue border-gray-200 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-lg font-medium text-sa-gray dark:text-gray-300">
          Generating your ATS Match Report...
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          This may take a minute while we analyze your CV against the job requirements
        </p>
      </div>
    );
  }
  
  if (!data) {
    return (
      <Card className="p-6 text-center">
        <FileX className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200">
          No Report Available
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2 mb-4">
          Please upload your CV and provide a job description to generate an ATS Match Report
        </p>
      </Card>
    );
  }
  
  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };
  
  const getScoreBgColor = (score: number) => {
    if (score >= 75) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  const getStatusIcon = (status: string) => {
    if (status === "Found" || status === "Good") {
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    }
    return <AlertCircle className="h-5 w-5 text-yellow-500" />;
  };
  
  const handleDownload = () => {
    if (onDownloadPdf) {
      onDownloadPdf();
    } else {
      toast({
        title: "Download Not Available",
        description: "PDF download functionality is not available in this version.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Report Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-sa-blue dark:text-white">ATS Boost Match Report</h2>
            <p className="text-gray-500 dark:text-gray-400">
              {data.jobTitle || "Job Title"} at {data.company || "Company"}
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="relative">
              <svg className="w-24 h-24">
                <circle
                  className="text-gray-200 dark:text-gray-700"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="38"
                  cx="44"
                  cy="44"
                />
                <circle
                  className={getScoreBgColor(data.overallScore?.score || 0)}
                  strokeWidth="8"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="38"
                  cx="44"
                  cy="44"
                  strokeDasharray={`${(data.overallScore?.score || 0) * 2.4} 1000`}
                />
              </svg>
              <span className={`absolute inset-0 flex items-center justify-center text-2xl font-bold ${getScoreColor(data.overallScore?.score || 0)}`}>
                {data.overallScore?.score || 0}%
              </span>
            </div>
            <p className="text-sm text-center mt-2 text-gray-600 dark:text-gray-300">
              {data.overallScore?.score >= 75 ? "Good Match" : "Needs Improvement"}
            </p>
          </div>
        </div>
        
        {data.overallScore?.explanation && (
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-200">
            {data.overallScore.explanation}
          </div>
        )}
      </div>
      
      {/* Report Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="p-6">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="searchability">Searchability</TabsTrigger>
          <TabsTrigger value="skills">Skills Match</TabsTrigger>
          <TabsTrigger value="recruiterTips">Recruiter Tips</TabsTrigger>
          <TabsTrigger value="saSpecific">SA Specific</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-sa-blue dark:text-white mb-4">
              Match Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Searchability</p>
                <Progress value={data.searchability?.score || 0} className="h-2" />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-gray-500">{data.searchability?.issuesFound || 0} issues found</p>
                  <p className="text-xs font-medium">{data.searchability?.score || 0}%</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Hard Skills</p>
                <Progress value={data.hardSkills?.score || 0} className="h-2" />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-gray-500">{data.hardSkills?.issuesFound || 0} issues found</p>
                  <p className="text-xs font-medium">{data.hardSkills?.score || 0}%</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Soft Skills</p>
                <Progress value={data.softSkills?.score || 0} className="h-2" />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-gray-500">{data.softSkills?.issuesFound || 0} issues found</p>
                  <p className="text-xs font-medium">{data.softSkills?.score || 0}%</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Recruiter Tips</p>
                <Progress value={data.recruiterTips?.score || 0} className="h-2" />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-gray-500">{data.recruiterTips?.issuesFound || 0} issues found</p>
                  <p className="text-xs font-medium">{data.recruiterTips?.score || 0}%</p>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4">
              <h3 className="text-md font-semibold text-sa-blue dark:text-white mb-3">
                Top Recommendations
              </h3>
              <ul className="space-y-2">
                {data.recommendations ? data.recommendations.slice(0, 3).map((rec: any, i: number) => (
                  <li key={i} className="text-sm border-l-2 border-sa-yellow pl-3 py-1">
                    {rec.text || rec}
                  </li>
                )) : (
                  <li className="text-sm text-gray-500">No recommendations available</li>
                )}
              </ul>
            </Card>
            
            <Card className="p-4">
              <h3 className="text-md font-semibold text-sa-blue dark:text-white mb-3">
                Missing Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.hardSkills?.skills?.filter((s: any) => s.resumeCount === "×" || s.resumeCount === 0).slice(0, 6).map((skill: any, i: number) => (
                  <Badge key={i} variant="outline" className="bg-gray-100 dark:bg-gray-700">
                    {skill.skill}
                  </Badge>
                )) || (
                  <p className="text-sm text-gray-500">No missing keywords found</p>
                )}
              </div>
            </Card>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleDownload} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Full Report
            </Button>
          </div>
        </TabsContent>
        
        {/* Searchability Tab */}
        <TabsContent value="searchability" className="space-y-6">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-sa-blue dark:text-white">
                Searchability & ATS Compatibility
              </h3>
              <Badge variant={data.searchability?.issuesFound > 0 ? "destructive" : "default"}>
                {data.searchability?.issuesFound || 0} issues
              </Badge>
            </div>
            
            {data.searchability?.atsTip && (
              <div className="mb-4 p-3 bg-sa-blue/10 dark:bg-sa-blue/20 rounded-lg text-sm">
                <p className="font-medium">ATS Tip:</p>
                <p>{data.searchability.atsTip}</p>
              </div>
            )}
            
            <div className="space-y-4">
              {Object.entries({
                "Contact Information": data.searchability?.contactInformation,
                "Summary": data.searchability?.summary,
                "Section Headings": data.searchability?.sectionHeadings,
                "Job Title Match": data.searchability?.jobTitleMatch,
                "Date Formatting": data.searchability?.dateFormatting,
                "Education Match": data.searchability?.educationMatch,
                "File Type": data.searchability?.fileType
              }).map(([key, value]: [string, any], index) => value && (
                <div key={index} className="border-t pt-3 first:border-t-0 first:pt-0">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getStatusIcon(value?.status)}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{key}</h4>
                        <Badge variant={value?.status === "Found" || value?.status === "Good" ? "outline" : "secondary"}>
                          {value?.status || "Not Found"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {value?.feedback}
                      </p>
                      {value?.recommendation && value.status !== "Found" && value.status !== "Good" && (
                        <p className="text-sm text-sa-blue dark:text-sa-green mt-1">
                          <strong>Recommendation:</strong> {value.recommendation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        {/* Skills Match Tab */}
        <TabsContent value="skills" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hard Skills */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-sa-blue dark:text-white">
                  Hard Skills
                </h3>
                <Badge variant={data.hardSkills?.issuesFound > 0 ? "destructive" : "default"}>
                  {data.hardSkills?.issuesFound || 0} issues
                </Badge>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Skill</TableHead>
                    <TableHead className="w-24">Resume</TableHead>
                    <TableHead className="w-24">Job</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.hardSkills?.skills?.map((skill: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell>{skill.skill}</TableCell>
                      <TableCell className={skill.resumeCount === "×" || skill.resumeCount === 0 ? "text-red-500" : "text-green-500"}>
                        {skill.resumeCount}
                      </TableCell>
                      <TableCell>{skill.jobCount}</TableCell>
                    </TableRow>
                  )) || (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-4 text-gray-500">
                        No hard skills analyzed
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              
              {data.hardSkills?.feedback && (
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm">
                  <p className="font-medium mb-1">Feedback:</p>
                  <p>{data.hardSkills.feedback}</p>
                  {data.hardSkills.recommendation && (
                    <p className="mt-2 text-sa-blue dark:text-sa-green">
                      <strong>Recommendation:</strong> {data.hardSkills.recommendation}
                    </p>
                  )}
                </div>
              )}
            </Card>
            
            {/* Soft Skills */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-sa-blue dark:text-white">
                  Soft Skills
                </h3>
                <Badge variant={data.softSkills?.issuesFound > 0 ? "destructive" : "default"}>
                  {data.softSkills?.issuesFound || 0} issues
                </Badge>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Skill</TableHead>
                    <TableHead className="w-24">Resume</TableHead>
                    <TableHead className="w-24">Job</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.softSkills?.skills?.map((skill: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell>{skill.skill}</TableCell>
                      <TableCell className={skill.resumeCount === "×" || skill.resumeCount === 0 ? "text-red-500" : "text-green-500"}>
                        {skill.resumeCount}
                      </TableCell>
                      <TableCell>{skill.jobCount}</TableCell>
                    </TableRow>
                  )) || (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-4 text-gray-500">
                        No soft skills analyzed
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              
              {data.softSkills?.feedback && (
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm">
                  <p className="font-medium mb-1">Feedback:</p>
                  <p>{data.softSkills.feedback}</p>
                  {data.softSkills.recommendation && (
                    <p className="mt-2 text-sa-blue dark:text-sa-green">
                      <strong>Recommendation:</strong> {data.softSkills.recommendation}
                    </p>
                  )}
                </div>
              )}
            </Card>
          </div>
        </TabsContent>
        
        {/* Recruiter Tips Tab */}
        <TabsContent value="recruiterTips" className="space-y-6">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-sa-blue dark:text-white">
                Recruiter Tips
              </h3>
              <Badge variant={data.recruiterTips?.issuesFound > 0 ? "destructive" : "default"}>
                {data.recruiterTips?.issuesFound || 0} issues
              </Badge>
            </div>
            
            <div className="space-y-4">
              {Object.entries({
                "Job Level Match": data.recruiterTips?.jobLevelMatch,
                "Measurable Results": data.recruiterTips?.measurableResults,
                "Resume Tone": data.recruiterTips?.resumeTone,
                "Web Presence": data.recruiterTips?.webPresence,
                "Word Count": data.recruiterTips?.wordCount
              }).map(([key, value]: [string, any], index) => value && (
                <div key={index} className="border-t pt-3 first:border-t-0 first:pt-0">
                  <h4 className="font-medium text-sa-blue dark:text-white">{key}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    <strong>Observation:</strong> {value?.observation}
                  </p>
                  {value?.recommendation && (
                    <p className="text-sm text-sa-blue dark:text-sa-green mt-1">
                      <strong>Recommendation:</strong> {value.recommendation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        {/* South African Specific Tab */}
        <TabsContent value="saSpecific" className="space-y-6">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-sa-blue dark:text-white">
                South African Market Analysis
              </h3>
            </div>
            
            <div className="space-y-4">
              {Object.entries({
                "B-BBEE Status": data.southAfricanSpecific?.bbbeeStatus,
                "NQF Levels": data.southAfricanSpecific?.nqfLevels,
                "Local Relevance": data.southAfricanSpecific?.localRelevance
              }).map(([key, value]: [string, any], index) => value && (
                <div key={index} className="border-t pt-3 first:border-t-0 first:pt-0">
                  <h4 className="font-medium text-sa-blue dark:text-white">{key}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    <strong>Observation:</strong> {value?.observation}
                  </p>
                  {value?.recommendation && (
                    <p className="text-sm text-sa-blue dark:text-sa-green mt-1">
                      <strong>Recommendation:</strong> {value.recommendation}
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-3 bg-sa-blue/10 dark:bg-sa-blue/20 rounded-lg text-sm">
              <p className="font-medium mb-1">South African Job Market Tips:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Include your B-BBEE status and employment equity status if applicable</li>
                <li>Specify NQF levels for all qualifications</li>
                <li>Mention relevant South African certifications and professional memberships</li>
                <li>Include your ID number (last 3 digits masked for privacy) to confirm citizenship/residency status</li>
              </ul>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex justify-between items-center">
        <Button variant="link" size="sm" className="text-gray-500 dark:text-gray-400" onClick={() => setActiveTab("overview")}>
          Back to overview
        </Button>
        <div className="flex items-center gap-3">
          <Button onClick={handleDownload} variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" /> Download PDF
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <ArrowUpRight className="h-4 w-4" /> Share Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ATSMatchReport;
