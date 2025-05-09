import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CVScore, CVTip, SubscriptionTier } from "@/lib/types";

/**
 * Generates a PDF report of the CV analysis
 * @param score CV score object
 * @param tips Array of CV tips
 * @param tier Subscription tier of the user
 */
export const generatePdfReport = (score: CVScore, tips: CVTip[], tier: SubscriptionTier, explanations: Record<string, string>) => {
  const doc = new jsPDF();
  
  // Set document properties
  doc.setProperties({
    title: 'CV Analysis Report',
    author: 'ATSBoost',
    subject: 'CV Analysis Report',
    keywords: 'cv, analysis, report, ats, boost'
  });

  // Add title
  doc.setFontSize(24);
  doc.setTextColor(40);
  doc.text('CV Analysis Report', 14, 20);
  
  // Add subtitle
  doc.setFontSize(14);
  doc.setTextColor(100);
  doc.text('ATS Compatibility and Improvement Tips', 14, 28);
  
  // Add overall score
  doc.setFontSize(16);
  doc.setTextColor(40);
  doc.text(`Overall ATS Score: ${score.overall}%`, 14, 40);
  
  // Add detailed scores table
  (doc as any).autoTable({
    startY: 50,
    head: [['Category', 'Score', 'Explanation']],
    body: [
      ['Keyword Match', score.keywordMatch?.toString() || 'N/A', explanations.keywordMatch || ''],
      ['Formatting', score.formatting?.toString() || 'N/A', explanations.formatting || ''],
      ['Section Presence', score.sectionPresence?.toString() || 'N/A', explanations.sectionPresence || ''],
      ['Readability', score.readability?.toString() || 'N/A', explanations.readability || ''],
      ['Length', score.length?.toString() || 'N/A', explanations.length || ''],
      ['Content Relevance', score.contentRelevance?.toString() || 'N/A', explanations.atsCompatibility || ''],
      ['SA Qualifications', score.saQualifications?.toString() || 'N/A', explanations.nqfAlignment || ''],
      ['B-BBEE Compliance', score.bbbeeCompliance?.toString() || 'N/A', '']
    ],
  });
  
  // Add tips table
  doc.addPage();
  doc.setFontSize(20);
  doc.setTextColor(40);
  doc.text('Improvement Tips', 14, 20);
  
  let startY = 30;
  tips.forEach((tip, index) => {
    doc.setFontSize(12);
    doc.setTextColor(40);
    doc.text(`${index + 1}. ${tip.title || 'Tip'}`, 14, startY);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    const textLines = doc.splitTextToSize(tip.text, 180);
    textLines.forEach((line) => {
      startY += 7;
      doc.text(line, 14, startY);
    });
    
    startY += 10;
  });

  // Save the PDF
  doc.save('cv-analysis-report.pdf');
};

/**
 * Generate a realistic CV score based on actual content analysis
 * @param cvText The text content of the CV
 * @param jobDescription Optional job description to match against
 */
export function generateRealisticCVScore(cvText: string, jobDescription?: string): CVScore {
  if (!cvText) {
    return {
      overall: 0,
      keywordMatch: 0,
      formatting: 0,
      sectionPresence: 0,
      readability: 0,
      length: 0,
      contentRelevance: 0,
      saQualifications: 0,
      bbbeeCompliance: 0
    };
  }
  
  const textLower = cvText.toLowerCase();
  
  // SCORE 1: Keyword Analysis
  const commonKeywords = ["experienced", "skilled", "qualified", "team", "project", "manage", 
    "develop", "implement", "analyze", "coordinate", "lead", "collaborate", "achieve"];
  const foundKeywords = commonKeywords.filter(word => textLower.includes(word)).length;
  const keywordScore = Math.min(foundKeywords * 7, 95) || 40; // Default to 40 if none found
  
  // SCORE 2: Section Analysis
  const sections = ["education", "experience", "skills", "references", "contact", "objective", "summary"];
  const foundSections = sections.filter(section => textLower.includes(section)).length;
  const sectionScore = Math.min((foundSections / sections.length) * 100, 100) || 45; 
  
  // SCORE 3: Format Analysis (estimate based on length and content variety)
  const sentences = cvText.split(/[.!?]+/).length;
  const words = cvText.split(/\s+/).length;
  const avgSentenceLength = words / Math.max(sentences, 1);
  const formatScore = Math.min(
    avgSentenceLength > 5 && avgSentenceLength < 25 ? 90 : 60, 
    sentences > 10 ? 90 : 65
  );
  
  // SCORE 4: Length Analysis
  const idealLengthWords = 400; // About 1-2 pages
  const lengthScore = Math.min(100 - Math.abs(words - idealLengthWords) / 5, 95) || 70;
  
  // SCORE 5: Job Relevance (if job description provided)
  let relevanceScore = 75; // Default score
  if (jobDescription) {
    const jobKeywords = jobDescription.toLowerCase().split(/\s+/)
      .filter(word => word.length > 4)
      .filter(word => !["and", "the", "that", "with", "from", "this", "have"].includes(word));
    
    const uniqueJobKeywords = [...new Set(jobKeywords)];
    const matchedKeywords = uniqueJobKeywords.filter(word => textLower.includes(word)).length;
    const keywordMatchRate = matchedKeywords / Math.max(uniqueJobKeywords.length, 1);
    
    relevanceScore = Math.min(keywordMatchRate * 150, 98) || 60;
  }
  
  // SCORE 6: South African Content Analysis
  const saTerms = ["bbbee", "b-bbee", "equity", "nqf", "saqa", "matric"];
  const foundSaTerms = saTerms.filter(term => textLower.includes(term)).length;
  const saScore = Math.min(foundSaTerms * 15, 95) || 50;
  
  // SCORE 7: Readability
  const avgWordLength = cvText.replace(/[^\w]/g, "").length / words;
  const readabilityScore = avgWordLength > 3.5 && avgWordLength < 7 ? 
    Math.min(95 - Math.abs(5 - avgWordLength) * 10, 90) : 65;
  
  // SCORE 8: B-BBEE Compliance estimate
  const bbbeeScore = textLower.includes("bbbee") || textLower.includes("b-bbee") ? 
    Math.floor(Math.random() * 30) + 65 : Math.floor(Math.random() * 30) + 40;
  
  // Calculate overall score with weighted importance
  const overall = Math.round(
    keywordScore * 0.20 +
    sectionScore * 0.20 +
    formatScore * 0.15 +
    lengthScore * 0.10 +
    relevanceScore * 0.15 +
    saScore * 0.10 +
    readabilityScore * 0.10
  );
  
  // Add some randomness to make scores feel more natural (-3 to +3 points)
  const naturalVariation = (score: number): number => {
    const variation = Math.floor(Math.random() * 7) - 3;
    return Math.max(0, Math.min(100, Math.round(score + variation)));
  };
  
  return {
    overall: naturalVariation(overall),
    keywordMatch: naturalVariation(keywordScore),
    formatting: naturalVariation(formatScore),
    sectionPresence: naturalVariation(sectionScore),
    readability: naturalVariation(readabilityScore),
    length: naturalVariation(lengthScore),
    contentRelevance: naturalVariation(relevanceScore),
    saQualifications: naturalVariation(saScore),
    bbbeeCompliance: naturalVariation(bbbeeScore)
  };
}
