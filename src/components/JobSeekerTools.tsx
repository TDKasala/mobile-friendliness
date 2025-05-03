
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Check, File, User } from 'lucide-react';

const JobSeekerTools = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl font-bold mb-4 text-sa-blue">Free Job Seeker Tools</h2>
          <p className="text-sa-gray">
            Access these essential resources to improve your job application process and increase your chances of landing interviews.
          </p>
        </div>

        <Tabs defaultValue="ats-keywords" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="ats-keywords">ATS Keywords</TabsTrigger>
            <TabsTrigger value="cv-checklist">CV Checklist</TabsTrigger>
            <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
            <TabsTrigger value="interview">Interview Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="ats-keywords">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-sa-green" />
                  ATS Keywords by Industry
                </CardTitle>
                <CardDescription>
                  Use these industry-specific keywords to help your CV pass through Applicant Tracking Systems
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-sa-blue mb-2">Information Technology</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">JavaScript</div>
                    <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">Python</div>
                    <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">React</div>
                    <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">Cloud Computing</div>
                    <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">DevOps</div>
                    <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">Agile</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg text-sa-blue mb-2">Finance</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">Financial Analysis</div>
                    <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">Risk Assessment</div>
                    <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">Budgeting</div>
                    <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">CPA</div>
                    <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">Forecasting</div>
                    <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">Regulatory Compliance</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg text-sa-blue mb-2">Marketing</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">Digital Marketing</div>
                    <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">SEO</div>
                    <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">Social Media</div>
                    <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">Content Creation</div>
                    <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">Brand Strategy</div>
                    <div className="bg-white p-2 rounded border border-gray-200 text-sm text-sa-gray">Analytics</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button className="bg-sa-green hover:bg-sa-green/90 text-white">
                  <Link to="/subscription">Upgrade to Premium for All Keywords</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="cv-checklist">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-sa-green" />
                  CV Checklist for South African Job Market
                </CardTitle>
                <CardDescription>
                  Use this checklist to ensure your CV meets the standards expected by South African employers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-sa-blue mb-2">Format & Layout</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-sa-green text-sa-green flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">✓</div>
                        <span className="text-sa-gray">Clean, professional layout with consistent formatting</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-sa-green text-sa-green flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">✓</div>
                        <span className="text-sa-gray">ATS-friendly font (Arial, Calibri, Times New Roman)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-sa-green text-sa-green flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">✓</div>
                        <span className="text-sa-gray">Proper section headings and clear hierarchy</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-sa-green text-sa-green flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">✓</div>
                        <span className="text-sa-gray">2-3 pages maximum length</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg text-sa-blue mb-2">Contact Information</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-sa-green text-sa-green flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">✓</div>
                        <span className="text-sa-gray">Full name, phone, professional email address</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-sa-green text-sa-green flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">✓</div>
                        <span className="text-sa-gray">Location (city/province)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-sa-green text-sa-green flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">✓</div>
                        <span className="text-sa-gray">LinkedIn profile (optional but recommended)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg text-sa-blue mb-2">South African Specifics</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-sa-green text-sa-green flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">✓</div>
                        <span className="text-sa-gray">Citizenship/work permit status</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-sa-green text-sa-green flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">✓</div>
                        <span className="text-sa-gray">B-BBEE status (if applicable)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-sa-green text-sa-green flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">✓</div>
                        <span className="text-sa-gray">Language proficiencies relevant to SA</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button className="bg-sa-green hover:bg-sa-green/90 text-white">
                  <Link to="/subscription">Upgrade to Premium for Full Checklist</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="cover-letter">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <File className="mr-2 h-5 w-5 text-sa-green" />
                  Cover Letter Templates
                </CardTitle>
                <CardDescription>
                  Professional cover letter templates tailored for the South African job market
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-5 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-sa-blue mb-3">Standard Professional Template</h3>
                    <div className="space-y-3 mb-4">
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                    <p className="text-sm text-sa-gray mt-4">Traditional format suitable for corporate roles</p>
                  </div>
                  
                  <div className="bg-white p-5 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-sa-blue mb-3">Creative Industry Template</h3>
                    <div className="space-y-3 mb-4">
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                    <p className="text-sm text-sa-gray mt-4">Modern design for creative and design positions</p>
                  </div>
                </div>
                
                <div className="mt-8 bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-medium text-sa-blue mb-2">Cover Letter Tips:</h4>
                  <ul className="space-y-2 text-sm text-sa-gray">
                    <li className="flex items-start">
                      <div className="text-sa-green mr-2">•</div>
                      <span>Address your letter to a specific person when possible</span>
                    </li>
                    <li className="flex items-start">
                      <div className="text-sa-green mr-2">•</div>
                      <span>Customize each letter for the specific job and company</span>
                    </li>
                    <li className="flex items-start">
                      <div className="text-sa-green mr-2">•</div>
                      <span>Keep it concise - aim for 3-4 paragraphs maximum</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button className="bg-sa-green hover:bg-sa-green/90 text-white">
                  <Link to="/subscription">Upgrade to Premium for All Templates</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="interview">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-sa-green" />
                  Interview Preparation Guide
                </CardTitle>
                <CardDescription>
                  Prepare for interviews with South African employers using these guidelines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg text-sa-blue mb-3">Common Interview Questions</h3>
                    <ul className="space-y-3">
                      <li className="bg-white p-3 rounded border border-gray-200">
                        <p className="font-medium text-sa-blue">Tell me about yourself.</p>
                        <p className="text-sm text-sa-gray mt-1">Focus on your professional background, key skills, and why you're interested in this position.</p>
                      </li>
                      <li className="bg-white p-3 rounded border border-gray-200">
                        <p className="font-medium text-sa-blue">Why do you want to work for our company?</p>
                        <p className="text-sm text-sa-gray mt-1">Research the company beforehand and mention specific aspects that align with your career goals.</p>
                      </li>
                      <li className="bg-white p-3 rounded border border-gray-200">
                        <p className="font-medium text-sa-blue">What is your greatest strength?</p>
                        <p className="text-sm text-sa-gray mt-1">Choose a strength relevant to the position and provide a specific example demonstrating it.</p>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg text-sa-blue mb-3">Interview Preparation Checklist</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-sa-green text-sa-green flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">✓</div>
                        <span className="text-sa-gray">Research the company thoroughly</span>
                      </div>
                      <div className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-sa-green text-sa-green flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">✓</div>
                        <span className="text-sa-gray">Prepare questions to ask the interviewer</span>
                      </div>
                      <div className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-sa-green text-sa-green flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">✓</div>
                        <span className="text-sa-gray">Practice the STAR method for behavioral questions</span>
                      </div>
                      <div className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-sa-green text-sa-green flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">✓</div>
                        <span className="text-sa-gray">Plan your professional outfit a day before</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-medium text-sa-blue mb-2">South African Interview Tips:</h4>
                    <ul className="space-y-2 text-sm text-sa-gray">
                      <li className="flex items-start">
                        <div className="text-sa-green mr-2">•</div>
                        <span>Be prepared to discuss your understanding of South Africa's business landscape</span>
                      </li>
                      <li className="flex items-start">
                        <div className="text-sa-green mr-2">•</div>
                        <span>Mention any knowledge of local languages if applicable</span>
                      </li>
                      <li className="flex items-start">
                        <div className="text-sa-green mr-2">•</div>
                        <span>Understand the company's B-BBEE status and commitment to transformation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button className="bg-sa-green hover:bg-sa-green/90 text-white">
                  <Link to="/subscription">Upgrade to Premium for Full Interview Guide</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-10 text-center">
          <Button className="bg-sa-blue hover:bg-sa-blue/90 text-white py-6 px-8 text-lg">
            <Link to="/subscription">Upgrade to Premium</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerTools;
