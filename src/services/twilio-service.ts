// Twilio WhatsApp service for sending messages
// Note: In a production environment, these API keys should be stored securely on the backend

const TWILIO_ACCOUNT_SID = "SKe14f49da404eaf87af879f8d5db1b391";
const TWILIO_AUTH_TOKEN = "bUpn50IrXxEQR5dKyvhg5CNs11FLFvh3";
const TWILIO_PHONE_NUMBER = "+19409783063";

/**
 * Sends a WhatsApp message using Twilio API
 * Note: In production, this should be done through a secure backend endpoint
 */
export async function sendWhatsAppMessage(to: string, message: string): Promise<{ success: boolean; message: string }> {
  try {
    // In a real implementation, this would call a backend API endpoint
    // that securely uses the Twilio credentials
    const response = await fetch("https://api.twilio.com/2010-04-01/Accounts/" + TWILIO_ACCOUNT_SID + "/Messages.json", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        From: `whatsapp:${TWILIO_PHONE_NUMBER}`,
        Body: message,
        To: `whatsapp:${to}`
      }).toString()
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, message: "Message sent successfully" };
    } else {
      console.error("Twilio API error:", data);
      return { success: false, message: data.message || "Failed to send message" };
    }
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
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
