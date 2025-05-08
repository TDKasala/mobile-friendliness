
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface RecentUploadsCardProps {
  uploads: any[];
  isLoading: boolean;
}

const RecentUploadsCard = ({ uploads, isLoading }: RecentUploadsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent CV Uploads</CardTitle>
        <CardDescription>Your most recently uploaded CVs</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading...</p>
        ) : uploads.length > 0 ? (
          <div className="space-y-4">
            {uploads.slice(0, 5).map((upload) => (
              <div key={upload.id} className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-sa-gray mr-3" />
                  <div>
                    <p className="font-medium">{upload.filename}</p>
                    <p className="text-sm text-sa-gray">
                      {upload.upload_date && formatDistanceToNow(new Date(upload.upload_date), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p>No CVs uploaded yet</p>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentUploadsCard;
