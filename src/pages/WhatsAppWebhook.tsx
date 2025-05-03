
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const WhatsAppWebhook = () => {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [testMessage, setTestMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTestWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl || !apiKey) {
      toast({
        title: "Missing Information",
        description: "Please enter both webhook URL and API key",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // This is just a placeholder - in a real implementation, this would
      // connect to your Supabase Edge Function which handles the Twilio integration
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          message: testMessage || "Test message from ATSBoost",
          timestamp: new Date().toISOString()
        }),
      });
      
      if (response.ok) {
        toast({
          title: "Success",
          description: "Test webhook sent successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send test webhook",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending test webhook:", error);
      toast({
        title: "Error",
        description: "An error occurred while sending the test webhook",
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
          <CardTitle>WhatsApp Webhook Testing</CardTitle>
          <CardDescription>
            Test your WhatsApp webhook integration with Twilio
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleTestWebhook} className="space-y-4">
            <div>
              <label htmlFor="webhookUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Webhook URL
              </label>
              <Input
                id="webhookUrl"
                type="text"
                placeholder="https://your-webhook-url.com"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
                API Key
              </label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
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
          </form>
        </CardContent>
        
        <CardFooter>
          <Button 
            onClick={handleTestWebhook} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Sending..." : "Send Test Message"}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="mt-8 p-4 bg-sa-blue/5 rounded-lg">
        <h3 className="font-medium text-sa-blue mb-2">Implementation Notes</h3>
        <p className="text-sm text-sa-gray mb-4">
          For full WhatsApp integration with Twilio:
        </p>
        <ul className="list-disc pl-5 text-sm text-sa-gray space-y-2">
          <li>Create a Supabase Edge Function to handle Twilio webhook requests</li>
          <li>Set up Twilio WhatsApp API in your Supabase project</li>
          <li>Configure weekly job alerts and daily CV tips using Supabase scheduled functions</li>
          <li>Implement message handling with Gemini API for user queries</li>
          <li>Track user interactions in your Supabase database</li>
        </ul>
      </div>
    </div>
  );
};

export default WhatsAppWebhook;
