
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

interface NavLinksProps {
  scrollToAnalyzeCv: () => void;
}

const NavLinks = ({ scrollToAnalyzeCv }: NavLinksProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItemClass = (path: string) => `
    relative px-3 py-2 rounded-lg transition-all duration-200 font-medium
    ${isActive(path) 
      ? 'text-sa-blue dark:text-sa-green bg-sa-blue/10 dark:bg-sa-green/10' 
      : 'text-gray-600 hover:text-sa-blue dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-sa-blue/30'
    }
  `;

  return (
    <nav className="hidden lg:flex items-center space-x-1">
      <Button variant="ghost" asChild className={navItemClass("/")}>
        <Link to="/">Home</Link>
      </Button>
      
      <Button 
        variant="ghost" 
        onClick={scrollToAnalyzeCv} 
        className="relative px-3 py-2 rounded-lg transition-all duration-200 font-medium text-gray-600 hover:text-sa-blue dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-sa-blue/30"
      >
        Analyze CV
        <span className="absolute top-1 right-1 w-2 h-2 bg-sa-green rounded-full animate-pulse" />
      </Button>

      <Button variant="ghost" asChild className={navItemClass("/templates")}>
        <Link to="/templates">Templates</Link>
      </Button>
      
      <Button variant="ghost" asChild className={navItemClass("/job-fit-quiz")}>
        <Link to="/job-fit-quiz">Job Fit Quiz</Link>
      </Button>
      
      <Button variant="ghost" asChild className={navItemClass("/toolkit")}>
        <Link to="/toolkit">Toolkit</Link>
      </Button>
      
      <Button variant="ghost" asChild className={navItemClass("/pricing")}>
        <Link to="/pricing">Pricing</Link>
      </Button>
      
      <Button variant="ghost" asChild className={navItemClass("/about")}>
        <Link to="/about">About</Link>
      </Button>
    </nav>
  );
};

export default NavLinks;
