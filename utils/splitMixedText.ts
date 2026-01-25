import { Chunk } from "@/types";

export function splitMixedText(
  text: string,
  page: number
): Chunk[] {
  const words = text.split(/(\s+)/); // keep spaces
  const chunks: Chunk[] = [];

  let currentText = "";
  let currentLang: "hi" | "en" | null = null;
  let charIndex = 0;
  let chunkStart = 0;

  const isHindi = (s: string) => /[\u0900-\u097F]/.test(s);

  for (const word of words) {
    const wordLen = word.length;

    if (word.trim() === "") {
      currentText += word;
      charIndex += wordLen;
      continue;
    }

    const lang: "hi" | "en" = isHindi(word) ? "hi" : "en";

    if (currentLang === null) {
      currentLang = lang;
      currentText = word;
      chunkStart = charIndex;
    } else if (lang === currentLang) {
      currentText += word;
    } else {
      chunks.push({
        text: currentText,
        lang: currentLang,
        page,
        startOffset: chunkStart,
      });

      currentLang = lang;
      currentText = word;
      chunkStart = charIndex;
    }

    charIndex += wordLen;
  }

  if (currentText.trim()) {
    chunks.push({
      text: currentText,
      lang: currentLang!,
      page,
      startOffset: chunkStart,
    });
  }

  return chunks;
}
