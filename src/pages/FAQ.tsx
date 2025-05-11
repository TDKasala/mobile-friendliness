
import React from "react";
import { Helmet } from "react-helmet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import WhatsAppSupport from "@/components/WhatsAppSupport";

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Frequently Asked Questions | ATSBoost</title>
        <meta name="description" content="Get answers to your questions about ATSBoost CV optimization service" />
      </Helmet>

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-sa-blue mb-2">Frequently Asked Questions</h1>
            <p className="text-sa-gray mb-8">Find answers to common questions about ATSBoost and our CV optimization services</p>

            <Accordion type="single" collapsible className="mb-8">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-sa-blue font-medium">
                  What is an ATS and why is it important?
                </AccordionTrigger>
                <AccordionContent className="text-sa-gray">
                  ATS (Applicant Tracking System) is software used by employers to automatically scan, sort, and rank job applications. It's important because approximately 75% of CVs are rejected by ATS before a human ever sees them. Having an ATS-optimized CV dramatically increases your chances of getting past this initial screening and reaching the interview stage.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-sa-blue font-medium">
                  How does ATSBoost optimize my CV?
                </AccordionTrigger>
                <AccordionContent className="text-sa-gray">
                  ATSBoost analyzes your CV against common ATS algorithms and provides specific recommendations to improve your score. We look at formatting, keyword optimization, structure, and content to ensure your CV passes through ATS systems while still being appealing to human recruiters. Our platform is specifically calibrated for South African job market requirements.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-sa-blue font-medium">
                  What file formats are supported?
                </AccordionTrigger>
                <AccordionContent className="text-sa-gray">
                  ATSBoost supports PDF, DOCX, DOC, TXT, and ODT file formats. For best results, we recommend using PDF or DOCX formats as they maintain formatting while still being ATS-readable. You can also send your CV via WhatsApp for analysis.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-sa-blue font-medium">
                  What's the difference between Free and Premium plans?
                </AccordionTrigger>
                <AccordionContent className="text-sa-gray">
                  <p>Our Free plan includes:</p>
                  <ul className="list-disc pl-5 my-2 space-y-1">
                    <li>Basic ATS score analysis</li>
                    <li>Limited access to CV templates</li>
                    <li>Basic formatting recommendations</li>
                  </ul>
                  
                  <p className="mt-3">Premium plan (R100/month) includes:</p>
                  <ul className="list-disc pl-5 my-2 space-y-1">
                    <li>Unlimited detailed CV analyses</li>
                    <li>Advanced keyword optimization</li>
                    <li>Industry-specific recommendations</li>
                    <li>10 premium South African CV templates</li>
                    <li>Job description matching</li>
                    <li>WhatsApp job alerts and support</li>
                    <li>B-BBEE optimization tips</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-sa-blue font-medium">
                  Can I cancel my Premium subscription anytime?
                </AccordionTrigger>
                <AccordionContent className="text-sa-gray">
                  Yes, you can cancel your Premium subscription at any time. Your subscription benefits will continue until the end of your current billing period. There are no cancellation fees or hidden charges.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left text-sa-blue font-medium">
                  Is my CV data secure with ATSBoost?
                </AccordionTrigger>
                <AccordionContent className="text-sa-gray">
                  Absolutely. We take data security very seriously. Your CV data is encrypted and stored securely. We do not share your personal information or CV data with third parties without your explicit consent. Our platform complies with data protection regulations applicable in South Africa.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left text-sa-blue font-medium">
                  How is ATSBoost different from other CV tools?
                </AccordionTrigger>
                <AccordionContent className="text-sa-gray">
                  ATSBoost is specifically designed for the South African job market, considering local requirements such as B-BBEE information and South African qualifications standards. We offer WhatsApp integration for mobile-first users, affordable pricing in Rand (ZAR), and our algorithms are trained on South African job descriptions and recruiter preferences.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left text-sa-blue font-medium">
                  How often should I update my CV?
                </AccordionTrigger>
                <AccordionContent className="text-sa-gray">
                  We recommend updating your CV whenever you gain new skills, complete projects, change jobs, or earn new qualifications. Additionally, it's best to customize your CV for each job application to ensure it contains the most relevant keywords for that specific position. Premium users can run unlimited analyses to perfect their CV for each application.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger className="text-left text-sa-blue font-medium">
                  Can I use ATSBoost on my mobile phone?
                </AccordionTrigger>
                <AccordionContent className="text-sa-gray">
                  Yes, ATSBoost is fully mobile-optimized, recognizing that many South Africans primarily access the internet via mobile devices. Our platform works seamlessly on smartphones and tablets. You can also interact with ATSBoost via WhatsApp for an even more convenient mobile experience.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10">
                <AccordionTrigger className="text-left text-sa-blue font-medium">
                  Where can I get help if I have more questions?
                </AccordionTrigger>
                <AccordionContent className="text-sa-gray">
                  You can contact our support team via WhatsApp or email at support@atsboost.co.za. Premium users receive priority support. We also offer extensive resources in our CV Guide section and regularly update our blog with helpful job-seeking tips for the South African market.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="bg-gray-100 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold text-sa-blue mb-3">Still have questions?</h2>
              <p className="text-sa-gray mb-4">
                Our support team is ready to help you with any other questions you might have about ATSBoost and our services.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="border-sa-blue text-sa-blue hover:bg-sa-blue/10">
                  Email Support
                </Button>
                <WhatsAppSupport position="static" className="px-4 py-2 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQ;
