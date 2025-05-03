
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // List of South African official languages
  const languages = [
    { code: "en", name: "English" },
    { code: "af", name: "Afrikaans" },
    { code: "zu", name: "isiZulu" },
    { code: "xh", name: "isiXhosa" },
    { code: "st", name: "Sesotho" },
    { code: "tn", name: "Setswana" },
    { code: "nso", name: "Sepedi" },
    { code: "ve", name: "Tshivenda" },
    { code: "ts", name: "Xitsonga" },
    { code: "ss", name: "siSwati" },
    { code: "nr", name: "isiNdebele" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        isScrolled ? "bg-white shadow-md dark:bg-sa-blue" : "bg-white dark:bg-sa-blue"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-sa-blue dark:text-white">
              ATS<span className="text-sa-green">Boost</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/#analyze-cv" 
              className="text-sa-gray hover:text-sa-green transition-colors dark:text-gray-300 dark:hover:text-sa-yellow"
            >
              Analyze CV
            </Link>
            
            {/* Features Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-sa-gray hover:text-sa-green transition-colors dark:text-gray-300 dark:hover:text-sa-yellow">
                  Features <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <a href="/#features">All Features</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/ats-simulator">ATS Simulator</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/job-fit-quiz">Job Fit Quiz</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/templates">CV Templates</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/toolkit">Job Seeker Toolkit</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link 
              to="/about" 
              className="text-sa-gray hover:text-sa-green transition-colors dark:text-gray-300 dark:hover:text-sa-yellow"
            >
              About
            </Link>
            
            <Link 
              to="/blog" 
              className="text-sa-gray hover:text-sa-green transition-colors dark:text-gray-300 dark:hover:text-sa-yellow"
            >
              Blog
            </Link>
            
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-sa-gray hover:text-sa-green transition-colors dark:text-gray-300 dark:hover:text-sa-yellow">
                  Language <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code}>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 p-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">Account</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/subscription">Subscription</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-sa-green hover:bg-sa-green/90 text-white dark:bg-sa-yellow dark:hover:bg-sa-yellow/90 dark:text-sa-blue">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </nav>
          
          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden p-2 text-sa-gray hover:text-sa-green dark:text-gray-300 dark:hover:text-sa-yellow"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white dark:bg-sa-blue/95 shadow-lg`}>
        <div className="container mx-auto px-4 py-3 space-y-4">
          <Link 
            to="/#analyze-cv" 
            className="block py-2 text-sa-gray hover:text-sa-green dark:text-gray-300 dark:hover:text-sa-yellow"
            onClick={() => setIsMenuOpen(false)}
          >
            Analyze CV
          </Link>
          
          {/* Mobile Features Dropdown */}
          <div className="space-y-2">
            <div className="flex items-center text-sa-gray dark:text-gray-300">
              Features
            </div>
            <div className="pl-4 space-y-2 border-l-2 border-sa-blue/20 dark:border-sa-green/20">
              <a 
                href="/#features" 
                className="block py-1 text-sa-gray hover:text-sa-green dark:text-gray-300 dark:hover:text-sa-yellow"
                onClick={() => setIsMenuOpen(false)}
              >
                All Features
              </a>
              <Link 
                to="/ats-simulator" 
                className="block py-1 text-sa-gray hover:text-sa-green dark:text-gray-300 dark:hover:text-sa-yellow"
                onClick={() => setIsMenuOpen(false)}
              >
                ATS Simulator
              </Link>
              <Link 
                to="/job-fit-quiz" 
                className="block py-1 text-sa-gray hover:text-sa-green dark:text-gray-300 dark:hover:text-sa-yellow"
                onClick={() => setIsMenuOpen(false)}
              >
                Job Fit Quiz
              </Link>
              <Link 
                to="/templates" 
                className="block py-1 text-sa-gray hover:text-sa-green dark:text-gray-300 dark:hover:text-sa-yellow"
                onClick={() => setIsMenuOpen(false)}
              >
                CV Templates
              </Link>
              <Link 
                to="/toolkit" 
                className="block py-1 text-sa-gray hover:text-sa-green dark:text-gray-300 dark:hover:text-sa-yellow"
                onClick={() => setIsMenuOpen(false)}
              >
                Job Seeker Toolkit
              </Link>
            </div>
          </div>
          
          <Link 
            to="/about" 
            className="block py-2 text-sa-gray hover:text-sa-green dark:text-gray-300 dark:hover:text-sa-yellow"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          
          <Link 
            to="/blog" 
            className="block py-2 text-sa-gray hover:text-sa-green dark:text-gray-300 dark:hover:text-sa-yellow"
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
          
          {/* Mobile Language Selector */}
          <div className="space-y-2">
            <div className="flex items-center text-sa-gray dark:text-gray-300">
              Language
            </div>
            <div className="pl-4 grid grid-cols-2 gap-2 border-l-2 border-sa-blue/20 dark:border-sa-green/20">
              {languages.slice(0, 6).map((lang) => (
                <button 
                  key={lang.code}
                  className="text-left py-1 text-sa-gray hover:text-sa-green dark:text-gray-300 dark:hover:text-sa-yellow"
                >
                  {lang.name}
                </button>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-left py-1 text-sa-gray hover:text-sa-green dark:text-gray-300 dark:hover:text-sa-yellow">
                    More...
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {languages.slice(6).map((lang) => (
                    <DropdownMenuItem key={lang.code}>
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Mobile Authentication Links */}
          <div className="pt-2 space-y-3">
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full justify-center">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  className="w-full bg-sa-green hover:bg-sa-green/90 text-white dark:bg-sa-yellow dark:hover:bg-sa-yellow/90 dark:text-sa-blue"
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full justify-center">
                    Sign In
                  </Button>
                </Link>
                <Link 
                  to="/signup" 
                  className="block w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full bg-sa-green hover:bg-sa-green/90 text-white dark:bg-sa-yellow dark:hover:bg-sa-yellow/90 dark:text-sa-blue">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
