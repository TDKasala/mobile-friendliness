
import { useState, useEffect } from "react";
import { Copy, Share2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ReferAFriendProps {
  className?: string;
}

const ReferAFriend = ({ className }: ReferAFriendProps) => {
  const { toast } = useToast();
  const [referralLink, setReferralLink] = useState<string>("");
  const [signups, setSignups] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Simulate fetching referral data - would connect to Supabase in a real app
  useEffect(() => {
    const timer = setTimeout(() => {
      // This would normally be a call to Supabase
      const mockReferralCode = `ref_${Math.random().toString(36).substring(2, 10)}`;
      setReferralLink(`https://atsboost.com/signup?ref=${mockReferralCode}`);
      setSignups(Math.floor(Math.random() * 3)); // Random number between 0-2
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link copied!",
      description: "Referral link copied to clipboard",
    });
  };
  
  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join ATSBoost',
        text: 'Get your CV optimized with ATSBoost, the best ATS optimization tool in South Africa!',
        url: referralLink,
      }).catch(() => {
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  const freeAnalysesEarned = Math.floor(signups / 3);
  const progressToNextReward = (signups % 3) / 3 * 100;
  const signupsNeeded = 3 - (signups % 3);

  return (
    <Card className={`border-sa-yellow/30 bg-gradient-to-b from-amber-50 to-white overflow-hidden ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-sa-blue text-lg">Refer Friends & Earn</CardTitle>
            <CardDescription>Share your link to earn free CV analyses</CardDescription>
          </div>
          <Award className="h-8 w-8 text-sa-yellow" />
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-10 bg-gray-100 animate-pulse rounded"></div>
            <div className="h-6 w-3/4 bg-gray-100 animate-pulse rounded"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-4 bg-gray-50 p-2 rounded-md border border-gray-100">
              <div className="truncate flex-grow text-xs sm:text-sm text-gray-600 font-mono px-2">
                {referralLink}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={copyToClipboard} 
                className="flex-shrink-0 h-8"
                aria-label="Copy link"
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Friends signed up: <strong>{signups}</strong></span>
                  <span>Next reward: <strong>{signupsNeeded} more</strong></span>
                </div>
                <Progress 
                  value={progressToNextReward} 
                  className="h-2 bg-amber-100" 
                />
              </div>
              
              {freeAnalysesEarned > 0 && (
                <div className="bg-sa-yellow/10 border border-sa-yellow/30 rounded-md p-2 text-sm">
                  <span className="font-medium text-sa-blue">
                    🎉 You've earned {freeAnalysesEarned} free CV {freeAnalysesEarned === 1 ? 'analysis' : 'analyses'}!
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button 
          className="w-full bg-sa-yellow hover:bg-sa-yellow/90 text-sa-blue"
          onClick={shareLink}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share Your Link
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReferAFriend;
