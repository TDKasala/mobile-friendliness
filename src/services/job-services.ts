
import { supabase } from "@/lib/supabase";

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
