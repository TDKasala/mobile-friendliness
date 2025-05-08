
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface ScoreHistoryCardProps {
  scoreHistory: any[];
  isLoading: boolean;
}

const ScoreHistoryCard = ({ scoreHistory, isLoading }: ScoreHistoryCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ATS Score History</CardTitle>
        <CardDescription>Your CV analysis results</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading...</p>
        ) : scoreHistory.length > 0 ? (
          <div className="space-y-4">
            {scoreHistory.slice(0, 5).map((score) => (
              <div key={score.id} className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">{score.uploads?.filename || "CV Analysis"}</p>
                  <p className="text-sm text-sa-gray">
                    {score.created_at && formatDistanceToNow(new Date(score.created_at), { addSuffix: true })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-sa-green">{score.ats_score}%</p>
                  <Button variant="ghost" size="sm">
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No CV analyses yet</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ScoreHistoryCard;
