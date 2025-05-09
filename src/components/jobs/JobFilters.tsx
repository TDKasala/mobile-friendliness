
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Clock } from "lucide-react";

interface JobFiltersProps {
  searchQuery: string;
  location: string;
  jobType: string;
  allLocations: string[];
  allJobTypes: string[];
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onJobTypeChange: (value: string) => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({
  searchQuery,
  location,
  jobType,
  allLocations,
  allJobTypes,
  onSearchChange,
  onLocationChange,
  onJobTypeChange
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            type="text" 
            placeholder="Search jobs or companies"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={location} onValueChange={onLocationChange}>
          <SelectTrigger className="w-full">
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
        
        <Select value={jobType} onValueChange={onJobTypeChange}>
          <SelectTrigger className="w-full">
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
  );
};

export default JobFilters;
