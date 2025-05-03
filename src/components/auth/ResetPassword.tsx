
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get the hash from the URL
    const url = new URL(window.location.href);
    const hashFromUrl = url.hash.substring(1);
    if (hashFromUrl) {
      const params = new URLSearchParams(hashFromUrl);
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');
      const type = params.get('type');
      
      if (accessToken && type === 'recovery') {
        setHash(hashFromUrl);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    if (password !== confirmPassword) {
      setErrorMsg("Passwords don't match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setErrorMsg(error.message || "Failed to reset password");
        setIsLoading(false);
        return;
      }

      toast({
        title: "Password Updated",
        description: "Your password has been successfully reset.",
      });

      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      setErrorMsg(error.message || "An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-sa-blue">Reset Your Password</h1>
        <p className="text-sm text-sa-gray mt-2">
          Create a new password for your account
        </p>
      </div>

      {errorMsg && (
        <Alert variant="destructive">
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-sa-gray">
            New Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-sa-gray">
            Confirm New Password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-sa-green hover:bg-sa-green/90 text-white"
          disabled={isLoading || !hash}
        >
          {isLoading ? "Updating Password..." : "Reset Password"}
        </Button>
      </form>

      {!hash && (
        <Alert>
          <AlertDescription>
            Invalid or expired password reset link. Please request a new password reset.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
