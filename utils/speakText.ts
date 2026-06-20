"use client";

import { getDefaultStore } from "jotai";
import { splitMixedText } from "./splitMixedText";
import { highlightedWordAtom, resumeWordIndexAtom } from "@/store/readerAtoms";
import { Chunk } from "@/types";

export type SpeechLang = "auto" | "en" | "hi";

let queue: SpeechSynthesisUtterance[] = [];
// let chunks: { text: string; lang: "hi" | "en"; page: number }[] = [];

let currentIndex = 0;
let isPaused = false;

let selectedLang: SpeechLang = "auto";
let baseRate = 1;

let resumeOffset = 0;

const store = getDefaultStore();

// ---------------- SETTINGS ----------------
export function setSpeechLanguage(lang: SpeechLang) {
  selectedLang = lang;
}

export function setSpeechRate(rate: number) {
  baseRate = rate;
}

// ---------------- VOICES ----------------
function getVoice(lang: "hi" | "en") {
  const voices = speechSynthesis.getVoices();

  if (lang === "hi") {
    return (
      voices.find((v) => v.lang === "hi-IN") ||
      voices.find((v) => v.lang.startsWith("hi")) ||
      null
    );
  }

  return (
    voices.find((v) => v.lang === "en-IN") ||
    voices.find((v) => v.lang === "en-US") ||
    voices.find((v) => v.lang.startsWith("en")) ||
    null
  );
}

// function saveWordProgress(wordIndex: number) {
//   const row = localStorage.getItem("speechProgress")
//   const data = row ? JSON.parse(row) : {};

//   localStorage.setItem("speechProgress", JSON.stringify({
//     ...data,
//     wordIndex,
//   }));
// }

// function getFirstSentence(text: string) {
//   const match = text.match(/[^.!?]+[.!?]/);
//   return match ? match[0].trim() : text.slice(0, 200);
// }

function isEnglishOnly(text: string) {
  return !/[\u0900-\u097F]/.test(text);
}

// ---------------- SPEAK ----------------

// export function speakText(text: string, resume = false) {
//   if (!resume) {
//     currentIndex = 0;
//   }

//   stopSpeech(false);

//   // prepare chunks
//   chunks =
//     selectedLang === "auto"
//       ? splitMixedText(text)
//       : [{ text, lang: selectedLang, page: 1 }];

//   queue = chunks.map((chunk) => {
//     const utter = new SpeechSynthesisUtterance(chunk.text);

//     utter.rate = chunk.lang === "hi" ? Math.min(baseRate * 1.4, 3) : baseRate;

//     // utter.onstart = () => {
//     //   const firstSentence = getFirstSentence(utter.text);
//     //   store.set(highlightedRangeAtom, null);
//     // };
//     utter.onboundary = (event) => {
//       if (event.name === "word") {
//         const start = event.charIndex;
//         const end = event.charLength? start + event.charLength : start + 1;
//         store.set(highlightedRangeAtom, { start, end });
//         store.set(resumeWordIndexAtom, start);

//         saveWordProgress(start);
//       }
//     };

//     utter.onend = () => {
//       store.set(highlightedRangeAtom, null);
//     };

//     const voice = getVoice(chunk.lang);
//     if (voice) {
//       utter.voice = voice;
//       utter.lang = voice.lang;
//     }

//     return utter;
//   });

//   playFromIndex();
// }

export function speakPages(
  pages: { page: number; text: string }[],
  resume = false
) {
  if (!resume) {
    currentIndex = 0;
    resumeOffset = 0;
    localStorage.removeItem("speechProgress");
  }

  stopSpeech(false);
  // speechSynthesis.cancel();

  // prepare chunks
  const allChunks = pages.flatMap((p) =>
    selectedLang === "auto"
      ? splitMixedText(p.text, p.page)
      : [
          {
            text: p.text,
            lang: selectedLang,
            page: p.page,
            startOffset: 0,
          },
        ]
  );

  queue = allChunks.map((chunk: Chunk) => {
    const utter = new SpeechSynthesisUtterance(chunk.text);
    utter.rate = chunk.lang === "hi" ? Math.min(baseRate * 1.3, 2.5) : baseRate;

    const voice = getVoice(chunk.lang);
    if (voice) {
      utter.voice = voice;
      utter.lang = voice.lang;
    }

    utter.onboundary = (event) => {

      const absoluteStart =
    chunk.startOffset + resumeOffset + event.charIndex;

    console.log("BOUNDARY:", event.name, "AT:", absoluteStart, "PAGE:", chunk.page);
      if ( chunk.lang === "en" && event.name === "word") {
        // const start = chunk.startOffset + resumeOffset + event.charIndex;
        const end = event.charLength ? absoluteStart + event.charLength : absoluteStart + 1;

        store.set(highlightedWordAtom, {
          page: chunk.page,
          start: absoluteStart,
          end,
        });
        // console.log("OFFSET:", resumeOffset, "CHAR:", event.charIndex);

        saveResume(chunk.page, absoluteStart);
        return;
      }

      // ✅ SENTENCE fallback (Hindi)
      if (chunk.lang === "hi" && event.name === "sentence") {
        // const start = chunk.startOffset + resumeOffset + event.charIndex;

        const end = absoluteStart + (event.charLength ?? 60); // safe sentence length

        store.set(highlightedWordAtom, {
          page: chunk.page,
          start: absoluteStart,
          end,
        });

        saveResume(chunk.page, absoluteStart);
      }
    };

    utter.onend = () => {
      store.set(highlightedWordAtom, null);
    };

    return utter;
  });

  playFromIndex();
}

function playFromIndex() {
  if (currentIndex >= queue.length || isPaused) return;

  const utter = queue[currentIndex];

  //   utter.onstart = () => {
  //   // const firstSentence = getFirstSentence(utter.text);
  //   store.set(highlightedRangeAtom, null);
  // };

  utter.onend = () => {
    // store.set(highlightedRangeAtom, null);
    currentIndex++;
    // saveProgress();
    playFromIndex();
  };

  speechSynthesis.speak(utter);
}

// ---------------- CONTROLS ----------------
export function pauseSpeech() {
  isPaused = true;
  // speechSynthesis.pause();
  speechSynthesis.cancel();
  // saveProgress();
}

// export function resumeSpeech(text: string) {
//   isPaused = false;
//   const row = localStorage.getItem("speechProgress");
//   const data = row ? JSON.parse(row) : {};
//   const wordIndex = data.wordIndex ?? 0;
//   const resumeText = text.slice(wordIndex);
//   speakText(resumeText, true);
// }

function isMobile() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}


export function resumeSpeech(pages: { page: number; text: string }[]) {

  // if (speechSynthesis.paused ) {
  //   isPaused = false;
  //   speechSynthesis.resume();
  //   return;
  // }
  const raw = localStorage.getItem("speechProgress");
  if (!raw) return;

  const { page, wordIndex } = JSON.parse(raw);

  const pageObj = pages.find((p) => p.page === page);
  if (!pageObj) return;

  const text = pageObj.text;


  // ✅ English-only → native resume
  if (speechSynthesis.paused && isEnglishOnly(text)) {
    isPaused = false;
    speechSynthesis.resume();
    // return;
  }

  resumeOffset = wordIndex;
  speechSynthesis.cancel();

  const remainingText = text.slice(wordIndex);


  speakPages([{ page, text: remainingText }], true);
}

export function stopSpeech(clear = true) {
  speechSynthesis.cancel();
  isPaused = false;
  // chunks = [];
  // store.set(highlightedRangeAtom, null);
  // store.set(resumeWordIndexAtom, 0);
  store.set(highlightedWordAtom, null);

  if (clear) {
    resumeOffset = 0;
    queue = [];
    currentIndex = 0;
    localStorage.removeItem("speechProgress");
  }
}

// ---------------- STORAGE ----------------
// function saveProgress() {
//   localStorage.setItem(
//     "speechProgress",
//     JSON.stringify({
//       index: currentIndex,
//       rate: baseRate,
//       lang: selectedLang,
//     })
//   );
// }

function saveResume(page: number, wordIndex: number) {
  localStorage.setItem("speechProgress", JSON.stringify({ page, wordIndex }));
}

export function loadProgress() {
  const raw = localStorage.getItem("speechProgress");
  if (!raw) return;

  const data = JSON.parse(raw);
  currentIndex = data.index ?? 0;
  baseRate = data.rate ?? 1;
  selectedLang = data.lang ?? "auto";
}
