import { useMemo } from "react";
import { ParsedPage } from "@/types";

interface WordTrackerProps {
  pages: ParsedPage[];
}

export default function WordTracker({ pages }: WordTrackerProps) {
  const totalWords = useMemo(() => {
    let count = 0;
    for (const p of pages) {
      // Simple word split, ignoring multiple spaces
      const words = p.text.trim().split(/\s+/);
      count += words.filter((w) => w.length > 0).length;
    }
    return count;
  }, [pages]);

  return (
    <div className="flex justify-center items-center py-2 bg-gray-800/30 rounded-lg mb-4">
      <span className="text-sm text-white" aria-label="Word count">
        Total words: {totalWords}
      </span>
    </div>
  );
}
