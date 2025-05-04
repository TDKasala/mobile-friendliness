
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { sendWhatsAppMessage } from "@/services/twilio-service";

const WhatsAppWebhook = () => {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
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
      const result = await sendWhatsAppMessage(
        testPhone, 
        testMessage || "Test message from ATSBoost"
      );
      
      if (result.success) {
        toast({
          title: "Success",
          description: "WhatsApp message sent successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send WhatsApp message",
          variant: "destructive",
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
            Send test WhatsApp messages using the Twilio API
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
            <p className="font-semibold">Using Twilio WhatsApp API</p>
            <p className="mt-1">Account SID: SKe14f...b391</p>
            <p>Phone Number: +1 (940) 978-3063</p>
          </div>
        </CardFooter>
      </Card>
      
      <div className="mt-8 p-4 bg-sa-blue/5 rounded-lg">
        <h3 className="font-medium text-sa-blue mb-2">Implementation Notes</h3>
        <ul className="list-disc pl-5 text-sm text-sa-gray space-y-2">
          <li>Twilio WhatsApp API integrated for message sending</li>
          <li>Subscription reminders will be sent automatically via cron job</li>
          <li>Users can receive job alerts and daily CV tips</li>
          <li>WhatsApp conversations tracked in Supabase for continuity</li>
        </ul>
      </div>
    </div>
  );
};

export default WhatsAppWebhook;
