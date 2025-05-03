
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, AlertTriangle, FileText } from "lucide-react";

const CVGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>CV Guide | ATSBoost</title>
        <meta name="description" content="Comprehensive guide to creating an ATS-optimized CV for the South African job market" />
      </Helmet>

      <Header />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-sa-blue mb-2">CV Guide for South African Job Seekers</h1>
            <p className="text-sa-gray mb-8">
              Optimize your CV for both ATS systems and human recruiters with our comprehensive guide
            </p>

            <Tabs defaultValue="structure">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="structure">Structure & Format</TabsTrigger>
                <TabsTrigger value="content">Content Tips</TabsTrigger>
                <TabsTrigger value="keywords">Keywords</TabsTrigger>
                <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
              </TabsList>

              <TabsContent value="structure">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold text-sa-blue mb-4">CV Structure & Format</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-sa-blue text-lg mb-3">Essential CV Sections</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <Check className="h-5 w-5 text-sa-green" />
                            </div>
                            <div>
                              <p className="font-medium">Contact Information</p>
                              <p className="text-sa-gray text-sm">Include full name, phone number, professional email, location (city/province), and LinkedIn profile (optional).</p>
                            </div>
                          </li>
                          
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <Check className="h-5 w-5 text-sa-green" />
                            </div>
                            <div>
                              <p className="font-medium">Professional Summary</p>
                              <p className="text-sa-gray text-sm">3-5 sentences highlighting your experience, key skills, and career goals relevant to the position.</p>
                            </div>
                          </li>
                          
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <Check className="h-5 w-5 text-sa-green" />
                            </div>
                            <div>
                              <p className="font-medium">Work Experience</p>
                              <p className="text-sa-gray text-sm">List in reverse chronological order with company name, position, dates, and bullet points of achievements.</p>
                            </div>
                          </li>
                          
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <Check className="h-5 w-5 text-sa-green" />
                            </div>
                            <div>
                              <p className="font-medium">Education</p>
                              <p className="text-sa-gray text-sm">Include degrees, institutions, graduation dates, and relevant coursework or achievements.</p>
                            </div>
                          </li>
                          
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <Check className="h-5 w-5 text-sa-green" />
                            </div>
                            <div>
                              <p className="font-medium">Skills</p>
                              <p className="text-sa-gray text-sm">List technical, soft, and industry-specific skills relevant to the position.</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-sa-blue text-lg mb-3">South African Specifics</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <Check className="h-5 w-5 text-sa-green" />
                            </div>
                            <div>
                              <p className="font-medium">B-BBEE Status</p>
                              <p className="text-sa-gray text-sm">Include your B-BBEE status if applicable, as many South African companies prioritize this for hiring.</p>
                            </div>
                          </li>
                          
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <Check className="h-5 w-5 text-sa-green" />
                            </div>
                            <div>
                              <p className="font-medium">ID Number/Work Permit</p>
                              <p className="text-sa-gray text-sm">South African employers often require ID number (last 3 digits can be hidden for privacy) or work permit status.</p>
                            </div>
                          </li>
                          
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <Check className="h-5 w-5 text-sa-green" />
                            </div>
                            <div>
                              <p className="font-medium">Languages</p>
                              <p className="text-sa-gray text-sm">List languages spoken and proficiency levels, especially South African official languages.</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-sa-blue text-lg mb-3">ATS-Friendly Formatting</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <Check className="h-5 w-5 text-sa-green" />
                            </div>
                            <div>
                              <p className="font-medium">Use Simple Fonts</p>
                              <p className="text-sa-gray text-sm">Stick to standard fonts like Arial, Calibri, or Times New Roman that are easily readable by ATS.</p>
                            </div>
                          </li>
                          
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <Check className="h-5 w-5 text-sa-green" />
                            </div>
                            <div>
                              <p className="font-medium">Clear Section Headers</p>
                              <p className="text-sa-gray text-sm">Use standard section headings like "Experience," "Education," and "Skills" for easy parsing by ATS.</p>
                            </div>
                          </li>
                          
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <Check className="h-5 w-5 text-sa-green" />
                            </div>
                            <div>
                              <p className="font-medium">Avoid Text Boxes and Graphics</p>
                              <p className="text-sa-gray text-sm">Text in boxes, headers/footers, and images may not be read correctly by ATS systems.</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-8 text-center">
                      <Button className="bg-sa-green hover:bg-sa-green/90">
                        <Link to="/#analyze-cv">Analyze My CV Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="content">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold text-sa-blue mb-4">CV Content Tips</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-sa-blue text-lg mb-3">Professional Summary</h3>
                        <p className="text-sa-gray mb-4">
                          Your professional summary (or profile) should be tailored to each job application and include:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <Check className="h-4 w-4 text-sa-green" />
                            </div>
                            <p className="text-sa-gray">Years of experience in your field</p>
                          </li>
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <Check className="h-4 w-4 text-sa-green" />
                            </div>
                            <p className="text-sa-gray">Key specializations or expertise areas</p>
                          </li>
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <Check className="h-4 w-4 text-sa-green" />
                            </div>
                            <p className="text-sa-gray">Notable achievements or credentials</p>
                          </li>
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <Check className="h-4 w-4 text-sa-green" />
                            </div>
                            <p className="text-sa-gray">Relevant industry-specific keywords</p>
                          </li>
                        </ul>
                        
                        <div className="bg-blue-50 border border-blue-100 rounded p-3 mt-3">
                          <p className="text-sm text-sa-blue">
                            <strong>Example:</strong> "Results-driven Marketing Manager with 7+ years of experience in digital marketing and brand development for financial services in South Africa. Proven track record of increasing customer engagement by 45% through integrated multi-channel campaigns. Skilled in marketing analytics, SEO/SEM, and B-BBEE marketing strategies."
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-sa-blue text-lg mb-3">Work Experience</h3>
                        <p className="text-sa-gray mb-4">
                          For each position, focus on achievements rather than duties:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-red-50 border border-red-100 rounded p-3">
                            <p className="text-sm font-medium text-red-600 mb-1">Weak Example:</p>
                            <p className="text-sm text-sa-gray">
                              "Responsible for managing social media accounts and creating content."
                            </p>
                          </div>
                          <div className="bg-green-50 border border-green-100 rounded p-3">
                            <p className="text-sm font-medium text-green-600 mb-1">Strong Example:</p>
                            <p className="text-sm text-sa-gray">
                              "Grew Instagram following by 10K in 6 months through strategic content creation, increasing customer engagement by 32% and driving R50,000 in direct sales."
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-sa-gray mt-4 mb-2">Use the PAR (Problem-Action-Result) format for powerful bullet points:</p>
                        <ol className="list-decimal list-inside space-y-1 text-sa-gray ml-4">
                          <li><strong>Problem</strong>: Identify a challenge you faced</li>
                          <li><strong>Action</strong>: Describe what you did to address it</li>
                          <li><strong>Result</strong>: Quantify the positive outcome</li>
                        </ol>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-sa-blue text-lg mb-3">Education & Certifications</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <Check className="h-4 w-4 text-sa-green" />
                            </div>
                            <p className="text-sa-gray">List degrees in reverse chronological order</p>
                          </li>
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <Check className="h-4 w-4 text-sa-green" />
                            </div>
                            <p className="text-sa-gray">Include South African qualifications framework (SAQA) levels when relevant</p>
                          </li>
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <Check className="h-4 w-4 text-sa-green" />
                            </div>
                            <p className="text-sa-gray">Add relevant coursework, projects, or academic achievements</p>
                          </li>
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <Check className="h-4 w-4 text-sa-green" />
                            </div>
                            <p className="text-sa-gray">Include professional certifications, especially those recognized in South Africa</p>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-sa-blue text-lg mb-3">Skills Section</h3>
                        <p className="text-sa-gray mb-4">
                          Organize your skills into categories for better readability:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="bg-gray-50 border border-gray-200 rounded p-3">
                            <p className="text-sm font-medium text-sa-blue mb-2">Technical Skills</p>
                            <ul className="space-y-1 text-sm text-sa-gray">
                              <li>• Microsoft Office Suite</li>
                              <li>• SQL Database</li>
                              <li>• Python Programming</li>
                              <li>• Adobe Creative Cloud</li>
                            </ul>
                          </div>
                          <div className="bg-gray-50 border border-gray-200 rounded p-3">
                            <p className="text-sm font-medium text-sa-blue mb-2">Soft Skills</p>
                            <ul className="space-y-1 text-sm text-sa-gray">
                              <li>• Team Leadership</li>
                              <li>• Project Management</li>
                              <li>• Problem Solving</li>
                              <li>• Client Relationship</li>
                            </ul>
                          </div>
                          <div className="bg-gray-50 border border-gray-200 rounded p-3">
                            <p className="text-sm font-medium text-sa-blue mb-2">Industry Skills</p>
                            <ul className="space-y-1 text-sm text-sa-gray">
                              <li>• Financial Analysis</li>
                              <li>• Risk Assessment</li>
                              <li>• Compliance Reporting</li>
                              <li>• Market Research</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 text-center">
                      <Button className="bg-sa-green hover:bg-sa-green/90">
                        <Link to="/#analyze-cv">Analyze My CV Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="keywords">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold text-sa-blue mb-4">Keywords & ATS Optimization</h2>
                    
                    <div className="mb-6">
                      <h3 className="font-medium text-sa-blue text-lg mb-2">Why Keywords Matter</h3>
                      <p className="text-sa-gray mb-4">
                        ATS systems scan your CV for specific keywords that match the job description. The more relevant keywords your CV contains, the higher your chances of passing the ATS screening.
                      </p>
                      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="mt-1 mr-3 flex-shrink-0">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                          </div>
                          <p className="text-sm text-sa-gray">
                            <strong className="text-amber-700">Important:</strong> Never engage in "keyword stuffing" (excessive repetition of keywords). Most modern ATS systems can detect this and will flag your CV. Incorporate keywords naturally throughout your document.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-sa-blue text-lg mb-3">How to Find the Right Keywords</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <FileText className="h-4 w-4 text-sa-green" />
                            </div>
                            <div>
                              <p className="font-medium">Analyze the Job Description</p>
                              <p className="text-sa-gray text-sm">Carefully read the job posting and highlight skills, qualifications, and experience mentioned. Pay special attention to repeated terms.</p>
                            </div>
                          </li>
                          
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <FileText className="h-4 w-4 text-sa-green" />
                            </div>
                            <div>
                              <p className="font-medium">Research the Company</p>
                              <p className="text-sa-gray text-sm">Look at the company's website, especially their "About Us" and careers pages, to identify values and terminology they use.</p>
                            </div>
                          </li>
                          
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <FileText className="h-4 w-4 text-sa-green" />
                            </div>
                            <div>
                              <p className="font-medium">Industry Research</p>
                              <p className="text-sa-gray text-sm">Look at industry publications and job boards to identify common terms and skills in your field within the South African context.</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-sa-blue text-lg mb-3">Keyword Placement</h3>
                        <p className="text-sa-gray mb-3">
                          Strategically incorporate keywords throughout your CV:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-sa-green mb-2">Best Places for Keywords</h4>
                            <ul className="space-y-1 text-sm text-sa-gray">
                              <li className="flex items-start">
                                <div className="mr-2">•</div>
                                <p>Professional summary/profile</p>
                              </li>
                              <li className="flex items-start">
                                <div className="mr-2">•</div>
                                <p>Skills section (both technical and soft skills)</p>
                              </li>
                              <li className="flex items-start">
                                <div className="mr-2">•</div>
                                <p>Job titles and descriptions</p>
                              </li>
                              <li className="flex items-start">
                                <div className="mr-2">•</div>
                                <p>Achievements and accomplishments</p>
                              </li>
                              <li className="flex items-start">
                                <div className="mr-2">•</div>
                                <p>Education and certification sections</p>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-sa-blue mb-2">Keyword Variations</h4>
                            <p className="text-sm text-sa-gray mb-2">
                              Include both the full term and acronyms for technical skills:
                            </p>
                            <ul className="space-y-1 text-xs text-sa-gray bg-gray-50 p-3 rounded">
                              <li>• "Search Engine Optimization (SEO)"</li>
                              <li>• "Key Performance Indicators (KPIs)"</li>
                              <li>• "Broad-Based Black Economic Empowerment (B-BBEE)"</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-sa-blue text-lg mb-3">South African-Specific Keywords</h3>
                        <p className="text-sa-gray mb-3">
                          Include these terms when relevant to your experience:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">B-BBEE compliance</div>
                          <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">Employment Equity</div>
                          <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">Skills Development</div>
                          <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">SARS regulations</div>
                          <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">POPIA compliance</div>
                          <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">National Credit Act</div>
                          <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">SETA certifications</div>
                          <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">NQF qualifications</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 text-center">
                      <Button className="bg-sa-green hover:bg-sa-green/90">
                        <Link to="/#analyze-cv">Analyze My CV Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="mistakes">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold text-sa-blue mb-4">Common CV Mistakes to Avoid</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-sa-blue text-lg mb-3">ATS-Related Mistakes</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                              <p className="font-medium">Using Text Boxes and Tables</p>
                              <p className="text-sa-gray text-sm">Many ATS systems cannot read content in text boxes, tables, headers, or footers, causing important information to be missed.</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                              <p className="font-medium">Fancy Formatting and Graphics</p>
                              <p className="text-sa-gray text-sm">Complex formatting, graphics, images, and charts can confuse ATS systems. Keep your CV clean and simply formatted.</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                              <p className="font-medium">Non-Standard Section Headings</p>
                              <p className="text-sa-gray text-sm">Using creative section titles like "My Journey" instead of "Work Experience" can prevent ATS systems from categorizing your information correctly.</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                              <p className="font-medium">Uncommon File Formats</p>
                              <p className="text-sa-gray text-sm">Always submit your CV as a .docx or .pdf file unless otherwise specified. Avoid .pages, .jpg, or other uncommon formats.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-sa-blue text-lg mb-3">Content Mistakes</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                              <p className="font-medium">Generic One-Size-Fits-All CV</p>
                              <p className="text-sa-gray text-sm">Not customizing your CV for each application significantly reduces your chances of passing ATS screens.</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                              <p className="font-medium">Listing Job Duties Instead of Achievements</p>
                              <p className="text-sa-gray text-sm">Focus on quantifiable accomplishments rather than just listing responsibilities.</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                              <p className="font-medium">Grammatical Errors and Typos</p>
                              <p className="text-sa-gray text-sm">These errors suggest a lack of attention to detail and professionalism.</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                              <p className="font-medium">Including Irrelevant Information</p>
                              <p className="text-sa-gray text-sm">Outdated experiences or skills unrelated to the position waste valuable space.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-sa-blue text-lg mb-3">South African Context Mistakes</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                              <p className="font-medium">Omitting B-BBEE Status</p>
                              <p className="text-sa-gray text-sm">For many South African employers, this is an important consideration in hiring decisions.</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                              <p className="font-medium">Not Clarifying International Experience</p>
                              <p className="text-sa-gray text-sm">If you have international experience, explain how it's relevant to the South African market.</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                              <p className="font-medium">Using Region-Specific Terminology</p>
                              <p className="text-sa-gray text-sm">Avoid using terms, acronyms, or qualifications that aren't recognized in South Africa without explanation.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                        <h4 className="font-medium text-sa-blue mb-2">Let ATSBoost Help You Avoid Common Mistakes</h4>
                        <p className="text-sm text-sa-gray">
                          Our AI-powered CV analyzer can identify these common mistakes in your CV and provide specific recommendations to fix them, increasing your chances of landing interviews in the competitive South African job market.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-8 text-center">
                      <Button className="bg-sa-green hover:bg-sa-green/90">
                        <Link to="/#analyze-cv">Analyze My CV Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="mt-10 bg-gradient-to-r from-sa-blue to-sa-green/90 rounded-lg shadow-lg p-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:pr-6">
                  <h2 className="text-2xl font-bold mb-3">Ready to optimize your CV?</h2>
                  <p className="text-white/90 mb-4">
                    Upload your CV now to get a comprehensive analysis and personalized recommendations to increase your chances of landing interviews in South Africa's competitive job market.
                  </p>
                  <Button className="bg-white text-sa-blue hover:bg-white/90">
                    <Link to="/#analyze-cv">Analyze My CV</Link>
                  </Button>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <p className="font-medium text-white/90">Upgrade to Premium for:</p>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-sa-yellow" />
                      <span>Unlimited CV analyses</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-sa-yellow" />
                      <span>Industry-specific recommendations</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-sa-yellow" />
                      <span>Premium CV templates</span>
                    </li>
                  </ul>
                  <Button className="mt-3 bg-sa-yellow hover:bg-sa-yellow/90 text-sa-blue">
                    <Link to="/subscription">Upgrade Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CVGuide;
