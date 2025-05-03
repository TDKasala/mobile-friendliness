
import { Button } from "@/components/ui/button";
import { Facebook, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-sa-blue text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
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
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-sa-yellow transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-sa-yellow transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-sa-yellow transition-colors"
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
                <a href="/#features" className="text-gray-300 hover:text-sa-yellow transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-sa-yellow transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/#testimonials" className="text-gray-300 hover:text-sa-yellow transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-300 hover:text-sa-yellow transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#cv-templates" className="text-gray-300 hover:text-sa-yellow transition-colors">
                  CV Templates
                </a>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#toolkit" className="text-gray-300 hover:text-sa-yellow transition-colors">
                  Job Seeker Toolkit
                </a>
              </li>
              <li>
                <a href="/job-fit-quiz" className="text-gray-300 hover:text-sa-yellow transition-colors">
                  Job Fit Quiz
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-300 hover:text-sa-yellow transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-gray-300 hover:text-sa-yellow transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-300 hover:text-sa-yellow transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get Weekly CV Tips</h3>
            <p className="text-gray-300 mb-4">
              Subscribe for free South African job market insights and CV advice.
            </p>
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-2 rounded bg-sa-blue-900 border border-sa-blue-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-sa-green"
              />
              <Button 
                variant="default"
                className="w-full bg-sa-green hover:bg-sa-green/90 text-white"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-sa-blue-700 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} ATSBoost. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#privacy" className="text-gray-400 hover:text-sa-yellow text-sm transition-colors">
                Privacy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-sa-yellow text-sm transition-colors">
                Terms
              </a>
              <a href="#cookies" className="text-gray-400 hover:text-sa-yellow text-sm transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
