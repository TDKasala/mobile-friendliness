
import { useState } from "react";
import { JobMatch, KeywordMatch } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

/**
 * This hook handles matching CV content against job descriptions
 */
export function useJobMatch() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jobMatch, setJobMatch] = useState<JobMatch | null>(null);
  const { toast } = useToast();

  /**
   * Analyze job description against CV
   */
  const analyzeJobDescription = async (cvName: string, jobDescription: string) => {
    if (!jobDescription || jobDescription.trim().length < 10) {
      return;
    }

    setIsAnalyzing(true);

    try {
      // In a real application, this would be an API call
      // Here we'll simulate job matching

      // Wait a short time to simulate processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate keywords from job description
      const keywords = extractKeywords(jobDescription);
      
      // Mock matching against the CV content
      const matchedKeywords: KeywordMatch[] = keywords.map(keyword => ({
        keyword: keyword,
        present: Math.random() > 0.3, // 70% chance of matching for demo
        importance: Math.random() > 0.5 ? "high" : "medium" 
      }));

      const missingKeywords = matchedKeywords
        .filter(k => !k.present)
        .map(k => k.keyword);

      // Generate recommendations
      const recommendations = [
        "Add missing keywords to your CV to improve ATS matching",
        "Consider adding a skills section with the missing keywords",
        "Tailor your CV specifically to this job description"
      ];

      setJobMatch({
        score: Math.floor(Math.random() * 30) + 50, // Score between 50-80
        matches: matchedKeywords.map(k => ({ 
          keyword: k.keyword,
          present: k.present
        })),
        missingKeywords,
        recommendations,
        matchedKeywords: matchedKeywords,
        suggestions: generateKeywordSuggestions(missingKeywords)
      });

      toast({
        title: "Job Match Analysis Complete",
        description: "We've analyzed your CV against the job description."
      });
    } catch (error) {
      console.error("Error analyzing job match:", error);
      toast({
        title: "Analysis Error",
        description: "There was a problem analyzing your job match.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    isAnalyzing,
    jobMatch,
    analyzeJobDescription
  };
}

/**
 * Extract keywords from job description
 */
function extractKeywords(jobDescription: string): string[] {
  // In a real app, use NLP to extract keywords
  // Here we'll just use simple word frequency
  const text = jobDescription.toLowerCase();
  const words = text.match(/\b[a-z]{3,}\b/g) || [];
  const wordCount: Record<string, number> = {};
  
  words.forEach(word => {
    if (![
      "and", "the", "for", "with", "that", "have", "this", "from", "you", "will",
      "not", "are", "our", "all", "your", "has", "can", "who", "been", "were", "they"
    ].includes(word)) {
      wordCount[word] = (wordCount[word] || 0) + 1;
    }
  });
  
  return Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(entry => entry[0]);
}

/**
 * Generate suggestions for adding missing keywords
 */
function generateKeywordSuggestions(missingKeywords: string[]): string[] {
  if (missingKeywords.length === 0) return [];
  
  return missingKeywords.map(keyword => 
    `Consider adding "${keyword}" to your skills or experience sections`
  );
}
