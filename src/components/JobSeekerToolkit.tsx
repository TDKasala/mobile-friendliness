
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useConnectionSpeed } from "@/hooks/use-mobile";

interface JobSeekerToolkitProps {
  className?: string;
}

const JobSeekerToolkit = ({ className = "" }: JobSeekerToolkitProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const connectionSpeed = useConnectionSpeed();

  // In a real app, this would call the Supabase function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to backend
    try {
      // This is a placeholder for the actual API call
      await new Promise(resolve => setTimeout(resolve, connectionSpeed === 'slow' ? 1000 : 300));
      
      // Simulate successful API response
      const mockToolkitUrl = "https://example.com/job-seeker-toolkit.pdf";
      setDownloadUrl(mockToolkitUrl);
      
      // Store email in localStorage for demo purposes
      // In a real app, this would be saved to Supabase
      const savedEmails = JSON.parse(localStorage.getItem("toolkit_emails") || "[]");
      localStorage.setItem("toolkit_emails", JSON.stringify([...savedEmails, email]));
      
      toast.success("Thank you! Your toolkit is ready to download");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Toolkit download error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`bg-sa-green/10 rounded-lg border border-sa-green/20 p-4 ${className}`}>
      <h2 className="text-xl font-bold text-sa-blue">Free Job Seeker Toolkit</h2>
      <p className="mt-2 text-sa-gray text-sm mb-4">
        Get our comprehensive toolkit with CV tips, interview advice, and links to South African job boards.
      </p>
      
      {!downloadUrl ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
              className="w-full"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-sa-green hover:bg-sa-green/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Download Toolkit"}
          </Button>
          <p className="text-xs text-sa-gray/70 text-center">
            We'll never share your email with anyone else.
          </p>
        </form>
      ) : (
        <div className="text-center space-y-3">
          <p className="text-sm text-sa-gray">Your toolkit is ready!</p>
          <a 
            href={downloadUrl} 
            download="SA_Job_Seeker_Toolkit.pdf"
            className="block w-full bg-sa-yellow hover:bg-sa-yellow/90 text-sa-blue font-medium py-2 px-4 rounded transition-colors"
          >
            Download Now
          </a>
          <p className="text-xs text-sa-gray/70">
            Can't see the download? <button 
              onClick={() => window.open(downloadUrl, "_blank")}
              className="text-sa-green underline"
            >
              Open in new tab
            </button>
          </p>
        </div>
      )}
      
      <div className="mt-4 border-t border-sa-green/20 pt-3">
        <div className="flex items-center text-xs text-sa-gray">
          <div className="flex-1">
            <span role="img" aria-label="document">📄</span> PDF (Under 1MB)
          </div>
          <div className="flex-1 text-center">
            <span role="img" aria-label="mobile friendly">📱</span> Mobile Friendly
          </div>
          <div className="flex-1 text-right">
            <span role="img" aria-label="free">🆓</span> 100% Free
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerToolkit;
