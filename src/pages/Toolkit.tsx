
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JobSeekerToolkit from "@/components/JobSeekerToolkit";

const Toolkit = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-sa-blue mb-6">South African Job Seeker Toolkit</h1>
            
            <div className="prose prose-blue max-w-none mb-8">
              <p className="text-sa-gray text-lg">
                Finding a job in South Africa's competitive market can be challenging. Our comprehensive toolkit gives you the edge with:
              </p>
              
              <ul className="space-y-2 my-4">
                <li className="flex items-start">
                  <span className="text-sa-green mr-2">✓</span>
                  <span>CV templates that pass Applicant Tracking Systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sa-green mr-2">✓</span>
                  <span>Interview preparation guides specific to South African employers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sa-green mr-2">✓</span>
                  <span>Links to the best South African job boards</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sa-green mr-2">✓</span>
                  <span>Salary negotiation tips for the local market</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sa-green mr-2">✓</span>
                  <span>Advice for entering high-demand industries</span>
                </li>
              </ul>
            </div>
            
            <JobSeekerToolkit className="mb-8" />
            
            <div className="bg-sa-blue/5 p-4 sm:p-6 rounded-lg border border-sa-blue/10">
              <h2 className="text-xl font-bold text-sa-blue mb-3">Why This Toolkit Works for South Africans</h2>
              <p className="text-sa-gray mb-4">
                Our toolkit is specifically designed for the South African job market, addressing local challenges and opportunities.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded shadow-sm">
                  <h3 className="font-semibold text-sa-blue">Low Bandwidth Friendly</h3>
                  <p className="text-sm text-sa-gray">Optimized PDF under 1MB, perfect for mobile data users.</p>
                </div>
                <div className="bg-white p-3 rounded shadow-sm">
                  <h3 className="font-semibold text-sa-blue">Local References</h3>
                  <p className="text-sm text-sa-gray">Examples from South African companies and industries.</p>
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

export default Toolkit;
