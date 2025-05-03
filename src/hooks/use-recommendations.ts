
import { useState } from 'react';
import { CVScore, CVTip, JobMatch } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

export const useRecommendations = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<CVTip[]>([]);
  const { toast } = useToast();

  const generateRecommendations = (score: CVScore, jobMatch: JobMatch | null, tier: "free" | "pay-per-use" | "premium" = "free") => {
    setIsGenerating(true);
    
    // Simulate API call to generate recommendations with Gemini
    // In a real implementation, this would call the backend API
    setTimeout(() => {
      const tips: CVTip[] = [];
      
      // Generate formatting recommendations based on score
      if (score.formatting && score.formatting < 70) {
        tips.push({
          category: 'Formatting',
          title: 'Improve CV Format',
          description: 'Use a clean, ATS-friendly format with clear section headings and consistent spacing.',
          priority: 'high'
        });
      }
      
      // Generate section presence recommendations
      if (score.sectionPresence && score.sectionPresence < 80) {
        tips.push({
          category: 'Structure',
          title: 'Add Missing Sections',
          description: 'Include all essential CV sections: Professional Summary, Work Experience, Education, Skills, and Contact Information.',
          priority: 'high'
        });
      }
      
      // Generate readability recommendations
      if (score.readability && score.readability < 75) {
        tips.push({
          category: 'Readability',
          title: 'Improve Readability',
          description: 'Use bullet points and short paragraphs to make your CV easier for recruiters and ATS systems to scan.',
          priority: 'medium'
        });
      }
      
      // Generate length recommendations
      if (score.length && score.length < 60) {
        tips.push({
          category: 'Length',
          title: 'Optimize CV Length',
          description: tier === "premium" ? 
            'Your CV is too short. Add more detail to your work experiences, focusing on achievements and responsibilities. Aim for 2-3 pages for experienced professionals.' : 
            'Expand your CV with more relevant details about your experience.',
          priority: 'medium'
        });
      } else if (score.length && score.length < 40) {
        tips.push({
          category: 'Length',
          title: 'CV Too Short',
          description: 'Your CV needs significant expansion. Add more details to all sections.',
          priority: 'high'
        });
      }
      
      // Add South Africa specific recommendations
      tips.push({
        category: 'South Africa',
        title: 'Include B-BBEE Status',
        description: tier === "premium" ? 
          'Add your B-BBEE status in your personal information section. This is important for many South African employers and can give you an advantage in the hiring process.' : 
          'Consider adding your B-BBEE status to your CV.',
        priority: 'medium'
      });
      
      // Add job match recommendations if available
      if (jobMatch) {
        // Add recommendations for missing keywords with high importance
        const highImportanceMissing = jobMatch.missingKeywords.filter(k => k.importance === 'high');
        if (highImportanceMissing.length > 0) {
          const keywords = highImportanceMissing.map(k => k.keyword).join(', ');
          tips.push({
            category: 'Job Match',
            title: 'Add Critical Keywords',
            description: tier === "premium" ? 
              `Add these critical keywords to your CV: ${keywords}. Include them in relevant sections like Skills or Work Experience with specific examples of how you've used these skills.` : 
              `Add these critical keywords to your CV: ${keywords}.`,
            priority: 'high'
          });
        }
        
        // Add recommendation to emphasize matched keywords
        const highImportanceMatched = jobMatch.matchedKeywords.filter(k => k.importance === 'high');
        if (highImportanceMatched.length > 0) {
          const keywords = highImportanceMatched.map(k => k.keyword).join(', ');
          tips.push({
            category: 'Job Match',
            title: 'Emphasize Key Skills',
            description: tier === "premium" ? 
              `Make these matched keywords more prominent: ${keywords}. Consider creating a dedicated "Core Competencies" section at the top of your CV to highlight these skills.` : 
              `Emphasize these important keywords in your CV: ${keywords}.`,
            priority: 'medium'
          });
        }
      }
      
      // For free tier, limit to 2 high-priority recommendations
      let finalTips = [...tips];
      if (tier === "free") {
        finalTips = tips
          .filter(tip => tip.priority === 'high')
          .slice(0, 2);
      } else if (tier === "pay-per-use") {
        // For pay-per-use, give all high and medium priority recommendations
        finalTips = tips.filter(tip => tip.priority !== 'low');
      }
      // Premium gets all recommendations
      
      setRecommendations(finalTips);
      setIsGenerating(false);
      
      toast({
        title: "Recommendations Generated",
        description: "We've analyzed your CV and generated personalized recommendations.",
      });
    }, 1500);
  };

  return { isGenerating, recommendations, generateRecommendations, setRecommendations };
};
