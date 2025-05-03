
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CVTemplate } from "@/lib/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Download, Lock, Crown } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Mock data for templates - would normally come from an API
const mockTemplates: CVTemplate[] = [
  {
    id: "template1",
    name: "Professional SA",
    description: "Standard ATS-friendly template for corporate roles",
    previewUrl: "/placeholder.svg",
    downloadUrl: "#",
    tier: "free",
    category: "Corporate",
    format: "both",
    popularityScore: 95,
    industry: "General"
  },
  {
    id: "template2",
    name: "IT Specialist",
    description: "Designed for software and IT roles in South Africa",
    previewUrl: "/placeholder.svg",
    downloadUrl: "#",
    tier: "free",
    category: "IT",
    format: "both",
    popularityScore: 88,
    industry: "Information Technology"
  },
  {
    id: "template3",
    name: "Mining Professional",
    description: "Tailored for mining industry roles with relevant sections",
    previewUrl: "/placeholder.svg",
    downloadUrl: "#",
    tier: "free",
    category: "Industrial",
    format: "both",
    popularityScore: 82,
    industry: "Mining"
  },
  {
    id: "template4",
    name: "Graduate Entry",
    description: "Perfect for recent graduates seeking their first role",
    previewUrl: "/placeholder.svg",
    downloadUrl: "#",
    tier: "free",
    category: "Entry-Level",
    format: "both",
    popularityScore: 90,
    industry: "General"
  },
  {
    id: "template5",
    name: "Executive CV",
    description: "For C-suite and senior management positions",
    previewUrl: "/placeholder.svg",
    downloadUrl: "#",
    tier: "free",
    category: "Executive",
    format: "both",
    popularityScore: 76,
    industry: "Management"
  },
  // Premium templates
  {
    id: "premium1",
    name: "Finance Professional Plus",
    description: "Premium template for banking and finance roles with B-BBEE sections",
    previewUrl: "/placeholder.svg",
    downloadUrl: "#",
    tier: "premium",
    category: "Finance",
    format: "both",
    popularityScore: 92,
    industry: "Banking & Finance",
    color: "blue"
  },
  {
    id: "premium2",
    name: "Healthcare Specialist Pro",
    description: "For medical professionals with HPCSA number formatting",
    previewUrl: "/placeholder.svg",
    downloadUrl: "#",
    tier: "premium",
    category: "Healthcare",
    format: "both",
    popularityScore: 89,
    industry: "Healthcare",
    color: "green"
  },
  {
    id: "premium3",
    name: "Legal Expert Premium",
    description: "Specialized for legal professionals with case experience sections",
    previewUrl: "/placeholder.svg",
    downloadUrl: "#",
    tier: "premium",
    category: "Legal",
    format: "both",
    popularityScore: 86,
    industry: "Law",
    color: "gray"
  },
  {
    id: "premium4",
    name: "Education Professional",
    description: "For teachers and educators with NQF level formatting",
    previewUrl: "/placeholder.svg",
    downloadUrl: "#",
    tier: "premium",
    category: "Education",
    format: "both",
    popularityScore: 84,
    industry: "Education",
    color: "amber"
  },
  {
    id: "premium5",
    name: "Tourism & Hospitality",
    description: "For hospitality professionals with relevant sections",
    previewUrl: "/placeholder.svg",
    downloadUrl: "#",
    tier: "premium",
    category: "Hospitality",
    format: "both",
    popularityScore: 81,
    industry: "Tourism",
    color: "teal"
  },
  {
    id: "premium6",
    name: "Startup Founder",
    description: "For entrepreneurs and startup founders",
    previewUrl: "/placeholder.svg",
    downloadUrl: "#",
    tier: "premium",
    category: "Entrepreneurship",
    format: "both",
    popularityScore: 78,
    industry: "Business",
    color: "orange"
  },
  {
    id: "premium7",
    name: "Marketing Creative",
    description: "Visual template for marketing and creative roles",
    previewUrl: "/placeholder.svg",
    downloadUrl: "#",
    tier: "premium",
    category: "Creative",
    format: "both",
    popularityScore: 88,
    industry: "Marketing",
    color: "purple"
  },
  {
    id: "premium8",
    name: "NGO Professional",
    description: "For non-profit and development sector roles",
    previewUrl: "/placeholder.svg",
    downloadUrl: "#",
    tier: "premium",
    category: "Non-profit",
    format: "both",
    popularityScore: 75,
    industry: "NGO",
    color: "cyan"
  },
  {
    id: "premium9",
    name: "Engineering Expert",
    description: "For various engineering disciplines with project sections",
    previewUrl: "/placeholder.svg",
    downloadUrl: "#",
    tier: "premium",
    category: "Engineering",
    format: "both",
    popularityScore: 91,
    industry: "Engineering",
    color: "yellow"
  },
  {
    id: "premium10",
    name: "Research Professional",
    description: "Academic and research-focused template with publications section",
    previewUrl: "/placeholder.svg",
    downloadUrl: "#",
    tier: "premium",
    category: "Academic",
    format: "both",
    popularityScore: 82,
    industry: "Research",
    color: "indigo"
  }
];

const formatOptions = ["docx", "pdf"] as const;

const Templates: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("all");
  const [format, setFormat] = useState<"docx" | "pdf">("docx");
  const [userTier] = useState<"free" | "pay-per-use" | "premium">("free"); // This would come from user context in real app

  // Filter templates based on selected category
  const filteredTemplates = filter === "all" 
    ? mockTemplates 
    : mockTemplates.filter(template => template.category.toLowerCase() === filter.toLowerCase());
  
  // Get all unique categories from templates
  const categories = ["all", ...Array.from(new Set(mockTemplates.map(t => t.category.toLowerCase())))];

  const handleDownload = (template: CVTemplate) => {
    if (template.tier === "premium" && userTier !== "premium") {
      toast({
        title: "Premium Template",
        description: "Please upgrade to access premium templates.",
      });
    } else {
      toast({
        title: "Downloading Template",
        description: `Your ${template.name} template is downloading in ${format} format.`,
      });
      // In a real app, this would initiate the download
    }
  };

  const handleUpgradeClick = () => {
    navigate("/subscription");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="pt-6 pb-12 bg-gradient-to-b from-white to-gray-50 dark:from-sa-blue dark:to-sa-blue/80">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-sa-blue dark:text-white">
                South African CV Templates
              </h1>
              <p className="text-sa-gray dark:text-gray-300 mb-6">
                ATS-friendly templates designed specifically for South African job market
              </p>
              
              {userTier !== "premium" && (
                <div className="bg-sa-yellow/10 border border-sa-yellow/30 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <Crown className="h-6 w-6 text-sa-yellow mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-sa-blue">Unlock 10 Premium Templates</h3>
                      <p className="text-sm text-sa-gray mb-2">
                        Upgrade to access industry-specific templates with specialized sections like B-BBEE declaration
                      </p>
                      <Button
                        onClick={handleUpgradeClick}
                        className="bg-sa-yellow hover:bg-sa-yellow/90 text-sa-blue mt-1"
                        size="sm"
                      >
                        Upgrade Now
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
                <Tabs defaultValue="all" className="w-full md:w-auto">
                  <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full md:w-auto">
                    {categories.slice(0, 5).map((category) => (
                      <TabsTrigger 
                        key={category} 
                        value={category}
                        onClick={() => setFilter(category)}
                        className="capitalize"
                      >
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Format:</span>
                  {formatOptions.map(opt => (
                    <Button
                      key={opt}
                      size="sm"
                      variant={format === opt ? "default" : "outline"}
                      onClick={() => setFormat(opt as "docx" | "pdf")}
                      className="uppercase"
                    >
                      {opt}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="overflow-hidden">
                  <div className="relative">
                    <div className="bg-sa-blue/10 h-48 flex items-center justify-center">
                      <img src={template.previewUrl} alt={template.name} className="h-40 w-auto object-contain" />
                    </div>
                    {template.tier === "premium" && (
                      <Badge className="absolute top-2 right-2 bg-sa-yellow text-sa-blue">
                        Premium
                      </Badge>
                    )}
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>{template.name}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {template.industry}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="py-2">
                    <p className="text-sm text-sa-gray">{template.description}</p>
                  </CardContent>
                  
                  <CardFooter className="pt-2">
                    {template.tier === "premium" && userTier !== "premium" ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            className="w-full bg-sa-blue/10 hover:bg-sa-blue/20 text-sa-blue"
                          >
                            <Lock className="h-4 w-4 mr-2" />
                            Premium Template
                          </Button>
                        </DialogTrigger>
                        
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Premium Template</DialogTitle>
                            <DialogDescription>
                              Upgrade to access all premium CV templates designed for South African industries.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="py-4">
                            <p className="text-sm text-muted-foreground mb-4">
                              Premium templates include special sections for:
                            </p>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <svg 
                                  className="h-5 w-5 text-sa-green mr-2 flex-shrink-0" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-sm">B-BBEE Status Declaration</span>
                              </li>
                              <li className="flex items-start">
                                <svg 
                                  className="h-5 w-5 text-sa-green mr-2 flex-shrink-0" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-sm">Industry-specific skills sections</span>
                              </li>
                              <li className="flex items-start">
                                <svg 
                                  className="h-5 w-5 text-sa-green mr-2 flex-shrink-0" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-sm">NQF level formatting</span>
                              </li>
                            </ul>
                          </div>
                          
                          <DialogFooter className="sm:justify-between">
                            <DialogTrigger asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogTrigger>
                            <Button 
                              className="bg-sa-yellow hover:bg-sa-yellow/90 text-sa-blue" 
                              onClick={handleUpgradeClick}
                            >
                              Upgrade to Premium
                              <span className="ml-1 text-xs bg-white text-sa-blue px-1.5 py-0.5 rounded-full">
                                R100/m
                              </span>
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button 
                        className="w-full bg-sa-green hover:bg-sa-green/90 text-white" 
                        onClick={() => handleDownload(template)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download {format.toUpperCase()}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Templates;
