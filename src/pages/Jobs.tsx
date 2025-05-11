
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import { useJobMatch } from "@/hooks/use-job-match";
import JobMatchResults from "@/components/JobMatchResults";
import JobFilters from "@/components/jobs/JobFilters";
import JobListingCard from "@/components/jobs/JobListingCard";
import { useJobs } from "@/hooks/use-jobs";

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [selectedJobDescription, setSelectedJobDescription] = useState("");
  const { isAnalyzing, jobMatch, analyzeJobDescription } = useJobMatch();
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const { jobs, isLoading } = useJobs();

  const filteredJobs = jobs.filter(job => {
    const matchesQuery = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = location === "" || location === "all" || job.location === location;
    
    const matchesJobType = jobType === "" || jobType === "all" || job.type === jobType;
    
    return matchesQuery && matchesLocation && matchesJobType;
  });

  const handleJobMatch = (jobDescription: string, jobTitle: string, company: string) => {
    setSelectedJobDescription(jobDescription);
    setSelectedJobTitle(jobTitle);
    setSelectedCompany(company);
    analyzeJobDescription("Your CV", jobDescription);
  };

  const allLocations = [...new Set(jobs.map(job => job.location))];
  const allJobTypes = [...new Set(jobs.map(job => job.type))];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Job Listings | ATSBoost</title>
        <meta name="description" content="Browse South African job opportunities and see how well your CV matches specific positions." />
      </Helmet>
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-sa-blue mb-4 md:mb-0">Job Listings</h1>
              <Link to="/#analyze-cv">
                <Button className="bg-sa-green hover:bg-sa-green/90 text-white">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Analyze My CV
                </Button>
              </Link>
            </div>
            
            <JobFilters 
              searchQuery={searchQuery}
              location={location}
              jobType={jobType}
              allLocations={allLocations}
              allJobTypes={allJobTypes}
              onSearchChange={setSearchQuery}
              onLocationChange={setLocation}
              onJobTypeChange={setJobType}
            />
            
            {selectedJobDescription && jobMatch && (
              <div className="mb-6">
                <JobMatchResults 
                  jobTitle={selectedJobTitle}
                  company={selectedCompany}
                  jobMatch={jobMatch} 
                  onClose={() => setSelectedJobDescription("")}
                  isLoading={isAnalyzing}
                />
              </div>
            )}
            
            <div className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sa-blue"></div>
                </div>
              ) : filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobListingCard 
                    key={job.id} 
                    job={job} 
                    onMatchCV={handleJobMatch} 
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-sa-gray">No jobs found matching your criteria</h3>
                  <p className="mt-2">Try adjusting your search filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Jobs;
