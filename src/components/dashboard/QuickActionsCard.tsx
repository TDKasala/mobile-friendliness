
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, BarChart3 } from "lucide-react";

const QuickActionsCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          className="w-full justify-start bg-sa-blue hover:bg-sa-blue/90"
          onClick={() => window.location.href = "/#analyze-cv"}
        >
          <Upload className="mr-2 h-4 w-4" /> Analyze New CV
        </Button>
        <Button 
          className="w-full justify-start"
          variant="outline"
          onClick={() => window.location.href = "/templates"}
        >
          <FileText className="mr-2 h-4 w-4" /> Browse Templates
        </Button>
        <Button 
          className="w-full justify-start"
          variant="outline"
          onClick={() => window.location.href = "/job-fit-quiz"}
        >
          <BarChart3 className="mr-2 h-4 w-4" /> Job Fit Quiz
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
