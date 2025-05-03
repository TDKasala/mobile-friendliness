
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Job } from "@/lib/types";
import { Search, Filter } from "lucide-react";

// Mock data for jobs (static data until we connect to backend)
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Software Developer",
    company: "Tech Innovations SA",
    location: "Cape Town, South Africa",
    description: "We're looking for a passionate developer with experience in React and TypeScript to join our growing team. You'll be working on cutting-edge web applications for various South African clients.",
    salary: "R30,000 - R45,000 per month",
    postDate: "2025-04-30",
    jobType: "full-time",
    industry: "Information Technology",
    url: "#",
    logoUrl: "https://source.unsplash.com/random/100x100?tech"
  },
  {
    id: "2",
    title: "Marketing Specialist",
    company: "Brand Masters",
    location: "Johannesburg, South Africa",
    description: "Join our dynamic marketing team and help South African brands reach new heights. Experience with digital marketing and social media campaigns is essential.",
    salary: "R25,000 - R35,000 per month",
    postDate: "2025-05-01",
    jobType: "full-time",
    industry: "Marketing & Advertising",
    url: "#"
  },
  {
    id: "3",
    title: "Customer Service Representative",
    company: "TeleSA",
    location: "Remote, South Africa",
    description: "We are hiring customer service representatives to handle inbound calls and support our customers. Fluency in English and at least one other South African language required.",
    postDate: "2025-05-02",
    jobType: "remote",
    industry: "Customer Service",
    url: "#",
    logoUrl: "https://source.unsplash.com/random/100x100?customer"
  },
  {
    id: "4",
    title: "Financial Analyst",
    company: "SA Investment Group",
    location: "Durban, South Africa",
    description: "Seeking a detail-oriented financial analyst with experience in the South African financial market. CFA qualification preferred but not required.",
    salary: "R35,000 - R50,000 per month",
    postDate: "2025-04-29",
    jobType: "full-time",
    industry: "Finance",
    url: "#",
    logoUrl: "https://source.unsplash.com/random/100x100?finance"
  },
  {
    id: "5",
    title: "Retail Store Manager",
    company: "ShopRight SA",
    location: "Pretoria, South Africa",
    description: "Experienced retail manager needed to oversee daily operations of our flagship store. Previous retail management experience required.",
    salary: "R20,000 - R30,000 per month",
    postDate: "2025-05-03",
    jobType: "full-time",
    industry: "Retail",
    url: "#"
  },
  {
    id: "6",
    title: "Part-time Content Writer",
    company: "Digital Media SA",
    location: "Remote, South Africa",
    description: "We're looking for talented content writers who can create engaging content about South African culture, tourism, and current events.",
    salary: "R250 - R350 per hour",
    postDate: "2025-05-01",
    jobType: "part-time",
    industry: "Media",
    url: "#",
    logoUrl: "https://source.unsplash.com/random/100x100?writing"
  }
];

const JobCard = ({ job }: { job: Job }) => {
  // Calculate days ago for posting date
  const daysAgo = () => {
    const postDate = new Date(job.postDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - postDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 0 ? "Today" : `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="bg-white dark:bg-sa-blue/30 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 dark:border-sa-blue/20 mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center">
        {job.logoUrl && (
          <div className="hidden sm:block mb-4 sm:mb-0 sm:mr-4">
            <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100">
              <img src={job.logoUrl} alt={`${job.company} logo`} className="w-full h-full object-cover" />
            </div>
          </div>
        )}
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-sa-blue dark:text-white mb-1">{job.title}</h3>
          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-sa-gray dark:text-gray-300">
            <span className="font-medium">{job.company}</span>
            <span className="hidden sm:inline mx-2">•</span>
            <span>{job.location}</span>
          </div>
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-4 flex flex-col sm:items-end">
          <Badge variant="outline" className="mb-2 text-xs">
            {job.jobType.replace("-", " ")}
          </Badge>
          <span className="text-xs text-sa-gray dark:text-gray-300">{daysAgo()}</span>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sa-gray dark:text-gray-300 text-sm line-clamp-3">{job.description}</p>
      </div>

      {job.salary && (
        <div className="mt-3">
          <span className="text-sm font-medium text-sa-green dark:text-sa-green/90">{job.salary}</span>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" className="bg-sa-blue hover:bg-sa-blue/90 text-white">
          View Details
        </Button>
        <Button size="sm" variant="outline" className="border-sa-green text-sa-green hover:bg-sa-green/10">
          Match My CV
        </Button>
      </div>
    </div>
  );
};

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState<string>("");
  const [jobTypeFilter, setJobTypeFilter] = useState<string>("");

  // Get unique industries for filter
  const industries = useMemo(() => {
    const uniqueIndustries = new Set(mockJobs.map(job => job.industry));
    return Array.from(uniqueIndustries);
  }, []);

  // Filter jobs based on search query and filters
  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      const matchesSearch = searchQuery === "" || 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesIndustry = industryFilter === "" || job.industry === industryFilter;
      const matchesJobType = jobTypeFilter === "" || job.jobType === jobTypeFilter;
      
      return matchesSearch && matchesIndustry && matchesJobType;
    });
  }, [searchQuery, industryFilter, jobTypeFilter]);

  const [isSticky, setIsSticky] = useState(false);

  // Handle scroll to make filter bar sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-sa-blue dark:text-white mb-2">South African Job Listings</h1>
            <p className="text-sa-gray dark:text-gray-300">
              Find your next career opportunity and match your CV to available positions
            </p>
          </div>

          {/* Search and filters */}
          <div 
            className={`bg-white dark:bg-sa-blue/30 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-sa-blue/20 mb-6
            ${isSticky ? 'sticky top-16 z-20 shadow-md' : ''}`}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sa-gray h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search jobs, companies, or keywords"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Industries</SelectItem>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon" className="h-10 w-10 sm:hidden">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-4">
            <p className="text-sa-gray dark:text-gray-300 text-sm">
              Found <span className="font-medium">{filteredJobs.length}</span> jobs matching your criteria
            </p>
          </div>

          {/* Job listings */}
          <div className="mb-8">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <div className="bg-white dark:bg-sa-blue/30 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-sa-blue/20 text-center">
                <p className="text-sa-gray dark:text-gray-300">No jobs found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Jobs;
