
import { supabase } from "@/lib/supabase";
import { CVScore, SubscriptionTier } from "@/lib/types";

// User subscriptions
export async function getUserSubscription(userId: string): Promise<{ tier: SubscriptionTier, expiryDate?: string } | null> {
  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("type, end_date")
      .eq("user_id", userId)
      .single();

    if (error) throw error;
    
    if (!data) return { tier: "free" };
    
    return {
      tier: data.type as SubscriptionTier,
      expiryDate: data.end_date,
    };
  } catch (error) {
    console.error("Error fetching user subscription:", error);
    return { tier: "free" };
  }
}

// CV Uploads
export async function uploadCV(file: File, userId: string) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload file to storage
    const { data: fileData, error: fileError } = await supabase.storage
      .from("cvs")
      .upload(filePath, file);

    if (fileError) throw fileError;

    // Create record in uploads table
    const { data: uploadData, error: uploadError } = await supabase
      .from("uploads")
      .insert([
        {
          user_id: userId,
          file_id: filePath,
          filename: file.name,
        }
      ])
      .select()
      .single();

    if (uploadError) throw uploadError;

    return uploadData;
  } catch (error) {
    console.error("Error uploading CV:", error);
    throw error;
  }
}

// Get user's CV uploads
export async function getUserUploads(userId: string) {
  try {
    const { data, error } = await supabase
      .from("uploads")
      .select("*")
      .eq("user_id", userId)
      .order("upload_date", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching user uploads:", error);
    return [];
  }
}

// Save CV score
export async function saveCVScore(userId: string, uploadId: string, score: CVScore) {
  try {
    const { data, error } = await supabase
      .from("scores")
      .insert([
        {
          user_id: userId,
          upload_id: uploadId,
          ats_score: score.overall,
          subscores: {
            keywordMatch: score.keywordMatch,
            formatting: score.formatting,
            sectionPresence: score.sectionPresence,
            readability: score.readability,
            length: score.length,
          },
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving CV score:", error);
    throw error;
  }
}

// Get CV score history
export async function getCVScoreHistory(userId: string) {
  try {
    const { data, error } = await supabase
      .from("scores")
      .select(`
        *,
        uploads (filename)
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching score history:", error);
    return [];
  }
}

// Save Job Fit Quiz response
export async function saveQuizResponse(userId: string, email: string, industry: string, experience: string) {
  try {
    const { data, error } = await supabase
      .from("quiz_responses")
      .insert([
        {
          user_id: userId,
          email,
          industry,
          experience,
        }
      ]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error saving quiz response:", error);
    return false;
  }
}

// Generate and save referral code
export async function generateReferralCode(userId: string) {
  try {
    // Check if user already has a referral code
    const { data: existingCode } = await supabase
      .from("referrals")
      .select("referral_code")
      .eq("user_id", userId)
      .single();

    if (existingCode?.referral_code) {
      return existingCode.referral_code;
    }

    // Generate a new code
    const code = `ATSBOOST${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const { error } = await supabase
      .from("referrals")
      .insert([
        {
          user_id: userId,
          referral_code: code,
          signups: 0,
        }
      ]);

    if (error) throw error;
    return code;
  } catch (error) {
    console.error("Error generating referral code:", error);
    throw error;
  }
}

// Track toolkit download
export async function trackToolkitDownload(email: string) {
  try {
    const { error } = await supabase
      .from("toolkit_downloads")
      .insert([{ email }]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error tracking toolkit download:", error);
    return false;
  }
}

// Get CV templates
export async function getCVTemplates(userTier: SubscriptionTier) {
  try {
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("is_premium", userTier === "premium");

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching CV templates:", error);
    return [];
  }
}

// Get job listings
export async function getJobListings(page: number = 1, limit: number = 10) {
  try {
    const { data, error, count } = await supabase
      .from("jobs")
      .select("*", { count: "exact" })
      .range((page - 1) * limit, page * limit - 1);

    if (error) throw error;
    return { jobs: data || [], total: count || 0 };
  } catch (error) {
    console.error("Error fetching job listings:", error);
    return { jobs: [], total: 0 };
  }
}

// Submit success story
export async function submitSuccessStory(userId: string, story: string, imageFile?: File) {
  try {
    let imageUrl = null;

    if (imageFile) {
      const fileName = `${userId}/${Date.now()}.${imageFile.name.split('.').pop()}`;
      const { data: fileData, error: fileError } = await supabase.storage
        .from("stories")
        .upload(fileName, imageFile);

      if (fileError) throw fileError;
      
      const { data: { publicUrl } } = supabase.storage
        .from("stories")
        .getPublicUrl(fileName);
        
      imageUrl = publicUrl;
    }

    const { data, error } = await supabase
      .from("success_stories")
      .insert([
        {
          user_id: userId,
          story,
          image_url: imageUrl,
          approved: false, // Stories are pending approval by default
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error submitting success story:", error);
    throw error;
  }
}
