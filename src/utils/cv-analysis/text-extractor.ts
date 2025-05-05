
/**
 * Utility functions for extracting text from CV files
 */

/**
 * Extracts text content from different file types with enhanced CV patterns
 * @param file File to extract text from
 * @returns Promise with extracted text
 */
export const extractTextFromFile = async (file: File): Promise<string> => {
  // In a production environment, this would use a more robust solution
  // Here we'll simulate extracting text from different file types
  if (file.type === 'text/plain') {
    return await file.text();
  }
  
  // For other file types, in production you would send to serverless function
  // with PyMuPDF (for PDFs), python-docx (for DOCX), and odfpy (for ODT)
  
  // Mock content extraction with more sophisticated detection
  const fileName = file.name.toLowerCase();
  let fileContent = "";
  
  try {
    // For PDF files, try to get some content as ArrayBuffer and extract some text
    // This is a simplified mock, in production you'd use proper extraction libraries
    if (fileName.endsWith('.pdf')) {
      const buffer = await file.arrayBuffer();
      // Just checking if we can read the file
      if (buffer.byteLength > 0) {
        // In production this would use PyMuPDF or similar
        fileContent = `PDF content extracted from ${fileName}`;
      }
    } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
      // In production this would use python-docx or similar
      fileContent = `DOCX/DOC content extracted from ${fileName}`;
    } else if (fileName.endsWith('.odt')) {
      // In production this would use odfpy or similar
      fileContent = `ODT content extracted from ${fileName}`;
    } else {
      // Try to read as text for other formats
      fileContent = await file.text().catch(() => "");
    }
  } catch (e) {
    console.error("Error extracting text from file:", e);
  }
  
  // If we couldn't extract any content, generate mock text based on filename
  // This simulates what we might find in different types of CVs
  if (!fileContent) {
    // Generate mock text based on filename to simulate different CV qualities
    // For South African context with B-BBEE levels, NQF qualifications, etc.
    if (fileName.includes('senior') || fileName.includes('manager')) {
      fileContent = `Curriculum Vitae
        Personal Information:
        Name: John Smith
        Email: email@example.com
        Phone: +27 82 123 4567
        
        Professional Summary:
        Senior professional with 10+ years experience in industry leadership.
        B-BBEE Level 2 contributor with transformation experience.
        
        Education:
        NQF Level 8 qualification from University of Cape Town
        
        Skills:
        Strategic planning, team management, budget oversight, stakeholder communication
        
        Work Experience:
        Standard Bank - Senior Manager (2018-Present)
        Vodacom - Team Leader (2015-2018)
        
        References available upon request.`;
    } else if (fileName.includes('graduate') || fileName.includes('junior')) {
      fileContent = `CV - Jane Ndlovu
        Contact: email@example.com | +27 71 987 6543
        
        Objective:
        Recent graduate seeking entry-level position in marketing.
        
        Education:
        National Diploma (NQF Level 6) from UNISA
        Completed Matric with distinction
        
        Skills:
        MS Office, communication, analytical thinking
        
        Work Experience:
        Intern at Cape Media (Jan-June 2023)
        
        B-BBEE Status: Level 4
        
        References available upon request.`;
    } else {
      fileContent = `Resume
        Name: Alex Moyo
        Contact: alex@example.com | +27 83 456 7890
        
        Profile:
        Professional with 5 years experience in IT sector.
        
        Education:
        Bachelor's degree from Wits University
        
        Technical Skills:
        Java, Python, SQL, Cloud platforms
        
        Employment History:
        Software Developer - Dimension Data (2020-Present)
        Junior Developer - Standard Bank (2018-2020)
        
        Certifications:
        AWS Solutions Architect
        Microsoft Azure Fundamentals`;
    }
  }
  
  return fileContent;
};
