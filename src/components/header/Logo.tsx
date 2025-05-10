
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

interface LogoProps {
  onClick?: () => void;
}

const Logo = ({ onClick }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center" onClick={onClick}>
      <img 
        src={logo} 
        alt="ATSBoost Logo" 
        className="h-12 sm:h-14"
      />
      <span className="ml-2 text-xl font-bold text-sa-blue dark:text-white hidden sm:inline">
        <span className="text-sa-green">ATS</span>Boost
      </span>
    </Link>
  );
};

export default Logo;
