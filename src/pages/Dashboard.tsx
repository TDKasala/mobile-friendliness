
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserProfile from "@/components/auth/UserProfile";
import { useAuth } from "@/contexts/AuthContext";
import { getUserSubscription, getUserUploads, getCVScoreHistory } from "@/services/database-service";
import { Clock, Settings } from "lucide-react";

// Import Dashboard Components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatisticsGrid from "@/components/dashboard/StatisticsGrid";
import SubscriptionCard from "@/components/dashboard/SubscriptionCard";
import CVStatsCard from "@/components/dashboard/CVStatsCard";
import QuickActionsCard from "@/components/dashboard/QuickActionsCard";
import RecentUploadsCard from "@/components/dashboard/RecentUploadsCard";
import ScoreHistoryCard from "@/components/dashboard/ScoreHistoryCard";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const [subscription, setSubscription] = useState<{ tier: string, expiryDate?: string } | null>(null);
  const [uploads, setUploads] = useState<any[]>([]);
  const [scoreHistory, setScoreHistory] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [lastAnalysisDate, setLastAnalysisDate] = useState<string | null>(null);

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
        }
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

      <Footer />
    </div>
  );
};

export default Dashboard;
