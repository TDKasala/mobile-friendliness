
import { createClient } from '@supabase/supabase-js';

// Use actual values instead of placeholders with a working URL
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bsacrgtlonytvfxgsiop.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzYWNyZ3Rsb255dHZmeGdzaW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5NDYzMDQsImV4cCI6MjAwMzUyMjMwNH0.qF52Ykl7azcm9QnKGZPqrUYdZ4LZxBWzJvmYXVy-aFE';

// Log whether we're using environment variables or defaults
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn(
    'Missing Supabase environment variables. Using provided defaults. ' +
    'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment for production use.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  // Adding auth configuration to fix Google sign-in issues
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});

// Helper function to get the authenticated user
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Helper function to check if user is logged in
export const isUserLoggedIn = async () => {
  const user = await getCurrentUser();
  return !!user;
};
