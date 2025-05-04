
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { sendWhatsAppMessage, formatPhoneNumber } from "@/services/twilio-service";

const WhatsAppWebhook = () => {
  const [testMessage, setTestMessage] = useState("");
  const [testPhone, setTestPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTestWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!testPhone) {
      toast({
        title: "Missing Information",
        description: "Please enter a phone number to send the test message to",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const formattedNumber = formatPhoneNumber(testPhone);
      const result = await sendWhatsAppMessage(
        formattedNumber, 
        testMessage || "Test message from ATSBoost"
      );
      
      if (result.success) {
        toast({
          title: "Success",
          description: "WhatsApp message sent successfully",
        });
      } else {
        toast({
          title: "Message Status",
          description: result.message || "Message sent via WhatsApp link instead of API",
        });
      }
    } catch (error) {
      console.error("Error sending test message:", error);
      toast({
        title: "Error",
        description: "An error occurred while sending the WhatsApp message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-12 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Messaging Test</CardTitle>
          <CardDescription>
            Send test WhatsApp messages using the Supabase Edge Function
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleTestWebhook} className="space-y-4">
            <div>
              <label htmlFor="testPhone" className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Phone Number
              </label>
              <Input
                id="testPhone"
                type="text"
                placeholder="+27123456789"
                value={testPhone}
                onChange={(e) => setTestPhone(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">Include country code, e.g., +27 for South Africa</p>
            </div>
            
            <div>
              <label htmlFor="testMessage" className="block text-sm font-medium text-gray-700 mb-1">
                Test Message
              </label>
              <Textarea
                id="testMessage"
                placeholder="Enter a test message"
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
              />
            </div>
            
            <div className="pt-2">
              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-sa-green hover:bg-sa-green/90 text-white"
              >
                {isLoading ? "Sending..." : "Send Test Message"}
              </Button>
            </div>
          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col items-start">
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md w-full">
            <p className="font-semibold">Using Supabase Edge Function</p>
            <p className="mt-1">Implementation: Secure WhatsApp messaging</p>
            <p>Fallback: Direct WhatsApp link if API fails</p>
          </div>
        </CardFooter>
      </Card>
      
      <div className="mt-8 p-4 bg-sa-blue/5 rounded-lg">
        <h3 className="font-medium text-sa-blue mb-2">Implementation Notes</h3>
        <ul className="list-disc pl-5 text-sm text-sa-gray space-y-2">
          <li>Messages are sent securely via Supabase Edge Function</li>
          <li>API keys are stored securely on the server</li>
          <li>Automatic fallback to direct WhatsApp link if API call fails</li>
          <li>Phone numbers automatically formatted to international format</li>
        </ul>
      </div>
    </div>
  );
};

export default WhatsAppWebhook;
