
import { jsPDF } from 'jspdf';

export const generateJobSeekerToolkitPDF = () => {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(24);
  doc.setTextColor(0, 83, 156); // sa-blue color
  doc.text('South African Job Seeker Toolkit', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text('Prepared by ATSBoost - www.atsboost.co.za', 105, 30, { align: 'center' });
  
  // Section 1: CV Optimization
  doc.setFontSize(16);
  doc.setTextColor(19, 138, 7); // sa-green color
  doc.text('CV Optimization Tips', 20, 45);
  
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  const cvTips = [
    'Use industry-specific keywords relevant to South African job market',
    'Quantify your achievements with specific numbers and results',
    'Include your B-BBEE status if applicable',
    'List relevant NQF qualifications and SAQA-recognized credentials',
    'Keep your CV between 2-3 pages (South African standard)',
    'Use a professional email address and include your LinkedIn profile',
    'Save your CV as a PDF to maintain formatting in ATS systems'
  ];
  
  let yPos = 55;
  cvTips.forEach(tip => {
    doc.text('• ' + tip, 25, yPos);
    yPos += 7;
  });
  
  // Section 2: Job Search Platforms
  yPos += 5;
  doc.setFontSize(16);
  doc.setTextColor(19, 138, 7);
  doc.text('Top South African Job Platforms', 20, yPos);
  yPos += 10;
  
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  const platforms = [
    { name: 'LinkedIn', url: 'www.linkedin.com' },
    { name: 'Careers24', url: 'www.careers24.com' },
    { name: 'Indeed', url: 'www.indeed.co.za' },
    { name: 'PNet', url: 'www.pnet.co.za' },
    { name: 'CareerJunction', url: 'www.careerjunction.co.za' },
    { name: 'JobMail', url: 'www.jobmail.co.za' },
    { name: 'Bizcommunity', url: 'www.bizcommunity.com' }
  ];
  
  platforms.forEach(platform => {
    doc.setTextColor(0, 0, 0);
    doc.text('• ', 25, yPos);
    doc.text(platform.name, 30, yPos);
    doc.setTextColor(0, 0, 255);
    doc.text(platform.url, 65, yPos);
    yPos += 7;
  });
  
  // Section 3: Interview Preparation
  yPos += 5;
  doc.setFontSize(16);
  doc.setTextColor(19, 138, 7);
  doc.text('Interview Preparation', 20, yPos);
  yPos += 10;
  
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  const interviewTips = [
    'Research the company and their position in the South African market',
    'Prepare examples of your achievements using the STAR method',
    'Be ready to discuss how you can contribute to B-BBEE objectives',
    'Understand the company culture and values',
    'Prepare thoughtful questions about the role and company',
    'Practice common interview questions and responses',
    'Plan your outfit and travel route the day before'
  ];
  
  interviewTips.forEach(tip => {
    doc.text('• ' + tip, 25, yPos);
    yPos += 7;
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
  });
  
  // Section 4: Contact Information
  if (yPos > 230) {
    doc.addPage();
    yPos = 20;
  } else {
    yPos += 10;
  }
  
  doc.setFontSize(16);
  doc.setTextColor(19, 138, 7);
  doc.text('Need Further Help?', 20, yPos);
  yPos += 10;
  
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text('Visit our website: www.atsboost.co.za', 25, yPos);
  yPos += 7;
  doc.text('Email: support@atsboost.co.za', 25, yPos);
  yPos += 7;
  doc.text('WhatsApp: +27 123 456 789', 25, yPos);
  
  // Footer
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('© ' + new Date().getFullYear() + ' ATSBoost. All rights reserved.', 105, 285, { align: 'center' });
  
  return doc;
};

export const downloadJobSeekerToolkit = () => {
  const doc = generateJobSeekerToolkitPDF();
  doc.save('SA_Job_Seeker_Toolkit.pdf');
};
