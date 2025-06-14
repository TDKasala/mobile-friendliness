
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, LogOut, LayoutDashboard } from "lucide-react";

interface AuthButtonsProps {
  user: any;
  handleLogout: () => void;
}

const AuthButtons = ({ user, handleLogout }: AuthButtonsProps) => {
  return (
    <div className="hidden md:flex items-center space-x-3">
      {user ? (
        <div className="flex items-center space-x-2">
          <Button variant="ghost" asChild className="hover:bg-sa-blue/10">
            <Link to="/dashboard" className="flex items-center space-x-2 text-sa-gray hover:text-sa-blue dark:text-gray-300 dark:hover:text-white">
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </Button>
          
          <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-sa-blue/30 rounded-lg">
            <User className="h-4 w-4 text-sa-blue" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {user.email?.split('@')[0] || 'User'}
            </span>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      ) : (
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            asChild 
            className="border-sa-blue/30 text-sa-blue hover:bg-sa-blue/10 transition-all duration-200"
          >
            <Link to="/login">Sign In</Link>
          </Button>
          <Button 
            className="bg-gradient-to-r from-sa-blue to-sa-green hover:from-sa-blue/90 hover:to-sa-green/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105" 
            asChild
          >
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
