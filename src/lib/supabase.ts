
import { createClient } from '@supabase/supabase-js';

// Update to use a valid and working Supabase URL and key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://npphqmqlfkqaevpgznsh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wcGhxbXFsZmtxYWV2cGd6bnNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MzAwMzMsImV4cCI6MjAyNTQwNjAzM30.bHYmYxJWQ6_pLJKm3ec6SJo9toQc4qDN5ilT9BCBWQ0';

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
