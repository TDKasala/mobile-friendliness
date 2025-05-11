
import React from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import WhatsAppSupport from "@/components/WhatsAppSupport";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Contact Us | ATSBoost</title>
        <meta name="description" content="Get in touch with the ATSBoost team for any questions or support needs" />
      </Helmet>

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-sa-blue mb-2">Contact Us</h1>
            <p className="text-sa-gray mb-8">
              We're here to help with any questions or support you might need
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-sa-blue mb-4">Send Us a Message</h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-sa-gray mb-1">Your Name</label>
                    <Input id="name" placeholder="Full Name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-sa-gray mb-1">Email Address</label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-sa-gray mb-1">Subject</label>
                    <Input id="subject" placeholder="How can we help you?" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-sa-gray mb-1">Message</label>
                    <Textarea id="message" placeholder="Type your message here..." className="h-32" />
                  </div>
                  <Button className="w-full bg-sa-green hover:bg-sa-green/90 text-white">
                    Send Message
                  </Button>
                </form>
              </Card>
              
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-sa-blue mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-sa-gray">Email Address:</p>
                      <p className="text-sa-blue">support@atsboost.co.za</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-sa-gray">Response Time:</p>
                      <p className="text-sa-blue">Within 24 hours (business days)</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-sa-gray">Operating Hours:</p>
                      <p className="text-sa-blue">Monday to Friday, 8:00 AM - 5:00 PM (SAST)</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 bg-[#F2FCE2] border-sa-green/10">
                  <div className="flex items-center mb-4">
                    <MessageSquare className="h-5 w-5 text-sa-green mr-2" />
                    <h2 className="text-xl font-semibold text-sa-green">WhatsApp Support</h2>
                  </div>
                  <p className="text-sa-gray mb-4">
                    Get quick support through our WhatsApp channel. This is the fastest way to reach our team.
                  </p>
                  <WhatsAppSupport position="static" className="w-full justify-center py-2" />
                </Card>
                
                <Card className="p-6 bg-gray-50">
                  <h2 className="text-xl font-semibold text-sa-blue mb-4">Frequently Asked Questions</h2>
                  <p className="text-sa-gray mb-4">
                    Find answers to common questions about our services.
                  </p>
                  <Button variant="outline" className="w-full">
                    <a href="/faq">Visit FAQ Page</a>
                  </Button>
                </Card>
              </div>
            </div>
            
            <div className="bg-sa-blue/5 rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-sa-blue mb-2">Premium Support</h2>
              <p className="text-sa-gray mb-4">
                Premium subscribers receive priority support with response times under 6 hours during business hours.
              </p>
              <Button className="bg-sa-blue hover:bg-sa-blue/90 text-white">
                <a href="/subscription">Upgrade to Premium</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
