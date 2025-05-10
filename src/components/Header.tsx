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
  const [isScrolled, setIsScrolled] = useState(false);
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
  return <header className={`sticky top-0 z-50 w-full py-3 transition-colors duration-200 ${isScrolled ? "bg-white/95 dark:bg-sa-blue/95 backdrop-blur-sm shadow-sm" : "bg-white dark:bg-sa-blue"}`}>
      
    </header>;
};
export default Header;