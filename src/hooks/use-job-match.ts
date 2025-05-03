
import { useState } from 'react';
import { JobMatch } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

export const useJobMatch = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jobMatch, setJobMatch] = useState<JobMatch | null>(null);
  const { toast } = useToast();

  const analyzeJobDescription = (cvText: string, jobDescription: string) => {
    if (!jobDescription.trim()) {
      toast({
        title: "Missing Job Description",
        description: "Please provide a job description to analyze.",
        variant: "destructive"
      });
      return null;
    }

    setIsAnalyzing(true);

    // Simulate API call to analyze job description with Gemini
    // In a real implementation, this would call the backend API
    setTimeout(() => {
      // Mock analysis results
      const mockKeywords = extractMockKeywords(jobDescription);
      const mockMatched = mockKeywords.filter((_, index) => index % 3 !== 0); // Simulate 2/3 keywords matched
      const mockMissing = mockKeywords.filter((_, index) => index % 3 === 0); // Simulate 1/3 keywords missing
      
      const match: JobMatch = {
        score: Math.floor(65 + Math.random() * 20), // Random score between 65-85
        matchedKeywords: mockMatched.map(keyword => ({
          keyword,
          present: true,
          importance: Math.random() > 0.7 ? 'high' : Math.random() > 0.5 ? 'medium' : 'low'
        })),
        missingKeywords: mockMissing.map(keyword => ({
          keyword,
          present: false,
          importance: Math.random() > 0.5 ? 'high' : Math.random() > 0.5 ? 'medium' : 'low'
        })),
        suggestions: [
          `Add "${mockMissing[0]}" to your Skills section`,
          `Expand on your experience with "${mockMatched[0]}"`,
          `Include metrics or outcomes related to "${mockMatched[1]}"`,
          `Consider adding a specific example of "${mockMissing[1] || mockMatched[2]}" in your Work Experience`
        ]
      };
      
      setJobMatch(match);
      setIsAnalyzing(false);
      
      toast({
        title: "Job Match Analysis Complete",
        description: `Your CV has a ${match.score}% match with the job description.`,
      });
    }, 2000);
  };

  // Mock function to extract keywords from job description
  const extractMockKeywords = (jobDescription: string): string[] => {
    // In a real implementation, this would use the Gemini API
    const commonKeywords = [
      "project management", "communication skills", "teamwork",
      "leadership", "problem solving", "critical thinking",
      "time management", "organization", "attention to detail",
      "creativity", "adaptability", "flexibility",
      "customer service", "interpersonal skills", "analytical skills",
      "research", "writing", "presentation skills",
      "budgeting", "forecasting", "strategic planning",
      "data analysis", "reporting", "documentation",
      "negotiation", "conflict resolution", "decision making",
      "SQL", "Python", "JavaScript", "React", "Node.js", "Excel"
    ];
    
    // Select random keywords based on job description length
    const keywordCount = Math.min(10, Math.max(5, Math.floor(jobDescription.length / 100)));
    const shuffled = [...commonKeywords].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, keywordCount);
  };

  return { isAnalyzing, jobMatch, analyzeJobDescription, setJobMatch };
};
