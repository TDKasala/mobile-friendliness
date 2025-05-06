
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Home, 
  Upload, 
  FileText, 
  HelpCircle, 
  Info, 
  BookOpen, 
  DollarSign,
  LayoutDashboard,
  Settings,
  LogOut,
  User
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
    <div className="md:hidden mt-2 py-3 border-t border-gray-100 dark:border-gray-800 max-h-[calc(100vh-4rem)] overflow-y-auto pb-16">
      <div className="flex flex-col space-y-1">
        {/* Main Navigation */}
        <Button variant="ghost" asChild className="justify-start">
          <Link to="/" onClick={closeMenu} className="flex items-center">
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
          </Link>
        </Button>
        
        <Button 
          variant="ghost" 
          onClick={() => {
            scrollToAnalyzeCv();
            closeMenu();
          }}
          className="justify-start flex items-center"
        >
          <Upload className="mr-2 h-4 w-4" />
          <span>Analyze CV</span>
        </Button>
        
        <Accordion type="single" collapsible className="w-full border-none">
          <AccordionItem value="tools" className="border-none">
            <AccordionTrigger className="py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-white no-underline hover:no-underline">
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                <span className="font-normal">CV Tools</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-6 flex flex-col space-y-1">
                <Button variant="ghost" asChild className="justify-start">
                  <Link to="/templates" onClick={closeMenu}>Templates</Link>
                </Button>
                <Button variant="ghost" asChild className="justify-start">
                  <Link to="/job-fit-quiz" onClick={closeMenu}>Job Fit Quiz</Link>
                </Button>
                <Button variant="ghost" asChild className="justify-start">
                  <Link to="/toolkit" onClick={closeMenu}>Toolkit</Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="about" className="border-none">
            <AccordionTrigger className="py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-white no-underline hover:no-underline">
              <div className="flex items-center">
                <Info className="mr-2 h-4 w-4" />
                <span className="font-normal">About</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-6 flex flex-col space-y-1">
                <Button variant="ghost" asChild className="justify-start">
                  <Link to="/about" onClick={closeMenu}>About Us</Link>
                </Button>
                <Button variant="ghost" asChild className="justify-start">
                  <Link to="/success-stories" onClick={closeMenu}>Success Stories</Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="help" className="border-none">
            <AccordionTrigger className="py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-white no-underline hover:no-underline">
              <div className="flex items-center">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span className="font-normal">Help</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-6 flex flex-col space-y-1">
                <Button variant="ghost" asChild className="justify-start">
                  <Link to="/faq" onClick={closeMenu}>FAQ</Link>
                </Button>
                <Button variant="ghost" asChild className="justify-start">
                  <Link to="/cv-guide" onClick={closeMenu}>CV Guide</Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <Button variant="ghost" asChild className="justify-start">
          <Link to="/pricing" onClick={closeMenu} className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4" />
            <span>Pricing</span>
          </Link>
        </Button>
        
        {/* Mobile Auth Section */}
        <div className="pt-2 border-t border-gray-100 dark:border-gray-800 mt-2">
          {user ? (
            <>
              <Button variant="ghost" asChild className="justify-start">
                <Link to="/dashboard" onClick={closeMenu} className="flex items-center">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </Button>
              
              <Button variant="ghost" asChild className="justify-start">
                <Link to="/subscription" onClick={closeMenu} className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4" />
                  <span>Subscription</span>
                </Link>
              </Button>
              
              <Button variant="ghost" asChild className="justify-start">
                <Link to="/dashboard?tab=profile" onClick={closeMenu} className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </Button>
              
              <Button variant="ghost" asChild className="justify-start">
                <Link to="/dashboard?tab=settings" onClick={closeMenu} className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="border-sa-red text-sa-red hover:bg-sa-red/10 w-full mt-2 justify-start"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
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
