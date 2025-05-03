
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export default function UserProfile() {
  const { user } = useAuth();
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const { toast } = useToast();

  const updateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;
    
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail });
      
      if (error) {
        setErrorMsg(error.message || "Failed to update email");
        setIsLoading(false);
        return;
      }

      setSuccessMsg("Verification email sent. Please check your inbox.");
      toast({
        title: "Email update initiated",
        description: "Please check your new email for verification.",
      });
      setNewEmail("");
    } catch (error: any) {
      setErrorMsg(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    if (newPassword !== confirmPassword) {
      setErrorMsg("New passwords don't match");
      setIsLoading(false);
      return;
    }

    try {
      // Reauthenticate with current password first
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || "",
        password: currentPassword,
      });

      if (signInError) {
        setErrorMsg("Current password is incorrect");
        setIsLoading(false);
        return;
      }

      // Then update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setErrorMsg(updateError.message || "Failed to update password");
        setIsLoading(false);
        return;
      }

      setSuccessMsg("Password updated successfully");
      toast({
        title: "Success!",
        description: "Your password has been updated.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setErrorMsg(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>View and update your profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <p className="text-sm font-medium text-sa-gray">Email</p>
            <p className="text-base">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-sa-gray">User ID</p>
            <p className="text-xs text-sa-gray/70 break-all">{user?.id}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-sa-gray">Account Created</p>
            <p className="text-base">
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Update Email</CardTitle>
          <CardDescription>Change your account email address</CardDescription>
        </CardHeader>
        {errorMsg && (
          <CardContent>
            <Alert variant="destructive">
              <AlertDescription>{errorMsg}</AlertDescription>
            </Alert>
          </CardContent>
        )}
        {successMsg && (
          <CardContent>
            <Alert>
              <AlertDescription>{successMsg}</AlertDescription>
            </Alert>
          </CardContent>
        )}
        <CardContent>
          <form onSubmit={updateEmail} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="newEmail" className="text-sm font-medium text-sa-gray">
                New Email Address
              </label>
              <Input
                id="newEmail"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter new email address"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-sa-green hover:bg-sa-green/90 text-white"
            >
              {isLoading ? "Updating..." : "Update Email"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={updatePassword} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="currentPassword" className="text-sm font-medium text-sa-gray">
                Current Password
              </label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="newPassword" className="text-sm font-medium text-sa-gray">
                New Password
              </label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                minLength={8}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-sa-gray">
                Confirm New Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-sa-green hover:bg-sa-green/90 text-white"
            >
              {isLoading ? "Updating..." : "Change Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
