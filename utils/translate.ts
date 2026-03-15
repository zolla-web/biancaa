/**
 * Automatic translation helper with multiple providers and caching
 */
export async function translateText(text: string, targetLng: string): Promise<string> {
  if (!text || targetLng === 'en') return text;
  
  const cacheKey = `tr_${targetLng}_${text}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) return cached;
  
  // Try MyMemory First
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLng}`
    );
    const data = await response.json();
    const result = data.responseData.translatedText;
    
    // Check if result is valid and not a warning
    if (result && !result.includes('MYMEMORY WARNING') && !result.includes('YOU USED ALL AVAILABLE')) {
      localStorage.setItem(cacheKey, result);
      return result;
    }
  } catch (error) {
    console.warn('MyMemory translation failed, trying fallback...');
  }

  // Fallback: Unofficial Google Translate endpoint
  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLng}&dt=t&q=${encodeURIComponent(text)}`
    );
    const data = await response.json();
    if (data && data[0] && data[0][0] && data[0][0][0]) {
      const result = data[0][0][0];
      localStorage.setItem(cacheKey, result);
      return result;
    }
  } catch (error) {
    console.error('Fallback translation failed:', error);
  }

  return text; // Return original text if all fail
}
