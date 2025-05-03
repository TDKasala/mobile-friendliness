
import {
  Upload,
  BarChart,
  FileText,
  Star,
  Smartphone,
  MessageSquare,
  Clock,
  Award,
  Users,
  Check
} from "lucide-react";

const FeatureCard = ({
  icon,
  title,
  description,
  isPremium = false
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  isPremium?: boolean;
}) => {
  return (
    <div className="bg-white dark:bg-sa-blue/30 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-sa-blue/70 flex flex-col">
      <div className="mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          isPremium ? 'bg-sa-yellow/20 text-sa-yellow' : 'bg-sa-green/20 text-sa-green'
        }`}>
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-sa-blue dark:text-white">
        {title}
        {isPremium && (
          <span className="ml-2 text-xs bg-sa-yellow text-white px-2 py-0.5 rounded-full">
            Premium
          </span>
        )}
      </h3>
      <p className="text-sa-gray dark:text-gray-300">{description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-16 bg-gray-50 dark:bg-sa-blue/10">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 text-sa-blue dark:text-white">
            Features to Boost Your CV's Success
          </h2>
          <p className="text-sa-gray dark:text-gray-300">
            ATSBoost offers powerful tools to help South African job seekers create CVs that get noticed 
            and shortlisted by employers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Upload size={24} />}
            title="Multiple CV Upload Formats"
            description="Upload your CV in PDF, DOCX, TXT, or ODT formats. You can even send it via WhatsApp for easy mobile access."
          />
          
          <FeatureCard
            icon={<BarChart size={24} />}
            title="ATS Scoring System"
            description="Get an overall ATS score (0-100) and understand how well your CV performs against applicant tracking systems."
            isPremium={false}
          />
          
          <FeatureCard
            icon={<FileText size={24} />}
            title="Job Description Matching"
            description="Paste a job posting to extract keywords and receive tailored suggestions to align your CV with specific opportunities."
          />
          
          <FeatureCard
            icon={<Star size={24} />}
            title="AI-Powered Recommendations"
            description="Receive intelligent suggestions to improve keyword matching, formatting, and content, including B-BBEE compliance tips."
            isPremium={true}
          />
          
          <FeatureCard
            icon={<Smartphone size={24} />}
            title="Mobile Optimization"
            description="Access ATSBoost on any device with our fully responsive design optimized for South Africa's mobile-first internet users."
          />
          
          <FeatureCard
            icon={<MessageSquare size={24} />}
            title="WhatsApp Integration"
            description="Get job alerts, CV tips, and support via WhatsApp, South Africa's most popular messaging platform."
            isPremium={true}
          />
          
          <FeatureCard
            icon={<Clock size={24} />}
            title="Pay-As-You-Use Option"
            description="Need a one-time deep analysis? Pay only R30 for comprehensive CV feedback without a subscription."
          />
          
          <FeatureCard
            icon={<Award size={24} />}
            title="Gamified CV Improvement"
            description="Complete our 'CV Quest' to earn points and badges while improving your CV, with a 3-day premium trial as a reward."
          />
          
          <FeatureCard
            icon={<Users size={24} />}
            title="Refer-a-Friend Program"
            description="Earn a free deep analysis for every three friends who sign up. Help your network while getting rewards."
          />
        </div>
        
        <div className="mt-12 bg-sa-blue dark:bg-sa-green/90 rounded-xl shadow-lg p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:max-w-xl">
              <h3 className="text-2xl font-bold mb-3">
                Premium Features for Serious Job Seekers
              </h3>
              <p className="mb-4 text-white/90">
                Unlock our full suite of tools to maximize your employment opportunities in the competitive South African job market.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check size={16} className="mr-2 text-sa-yellow" />
                  <span>Unlimited CV analyses and detailed reports</span>
                </li>
                <li className="flex items-center">
                  <Check size={16} className="mr-2 text-sa-yellow" />
                  <span>10 premium South African CV templates</span>
                </li>
                <li className="flex items-center">
                  <Check size={16} className="mr-2 text-sa-yellow" />
                  <span>Weekly job alerts via WhatsApp</span>
                </li>
                <li className="flex items-center">
                  <Check size={16} className="mr-2 text-sa-yellow" />
                  <span>Priority support and B-BBEE compliance tips</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 p-6 rounded-lg text-center">
              <p className="text-sa-yellow font-semibold mb-2">Premium Subscription</p>
              <div className="text-3xl font-bold mb-2">R100<span className="text-lg font-normal">/month</span></div>
              <p className="text-sm mb-4 text-white/80">Cancel anytime</p>
              <button className="w-full bg-sa-yellow hover:bg-sa-yellow/90 text-sa-blue font-semibold py-2 px-4 rounded">
                Upgrade Now
              </button>
              <p className="text-xs mt-2 text-white/80">50% off first month for new users!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
