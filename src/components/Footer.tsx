
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
                <a href="#features" className="text-gray-300 hover:text-sa-yellow transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-300 hover:text-sa-yellow transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-300 hover:text-sa-yellow transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#blog" className="text-gray-300 hover:text-sa-yellow transition-colors">
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
                <a href="#career-quiz" className="text-gray-300 hover:text-sa-yellow transition-colors">
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
            
            <div className="mt-4">
              <a 
                href="https://wa.me/27123456789?text=I'm%20interested%20in%20ATSBoost" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sa-green hover:text-sa-yellow transition-colors text-sm flex items-center"
              >
                <span className="mr-1">Get support via WhatsApp</span>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
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
              <div className="flex items-center">
                <span className="text-gray-400 text-sm mr-2">Language:</span>
                <select className="bg-sa-blue border border-sa-blue-700 text-gray-300 text-sm rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-sa-green">
                  <option value="en">English</option>
                  <option value="af">Afrikaans</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
