
import React from "react";

const PrivacyContent: React.FC = () => {
  return (
    <div className="space-y-6">
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
        
        <h3>11. Google OAuth and Third-Party Authentication Services</h3>
        <p>
          11.1. When you choose to use Google OAuth or other third-party authentication services to sign in to ATSBoost, we may collect information from these services, such as your name, email address, and profile picture.
        </p>
        <p>
          11.2. We only request the minimum necessary information required to create and maintain your account. You can review and modify the permissions you grant to ATSBoost through your Google account settings.
        </p>
        <p>
          11.3. Your use of Google OAuth or other third-party authentication services is subject to their respective privacy policies and terms of service.
        </p>
        
        <h3>12. Payment Processing</h3>
        <p>
          12.1. ATSBoost uses Yoco, a trusted third-party payment processor, to handle payment transactions. When you make a payment, your payment information is processed directly by Yoco, and we do not store your full credit card details.
        </p>
        <p>
          12.2. Your use of Yoco's services is subject to their privacy policy and terms of service.
        </p>
        <p>
          12.3. We maintain records of transactions, including purchase amount, date, and subscription status, but do not store sensitive payment details.
        </p>
        
        <h3>13. CV Analysis and AI Services</h3>
        <p>
          13.1. ATSBoost uses DeepSeek API to analyze your CV and provide ATS scoring and recommendations. Your CV content may be transmitted to DeepSeek for processing.
        </p>
        <p>
          13.2. We implement appropriate safeguards to protect your CV data during transmission and processing, and we do not use your CV data for purposes other than providing our services to you.
        </p>
        <p>
          13.3. We cache analysis results to improve performance and reduce costs, but we implement measures to protect the confidentiality and security of your data.
        </p>
        
        <h3>14. Changes to This Privacy Policy</h3>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on our website and, where appropriate, via email.
        </p>
        
        <h3>15. Contact Us</h3>
        <p>
          If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at support@atsboost.co.za.
        </p>
      </div>
    </div>
  );
};

export default PrivacyContent;
