import { CVScore, CVTip } from "@/lib/types";
import jsPDF from "jspdf";
import 'jspdf-autotable';

// Generate a PDF report from the ATS Match analysis
export const generateATSMatchReportPDF = (reportData: any): void => {
  try {
    // Create a new PDF document
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Add header
    doc.setFillColor(0, 48, 87); // sa-blue in RGB
    doc.rect(0, 0, pageWidth, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('ATSBoost Match Report', pageWidth / 2, 20, { align: 'center' });
    
    // Add report title and company info
    doc.setTextColor(0, 48, 87);
    doc.setFontSize(16);
    doc.text(`Job: ${reportData.jobTitle || 'Not specified'}`, 20, 50);
    if (reportData.company) {
      doc.setFontSize(14);
      doc.text(`Company: ${reportData.company}`, 20, 60);
    }
    
    // Add overall score
    doc.setFontSize(18);
    doc.text(`ATS Match Score: ${reportData.overallScore?.score || 0}%`, 20, 75);
    
    // Add score explanation
    if (reportData.overallScore?.explanation) {
      doc.setFontSize(12);
      const splitExplanation = doc.splitTextToSize(reportData.overallScore.explanation, pageWidth - 40);
      doc.text(splitExplanation, 20, 85);
    }
    
    // Add searchability section
    doc.setFontSize(16);
    doc.text('Searchability & ATS Compatibility', 20, 110);
    
    if (reportData.searchability) {
      let yPos = 120;
      
      doc.setFontSize(12);
      doc.text(`Score: ${reportData.searchability.score || 0}% - ${reportData.searchability.issuesFound || 0} issues found`, 25, yPos);
      yPos += 10;
      
      if (reportData.searchability.atsTip) {
        doc.text(`ATS Tip: ${reportData.searchability.atsTip}`, 25, yPos);
        yPos += 10;
      }
      
      // Add hard skills section
      yPos += 10;
      doc.setFontSize(16);
      doc.text('Hard Skills', 20, yPos);
      yPos += 10;
      
      if (reportData.hardSkills && reportData.hardSkills.skills && reportData.hardSkills.skills.length > 0) {
        // Create skills table
        const tableData = reportData.hardSkills.skills.map((skill: any) => [
          skill.skill,
          skill.resumeCount === "×" || skill.resumeCount === 0 ? "Missing" : skill.resumeCount,
          skill.jobCount
        ]);
        
        (doc as any).autoTable({
          startY: yPos,
          head: [['Skill', 'Resume', 'Job']],
          body: tableData,
          theme: 'striped',
          headStyles: { fillColor: [0, 48, 87] },
          margin: { top: 20, right: 20, bottom: 20, left: 20 }
        });
        
        yPos = (doc as any).lastAutoTable.finalY + 15;
      } else {
        doc.setFontSize(12);
        doc.text("No hard skills data available", 25, yPos);
        yPos += 15;
      }
      
      // Add recommendations
      doc.addPage();
      doc.setFontSize(16);
      doc.text('Top Recommendations', 20, 30);
      
      if (reportData.recommendations && reportData.recommendations.length > 0) {
        let recYPos = 45;
        
        reportData.recommendations.forEach((rec: any, idx: number) => {
          doc.setFontSize(12);
          const text = typeof rec === 'string' ? rec : rec.text || '';
          const splitRec = doc.splitTextToSize(`${idx + 1}. ${text}`, pageWidth - 40);
          
          doc.text(splitRec, 25, recYPos);
          recYPos += splitRec.length * 8 + 10;
          
          // Check if we need to add a new page
          if (recYPos > 250) {
            doc.addPage();
            recYPos = 30;
          }
        });
      } else {
        doc.setFontSize(12);
        doc.text("No recommendations available", 25, 45);
      }
    }
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text('Generated by ATSBoost - https://atsboost.co.za', pageWidth / 2, 285, { align: 'center' });
    
    // Save the PDF
    doc.save('ats-match-report.pdf');
    
  } catch (error) {
    console.error('Error generating ATS Match Report PDF:', error);
    throw new Error('Failed to generate PDF report');
  }
};

// Export the standard CV report generator (keep existing function)
export const generatePdfReport = (score: CVScore, tips: CVTip[], tier: string, explanations?: Record<string, string>): void => {
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
    
    // Add subscores with detailed explanations if premium
    if (tier === 'premium' || tier === 'pay-per-use') {
      doc.setFontSize(14);
      doc.text('Detailed Scores:', 20, 80);
      
      doc.setFontSize(12);
      let yPos = 90;
      
      // Display all available scores with explanations
      const scoreCategories = [
        { key: 'keywordMatch', label: 'Keywords' },
        { key: 'formatting', label: 'Formatting' },
        { key: 'sectionPresence', label: 'Section Presence' },
        { key: 'readability', label: 'Readability' },
        { key: 'length', label: 'Length' },
        { key: 'bbbeeCompliance', label: 'B-BBEE Compliance' },
        { key: 'contentRelevance', label: 'Content Relevance' }
      ];
      
      scoreCategories.forEach(category => {
        if (score[category.key] !== undefined) {
          // Add score with bold label
          doc.setFont(undefined, 'bold');
          doc.text(`${category.label}: ${score[category.key]}%`, 25, yPos);
          yPos += 10;
          
          // Add explanation if available
          if (explanations && explanations[category.key]) {
            doc.setFont(undefined, 'normal');
            const splitExplanation = doc.splitTextToSize(explanations[category.key], pageWidth - 60);
            doc.text(splitExplanation, 30, yPos);
            yPos += (splitExplanation.length * 6) + 5;
          } else {
            // Default explanations if not available from API
            doc.setFont(undefined, 'normal');
            let defaultExplanation = "";
            
            switch (category.key) {
              case 'keywordMatch':
                defaultExplanation = "This score measures how well your CV includes industry-specific keywords that ATS systems look for.";
                break;
              case 'formatting':
                defaultExplanation = "This score evaluates the structure and layout of your CV for optimal ATS scanning.";
                break;
              case 'sectionPresence':
                defaultExplanation = "This score indicates whether your CV includes all the standard sections expected by employers.";
                break;
              case 'readability':
                defaultExplanation = "This score measures how easy your CV is to read and understand.";
                break;
              case 'length':
                defaultExplanation = "This score evaluates if your CV is an appropriate length (typically 1-2 pages).";
                break;
              case 'bbbeeCompliance':
                defaultExplanation = "This score indicates how well your CV addresses South African B-BBEE requirements.";
                break;
              case 'contentRelevance':
                defaultExplanation = "This score measures how relevant your CV content is to your target positions.";
                break;
              default:
                defaultExplanation = `This score evaluates the ${category.label.toLowerCase()} aspect of your CV.`;
            }
            
            const splitDefault = doc.splitTextToSize(defaultExplanation, pageWidth - 60);
            doc.text(splitDefault, 30, yPos);
            yPos += (splitDefault.length * 6) + 5;
          }
          
          // Add spacing between categories
          yPos += 5;
          
          // Check if we need a new page
          if (yPos > pageHeight - 50) {
            doc.addPage();
            yPos = 30;
          }
        }
      });
      
      // Add section for recommendations
      doc.setFontSize(14);
      doc.text('Improvement Recommendations:', 20, yPos + 10);
      
      // Add recommendations
      yPos += 20;
      tips.forEach((tip, index) => {
        // Check if we need a new page
        if (yPos > pageHeight - 50) {
          doc.addPage();
          yPos = 30;
        }
        
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 48, 87);
        doc.text(`${index + 1}. ${tip.title || tip.text}`, 25, yPos);
        yPos += 10;
        
        // Add priority indicator
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text(`Priority: ${tip.priority.toUpperCase()}`, 30, yPos);
        yPos += 8;
        
        // Text wrapping for description
        doc.setFontSize(11);
        const splitText = doc.splitTextToSize(tip.description || tip.text, pageWidth - 50);
        doc.text(splitText, 30, yPos);
        yPos += (splitText.length * 6) + 15;
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
          doc.setFont(undefined, 'bold');
          doc.text(`${index + 1}. ${tip.title || tip.text}`, 25, yPos);
          yPos += 10;
          
          doc.setFontSize(10);
          doc.setFont(undefined, 'normal');
          doc.text(`Priority: ${tip.priority.toUpperCase()}`, 30, yPos);
          yPos += 8;
          
          const splitText = doc.splitTextToSize(tip.description || tip.text, pageWidth - 50);
          doc.setFontSize(11);
          doc.text(splitText, 30, yPos);
          yPos += (splitText.length * 6) + 15;
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
