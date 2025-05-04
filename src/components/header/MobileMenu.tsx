
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  isOpen: boolean;
  closeMenu: () => void;
  handleLogout: () => void;
  scrollToAnalyzeCv: () => void;
  user: any;
}

const MobileMenu = ({ 
  isOpen, 
  closeMenu, 
  handleLogout, 
  scrollToAnalyzeCv,
  user 
}: MobileMenuProps) => {
  if (!isOpen) return null;
  
  return (
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
  );
};

export default MobileMenu;
