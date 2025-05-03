
import { Suspense, lazy } from "react";
import Header from "@/components/Header";

// Lazy load components
const Footer = lazy(() => import("@/components/Footer"));

// Simple loading component
const LoadingComponent = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sa-blue"></div>
  </div>
);

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-sa-blue text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">About ATSBoost</h1>
            <p className="text-lg md:text-xl text-gray-200">
              Empowering South African job seekers with innovative CV optimization tools
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-sa-blue mb-6">Our Story</h2>
            <div className="prose max-w-none text-sa-gray">
              <p className="mb-4">
                ATSBoost was born out of a simple yet powerful observation: in South Africa's competitive job market, 
                highly qualified candidates were consistently being overlooked by employers' Applicant Tracking Systems (ATS).
              </p>
              <p className="mb-4">
                Founded in 2023 by a team of HR professionals, data scientists, and software developers, our mission was clear: 
                to level the playing field for South African job seekers by providing affordable, accessible tools to optimize 
                their CVs for modern hiring technologies.
              </p>
              <p className="mb-4">
                We recognized that the high unemployment rate in South Africa, coupled with the increasing use of automated 
                screening systems, was creating an additional barrier for job seekers. Many qualified candidates were being 
                filtered out before a human ever saw their application, simply because their CVs weren't optimized for ATS systems.
              </p>
              <p>
                Today, ATSBoost serves thousands of South African job seekers, helping them navigate the complexities of 
                automated hiring systems and significantly increasing their chances of landing interviews.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-sa-blue mb-6">Our Mission</h2>
            <p className="text-lg text-sa-gray mb-6">
              To empower South African job seekers with technology that helps them overcome barriers in the hiring process, 
              making job opportunities more accessible to everyone regardless of background.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-sa-blue mb-4">For Job Seekers</h3>
                <p className="text-sa-gray">
                  We provide affordable tools that help you navigate the complexities of modern hiring systems, 
                  optimize your CV to pass through ATS filters, and present your qualifications in the best possible light.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-sa-blue mb-4">For Communities</h3>
                <p className="text-sa-gray">
                  We partner with universities, community organizations, and career centers across South Africa to provide 
                  resources and tools to those who need them most, especially in underserved communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-sa-blue mb-6 text-center">Our Team</h2>
            <p className="text-lg text-sa-gray mb-12 text-center">
              Meet the diverse and passionate team behind ATSBoost's mission
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-sa-blue/10 mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-sa-blue">Thabo Molefe</h3>
                <p className="text-sa-gray font-medium">Founder & CEO</p>
                <p className="text-sm text-sa-gray mt-2">
                  Former HR Director with 15+ years of experience in recruitment technologies
                </p>
              </div>
              
              {/* Team Member 2 */}
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-sa-blue/10 mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-sa-blue">Lerato Ndlovu</h3>
                <p className="text-sa-gray font-medium">Head of AI Development</p>
                <p className="text-sm text-sa-gray mt-2">
                  Data scientist specializing in NLP and recruitment algorithms
                </p>
              </div>
              
              {/* Team Member 3 */}
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-sa-blue/10 mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-sa-blue">Sarah van der Merwe</h3>
                <p className="text-sa-gray font-medium">Career Advisory Lead</p>
                <p className="text-sm text-sa-gray mt-2">
                  Certified career coach with expertise in the South African job market
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-sa-blue mb-6 text-center">Contact Us</h2>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-sa-blue mb-4">Get In Touch</h3>
                  <p className="text-sa-gray mb-6">
                    Have questions or feedback? We'd love to hear from you. Reach out to our team using any of the methods below.
                  </p>
                  
                  <div className="space-y-4">
                    <p className="text-sa-gray">
                      <strong>Email:</strong> hello@atsboost.co.za
                    </p>
                    <p className="text-sa-gray">
                      <strong>WhatsApp:</strong> +27 12 345 6789
                    </p>
                    <p className="text-sa-gray">
                      <strong>Address:</strong> Cape Town, South Africa
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-sa-blue mb-4">Business Hours</h3>
                  <p className="text-sa-gray mb-4">
                    Our team is available to assist you during the following hours:
                  </p>
                  
                  <div className="space-y-2">
                    <p className="text-sa-gray"><strong>Monday - Friday:</strong> 8:00 - 17:00</p>
                    <p className="text-sa-gray"><strong>Saturday:</strong> 9:00 - 13:00</p>
                    <p className="text-sa-gray"><strong>Sunday:</strong> Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Suspense fallback={<LoadingComponent />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default About;
