
import React from "react";
import { Helmet } from "react-helmet";
import { Link, useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

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

      <Header />

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
              
              <TabsContent value="terms" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-sa-blue mb-3">Terms of Service</h2>
                  <p className="text-sa-gray">Last Updated: May 3, 2025</p>
                </div>

                <div className="prose max-w-none text-sa-gray">
                  <h3>1. Introduction</h3>
                  <p>
                    Welcome to ATSBoost ("we," "our," or "us"). By accessing or using our website, mobile applications, or any of our services, you agree to be bound by these Terms of Service ("Terms"). Please read these Terms carefully before using our services.
                  </p>
                  
                  <h3>2. Acceptance of Terms</h3>
                  <p>
                    By accessing or using the ATSBoost platform, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services. These Terms constitute a legally binding agreement between you and ATSBoost.
                  </p>
                  
                  <h3>3. Description of Services</h3>
                  <p>
                    ATSBoost provides CV analysis, optimization, and related career tools designed to help users improve their job application materials. Our services include, but are not limited to, ATS compatibility analysis, CV optimization suggestions, template access, and other career resources.
                  </p>
                  
                  <h3>4. User Accounts</h3>
                  <p>
                    4.1. To access certain features of ATSBoost, you must create an account. You agree to provide accurate, current, and complete information during the registration process.
                  </p>
                  <p>
                    4.2. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                  </p>
                  <p>
                    4.3. You must notify us immediately of any unauthorized use of your account or any other breach of security.
                  </p>
                  
                  <h3>5. Subscription and Payment</h3>
                  <p>
                    5.1. ATSBoost offers both free and premium subscription plans. By selecting a premium plan, you agree to pay all fees associated with that plan.
                  </p>
                  <p>
                    5.2. Subscription fees are charged in advance and are non-refundable except as expressly provided in these Terms.
                  </p>
                  <p>
                    5.3. You may cancel your subscription at any time. Upon cancellation, your subscription will remain active until the end of your current billing period.
                  </p>
                  
                  <h3>6. Use of Services</h3>
                  <p>
                    6.1. You agree to use our services only for lawful purposes and in accordance with these Terms.
                  </p>
                  <p>
                    6.2. You agree not to use our services to:
                  </p>
                  <ul>
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe the intellectual property rights of others</li>
                    <li>Transmit any harmful code or attempt to gain unauthorized access to our systems</li>
                    <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of our services</li>
                  </ul>
                  
                  <h3>7. Intellectual Property</h3>
                  <p>
                    7.1. ATSBoost and its licensors own all intellectual property rights in our services, including but not limited to our website, applications, algorithms, and content.
                  </p>
                  <p>
                    7.2. You retain all rights to the content you submit to ATSBoost, including your CV and personal information. By submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use, store, and process that content for the purpose of providing our services to you.
                  </p>
                  
                  <h3>8. Limitation of Liability</h3>
                  <p>
                    8.1. To the maximum extent permitted by law, ATSBoost shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
                  </p>
                  <p>
                    8.2. ATSBoost does not guarantee employment or job interviews as a result of using our services.
                  </p>
                  
                  <h3>9. Termination</h3>
                  <p>
                    9.1. We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason.
                  </p>
                  <p>
                    9.2. Upon termination, your right to use our services will immediately cease.
                  </p>
                  
                  <h3>10. Changes to Terms</h3>
                  <p>
                    We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the new Terms on our website. Your continued use of our services after such changes constitutes your acceptance of the new Terms.
                  </p>
                  
                  <h3>11. Governing Law</h3>
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of the Republic of South Africa, without regard to its conflict of law provisions.
                  </p>
                  
                  <h3>12. Contact Information</h3>
                  <p>
                    For any questions about these Terms, please contact us at support@atsboost.co.za.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="privacy" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-sa-blue mb-3">Privacy Policy</h2>
                  <p className="text-sa-gray">Last Updated: May 3, 2025</p>
                </div>

                <div className="prose max-w-none text-sa-gray">
                  <h3>1. Introduction</h3>
                  <p>
                    This Privacy Policy explains how ATSBoost ("we," "our," or "us") collects, uses, discloses, and safeguards your personal information when you use our website, mobile applications, or services. We respect your privacy and are committed to protecting your personal information.
                  </p>
                  
                  <h3>2. Information We Collect</h3>
                  <p>
                    2.1. <strong>Personal Information</strong>: We collect information that identifies, relates to, describes, or can be associated with you, such as your name, email address, phone number, and professional information contained in your CV.
                  </p>
                  <p>
                    2.2. <strong>Usage Data</strong>: We collect information about how you interact with our services, including your browsing history on our site, features you use, and time spent on our platform.
                  </p>
                  <p>
                    2.3. <strong>Device Information</strong>: We collect information about the device you use to access our services, such as device type, operating system, and browser type.
                  </p>
                  
                  <h3>3. How We Collect Information</h3>
                  <p>
                    3.1. <strong>Direct Collection</strong>: Information you provide when you register for an account, upload your CV, complete forms, or communicate with us.
                  </p>
                  <p>
                    3.2. <strong>Automated Collection</strong>: Information collected through cookies, web beacons, and other tracking technologies.
                  </p>
                  <p>
                    3.3. <strong>Third-Party Sources</strong>: Information we may receive from business partners, analytics providers, and advertising networks.
                  </p>
                  
                  <h3>4. How We Use Your Information</h3>
                  <p>
                    We use your personal information for the following purposes:
                  </p>
                  <ul>
                    <li>To provide and maintain our services</li>
                    <li>To process and analyze your CV</li>
                    <li>To personalize and improve your experience</li>
                    <li>To communicate with you about our services</li>
                    <li>To comply with legal obligations</li>
                    <li>To prevent fraud and enhance security</li>
                    <li>To facilitate payment processing</li>
                  </ul>
                  
                  <h3>5. Protection of Your Data</h3>
                  <p>
                    5.1. We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  <p>
                    5.2. We store your data using encryption and other security measures in compliance with applicable data protection laws.
                  </p>
                  <p>
                    5.3. Despite our efforts, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                  
                  <h3>6. Disclosure of Your Information</h3>
                  <p>
                    We may share your information with:
                  </p>
                  <ul>
                    <li>Service providers who perform services on our behalf</li>
                    <li>Business partners with your consent</li>
                    <li>Legal authorities when required by law</li>
                    <li>Potential buyers in the event of a business transaction</li>
                  </ul>
                  
                  <h3>7. Your Rights</h3>
                  <p>
                    Depending on your location, you may have certain rights regarding your personal information, including:
                  </p>
                  <ul>
                    <li>The right to access your personal information</li>
                    <li>The right to correct inaccurate information</li>
                    <li>The right to delete your information</li>
                    <li>The right to object to processing</li>
                    <li>The right to data portability</li>
                  </ul>
                  
                  <h3>8. Data Retention</h3>
                  <p>
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                  </p>
                  
                  <h3>9. Children's Privacy</h3>
                  <p>
                    Our services are not intended for children under the age of 18. We do not knowingly collect or solicit personal information from children.
                  </p>
                  
                  <h3>10. International Data Transfers</h3>
                  <p>
                    Your information may be transferred to and processed in countries other than your country of residence, where data protection laws may differ. We take steps to ensure that your information receives adequate protection.
                  </p>
                  
                  <h3>11. Changes to This Privacy Policy</h3>
                  <p>
                    We may update our Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on our website and, where appropriate, via email.
                  </p>
                  
                  <h3>12. Contact Us</h3>
                  <p>
                    If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at support@atsboost.co.za.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="cookies" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-sa-blue mb-3">Cookies Policy</h2>
                  <p className="text-sa-gray">Last Updated: May 3, 2025</p>
                </div>

                <div className="prose max-w-none text-sa-gray">
                  <h3>1. What Are Cookies</h3>
                  <p>
                    Cookies are small text files that are placed on your device when you visit our website. They allow us to recognize your device and store certain information about your preferences or past actions.
                  </p>
                  
                  <h3>2. Types of Cookies We Use</h3>
                  <p>
                    2.1. <strong>Essential Cookies</strong>: These cookies are necessary for the functioning of our website and enable you to navigate our site and use its features. They are usually set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.
                  </p>
                  <p>
                    2.2. <strong>Performance and Analytics Cookies</strong>: These cookies collect information about how visitors use our website, such as which pages they visit most often. They help us improve how our website works and understand user preferences.
                  </p>
                  <p>
                    2.3. <strong>Functionality Cookies</strong>: These cookies enable our website to remember choices you make and provide enhanced, personalized features. They may be set by us or by third-party providers whose services we have added to our pages.
                  </p>
                  <p>
                    2.4. <strong>Targeting or Advertising Cookies</strong>: These cookies are used to deliver advertisements that are more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns.
                  </p>
                  
                  <h3>3. Third-Party Cookies</h3>
                  <p>
                    Some cookies are set by third parties on our website. These third parties may collect information about your online activities across different websites. These cookies are primarily used for analytics and advertising purposes.
                  </p>
                  
                  <h3>4. How to Manage Cookies</h3>
                  <p>
                    4.1. <strong>Browser Settings</strong>: Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "options" or "preferences" menu of your browser.
                  </p>
                  <p>
                    4.2. <strong>Our Cookie Preference Center</strong>: You can manage your cookie preferences on our website through our Cookie Preference Center, which allows you to select which categories of cookies you accept or reject.
                  </p>
                  <p>
                    4.3. <strong>Opting Out</strong>: You can opt out of targeted advertising cookies through industry programs like the Digital Advertising Alliance or the Network Advertising Initiative.
                  </p>
                  
                  <h3>5. Consequences of Disabling Cookies</h3>
                  <p>
                    If you disable or decline cookies, some features of our website may not function properly. Essential cookies cannot be disabled as they are necessary for the proper functioning of our website.
                  </p>
                  
                  <h3>6. Updates to This Cookie Policy</h3>
                  <p>
                    We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will be posted on this page, and if significant changes are made, we will provide a more prominent notice.
                  </p>
                  
                  <h3>7. Cookie Duration</h3>
                  <p>
                    The cookies we use have different durations:
                  </p>
                  <ul>
                    <li><strong>Session cookies</strong>: These are temporary and are deleted when you close your browser.</li>
                    <li><strong>Persistent cookies</strong>: These remain on your device until they expire or you delete them manually.</li>
                  </ul>
                  
                  <h3>8. Contact Us</h3>
                  <p>
                    If you have any questions about our use of cookies, please contact us at support@atsboost.co.za.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-sa-blue mb-3">Questions About Our Legal Policies?</h2>
              <p className="text-sa-gray mb-4">
                If you have any questions or concerns about our Terms of Service, Privacy Policy, or Cookies Policy, please don't hesitate to get in touch with us.
              </p>
              <Button className="bg-sa-blue hover:bg-sa-blue/90 text-white">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Legal;
