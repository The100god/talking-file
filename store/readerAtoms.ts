import { atom } from "jotai";
import { ParsedPage } from "@/types";

export const loadingAtom = atom<boolean>(false);

// Parsed pages
export const pagesAtom = atom<ParsedPage[]>([]);

// Selected start page
export const startPageAtom = atom<number>(1);

// Uploaded file name
export const fileNameAtom = atom<string>("");

// Derived atom: sliced pages (based on startPage)
export const visiblePagesAtom = atom((get) => {
  const pages = get(pagesAtom);
  const startPage = get(startPageAtom);
  return pages.slice(startPage - 1);
});

export type HighlightedWord = {
  page: number;
  start: number;
  end: number;
};

export const highlightedWordAtom = atom<HighlightedWord | null>(null);


// export type HighlightRange = {
//   page: number;
//   start: number;
//   end: number;
// };

// export const highlightedRangeAtom = atom<HighlightRange | null>(null);


export type ResumeState = {
  page: number;
  wordIndex: number;
};

export const resumeStateAtom = atom<ResumeState | null>(null);

export const currentPageAtom = atom<number>(1);

export const resumeWordIndexAtom = atom<number>(0);