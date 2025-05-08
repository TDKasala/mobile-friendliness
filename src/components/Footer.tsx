
import { Button } from "@/components/ui/button";
import { Facebook, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-sa-blue text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              ATS<span className="text-sa-green">Boost</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Helping South African job seekers optimize their CVs and unlock career opportunities.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/atsboost" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-sa-yellow transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://linkedin.com/company/atsboost" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-sa-yellow transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://instagram.com/atsboost.co.za" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-sa-yellow transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/#features" className="text-gray-300 hover:text-sa-yellow transition-colors">
                  CV Optimization Features
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-sa-yellow transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-gray-300 hover:text-sa-yellow transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-sa-yellow transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-sa-yellow transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/toolkit" className="text-gray-300 hover:text-sa-yellow transition-colors">
                  Job Seeker Toolkit
                </Link>
              </li>
              <li>
                <Link to="/job-fit-quiz" className="text-gray-300 hover:text-sa-yellow transition-colors">
                  Job Fit Quiz
                </Link>
              </li>
              <li>
                <Link to="/legal/privacy" className="text-gray-300 hover:text-sa-yellow transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/legal/terms" className="text-gray-300 hover:text-sa-yellow transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-sa-blue-700 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} ATSBoost. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/legal/privacy" className="text-gray-400 hover:text-sa-yellow text-sm transition-colors">
                Privacy
              </Link>
              <Link to="/legal/terms" className="text-gray-400 hover:text-sa-yellow text-sm transition-colors">
                Terms
              </Link>
              <Link to="/legal/cookies" className="text-gray-400 hover:text-sa-yellow text-sm transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
