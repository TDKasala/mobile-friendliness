
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      // Log the event for debugging purposes
      console.log("Auth state changed:", event);
      
      // Update session and user state
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (event === 'SIGNED_IN') {
        toast({
          title: "Signed in successfully",
          description: "Welcome to ATSBoost!",
        });
        
        // Log additional information for debugging Google OAuth
        if (currentSession?.user?.app_metadata?.provider === 'google') {
          console.log("Signed in with Google successfully");
        }
      } else if (event === 'SIGNED_OUT') {
        toast({
          title: "Signed out",
          description: "You have been signed out successfully.",
        });
      } else if (event === 'USER_UPDATED') {
        console.log("User profile updated");
      } else if (event === 'TOKEN_REFRESHED') {
        console.log("Session token refreshed");
      } else if (event === 'PASSWORD_RECOVERY') {
        sonnerToast.info("Please check your email for password reset instructions");
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoading(false);
      
      // Log session info for debugging
      if (currentSession) {
        console.log("Found existing session");
        if (currentSession?.user?.app_metadata?.provider === 'google') {
          console.log("User is signed in with Google");
        }
      } else {
        console.log("No existing session found");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // Use the site origin as the redirect URL to ensure proper redirects
          emailRedirectTo: window.location.origin + '/dashboard'
        }
      });
      return { error };
    } catch (error) {
      console.error("Error in signUp:", error);
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      console.error("Error in signIn:", error);
      return { error: error as Error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log("Attempting Google sign in...");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/dashboard',
          queryParams: {
            // Add access_type=offline to get a refresh token
            access_type: 'offline',
            // Add prompt=consent to always show the Google consent screen
            prompt: 'consent'
          }
        }
      });
      
      if (error) {
        console.error("Google sign in error:", error);
        toast({
          title: "Google sign in failed",
          description: error.message || "Could not sign in with Google. Please try again.",
          variant: "destructive",
        });
      } else {
        console.log("Google sign in initiated - redirecting to Google");
      }
    } catch (error) {
      console.error("Exception in signInWithGoogle:", error);
      toast({
        title: "Google sign in failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error signing out",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      return { error };
    } catch (error) {
      console.error("Error in resetPassword:", error);
      return { error: error as Error };
    }
  };

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
