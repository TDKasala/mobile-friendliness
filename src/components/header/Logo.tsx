
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

interface LogoProps {
  onClick?: () => void;
}

const Logo = ({ onClick }: LogoProps) => {
  return (
    <Link 
      to="/" 
      className="flex items-center group transition-transform hover:scale-105" 
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={logo} 
          alt="HireMzansi Logo" 
          className="h-10 sm:h-12 lg:h-14 transition-all duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sa-blue/10 to-sa-green/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      </div>
      <div className="ml-3 hidden sm:block">
        <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-sa-blue to-sa-green bg-clip-text text-transparent">
          Hire<span className="text-sa-green">Mzansi</span>
        </span>
        <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">CV Optimization</p>
      </div>
    </Link>
  );
};

export default Logo;
