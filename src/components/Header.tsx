
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const scrollToAnalyzeCv = () => {
    closeMenu();
    if (location.pathname !== "/") {
      navigate("/#analyze-cv");
    } else {
      document.getElementById("analyze-cv")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full py-3 transition-colors duration-200 ${
        isScrolled 
          ? "bg-white/95 dark:bg-sa-blue/95 backdrop-blur-sm shadow-sm" 
          : "bg-white dark:bg-sa-blue"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <img 
              src={logo} 
              alt="ATSBoost Logo" 
              className="h-12 sm:h-14" // Increased size from h-8 sm:h-10 to h-12 sm:h-14
            />
            <span className="ml-2 text-xl font-bold text-sa-blue dark:text-white hidden sm:inline">
              <span className="text-sa-green">ATS</span>BOOST
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" asChild>
              <Link to="/" className="text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-white">
                Home
              </Link>
            </Button>
            <Button variant="ghost" onClick={scrollToAnalyzeCv} className="text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-white">
              Analyze CV
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/templates" className="text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-white">
                Templates
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/job-fit-quiz" className="text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-white">
                Job Fit Quiz
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/pricing" className="text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-white">
                Pricing
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/toolkit" className="text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-white">
                Toolkit
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/about" className="text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-white">
                About
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/faq" className="text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-white">
                FAQ
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/cv-guide" className="text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-white">
                CV Guide
              </Link>
            </Button>
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/dashboard" className="text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-white">
                    Dashboard
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="border-sa-red text-sa-red hover:bg-sa-red/10"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button className="bg-sa-green hover:bg-sa-green/90 text-white" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-sa-gray dark:text-gray-300 p-2" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 py-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" asChild>
                <Link 
                  to="/" 
                  className="text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-white justify-start"
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                onClick={scrollToAnalyzeCv}
                className="text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-white justify-start"
              >
                Analyze CV
              </Button>
              <Button variant="ghost" asChild>
                <Link 
                  to="/templates" 
                  className="text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-white justify-start"
                  onClick={closeMenu}
                >
                  Templates
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link 
                  to="/job-fit-quiz" 
                  className="text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-white justify-start"
                  onClick={closeMenu}
                >
                  Job Fit Quiz
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link 
                  to="/pricing" 
                  className="text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-white justify-start"
                  onClick={closeMenu}
                >
                  Pricing
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link 
                  to="/toolkit" 
                  className="text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-white justify-start"
                  onClick={closeMenu}
                >
                  Toolkit
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link 
                  to="/about" 
                  className="text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-white justify-start"
                  onClick={closeMenu}
                >
                  About
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link 
                  to="/faq" 
                  className="text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-white justify-start"
                  onClick={closeMenu}
                >
                  FAQ
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link 
                  to="/cv-guide" 
                  className="text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-white justify-start"
                  onClick={closeMenu}
                >
                  CV Guide
                </Link>
              </Button>
              
              {/* Mobile Auth Buttons */}
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 mt-2">
                {user ? (
                  <>
                    <Button variant="ghost" asChild>
                      <Link 
                        to="/dashboard" 
                        className="text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-white justify-start"
                        onClick={closeMenu}
                      >
                        Dashboard
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        handleLogout();
                        closeMenu();
                      }}
                      className="border-sa-red text-sa-red hover:bg-sa-red/10 w-full mt-2"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" asChild className="w-full">
                      <Link to="/login" onClick={closeMenu}>
                        Sign In
                      </Link>
                    </Button>
                    <Button className="bg-sa-green hover:bg-sa-green/90 text-white w-full" asChild>
                      <Link to="/signup" onClick={closeMenu}>
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
