
import { jsPDF } from 'jspdf';
import { CVScore, CVTip } from '@/lib/types';
import { trackCVDownload } from "@/services/cv-validation-service";

/**
 * Generates a PDF report based on CV analysis results
 * @param score The CV score object
 * @param tips Recommended improvements
 * @param tier User subscription tier
 */
export const generatePdfReport = (score: CVScore, tips: CVTip[], tier: "free" | "pay-per-use" | "premium") => {
  // Create new PDF document
  const doc = new jsPDF();
  
  // Add title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(30, 58, 138); // SA Blue color
  doc.text("ATSBoost CV Analysis Report", 20, 20);
  
  // Add date
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on ${new Date().toLocaleDateString('en-ZA')}`, 20, 30);
  
  // Add overall score
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(30, 58, 138);
  doc.text("Overall ATS Score", 20, 45);
  
  // Draw score circle
  const scoreColor = score.overall >= 80 ? [5, 150, 105] : score.overall >= 60 ? [251, 191, 36] : [239, 68, 68];
  doc.setFillColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.circle(45, 65, 15, "F");
  
  // Add score number
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text(score.overall.toString(), 45 - (score.overall.toString().length * 2), 69);
  
  // Add score description with more detailed feedback
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  let scoreDescription = "Needs significant improvements for ATS compatibility";
  if (score.overall >= 90) scoreDescription = "Excellent! Your CV is highly ATS-friendly and optimized for South African employers";
  else if (score.overall >= 80) scoreDescription = "Very good ATS compatibility, with minor improvements possible";
  else if (score.overall >= 70) scoreDescription = "Good ATS compatibility, but follow the tips to stand out more";
  else if (score.overall >= 60) scoreDescription = "Fair ATS compatibility - several improvements recommended";
  else if (score.overall >= 50) scoreDescription = "Basic ATS compatibility - significant improvements needed";
  else scoreDescription = "Low ATS compatibility - major revisions recommended";
  
  doc.text(scoreDescription, 70, 69);
  
  // Initialize yPos for later use
  let yPos = 95;
  
  // Add subscore information if premium tier
  if (tier === "premium") {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(30, 58, 138);
    doc.text("Detailed Scores", 20, 95);
    
    yPos = 105;
    
    if (score.keywordMatch !== undefined) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Keyword Match: ${score.keywordMatch}%`, 25, yPos);
      yPos += 8;
    }
    
    if (score.formatting !== undefined) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Formatting: ${score.formatting}%`, 25, yPos);
      yPos += 8;
    }
    
    if (score.sectionPresence !== undefined) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Section Presence: ${score.sectionPresence}%`, 25, yPos);
      yPos += 8;
    }
    
    if (score.readability !== undefined) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Readability: ${score.readability}%`, 25, yPos);
      yPos += 8;
    }
    
    if (score.length !== undefined) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Length: ${score.length}%`, 25, yPos);
      yPos += 8;
    }
    
    // Add South Africa specific score if available
    if (score.saCompliance !== undefined) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`South African Compliance: ${score.saCompliance}%`, 25, yPos);
      yPos += 20;
    } else {
      yPos += 12;
    }
    
    yPos = Math.max(155, yPos);
  } else {
    // For free tier, just jump to recommendations
    yPos = 95;
  }
  
  // Add recommendations
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(30, 58, 138);
  doc.text("Recommendations", 20, tier === "premium" ? 155 : 95);
  
  // For free tier, limit to 2 tips
  const displayTips = tier === "free" ? tips.slice(0, 2) : tips;
  
  yPos = tier === "premium" ? 165 : 105;
  
  displayTips.forEach((tip, index) => {
    // Add priority marker
    const priorityColor = 
      tip.priority === "high" ? [239, 68, 68] : 
      tip.priority === "medium" ? [251, 191, 36] : 
      [59, 130, 246];
    
    doc.setFillColor(priorityColor[0], priorityColor[1], priorityColor[2]);
    doc.circle(25, yPos - 1, 3, "F");
    
    // Add tip title - use title property now
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(30, 58, 138);
    doc.text(tip.title || tip.text, 30, yPos); // Fallback to text if title is not available
    
    // Add tip description - use description property now
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    
    // Wrap text to fit page width
    const textLines = doc.splitTextToSize(tip.description || tip.text, 160); // Fallback to text if description is not available
    doc.text(textLines, 30, yPos + 7);
    
    // Move to next tip position
    yPos += 20 + (textLines.length - 1) * 5;
  });
  
  // Add upsell message for free tier
  if (tier === "free") {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(12);
    doc.setTextColor(30, 58, 138);
    doc.text("Upgrade to Premium for more detailed recommendations and subscore analysis!", 20, yPos + 10);
  }
  
  // Add footer with company info
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text("ATSBoost - Optimize your CV for South African job market", 20, 280);
  
  // Save the PDF
  doc.save(`ATSBoost_CV_Analysis_${new Date().toISOString().split('T')[0]}.pdf`);
};

// Add this function to the file to integrate with our new CV download tracking
export const downloadGeneratedReport = async (reportUrl: string, fileName: string) => {
  try {
    // Track the download for validation in the background
    await trackCVDownload(reportUrl, fileName);
    
    // Continue with download process
    window.open(reportUrl, '_blank');
    return true;
  } catch (error) {
    console.error("Error downloading report:", error);
    return false;
  }
};

// New function to generate varied and realistic CV scores based on input
export const generateRealisticCVScore = (cvText: string, jobDescription?: string): CVScore => {
  // In a real implementation, this would use the Gemini API
  // Here we'll create a more varied scoring algorithm

  // Extract CV characteristics (mock implementation)
  const hasProperFormatting = /^.*(\n.*){10,}$/m.test(cvText);
  const hasKeywords = /(skills|experience|education|qualification|contact|about|summary)/i.test(cvText);
  const hasSAKeywords = /(B-BBEE|NQF|Matric|SAQA|SETA|UNISA|UCT|Wits|Stellenbosch)/i.test(cvText);
  const hasContactInfo = /([0-9]{10}|@|email|phone|tel|contact)/i.test(cvText);
  const properLength = cvText.length > 1500 && cvText.length < 5000;
  
  // Calculate base scores with more variability
  const formatting = hasProperFormatting ? 65 + Math.floor(Math.random() * 25) : 40 + Math.floor(Math.random() * 20);
  const sectionPresence = hasKeywords ? 70 + Math.floor(Math.random() * 20) : 45 + Math.floor(Math.random() * 15);
  const keywordMatch = 50 + Math.floor(Math.random() * 40);
  const readability = 55 + Math.floor(Math.random() * 35);
  const length = properLength ? 75 + Math.floor(Math.random() * 20) : 45 + Math.floor(Math.random() * 25);
  const saCompliance = hasSAKeywords ? 65 + Math.floor(Math.random() * 30) : 40 + Math.floor(Math.random() * 20);
  
  // Calculate overall score based on all factors
  let overall = Math.floor((formatting + sectionPresence + keywordMatch + readability + length + saCompliance) / 6);
  
  // Apply some randomness for realistic variability
  overall = Math.max(30, Math.min(95, overall + (Math.floor(Math.random() * 10) - 5)));
  
  return {
    overall,
    formatting,
    sectionPresence,
    keywordMatch,
    readability,
    length,
    saCompliance
  };
};
