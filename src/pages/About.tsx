
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>About Us | ATSBoost</title>
        <meta name="description" content="Learn about ATSBoost, South Africa's premier CV optimization platform helping job seekers to maximize their chances of landing interviews." />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-sa-blue/5 py-12 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-sa-blue mb-4">About ATSBoost</h1>
              <p className="text-sa-gray text-lg">
                Helping South Africans navigate the competitive job market with ATS-optimized CVs
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-sa-blue mb-6">Our Story</h2>
              <div className="prose max-w-none text-sa-gray">
                <p className="mb-4">
                  ATSBoost was founded in 2023 by Denis Kasala, a visionary South African developer and entrepreneur who identified a critical gap in the job application process. Having witnessed firsthand how talented job seekers were being filtered out by Applicant Tracking Systems (ATS) before human eyes ever saw their applications, Denis set out to create a solution.
                </p>
                
                <p className="mb-4">
                  With South Africa facing an unemployment rate of over 30%, Denis recognized that many job seekers weren't aware of how automated systems were affecting their job search. He assembled a team of HR professionals, data scientists, and fellow software engineers to create a tool specifically tailored to the South African job market—a platform that would help candidates optimize their CVs for both ATS systems and human recruiters.
                </p>
                
                <p>
                  Today, under Denis's leadership, ATSBoost serves thousands of South African job seekers every month, helping them understand the invisible barriers in the application process and equipping them with tools to overcome these challenges.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Mission */}
        <section className="py-12 bg-sa-blue/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-sa-blue mb-6">Our Mission</h2>
              <div className="prose max-w-none text-sa-gray">
                <p className="mb-4">
                  At ATSBoost, our mission is to level the playing field in the South African job market by making advanced CV optimization technology accessible to everyone.
                </p>
                
                <p className="mb-4">
                  We believe that talent is distributed equally, but opportunity is not. By helping job seekers create CVs that effectively showcase their skills and experience to both automated systems and hiring managers, we aim to increase interview opportunities for qualified candidates regardless of their background or resources.
                </p>
                
                <p>
                  Our goal is to reduce unemployment in South Africa by ensuring that no qualified candidate is overlooked simply because they don't know how to format their CV for today's hiring processes.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* What Sets Us Apart */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-sa-blue mb-6">What Sets Us Apart</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-sa-green mb-2">South African Focus</h3>
                  <p className="text-sa-gray">
                    Unlike generic CV tools, we understand the unique aspects of the South African job market, including B-BBEE requirements, NQF level specifications, and local industry terminology.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-sa-green mb-2">Accessibility</h3>
                  <p className="text-sa-gray">
                    We've built our platform to work on low-bandwidth connections and offer WhatsApp integration to ensure job seekers throughout South Africa can access our tools regardless of their data limitations.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-sa-green mb-2">AI-Powered Analysis</h3>
                  <p className="text-sa-gray">
                    Our advanced artificial intelligence doesn't just check keywords—it analyzes context, formatting, and content quality to provide comprehensive feedback tailored to South African hiring practices.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-sa-green mb-2">Educational Approach</h3>
                  <p className="text-sa-gray">
                    We don't just fix your CV; we teach you why certain changes matter, empowering you with knowledge that will help throughout your career journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Founder Section */}
        <section className="py-12 bg-sa-blue/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-sa-blue mb-6 text-center">Meet Our Founder</h2>
              
              <div className="bg-white p-6 rounded-lg shadow flex flex-col md:flex-row items-center gap-6 mb-8">
                <div className="w-32 h-32 bg-sa-blue/20 rounded-full flex items-center justify-center">
                  <span className="text-sa-blue text-2xl font-bold">DK</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-sa-blue">Denis Kasala</h3>
                  <p className="text-sa-green mb-2">Founder & Lead Developer</p>
                  <p className="text-sa-gray">
                    Denis Kasala is a passionate developer and entrepreneur with a vision to solve South Africa's employment challenges through technology. With a background in software development and a deep understanding of the local job market, Denis created ATSBoost to bridge the gap between qualified candidates and employers. His innovative approach combines AI technology with local market expertise to help job seekers navigate the increasingly automated recruitment process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Us */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-sa-blue mb-6">Contact Us</h2>
              <p className="text-sa-gray mb-8">
                Have questions or feedback? We'd love to hear from you.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <a 
                  href="mailto:info@atsboost.co.za" 
                  className="bg-sa-blue hover:bg-sa-blue/90 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Email Us
                </a>
                <a 
                  href="https://wa.me/+27123456789" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="bg-sa-green hover:bg-sa-green/90 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  WhatsApp Support
                </a>
              </div>
              
              <div className="mt-8">
                <h3 className="font-semibold text-sa-blue mb-2">Visit Our Office</h3>
                <p className="text-sa-gray">
                  88 Stella Road, Sandton<br />
                  Johannesburg, 2196<br />
                  South Africa
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
