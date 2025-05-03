
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SuccessStory } from "@/lib/types";

const SuccessStories = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    story: "",
    image: null as File | null,
    jobTitle: "",
    company: "",
    scoreImprovement: "",
  });

  // Mock data for success stories - in a real app, this would come from Supabase
  const [stories] = useState<SuccessStory[]>([
    {
      id: "1",
      name: "Thabo Mbeki",
      story: "After using ATSBoost, my CV passed through 3 different ATS systems and I landed interviews at all of them. The insights about keyword optimization were incredibly helpful!",
      imageUrl: "https://picsum.photos/id/1012/200",
      jobTitle: "Software Developer",
      company: "Tech Solutions SA",
      approved: true,
      scoreImprovement: "68% → 94%",
      dateSubmitted: "2025-04-01",
    },
    {
      id: "2",
      name: "Lerato Moloi",
      story: "I was struggling to get callbacks for mining engineering positions. ATSBoost identified that I was missing critical industry terminology. After updating my CV, I received 4 interview requests in one week!",
      imageUrl: "https://picsum.photos/id/1027/200",
      jobTitle: "Mining Engineer",
      company: "GoldFields",
      approved: true,
      scoreImprovement: "45% → 89%",
      dateSubmitted: "2025-03-25",
    },
    {
      id: "3",
      name: "Sarah Johnson",
      story: "The CV templates designed for South African professionals helped me reorganize my qualifications in a way that highlighting my NQF levels properly. Game changer for academic positions!",
      imageUrl: "https://picsum.photos/id/1011/200",
      jobTitle: "University Lecturer",
      company: "University of Cape Town",
      approved: true,
      scoreImprovement: "72% → 91%",
      dateSubmitted: "2025-03-18",
    },
  ]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // In a real app, this would be sent to Supabase
    console.log("Submitting story:", formData);
    
    // Show success message
    toast({
      title: "Success!",
      description: "Your story has been submitted for review. Thank you for sharing!",
      variant: "default",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      story: "",
      image: null,
      jobTitle: "",
      company: "",
      scoreImprovement: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-sa-blue/10 to-white py-10 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-4xl font-bold text-sa-blue mb-4">
              Success Stories
            </h1>
            <p className="text-sa-gray text-sm sm:text-base mb-0">
              Real people, real results. See how ATSBoost has helped job seekers across South Africa
              improve their CVs and land their dream jobs.
            </p>
          </div>
        </div>
      </section>
      
      {/* Success Stories Grid */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <Card key={story.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 border-2 border-sa-green/20">
                      <AvatarImage src={story.imageUrl} alt={story.name} />
                      <AvatarFallback className="bg-sa-blue text-white">
                        {story.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <h3 className="font-medium text-sa-blue">{story.name}</h3>
                      <p className="text-xs text-sa-gray">
                        {story.jobTitle} at {story.company}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-sa-gray mb-4">{story.story}</p>
                  
                  <div className="bg-sa-green/10 px-3 py-2 rounded-md text-center">
                    <p className="text-xs text-sa-gray mb-1">ATS Score Improvement</p>
                    <p className="text-lg font-bold text-sa-green">
                      {story.scoreImprovement}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Submit Your Story Form */}
      <section className="py-10 sm:py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-sa-blue mb-2">
                Share Your Success Story
              </h2>
              <p className="text-sm text-sa-gray">
                How has ATSBoost helped your job search? Share your experience to inspire others!
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-sa-gray mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-sa-gray mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-sa-gray mb-1">
                    Job Title
                  </label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-sa-gray mb-1">
                    Company (Optional)
                  </label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="scoreImprovement" className="block text-sm font-medium text-sa-gray mb-1">
                  ATS Score Improvement (e.g., "55% → 89%")
                </label>
                <Input
                  id="scoreImprovement"
                  name="scoreImprovement"
                  value={formData.scoreImprovement}
                  onChange={handleChange}
                  placeholder="e.g., 55% → 89%"
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="story" className="block text-sm font-medium text-sa-gray mb-1">
                  Your Success Story
                </label>
                <Textarea
                  id="story"
                  name="story"
                  value={formData.story}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell us how ATSBoost helped you in your job search..."
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-sa-gray mb-1">
                  Your Photo (Optional)
                </label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
                <p className="text-xs text-sa-gray mt-1">
                  Recommended: Professional headshot or portrait (Max 2MB)
                </p>
              </div>
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full bg-sa-green hover:bg-sa-green/90 text-white"
                >
                  Submit Your Story
                </Button>
              </div>
              
              <p className="text-xs text-center text-sa-gray mt-2">
                By submitting, you agree to allow ATSBoost to publish your story and image on our website.
                All submissions are reviewed before publication.
              </p>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SuccessStories;
