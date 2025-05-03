
-- Enable Row Level Security
ALTER DATABASE postgres SET "anon.jwt.claims.email" = '';

-- Create tables
CREATE TABLE public.users_profile (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  full_name TEXT,
  location TEXT,
  industry TEXT
);

CREATE TABLE public.uploads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  file_id TEXT NOT NULL,
  filename TEXT NOT NULL,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  file_size INTEGER,
  file_type TEXT
);

CREATE TABLE public.scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  upload_id UUID REFERENCES public.uploads NOT NULL,
  ats_score INTEGER NOT NULL,
  subscores JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  job_description TEXT
);

CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('free', 'premium')),
  start_date TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  payment_id TEXT,
  payment_method TEXT,
  amount DECIMAL(10, 2)
);

CREATE TABLE public.quiz_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users,
  email TEXT NOT NULL,
  industry TEXT NOT NULL,
  experience TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  quiz_answers JSONB
);

CREATE TABLE public.referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  referral_code TEXT NOT NULL UNIQUE,
  signups INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE public.success_stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  story TEXT NOT NULL,
  image_url TEXT,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  industry TEXT,
  job_title TEXT,
  publish_date TIMESTAMP WITH TIME ZONE
);

CREATE TABLE public.toolkit_downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  resource_name TEXT,
  user_id UUID REFERENCES auth.users
);

CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  salary_range TEXT,
  job_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  external_url TEXT,
  contact_email TEXT,
  industry TEXT,
  job_function TEXT,
  experience_level TEXT
);

CREATE TABLE public.templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  preview_url TEXT NOT NULL,
  file_url TEXT NOT NULL,
  is_premium BOOLEAN DEFAULT false,
  category TEXT NOT NULL,
  industry TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  type TEXT,
  link TEXT
);

CREATE TABLE public.promos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  discount DECIMAL(5, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  valid_for TEXT
);

CREATE TABLE public.feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users,
  email TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  category TEXT
);

-- Set up Row Level Security (RLS) policies

-- users_profile policies
ALTER TABLE public.users_profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.users_profile FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users_profile FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Allow insert on sign up"
  ON public.users_profile FOR INSERT
  WITH CHECK (auth.uid() = id);

-- uploads policies
ALTER TABLE public.uploads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own uploads"
  ON public.uploads FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own uploads"
  ON public.uploads FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own uploads"
  ON public.uploads FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own uploads"
  ON public.uploads FOR DELETE
  USING (auth.uid() = user_id);

-- scores policies
ALTER TABLE public.scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own scores"
  ON public.scores FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scores"
  ON public.scores FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- subscriptions policies
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscription"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- quiz_responses policies
ALTER TABLE public.quiz_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own quiz responses"
  ON public.quiz_responses FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert quiz responses"
  ON public.quiz_responses FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- referrals policies
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own referrals"
  ON public.referrals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own referrals"
  ON public.referrals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own referrals"
  ON public.referrals FOR UPDATE
  USING (auth.uid() = user_id);

-- success_stories policies
ALTER TABLE public.success_stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved success stories"
  ON public.success_stories FOR SELECT
  USING (approved = true OR auth.uid() = user_id);

CREATE POLICY "Users can insert own success stories"
  ON public.success_stories FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own success stories"
  ON public.success_stories FOR UPDATE
  USING (auth.uid() = user_id);

-- toolkit_downloads policies
ALTER TABLE public.toolkit_downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can download toolkit resources"
  ON public.toolkit_downloads FOR INSERT
  WITH CHECK (true);

-- jobs policies
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view jobs"
  ON public.jobs FOR SELECT
  USING (true);

-- templates policies
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view free templates"
  ON public.templates FOR SELECT
  USING (is_premium = false OR 
    (is_premium = true AND 
      EXISTS (SELECT 1 FROM public.subscriptions 
              WHERE user_id = auth.uid() AND type = 'premium' AND (end_date IS NULL OR end_date > now()))
    )
  );

-- announcements policies
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active announcements"
  ON public.announcements FOR SELECT
  USING (active = true AND (expires_at IS NULL OR expires_at > now()));

-- promos policies
ALTER TABLE public.promos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view promos"
  ON public.promos FOR SELECT
  USING (expires_at IS NULL OR expires_at > now());

-- feedback policies
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert feedback"
  ON public.feedback FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Create storage buckets
-- Note: Storage buckets are created through the Supabase dashboard or API,
-- not through SQL. This is just a reference for what needs to be created.

-- 1. cvs (private) - for CV uploads
-- 2. templates (public) - for CV templates
-- 3. stories (private) - for Success Stories images
-- 4. toolkit (public) - for Job Seeker Toolkit PDFs

-- Create triggers for user profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users_profile (id, email)
  VALUES (NEW.id, NEW.email);
  
  INSERT INTO public.subscriptions (user_id, type)
  VALUES (NEW.id, 'free');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create additional useful functions

-- Function to check if user has premium subscription
CREATE OR REPLACE FUNCTION public.is_premium_user(user_uid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  is_premium BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM public.subscriptions
    WHERE user_id = user_uid
    AND type = 'premium'
    AND (end_date IS NULL OR end_date > now())
  ) INTO is_premium;
  
  RETURN is_premium;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
