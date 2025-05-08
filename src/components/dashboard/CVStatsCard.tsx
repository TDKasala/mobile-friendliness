
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CVStatsCardProps {
  uploads: any[];
  scoreHistory: any[];
  isLoading: boolean;
}

const CVStatsCard = ({ uploads, scoreHistory, isLoading }: CVStatsCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">CV Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-sa-gray">Uploads</p>
              <p className="text-xl font-bold text-sa-blue">{uploads.length}</p>
            </div>
            <div>
              <p className="text-sm text-sa-gray">Analyses</p>
              <p className="text-xl font-bold text-sa-blue">{scoreHistory.length}</p>
            </div>
            <div>
              <p className="text-sm text-sa-gray">Avg. Score</p>
              <p className="text-xl font-bold text-sa-blue">
                {scoreHistory.length > 0
                  ? Math.round(
                      scoreHistory.reduce((acc, curr) => acc + curr.ats_score, 0) / scoreHistory.length
                    )
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-sa-gray">Best Score</p>
              <p className="text-xl font-bold text-sa-blue">
                {scoreHistory.length > 0
                  ? Math.max(...scoreHistory.map(s => s.ats_score))
                  : "N/A"}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CVStatsCard;
