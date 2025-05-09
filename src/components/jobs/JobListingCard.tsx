
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Calendar, Building, ExternalLink } from "lucide-react";

type JobListing = {
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

interface JobListingCardProps {
  job: JobListing;
  onMatchCV: (jobDescription: string, jobTitle: string, company: string) => void;
}

const JobListingCard: React.FC<JobListingCardProps> = ({ job, onMatchCV }) => {
  return (
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
            onClick={() => onMatchCV(job.description, job.title, job.company)}
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
        <div className="w-full">
          <div className="flex justify-between items-center mb-3">
            <span className="font-medium text-sa-blue">{job.salary}</span>
            <Link to="/#analyze-cv">
              <Button>Apply Now</Button>
            </Link>
          </div>
          
          {job.externalLinks && Object.keys(job.externalLinks).length > 0 && (
            <div className="border-t pt-3 mt-2">
              <p className="text-sm text-gray-500 mb-2">Find this job on:</p>
              <div className="flex flex-wrap gap-2">
                {job.externalLinks.pnet && (
                  <a 
                    href={job.externalLinks.pnet} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full flex items-center hover:bg-blue-100 transition"
                  >
                    <span>PNet</span>
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                )}
                {job.externalLinks.careerJunction && (
                  <a 
                    href={job.externalLinks.careerJunction} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full flex items-center hover:bg-green-100 transition"
                  >
                    <span>CareerJunction</span>
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                )}
                {job.externalLinks.linkedin && (
                  <a 
                    href={job.externalLinks.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center hover:bg-blue-200 transition"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                )}
                {job.externalLinks.indeed && (
                  <a 
                    href={job.externalLinks.indeed} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full flex items-center hover:bg-blue-100 transition"
                  >
                    <span>Indeed</span>
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                )}
                {job.externalLinks.bizcommunity && (
                  <a 
                    href={job.externalLinks.bizcommunity} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-full flex items-center hover:bg-orange-100 transition"
                  >
                    <span>Bizcommunity</span>
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                )}
                {job.externalLinks.jobmail && (
                  <a 
                    href={job.externalLinks.jobmail} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full flex items-center hover:bg-purple-100 transition"
                  >
                    <span>JobMail</span>
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobListingCard;
