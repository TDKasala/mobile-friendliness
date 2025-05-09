
import { useState, useEffect } from 'react';
import { getJobListings } from "@/services/job-services";
import { sampleJobListings } from "@/services/jobs-data";
import { useToast } from "@/hooks/use-toast";

export type JobListing = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
  requirements: string[];
  externalLinks?: {
    pnet?: string;
    careerJunction?: string;
    linkedin?: string;
    indeed?: string;
    bizcommunity?: string;
    jobmail?: string;
  };
};

export function useJobs() {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load jobs data
  useEffect(() => {
    const loadJobListings = async () => {
      setIsLoading(true);
      try {
        // If using Supabase, we would call the getJobListings service here
        // const { jobs } = await getJobListings(1, 10);
        // setJobs(jobs);
        
        // For now, we'll use the static data
        setJobs(sampleJobListings);
      } catch (error) {
        console.error("Error loading job listings:", error);
        toast({
          title: "Error loading jobs",
          description: "Could not load job listings. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadJobListings();
    
    // Set up a refresh interval - daily refresh
    const refreshInterval = setInterval(() => {
      console.log("Refreshing job listings...");
      loadJobListings();
    }, 24 * 60 * 60 * 1000); // 24 hours
    
    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  return {
    jobs,
    isLoading
  };
}
