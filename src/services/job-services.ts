
import { supabase } from "@/lib/supabase";
import { JobMatch } from "@/lib/types";

/**
 * Get job listings with pagination
 * @param page Page number (starting from 1)
 * @param limit Number of jobs per page
 * @returns Object containing jobs array and total count
 */
export async function getJobListings(page: number = 1, limit: number = 10) {
  try {
    const { data, error, count } = await supabase
      .from("jobs")
      .select("*", { count: "exact" })
      .range((page - 1) * limit, page * limit - 1)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { jobs: data || [], total: count || 0 };
  } catch (error) {
    console.error("Error fetching job listings:", error);
    return { jobs: [], total: 0 };
  }
}

/**
 * Get job by ID
 * @param jobId Job ID to fetch
 * @returns Job object or null if not found
 */
export async function getJobById(jobId: string) {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", jobId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching job with ID ${jobId}:`, error);
    return null;
  }
}

/**
 * Match CV with job description using AI
 * @param cvText CV text content
 * @param jobDescription Job description text
 * @returns JobMatch object with match score and details
 */
export async function matchCVToJob(cvText: string, jobDescription: string): Promise<JobMatch> {
  try {
    // This would typically call an AI service to match the CV against the job description
    // For now we're returning a mock response
    return {
      score: 72,
      matches: [
        { keyword: "project management", present: true },
        { keyword: "stakeholder engagement", present: true },
        { keyword: "agile", present: true }
      ],
      missingKeywords: ["Scrum Master certification", "JIRA", "Confluence"],
      recommendations: [
        "Add Scrum Master certification if you have it",
        "Mention experience with JIRA and Confluence",
        "Emphasize your agile methodology expertise"
      ]
    };
  } catch (error) {
    console.error("Error matching CV to job:", error);
    return {
      score: 0,
      matches: [],
      missingKeywords: [],
      recommendations: ["Unable to analyze job match. Please try again."]
    };
  }
}

/**
 * Save job application to database
 * @param userId User ID
 * @param jobId Job ID
 * @param cvId CV ID
 * @returns Success status
 */
export async function saveJobApplication(userId: string, jobId: string, cvId: string) {
  try {
    const { data, error } = await supabase
      .from("applications")
      .insert({
        user_id: userId,
        job_id: jobId,
        cv_id: cvId,
        status: "submitted"
      });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Error saving job application:", error);
    return { success: false, error };
  }
}

/**
 * Get job match history for a user
 * @param userId User ID
 * @returns Array of job match history
 */
export async function getJobMatchHistory(userId: string) {
  try {
    const { data, error } = await supabase
      .from("job_matches")
      .select("*, jobs(*)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching job match history:", error);
    return [];
  }
}
