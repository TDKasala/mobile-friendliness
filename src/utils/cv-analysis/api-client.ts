
/**
 * API client for DeepSeek AI service
 */

/**
 * DeepSeek API configuration
 */
export const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
export const DEEPSEEK_API_KEY = "sk-f89f3e7c942043059b94bde104ccbd82"; 
export const DEEPSEEK_MODEL = "deepseek-chat";

/**
 * Helper function to call DeepSeek API with error handling and rate limiting
 */
export async function callDeepSeekAPI(prompt: string, maxTokens: number = 1000): Promise<string> {
  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: maxTokens
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`DeepSeek API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling DeepSeek API:", error);
    throw new Error(`Failed to communicate with DeepSeek API: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Simple hash function for caching
 */
export function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString(16);
}
