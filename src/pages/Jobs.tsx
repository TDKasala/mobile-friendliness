import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MapPin, Calendar, Search, Building, Clock, Filter } from "lucide-react";
import { JobMatch } from "@/lib/types";
import { useJobMatch } from "@/hooks/use-job-match";
import JobMatchResults from "@/components/JobMatchResults";

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedJobDescription, setSelectedJobDescription] = useState("");
  const { isAnalyzing, jobMatch, analyzeJobDescription } = useJobMatch();
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  // Jobs data (in a real app, this would come from an API)
  const jobs = [
    {
      id: "1",
      title: "Frontend Developer",
      company: "TechSA Solutions",
      location: "Cape Town",
      type: "Full-time",
      salary: "R30,000 - R45,000 per month",
      posted: "2 days ago",
      description: "We are looking for an experienced Frontend Developer with strong React skills to join our team in Cape Town. The ideal candidate should have 3+ years of experience with modern JavaScript frameworks, particularly React. Experience with TypeScript, Next.js, and TailwindCSS is a plus. You'll be working on innovative web applications for our diverse client base across South Africa.",
      requirements: ["3+ years experience with React", "Strong JavaScript fundamentals", "Experience with responsive design", "Knowledge of REST APIs", "Bachelor's degree in Computer Science or related field"]
    },
    {
      id: "2",
      title: "Financial Accountant",
      company: "National Bank Group",
      location: "Johannesburg",
      type: "Full-time",
      salary: "R35,000 - R50,000 per month",
      posted: "1 week ago",
      description: "National Bank Group is seeking a qualified Financial Accountant to join our Johannesburg office. The successful candidate will be responsible for preparing financial statements, maintaining accounting records, and ensuring compliance with South African financial regulations. You should have a strong understanding of IFRS and experience with financial reporting in the banking sector.",
      requirements: ["CA(SA) qualification", "3-5 years experience in financial accounting", "Knowledge of IFRS", "Experience with financial reporting software", "Attention to detail and analytical mindset"]
    },
    {
      id: "3",
      title: "Marketing Specialist",
      company: "Retail Innovations",
      location: "Durban",
      type: "Contract",
      salary: "R25,000 - R35,000 per month",
      posted: "3 days ago",
      description: "Retail Innovations is looking for a Marketing Specialist to develop and implement marketing strategies for our retail clients in Durban. The ideal candidate should have experience in digital marketing, campaign management, and market research. Knowledge of the South African retail landscape is essential. This is a 12-month contract position with possibility of extension.",
      requirements: ["Bachelor's degree in Marketing or related field", "3+ years experience in marketing", "Digital marketing expertise", "Campaign management experience", "Strong analytical and communication skills"]
    },
    {
      id: "4",
      title: "Operations Manager",
      company: "LogiSA Freight",
      location: "Pretoria",
      type: "Full-time",
      salary: "R40,000 - R55,000 per month",
      posted: "5 days ago",
      description: "LogiSA Freight is seeking an experienced Operations Manager to oversee our logistics operations in Pretoria. The successful candidate will be responsible for managing day-to-day operations, optimizing processes, and ensuring efficient service delivery. Experience in the logistics or transportation industry is essential, with a focus on South African supply chain challenges.",
      requirements: ["5+ years experience in operations management", "Knowledge of logistics and supply chain processes", "Strong leadership and team management skills", "Problem-solving abilities", "Bachelor's degree in Business, Logistics, or related field"]
    },
    {
      id: "5",
      title: "Human Resources Officer",
      company: "Healthcare Partners",
      location: "Bloemfontein",
      type: "Part-time",
      salary: "R15,000 - R20,000 per month",
      posted: "1 day ago",
      description: "Healthcare Partners requires a part-time Human Resources Officer for our Bloemfontein office. Responsibilities include recruitment, employee relations, and HR administration. The ideal candidate should have knowledge of South African labour law and experience in the healthcare sector. This position requires 20 hours per week with flexible scheduling.",
      requirements: ["HR qualification or relevant degree", "2+ years HR experience", "Knowledge of SA labour laws", "Experience with HR software", "Good communication and interpersonal skills"]
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesQuery = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = location === "" || job.location === location;
    
    const matchesJobType = jobType === "" || job.type === jobType;
    
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
      
      <Header />
      
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
            
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    type="text" 
                    placeholder="Search jobs or companies"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <SelectValue placeholder="All Locations" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {allLocations.map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      <SelectValue placeholder="All Job Types" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Job Types</SelectItem>
                    {allJobTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
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
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <Card key={job.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl text-sa-blue">{job.title}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <Building className="h-4 w-4 mr-1" />
                            {job.company}
                          </CardDescription>
                        </div>
                        <Button 
                          variant="outline" 
                          className="text-sa-blue border-sa-blue hover:bg-sa-blue/10"
                          onClick={() => handleJobMatch(job.description, job.title, job.company)}
                        >
                          Match My CV
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{job.description}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.type}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          Posted {job.posted}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 bg-gray-50">
                      <div className="w-full flex justify-between items-center">
                        <span className="font-medium text-sa-blue">{job.salary}</span>
                        <Link to="/#analyze-cv">
                          <Button>Apply Now</Button>
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
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
      
      <Footer />
    </div>
  );
};

export default Jobs;
