
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const PricingPlans = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Pricing Plans | ATSBoost</title>
        <meta name="description" content="Choose the right pricing plan for your CV optimization needs at ATSBoost - the most affordable CV optimization tools for the South African market" />
      </Helmet>

      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-sa-blue mb-4">Affordable Pricing Plans</h1>
            <p className="text-sa-gray max-w-2xl mx-auto">
              Choose the plan that works best for you and start optimizing your CV for the South African job market at the most competitive rates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-sa-blue">Basic</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold text-sa-blue">R0</span>
                  <span className="ml-1 text-sa-gray">/free</span>
                </div>
                <p className="mt-4 text-sm text-sa-gray">
                  Get started with essential CV optimization tools for 3 days
                </p>
              </div>
              <div className="border-t border-gray-100 px-6 py-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-sa-green flex-shrink-0 mr-2" />
                    <span className="text-sm text-sa-gray">2 CV analyses</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-sa-green flex-shrink-0 mr-2" />
                    <span className="text-sm text-sa-gray">Basic ATS optimization tips</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-sa-green flex-shrink-0 mr-2" />
                    <span className="text-sm text-sa-gray">Limited recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-sa-green flex-shrink-0 mr-2" />
                    <span className="text-sm text-sa-gray">3-day access</span>
                  </li>
                </ul>
              </div>
              <div className="px-6 py-4">
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            </div>
            
            {/* Pay-as-You-Go Plan */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-sa-blue">Pay-as-You-Go</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold text-sa-blue">R30</span>
                  <span className="ml-1 text-sa-gray">/analysis</span>
                </div>
                <p className="mt-4 text-sm text-sa-gray">
                  One-time detailed analysis for your CV, no subscription required
                </p>
              </div>
              <div className="border-t border-gray-100 px-6 py-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-sa-green flex-shrink-0 mr-2" />
                    <span className="text-sm text-sa-gray">Single comprehensive analysis</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-sa-green flex-shrink-0 mr-2" />
                    <span className="text-sm text-sa-gray">Detailed recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-sa-green flex-shrink-0 mr-2" />
                    <span className="text-sm text-sa-gray">Downloadable report</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-sa-green flex-shrink-0 mr-2" />
                    <span className="text-sm text-sa-gray">No commitment</span>
                  </li>
                </ul>
              </div>
              <div className="px-6 py-4">
                <Button className="w-full bg-sa-blue hover:bg-sa-blue/90 text-white" asChild>
                  <Link to="/#analyze-cv">Buy Now</Link>
                </Button>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="bg-white rounded-xl border-2 border-sa-green shadow-lg overflow-hidden relative">
              <div className="absolute top-0 right-0">
                <div className="bg-sa-green text-white text-xs px-3 py-1 rounded-bl-md">
                  Most Popular
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-sa-blue">Premium</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold text-sa-blue">R100</span>
                  <span className="ml-1 text-sa-gray">/month</span>
                </div>
                <p className="mt-4 text-sm text-sa-gray">
                  Complete solution for serious professionals - 1-month access
                </p>
              </div>
              <div className="border-t border-gray-100 px-6 py-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-sa-green flex-shrink-0 mr-2" />
                    <span className="text-sm text-sa-gray">Unlimited CV analyses</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-sa-green flex-shrink-0 mr-2" />
                    <span className="text-sm text-sa-gray">Advanced AI recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-sa-green flex-shrink-0 mr-2" />
                    <span className="text-sm text-sa-gray">Access to all premium templates</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-sa-green flex-shrink-0 mr-2" />
                    <span className="text-sm text-sa-gray">WhatsApp support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-sa-green flex-shrink-0 mr-2" />
                    <span className="text-sm text-sa-gray">Interview preparation toolkit</span>
                  </li>
                </ul>
              </div>
              <div className="px-6 py-4">
                <Button className="w-full bg-sa-green hover:bg-sa-green/90 text-white" asChild>
                  <Link to="/subscription">Subscribe Now</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-sa-blue mb-4">Why Choose ATSBoost?</h2>
            <p className="text-sa-gray max-w-2xl mx-auto mb-8">
              ATSBoost.co.za offers the most affordable CV optimization tools designed specifically for the South African job market. Our tools help job seekers stand out and get noticed by employers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-4">
                <div className="h-12 w-12 bg-sa-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6 text-sa-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-sa-blue mb-2">Affordable Pricing</h3>
                <p className="text-sm text-sa-gray">
                  Our services are specifically priced for the South African market, making professional CV tools accessible to everyone.
                </p>
              </div>
              <div className="p-4">
                <div className="h-12 w-12 bg-sa-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6 text-sa-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-sa-blue mb-2">Local Expertise</h3>
                <p className="text-sm text-sa-gray">
                  Tailored for South African employers and ATS systems, our tools focus on what matters most in our job market.
                </p>
              </div>
              <div className="p-4">
                <div className="h-12 w-12 bg-sa-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6 text-sa-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-sa-blue mb-2">Proven Results</h3>
                <p className="text-sm text-sa-gray">
                  Join thousands of South Africans who have improved their interview chances with ATSBoost.co.za.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingPlans;
