
import React from "react";
import { Helmet } from "react-helmet";
import { Link, useParams, Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield } from "lucide-react";
import TermsContent from "@/components/legal/TermsContent";
import PrivacyContent from "@/components/legal/PrivacyContent";
import CookiesContent from "@/components/legal/CookiesContent";
import ContactSection from "@/components/legal/ContactSection";

const Legal = () => {
  const { tab } = useParams<{ tab?: string }>();
  
  // Determine the active tab based on URL parameter or default to "terms"
  const activeTab = tab === "privacy" || tab === "cookies" ? tab : "terms";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Legal Information | ATSBoost</title>
        <meta name="description" content="Legal information, terms of service, privacy policy, and cookies policy for ATSBoost" />
      </Helmet>

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Shield className="h-6 w-6 text-sa-blue mr-2" />
              <h1 className="text-3xl font-bold text-sa-blue">Legal Information</h1>
            </div>
            
            <Tabs defaultValue={activeTab} className="mb-10">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="terms" asChild>
                  <Link to="/legal/terms">Terms of Service</Link>
                </TabsTrigger>
                <TabsTrigger value="privacy" asChild>
                  <Link to="/legal/privacy">Privacy Policy</Link>
                </TabsTrigger>
                <TabsTrigger value="cookies" asChild>
                  <Link to="/legal/cookies">Cookies Policy</Link>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="terms">
                <TermsContent />
              </TabsContent>
              
              <TabsContent value="privacy">
                <PrivacyContent />
              </TabsContent>
              
              <TabsContent value="cookies">
                <CookiesContent />
              </TabsContent>
            </Tabs>
            
            <ContactSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Legal;
