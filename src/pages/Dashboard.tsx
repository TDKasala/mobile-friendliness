
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserProfile from "@/components/auth/UserProfile";
import { useAuth } from "@/contexts/AuthContext";
import { getUserSubscription, getUserUploads, getCVScoreHistory } from "@/services/database-service";
import { Clock, Settings, FileText, Calendar } from "lucide-react";

// Import Dashboard Components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatisticsGrid from "@/components/dashboard/StatisticsGrid";
import SubscriptionCard from "@/components/dashboard/SubscriptionCard";
import CVStatsCard from "@/components/dashboard/CVStatsCard";
import QuickActionsCard from "@/components/dashboard/QuickActionsCard";
import RecentUploadsCard from "@/components/dashboard/RecentUploadsCard";
import ScoreHistoryCard from "@/components/dashboard/ScoreHistoryCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const [subscription, setSubscription] = useState<{ tier: string, expiryDate?: string } | null>(null);
  const [uploads, setUploads] = useState<any[]>([]);
  const [scoreHistory, setScoreHistory] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [lastAnalysisDate, setLastAnalysisDate] = useState<string | null>(null);
  const [userActivity, setUserActivity] = useState<{
    lastLogin?: string;
    downloadedTemplates: number;
    downloadedToolkits: number;
    completedQuizzes: number;
    savedJobs: number;
  }>({
    downloadedTemplates: 0,
    downloadedToolkits: 0,
    completedQuizzes: 0,
    savedJobs: 0,
  });
  const [analysisCount, setAnalysisCount] = useState(0);
  const totalAnalysisAllowed = 100; // Premium users get 100 analysis per month

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
        
        // Set last analysis date
        if (scoreData.length > 0) {
          const sortedData = [...scoreData].sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setLastAnalysisDate(sortedData[0].created_at);
          
          // Count analyses for the current month
          const now = new Date();
          const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          
          const currentMonthAnalyses = scoreData.filter(score => 
            new Date(score.created_at) >= firstDayOfMonth
          );
          
          setAnalysisCount(currentMonthAnalyses.length);
        }
        
        // In a real app, you would fetch these from the database
        // Mock user activity data for now
        setUserActivity({
          lastLogin: user.last_sign_in_at ? format(new Date(user.last_sign_in_at), 'MMM d, yyyy h:mm a') : undefined,
          downloadedTemplates: Math.floor(Math.random() * 5),
          downloadedToolkits: Math.floor(Math.random() * 3),
          completedQuizzes: Math.floor(Math.random() * 2),
          savedJobs: Math.floor(Math.random() * 8),
        });
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

      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <DashboardHeader username={user?.email?.split('@')[0] || ''} />

          {/* Key Metrics Section */}
          <StatisticsGrid 
            scoreHistory={scoreHistory} 
            lastAnalysisDate={lastAnalysisDate} 
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Subscription Card */}
            <SubscriptionCard 
              subscription={subscription} 
              isLoading={isDataLoading}
              analysisCount={analysisCount}
              totalAnalysisAllowed={totalAnalysisAllowed}
            />

            {/* CV Stats Card */}
            <CVStatsCard 
              uploads={uploads} 
              scoreHistory={scoreHistory} 
              isLoading={isDataLoading} 
            />

            {/* Quick Actions Card */}
            <QuickActionsCard />
          </div>
          
          {/* User Activity Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-sa-blue">Your Activity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="mr-2 h-5 w-5" /> Content Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-sa-gray">Downloaded Templates</span>
                      <span className="font-medium">{userActivity.downloadedTemplates}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sa-gray">Downloaded Toolkits</span>
                      <span className="font-medium">{userActivity.downloadedToolkits}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sa-gray">Completed Job Fit Quizzes</span>
                      <span className="font-medium">{userActivity.completedQuizzes}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sa-gray">Saved Jobs</span>
                      <span className="font-medium">{userActivity.savedJobs}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="mr-2 h-5 w-5" /> Account Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {userActivity.lastLogin && (
                      <li className="flex items-start">
                        <div className="h-2 w-2 bg-sa-green rounded-full mt-2 mr-2"></div>
                        <div>
                          <p className="text-sm text-sa-gray">Last Login</p>
                          <p className="font-medium">{userActivity.lastLogin}</p>
                        </div>
                      </li>
                    )}
                    {lastAnalysisDate && (
                      <li className="flex items-start">
                        <div className="h-2 w-2 bg-sa-blue rounded-full mt-2 mr-2"></div>
                        <div>
                          <p className="text-sm text-sa-gray">Last CV Analysis</p>
                          <p className="font-medium">{format(new Date(lastAnalysisDate), 'MMM d, yyyy h:mm a')}</p>
                        </div>
                      </li>
                    )}
                    {subscription?.expiryDate && (
                      <li className="flex items-start">
                        <div className="h-2 w-2 bg-sa-yellow rounded-full mt-2 mr-2"></div>
                        <div>
                          <p className="text-sm text-sa-gray">Subscription Expires</p>
                          <p className="font-medium">{subscription.expiryDate}</p>
                        </div>
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>
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
                <RecentUploadsCard uploads={uploads} isLoading={isDataLoading} />
                <ScoreHistoryCard scoreHistory={scoreHistory} isLoading={isDataLoading} />
              </div>
            </TabsContent>
            
            <TabsContent value="profile">
              <UserProfile />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
