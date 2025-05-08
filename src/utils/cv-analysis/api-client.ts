
/**
 * API client for DeepSeek AI service
 */

// Configuration
const API_CONFIG = {
  DEEPSEEK_API_URL: "https://api.deepseek.com/chat/completions",
  DEEPSEEK_API_KEY: "sk-f89f3e7c942043059b94bde104ccbd82", 
  DEEPSEEK_MODEL: "deepseek-chat",
  DEFAULT_TEMPERATURE: 0.2,
  DEFAULT_MAX_TOKENS: 2000,
  RETRY_ATTEMPTS: 2,
  RETRY_DELAY_MS: 1000
};

/**
 * Call DeepSeek API with error handling, retries, and rate limiting
 * @param prompt - The prompt to send to the API
 * @param maxTokens - Maximum tokens to generate
 * @param temperature - Temperature for response generation (0.0 - 1.0)
 * @returns Promise with the API response text
 */
export async function callDeepSeekAPI(
  prompt: string, 
  maxTokens: number = API_CONFIG.DEFAULT_MAX_TOKENS,
  temperature: number = API_CONFIG.DEFAULT_TEMPERATURE
): Promise<string> {
  let attempts = 0;
  
  while (attempts <= API_CONFIG.RETRY_ATTEMPTS) {
    try {
      attempts++;
      
      console.log(`Calling DeepSeek API (attempt ${attempts}/${API_CONFIG.RETRY_ATTEMPTS + 1})`);
      
      const response = await fetch(API_CONFIG.DEEPSEEK_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_CONFIG.DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: API_CONFIG.DEEPSEEK_MODEL,
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: maxTokens,
          temperature: temperature
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        
        // Check if we should retry based on status code
        if (attempts <= API_CONFIG.RETRY_ATTEMPTS && (response.status === 429 || response.status >= 500)) {
          console.warn(`DeepSeek API returned ${response.status}, retrying in ${API_CONFIG.RETRY_DELAY_MS}ms...`);
          await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY_MS * attempts));
          continue;
        }
        
        throw new Error(`DeepSeek API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
        throw new Error("Invalid response format from DeepSeek API");
      }
      
      return data.choices[0].message.content;
    } catch (error) {
      // Only retry on network errors, not API errors
      if (attempts <= API_CONFIG.RETRY_ATTEMPTS && !error.message.includes("DeepSeek API Error")) {
        console.warn(`API call failed with error: ${error.message}, retrying in ${API_CONFIG.RETRY_DELAY_MS}ms...`);
        await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY_MS * attempts));
        continue;
      }
      
      console.error("Error calling DeepSeek API:", error);
      throw new Error(`Failed to communicate with DeepSeek API: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  throw new Error(`Failed to get response from DeepSeek API after ${API_CONFIG.RETRY_ATTEMPTS + 1} attempts`);
}

/**
 * Simple hash function for caching
 * @param str - String to hash
 * @returns Hashed string
 */
export function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString(16);
}

/**
 * Check if the DeepSeek API is available
 * @returns Promise<boolean> indicating if the API is accessible
 */
export async function checkDeepSeekAPIAvailability(): Promise<boolean> {
  try {
    const response = await fetch(API_CONFIG.DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_CONFIG.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: API_CONFIG.DEEPSEEK_MODEL,
        messages: [{ role: "user", content: "Hello" }],
        max_tokens: 5,
        temperature: 0.1
      })
    });
    
    return response.ok;
  } catch (error) {
    console.error("API availability check failed:", error);
    return false;
  }
}
