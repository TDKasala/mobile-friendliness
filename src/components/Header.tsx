
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "./header/Logo";
import NavLinks from "./header/NavLinks";
import AuthButtons from "./header/AuthButtons";
import MobileMenu from "./header/MobileMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const {
    user,
    signOut
  } = useAuth();
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
      document.getElementById("analyze-cv")?.scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full py-3 transition-colors duration-200 ${isScrolled ? "bg-white/95 dark:bg-sa-blue/95 backdrop-blur-sm shadow-sm" : "bg-white dark:bg-sa-blue"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Logo onClick={closeMenu} />
          
          <NavLinks scrollToAnalyzeCv={scrollToAnalyzeCv} />
          
          <AuthButtons user={user} handleLogout={handleLogout} />
          
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-sa-blue/70"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        <MobileMenu
          isOpen={isMenuOpen}
          closeMenu={closeMenu}
          handleLogout={handleLogout}
          scrollToAnalyzeCv={scrollToAnalyzeCv}
          user={user}
        />
      </div>
    </header>
  );
};

export default Header;
