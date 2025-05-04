
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface NavLinksProps {
  scrollToAnalyzeCv: () => void;
}

const NavLinks = ({ scrollToAnalyzeCv }: NavLinksProps) => {
  return (
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
  );
};

export default NavLinks;
