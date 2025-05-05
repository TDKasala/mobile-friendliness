
import { supabase } from "@/lib/supabase";
import { CVScore } from "@/lib/types";

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

// Submit success story related to CV
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
export async function getCVTemplates(userTier: "free" | "premium" | "pay-per-use") {
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
