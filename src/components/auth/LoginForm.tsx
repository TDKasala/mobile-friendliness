
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { signIn } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const { error } = await signIn(email, password);
    
    if (error) {
      setErrorMsg(error.message || "Failed to sign in");
      setIsLoading(false);
      return;
    }

    toast({
      title: "Success!",
      description: "You have successfully logged in.",
    });
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-sa-blue">Welcome Back</h1>
        <p className="text-sm text-sa-gray mt-2">
          Enter your credentials to access your account
        </p>
      </div>

      {errorMsg && (
        <Alert variant="destructive">
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}

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

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-sa-gray">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs text-sa-green hover:text-sa-green/90"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-sa-green hover:bg-sa-green/90 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="text-center text-sm text-sa-gray">
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="text-sa-green hover:text-sa-green/90">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
