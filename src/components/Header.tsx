import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X, Smartphone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"english" | "afrikaans">("english");
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real implementation, we would toggle dark mode classes
  };

  const toggleLanguage = () => {
    setLanguage(language === "english" ? "afrikaans" : "english");
    // In a real implementation, we would change language settings
  };

  // Handle scroll event to apply shadow and background change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full bg-white dark:bg-sa-blue border-b transition-shadow duration-300 ${
      isScrolled ? 'shadow-md' : 'shadow-sm'
    }`}>
      <div className="container mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-sa-blue dark:text-white">
            ATS<span className="text-sa-green">Boost</span>
          </h1>
        </Link>

        {/* Mobile Indicator for Dev/Testing */}
        {process.env.NODE_ENV === 'development' && (
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 bg-sa-yellow/20 px-2 py-0.5 rounded text-xs items-center">
            <Smartphone size={12} className="mr-1" />
            <span>Mobile Optimized</span>
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <Link to="/#features" className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow text-sm whitespace-nowrap">
            Features
          </Link>
          <Link to="/#pricing" className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow text-sm whitespace-nowrap">
            Pricing
          </Link>
          <Link to="/jobs" className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow text-sm whitespace-nowrap">
            Jobs
          </Link>
          <Link to="/#testimonials" className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow text-sm whitespace-nowrap">
            Success Stories
          </Link>
          <Link to="/blog" className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow text-sm whitespace-nowrap">
            Blog
          </Link>
          <Link to="/job-fit-quiz" className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow text-sm whitespace-nowrap">
            Job Fit Quiz
          </Link>

          <Button 
            variant="ghost" 
            onClick={toggleLanguage}
            className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow text-sm"
            size="sm"
          >
            {language === "english" ? "Afrikaans" : "English"}
          </Button>
          
          <Button 
            variant="ghost"
            onClick={toggleDarkMode}
            className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow"
            size="sm"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          
          <Button 
            variant="default" 
            className="bg-sa-blue hover:bg-sa-blue/90 text-white dark:bg-sa-green dark:hover:bg-sa-green/90"
            size="sm"
          >
            Sign In
          </Button>
          <Button 
            variant="outline" 
            className="border-sa-green text-sa-green hover:bg-sa-green/10 dark:border-sa-yellow dark:text-sa-yellow dark:hover:bg-sa-yellow/10"
            size="sm"
          >
            Register
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <Button 
            variant="ghost"
            onClick={toggleDarkMode}
            className="text-sa-gray hover:text-sa-blue dark:text-white p-1 h-8 w-8"
            size="sm"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="text-sa-gray hover:text-sa-blue dark:text-white p-1 h-8 w-8"
            size="sm"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-sa-blue border-b shadow-sm animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <Link 
              to="/#features" 
              className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow py-2 touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/#pricing" 
              className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow py-2 touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/jobs" 
              className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow py-2 touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
            >
              Jobs
            </Link>
            <Link 
              to="/#testimonials" 
              className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow py-2 touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
            >
              Success Stories
            </Link>
            <Link 
              to="/blog" 
              className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow py-2 touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/job-fit-quiz" 
              className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow py-2 touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
            >
              Job Fit Quiz
            </Link>
            
            <div className="flex items-center justify-between py-2">
              <span className="text-sa-gray dark:text-white">Language:</span>
              <Button 
                variant="ghost" 
                onClick={toggleLanguage}
                className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow text-sm"
              >
                {language === "english" ? "Afrikaans" : "English"}
              </Button>
            </div>
            
            <div className="flex flex-col space-y-2 pt-2">
              <Button 
                variant="default" 
                className="bg-sa-blue hover:bg-sa-blue/90 text-white dark:bg-sa-green dark:hover:bg-sa-green/90 w-full touch-manipulation"
                size="sm"
              >
                Sign In
              </Button>
              <Button 
                variant="outline" 
                className="border-sa-green text-sa-green hover:bg-sa-green/10 dark:border-sa-yellow dark:text-sa-yellow dark:hover:bg-sa-yellow/10 w-full touch-manipulation"
                size="sm"
              >
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
