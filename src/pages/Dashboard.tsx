
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserProfile from "@/components/auth/UserProfile";
import { useAuth } from "@/contexts/AuthContext";
import { getUserSubscription, getUserUploads, getCVScoreHistory } from "@/services/database-service";
import { Upload, FileText, BarChart3, Settings, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const [subscription, setSubscription] = useState<{ tier: string, expiryDate?: string } | null>(null);
  const [uploads, setUploads] = useState<any[]>([]);
  const [scoreHistory, setScoreHistory] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;
      
      setIsDataLoading(true);
      
      try {
        // Load subscription info
        const subscriptionData = await getUserSubscription(user.id);
        setSubscription(subscriptionData);
        
        // Load CV uploads
        const uploadsData = await getUserUploads(user.id);
        setUploads(uploadsData);
        
        // Load score history
        const scoreData = await getCVScoreHistory(user.id);
        setScoreHistory(scoreData);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setIsDataLoading(false);
      }
    };
    
    if (user) {
      loadUserData();
    }
  }, [user]);

  // If not logged in and not loading, redirect to login
  if (!isLoading && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Dashboard | ATSBoost</title>
        <meta name="description" content="Manage your ATSBoost account and CV optimization" />
      </Helmet>

      <Header />

      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-sa-blue">Dashboard</h1>
            <p className="text-sa-gray">
              Welcome back, {user?.email?.split('@')[0]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Subscription Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Subscription</CardTitle>
              </CardHeader>
              <CardContent>
                {isDataLoading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    <p className="text-xl font-bold text-sa-green capitalize">
                      {subscription?.tier || "Free"} Plan
                    </p>
                    {subscription?.tier === "premium" && subscription?.expiryDate && (
                      <p className="text-sm text-sa-gray mt-1">
                        Expires: {new Date(subscription.expiryDate).toLocaleDateString()}
                      </p>
                    )}
                    {subscription?.tier !== "premium" && (
                      <Button 
                        className="mt-3 bg-sa-green hover:bg-sa-green/90 text-white w-full"
                        onClick={() => window.location.href = "/subscription"}
                      >
                        Upgrade to Premium
                      </Button>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* CV Stats Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">CV Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                {isDataLoading ? (
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

            {/* Quick Actions Card */}
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
          </div>

          <Tabs defaultValue="recent">
            <TabsList className="mb-6">
              <TabsTrigger value="recent">
                <Clock className="h-4 w-4 mr-2" /> Recent Activity
              </TabsTrigger>
              <TabsTrigger value="profile">
                <Settings className="h-4 w-4 mr-2" /> Account Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="recent">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent CV Uploads</CardTitle>
                    <CardDescription>Your most recently uploaded CVs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isDataLoading ? (
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

                <Card>
                  <CardHeader>
                    <CardTitle>ATS Score History</CardTitle>
                    <CardDescription>Your CV analysis results</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isDataLoading ? (
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
              </div>
            </TabsContent>
            
            <TabsContent value="profile">
              <UserProfile />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
