export interface ParsedPage {
  page: number;
  text: string;
}

export interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export interface ParsedTextProps {
  pages: ParsedPage[];
}

export type Language = "en" | "hi";
export type SpeechLang = "auto" | "en" | "hi";


export type Chunk = {
  text: string;
  lang: "hi" | "en";
  page: number;
  startOffset: number;
};

export interface ReaderHeaderProps {
  title?: string;
  currentPage: number;
  totalPages: number;
}

export interface AudioBarProps {
  onPlay: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  speechRate: number;
  onSpeedChange: (rate: number) => void;
}
