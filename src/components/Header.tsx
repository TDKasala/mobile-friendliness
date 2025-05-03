
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X } from "lucide-react";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"english" | "afrikaans">("english");

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real implementation, we would toggle dark mode classes
  };

  const toggleLanguage = () => {
    setLanguage(language === "english" ? "afrikaans" : "english");
    // In a real implementation, we would change language settings
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-sa-blue border-b shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-xl md:text-2xl font-bold text-sa-blue dark:text-white">
            ATS<span className="text-sa-green">Boost</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow">
            Features
          </a>
          <a href="#pricing" className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow">
            Pricing
          </a>
          <a href="#testimonials" className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow">
            Success Stories
          </a>
          <a href="#blog" className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow">
            Blog
          </a>

          <Button 
            variant="ghost" 
            onClick={toggleLanguage}
            className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow"
          >
            {language === "english" ? "Afrikaans" : "English"}
          </Button>
          
          <Button 
            variant="ghost"
            onClick={toggleDarkMode}
            className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          
          <Button variant="default" className="bg-sa-blue hover:bg-sa-blue/90 text-white dark:bg-sa-green dark:hover:bg-sa-green/90">
            Sign In
          </Button>
          <Button variant="outline" className="border-sa-green text-sa-green hover:bg-sa-green/10 dark:border-sa-yellow dark:text-sa-yellow dark:hover:bg-sa-yellow/10">
            Register
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="text-sa-gray hover:text-sa-blue dark:text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-sa-blue border-b shadow-sm">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#pricing" 
              className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <a 
              href="#testimonials" 
              className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Success Stories
            </a>
            <a 
              href="#blog" 
              className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </a>
            
            <div className="flex items-center justify-between py-2">
              <span className="text-sa-gray dark:text-white">Language:</span>
              <Button 
                variant="ghost" 
                onClick={toggleLanguage}
                className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow"
              >
                {language === "english" ? "Afrikaans" : "English"}
              </Button>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <span className="text-sa-gray dark:text-white">Theme:</span>
              <Button 
                variant="ghost"
                onClick={toggleDarkMode}
                className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </div>
            
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="default" className="bg-sa-blue hover:bg-sa-blue/90 text-white dark:bg-sa-green dark:hover:bg-sa-green/90 w-full">
                Sign In
              </Button>
              <Button variant="outline" className="border-sa-green text-sa-green hover:bg-sa-green/10 dark:border-sa-yellow dark:text-sa-yellow dark:hover:bg-sa-yellow/10 w-full">
                Register
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
