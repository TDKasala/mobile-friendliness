
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface DashboardHeaderProps {
  username: string;
}

const DashboardHeader = ({ username }: DashboardHeaderProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-sa-blue">Dashboard</h1>
      <p className="text-sa-gray">
        Welcome back, {username}
      </p>
    </div>
  );
};

export default DashboardHeader;
