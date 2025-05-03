
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const { error } = await resetPassword(email);
    
    if (error) {
      setErrorMsg(error.message || "Failed to send reset instructions");
      setIsLoading(false);
      return;
    }

    setIsSubmitted(true);
    toast({
      title: "Email sent!",
      description: "Check your email for password reset instructions.",
    });
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-sa-blue">Reset Your Password</h1>
        <p className="text-sm text-sa-gray mt-2">
          Enter your email address and we'll send you instructions to reset your password
        </p>
      </div>

      {errorMsg && (
        <Alert variant="destructive">
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}

      {isSubmitted ? (
        <div className="space-y-4">
          <Alert>
            <AlertDescription>
              If an account exists for {email}, you will receive an email with password reset instructions.
            </AlertDescription>
          </Alert>
          <div className="text-center">
            <Link to="/login">
              <Button variant="outline">Return to Login</Button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-sa-gray">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-sa-green hover:bg-sa-green/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Instructions"}
          </Button>

          <div className="text-center">
            <Link to="/login" className="text-sm text-sa-green hover:text-sa-green/90">
              Back to Login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
