
import React from "react";

const CookiesContent: React.FC = () => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default CookiesContent;
