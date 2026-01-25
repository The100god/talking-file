import { Language } from "@/types";


/**
 * Detect dominant language of a text
 * Uses Unicode range frequency
 */
export function detectLang(text: string): Language {
  if (!text) return "en";

  let hiCount = 0;
  let enCount = 0;

  for (const char of text) {
    if (/[\u0900-\u097F]/.test(char)) {
      hiCount++;
    } else if (/[a-zA-Z]/.test(char)) {
      enCount++;
    }
  }

  // 🔹 dominant rule
  return hiCount > enCount ? "hi" : "en";
}
