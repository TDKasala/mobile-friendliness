
import { useToast } from "./use-toast";
import { trackCVDownload } from "@/services/cv-validation-service";

interface UseCVDownloadReturn {
  downloadCV: (url: string, fileName: string) => void;
  downloadTemplate: (templateId: string, templateName: string) => void;
}

export function useCVDownload(): UseCVDownloadReturn {
  const { toast } = useToast();
  
  const downloadCV = async (url: string, fileName: string) => {
    try {
      // Start background validation
      trackCVDownload(url, fileName);
      
      // Proceed with download
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Initiated",
        description: "Your CV is being downloaded now.",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading your file. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const downloadTemplate = (templateId: string, templateName: string) => {
    // In a real implementation, this would fetch from storage or server
    const url = `/templates/${templateId}.docx`;
    const fileName = `${templateName.replace(/\s+/g, '-').toLowerCase()}-template.docx`;
    
    // Use the same download function
    downloadCV(url, fileName);
  };
  
  return {
    downloadCV,
    downloadTemplate
  };
}
