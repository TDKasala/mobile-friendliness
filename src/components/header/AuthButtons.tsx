
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface AuthButtonsProps {
  user: any;
  handleLogout: () => void;
}

const AuthButtons = ({ user, handleLogout }: AuthButtonsProps) => {
  return (
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
  );
};

export default AuthButtons;
