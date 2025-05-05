
import { CVScore, CVTip } from "@/lib/types";
import jsPDF from "jspdf";

// This function generates a score between 60 and 95 based on the CV content
export const generateRealisticCVScore = (cvText: string, jobDescription: string = ""): CVScore => {
  // Start with a base score
  let overallScore = 75;

  // Look for common CV components and adjust score accordingly
  const patterns = {
    contact: /\b(?:email|phone|tel|contact|address)\b/i,
    education: /\b(?:degree|bachelor|master|phd|diploma|certificate|graduated|university|college)\b/i,
    experience: /\b(?:experience|work|job|position|role|responsibilities|employed|manager|supervisor)\b/i,
    skills: /\b(?:skills|proficient|expert|knowledge|familiar with|competent)\b/i,
    achievements: /\b(?:achieved|accomplishment|award|recognition|improved|increased|decreased|reduced)\b/i,
    keywords: /\b(?:analyze|manage|develop|create|implement|coordinate|lead|research|optimize)\b/i,
    formatting: /\b(?:resume|cv|curriculum vitae|professional|profile|summary)\b/i,
  };

  // Count matches for each pattern
  let totalPatternMatches = 0;
  let patternMatchCounts: Record<string, number> = {};

  Object.entries(patterns).forEach(([name, regex]) => {
    const matches = (cvText.match(regex) || []).length;
    patternMatchCounts[name] = matches;
    totalPatternMatches += matches;
  });

  // Calculate the density of pattern matches
  const textLength = cvText.length;
  const matchDensity = totalPatternMatches / (textLength / 100);
  
  // Adjust the score based on pattern density
  if (matchDensity > 2) overallScore += 8;
  else if (matchDensity > 1) overallScore += 4;
  else if (matchDensity < 0.5) overallScore -= 5;

  // Check for specific South African content
  const saPatterns = {
    bbbee: /\b(?:B-BBEE|BEE|Black Economic Empowerment|Employment Equity)\b/i,
    nqf: /\b(?:NQF|National Qualifications Framework|SAQA|South African Qualifications Authority)\b/i,
    local: /\b(?:South Africa|South African|SA|RSA|Cape Town|Johannesburg|Pretoria|Durban)\b/i,
  };
  
  let saScore = 70;
  Object.entries(saPatterns).forEach(([name, regex]) => {
    if (regex.test(cvText)) {
      saScore += 10;
    }
  });
  
  // Ensure saScore stays within reasonable bounds
  saScore = Math.min(Math.max(saScore, 60), 95);

  // Function to create a bounded random float within a range
  const randomInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Calculate section scores with some randomness
  let contactScore = patternMatchCounts.contact > 0 ? randomInRange(75, 95) : randomInRange(50, 70);
  let educationScore = patternMatchCounts.education > 2 ? randomInRange(80, 95) : randomInRange(60, 80);
  let experienceScore = patternMatchCounts.experience > 5 ? randomInRange(80, 95) : randomInRange(60, 80);
  let skillsScore = patternMatchCounts.skills > 3 ? randomInRange(75, 95) : randomInRange(60, 80);
  let formattingScore = patternMatchCounts.formatting > 2 ? randomInRange(80, 95) : randomInRange(60, 80);
  let keywordsScore = patternMatchCounts.keywords > 5 ? randomInRange(75, 95) : randomInRange(55, 75);

  // Factor in CV length - too short or too long is not good
  const wordCount = cvText.split(/\s+/).length;
  if (wordCount < 200) overallScore -= 5;
  else if (wordCount > 1000) overallScore -= 3;
  else if (wordCount > 600 && wordCount <= 1000) overallScore += 2;
  
  // Factor in job description match if provided
  let jobMatchScore = 70;
  if (jobDescription && jobDescription.length > 10) {
    const jobKeywords = jobDescription.toLowerCase().match(/\b\w{4,}\b/g) || [];
    const cvLower = cvText.toLowerCase();
    
    let matchCount = 0;
    jobKeywords.forEach(keyword => {
      if (cvLower.includes(keyword)) matchCount++;
    });
    
    const matchRate = jobKeywords.length > 0 ? (matchCount / jobKeywords.length) : 0;
    jobMatchScore = Math.round(60 + (matchRate * 35));
    
    // Weight the overall score with job match
    overallScore = Math.round((overallScore * 0.7) + (jobMatchScore * 0.3));
  }
  
  // Ensure overall score stays within reasonable bounds
  overallScore = Math.min(Math.max(overallScore, 55), 95);
  
  // Add some random variation
  overallScore += randomInRange(-3, 3);
  contactScore += randomInRange(-5, 5);
  educationScore += randomInRange(-5, 5);
  experienceScore += randomInRange(-5, 5);
  skillsScore += randomInRange(-5, 5);
  formattingScore += randomInRange(-5, 5);
  keywordsScore += randomInRange(-5, 5);
  
  // Final clamping of values
  overallScore = Math.min(Math.max(Math.round(overallScore), 50), 98);
  contactScore = Math.min(Math.max(contactScore, 30), 100);
  educationScore = Math.min(Math.max(educationScore, 40), 100);
  experienceScore = Math.min(Math.max(experienceScore, 40), 100);
  skillsScore = Math.min(Math.max(skillsScore, 40), 100);
  formattingScore = Math.min(Math.max(formattingScore, 40), 100);
  keywordsScore = Math.min(Math.max(keywordsScore, 40), 100);

  return {
    overall: overallScore,
    education: educationScore,
    experience: experienceScore,
    skills: skillsScore,
    formatting: formattingScore,
    keywords: keywordsScore,
    keywordMatch: randomInRange(60, 85),
    readability: randomInRange(65, 90),
    length: randomInRange(70, 90),
    sectionPresence: randomInRange(60, 95)
  };
};

// Add the missing generatePdfReport function
export const generatePdfReport = (score: CVScore, tips: CVTip[], tier: string): void => {
  try {
    // Create a new PDF document
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Add header
    doc.setFillColor(0, 48, 87); // sa-blue in RGB
    doc.rect(0, 0, pageWidth, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('ATSBoost CV Report', pageWidth / 2, 20, { align: 'center' });
    
    // Add score section
    doc.setTextColor(0, 48, 87);
    doc.setFontSize(18);
    doc.text(`Overall ATS Score: ${score.overall}`, 20, 50);
    
    // Add score description
    let scoreDescription = '';
    if (score.overall >= 80) {
      scoreDescription = 'Excellent! Your CV is ATS-friendly.';
    } else if (score.overall >= 60) {
      scoreDescription = 'Good start. Follow our tips to improve further.';
    } else {
      scoreDescription = 'Needs improvement. See our recommendations below.';
    }
    
    doc.setFontSize(12);
    doc.text(scoreDescription, 20, 60);
    
    // Add subscores if premium
    if (tier === 'premium' || tier === 'pay-per-use') {
      doc.setFontSize(14);
      doc.text('Detailed Scores:', 20, 80);
      
      doc.setFontSize(12);
      doc.text(`Keywords: ${score.keywords || score.keywordMatch}%`, 25, 90);
      doc.text(`Formatting: ${score.formatting}%`, 25, 100);
      doc.text(`Education: ${score.education}%`, 25, 110);
      doc.text(`Experience: ${score.experience}%`, 25, 120);
      doc.text(`Skills: ${score.skills}%`, 25, 130);
      doc.text(`Readability: ${score.readability || 75}%`, 25, 140);
      
      // Add section for recommendations
      doc.setFontSize(14);
      doc.text('Improvement Recommendations:', 20, 160);
      
      // Add recommendations
      let yPos = 170;
      tips.forEach((tip, index) => {
        // Check if we need a new page
        if (yPos > pageHeight - 30) {
          doc.addPage();
          yPos = 30;
        }
        
        doc.setFontSize(12);
        doc.setTextColor(0, 48, 87);
        doc.text(`${index + 1}. ${tip.title || tip.text}`, 25, yPos);
        yPos += 10;
        
        // Text wrapping for description
        const splitText = doc.splitTextToSize(tip.description || tip.text, pageWidth - 50);
        doc.setFontSize(10);
        doc.text(splitText, 30, yPos);
        yPos += (splitText.length * 6) + 10;
      });
    } else {
      // Free tier gets minimal information
      doc.setFontSize(14);
      doc.text('Upgrade to Premium for detailed scores and recommendations!', 20, 90);
      
      // Show only 2 tips for free users
      if (tips.length > 0) {
        doc.text('Top Improvement Tips:', 20, 110);
        
        const limitedTips = tips.slice(0, 2);
        let yPos = 120;
        
        limitedTips.forEach((tip, index) => {
          doc.setFontSize(12);
          doc.text(`${index + 1}. ${tip.title || tip.text}`, 25, yPos);
          yPos += 10;
          
          const splitText = doc.splitTextToSize(tip.description || tip.text, pageWidth - 50);
          doc.setFontSize(10);
          doc.text(splitText, 30, yPos);
          yPos += (splitText.length * 6) + 10;
        });
      }
    }
    
    // Add footer
    const footerY = pageHeight - 20;
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text('Generated by ATSBoost - atsboost.co.za', pageWidth / 2, footerY, { align: 'center' });
    doc.text(new Date().toLocaleDateString(), pageWidth - 20, footerY, { align: 'right' });
    
    // Save the PDF
    doc.save('ATSBoost-CV-Report.pdf');
  } catch (error) {
    console.error('Error generating PDF report:', error);
    throw new Error('Failed to generate PDF report');
  }
};
