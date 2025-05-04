// Twilio WhatsApp service for sending messages securely through Supabase Edge Function

import { supabase } from '@/lib/supabase';

/**
 * Sends a WhatsApp message using the secure Supabase Edge Function
 */
export async function sendWhatsAppMessage(to: string, message: string): Promise<{ success: boolean; message: string }> {
  try {
    // Format the phone number
    const formattedNumber = formatPhoneNumber(to);
    
    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('send-whatsapp', {
      body: {
        to: formattedNumber,
        message: message
      }
    });
    
    if (error) {
      console.error("Supabase function error:", error);
      
      // Fall back to WhatsApp deep link if the function fails
      fallbackToWhatsAppLink(formattedNumber, message);
      
      return { success: false, message: error.message || "Failed to send message" };
    }
    
    return data || { success: true, message: "Message sent successfully" };
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    
    // Fall back to WhatsApp deep link as a last resort
    fallbackToWhatsAppLink(to, message);
    
    return { success: false, message: "Error sending message" };
  }
}

// Function to format phone numbers to E.164 format
export function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  
  // If the number doesn't start with a plus sign and country code, add South African code (+27)
  if (!phoneNumber.startsWith('+')) {
    // If number starts with 0, replace it with +27
    if (digitsOnly.startsWith('0')) {
      return '+27' + digitsOnly.substring(1);
    }
    // Otherwise assume it's a local number and add +27
    return '+27' + digitsOnly;
  }
  
  return phoneNumber;
}

// Fallback function to open WhatsApp directly
export function fallbackToWhatsAppLink(phoneNumber: string, message: string): void {
  const formattedNumber = phoneNumber.replace('+', '');
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
}
