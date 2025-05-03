
import { supabase } from "@/lib/supabase";

// Upload CV to storage
export async function uploadFile(file: File, bucket: string, path: string) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

// Get file URL from storage
export async function getFileUrl(bucket: string, path: string) {
  try {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  } catch (error) {
    console.error("Error getting file URL:", error);
    throw error;
  }
}

// Download file from storage
export async function downloadFile(bucket: string, path: string) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(path);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
}

// List files in a bucket
export async function listFiles(bucket: string, path: string) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error listing files:", error);
    return [];
  }
}

// Delete file from storage
export async function deleteFile(bucket: string, path: string) {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
}
