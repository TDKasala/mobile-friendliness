
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatisticsCard from "@/components/StatisticsCard";
import { format } from "date-fns";

interface StatisticsGridProps {
  scoreHistory: any[];
  lastAnalysisDate: string | null;
}

const StatisticsGrid = ({ scoreHistory, lastAnalysisDate }: StatisticsGridProps) => {
  // Calculate average score
  const averageScore = scoreHistory.length > 0
    ? Math.round(scoreHistory.reduce((acc, curr) => acc + curr.ats_score, 0) / scoreHistory.length)
    : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <StatisticsCard
        title="Total CV Analyses"
        value={scoreHistory.length}
        icon="trophy"
        variant="default"
      />
      
      <StatisticsCard
        title="Average CV Score"
        value={`${averageScore}%`}
        icon="star"
        variant="default"
        badgeText={averageScore > 75 ? "Excellent" : averageScore > 60 ? "Good" : "Needs Work"}
      />
      
      <StatisticsCard
        title="Last Analysis Date"
        value={lastAnalysisDate ? format(new Date(lastAnalysisDate), "MMM d, yyyy") : "N/A"}
        subtitle={lastAnalysisDate ? format(new Date(lastAnalysisDate), "h:mm a") : ""}
        icon="award"
        variant="default"
      />

      <div className="flex items-center justify-center bg-white shadow-sm rounded-lg p-4">
        <Button 
          onClick={() => window.location.href = "/#analyze-cv"}
          className="bg-sa-green hover:bg-sa-green/90 text-white w-full flex items-center justify-center py-6"
        >
          <Upload className="mr-2 h-4 w-4" /> 
          Start New CV Analysis
        </Button>
      </div>
    </div>
  );
};

export default StatisticsGrid;
