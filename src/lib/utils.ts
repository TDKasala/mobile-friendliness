
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to generate a hash from a string for consistent file identification
export function generateFileHash(fileName: string, content?: string): string {
  let str = fileName + (content || "");
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).substring(0, 8);
}

// Function to check if two files are different
export function filesAreDifferent(file1: File, file2: File): boolean {
  return file1.name !== file2.name || file1.size !== file2.size || file1.type !== file2.type;
}

