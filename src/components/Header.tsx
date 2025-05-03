
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X, Smartphone, Globe, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu";

// List of South Africa's 11 official languages
const languages = [
  { code: "en", name: "English" },
  { code: "af", name: "Afrikaans" },
  { code: "zu", name: "isiZulu" },
  { code: "xh", name: "isiXhosa" },
  { code: "st", name: "Sesotho" },
  { code: "tn", name: "Setswana" },
  { code: "nr", name: "isiNdebele" },
  { code: "ss", name: "siSwati" },
  { code: "ve", name: "Tshivenda" },
  { code: "ts", name: "Xitsonga" },
  { code: "nso", name: "Sepedi" }
];

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<string>("en");
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real implementation, we would toggle dark mode classes
  };

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    // In a real implementation, we would change language settings
    console.log(`Language changed to: ${langCode}`);
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

  // Get current language name for display
  const getCurrentLanguageName = () => {
    const currentLang = languages.find(lang => lang.code === language);
    return currentLang?.name || "English";
  };

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
          {/* Features Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost"
                className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow text-sm flex items-center space-x-1"
                size="sm"
              >
                <span>Features</span>
                <ChevronDown size={14} className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-sa-blue border dark:border-gray-700 w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem 
                  className="text-sa-gray dark:text-white cursor-pointer hover:text-sa-blue dark:hover:text-sa-yellow"
                >
                  <Link to="/#features" className="w-full">ATS Scoring System</Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-sa-gray dark:text-white cursor-pointer hover:text-sa-blue dark:hover:text-sa-yellow"
                >
                  <Link to="/#features" className="w-full">Job Description Matching</Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-sa-gray dark:text-white cursor-pointer hover:text-sa-blue dark:hover:text-sa-yellow"
                >
                  <Link to="/#features" className="w-full">AI-Powered Recommendations</Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-sa-gray dark:text-white cursor-pointer hover:text-sa-blue dark:hover:text-sa-yellow"
                >
                  <Link to="/#features" className="w-full">WhatsApp Integration</Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-sa-gray dark:text-white cursor-pointer hover:text-sa-blue dark:hover:text-sa-yellow"
                >
                  <Link to="/#features" className="w-full">CV Templates</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/about" className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow text-sm whitespace-nowrap">
            About Us
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

          {/* Language Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost"
                className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow text-sm flex items-center space-x-1"
                size="sm"
              >
                <Globe size={16} className="mr-1" />
                <span>{getCurrentLanguageName()}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-sa-blue border dark:border-gray-700 w-48">
              {languages.map((lang) => (
                <DropdownMenuItem 
                  key={lang.code}
                  className={`${
                    language === lang.code ? 'text-sa-green dark:text-sa-yellow font-medium' : 
                    'text-sa-gray dark:text-white'
                  } cursor-pointer hover:text-sa-blue dark:hover:text-sa-yellow`}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
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
            <div className="py-2 border-b border-gray-100 dark:border-gray-700">
              <div className="font-medium text-sa-blue dark:text-white">Features</div>
              <div className="ml-4 mt-1 space-y-1">
                <Link 
                  to="/#features" 
                  className="block text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-sa-yellow py-1 text-sm touch-manipulation"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ATS Scoring System
                </Link>
                <Link 
                  to="/#features" 
                  className="block text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-sa-yellow py-1 text-sm touch-manipulation"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Job Description Matching
                </Link>
                <Link 
                  to="/#features" 
                  className="block text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-sa-yellow py-1 text-sm touch-manipulation"
                  onClick={() => setIsMenuOpen(false)}
                >
                  AI-Powered Recommendations
                </Link>
              </div>
            </div>
            
            <Link 
              to="/about" 
              className="text-sa-gray hover:text-sa-blue dark:text-white dark:hover:text-sa-yellow py-2 touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
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
            
            {/* Mobile Language Selector */}
            <div className="py-2 border-t border-gray-100 dark:border-gray-700">
              <p className="text-sa-gray dark:text-white text-sm mb-2 flex items-center">
                <Globe size={14} className="mr-1" />
                Language:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      handleLanguageChange(lang.code);
                    }}
                    className={`text-left px-2 py-1.5 rounded-md text-sm ${
                      language === lang.code 
                        ? "bg-sa-blue/10 dark:bg-sa-yellow/10 text-sa-blue dark:text-sa-yellow font-medium" 
                        : "text-sa-gray dark:text-white"
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100 dark:border-gray-700">
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
