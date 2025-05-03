
import { jsPDF } from 'jspdf';
import { CVScore, CVTip } from '@/lib/types';

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
  
  // Add score description
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  let scoreDescription = "Needs improvement";
  if (score.overall >= 80) scoreDescription = "Excellent! Your CV is ATS-friendly";
  else if (score.overall >= 60) scoreDescription = "Good start, but follow the tips to improve further";
  
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
      yPos += 20;
    }
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
    
    // Add tip title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(30, 58, 138);
    doc.text(tip.title, 30, yPos);
    
    // Add tip description
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    
    // Wrap text to fit page width
    const textLines = doc.splitTextToSize(tip.description, 160);
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
