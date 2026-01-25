"use client";

import { ReaderHeaderProps } from "@/types";
import { setSpeechLanguage } from "@/utils/speakText";
import { useAtom } from "jotai";
import { pagesAtom, startPageAtom } from "@/store/readerAtoms";
import { useState } from "react";

export default function ReaderHeader({
  title,
  currentPage}: ReaderHeaderProps) {
  const [pages] = useAtom(pagesAtom);
  const [startPage, setStartPage] = useAtom(startPageAtom);
const [pageInput, setPageInput] = useState(String(startPage));
  return (
    <div className="sticky top-0 z-20 bg-white/95 border-b rounded-lg space-y-4 px-4 py-3 w-full m-auto">
      <h1 className="text-lg text-orange-500 font-semibold truncate underline">
        {title}
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0 md:space-x-2 text-sm md:text-lg">
        {/* Left controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-black space-y-3 md:space-y-0 md:space-x-4">
          {/* Language selector */}
          <label className="flex justify-center items-center gap-2">
            <span>Language:</span>
            <select
              className="border-2 border-green-300 p-1 rounded"
              defaultValue="auto"
              onChange={(e) =>
                setSpeechLanguage(
                  e.target.value === "auto"
                    ? "auto"
                    : (e.target.value as "en" | "hi")
                )
              }
            >
              <option value="auto">Auto Detect</option>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
            </select>
          </label>

          {/* Start page selector */}
          <label className="flex justify-center items-center gap-2">
            <span className="font-medium">Start from page:</span>
            <input
              type="number"
              min={1}
              max={pages.length || 1}
              value={pageInput}
              // value={currentPage < startPage ? currentPage : startPage}
              onChange={(e) =>
                {
                  setPageInput(e.target.value);
                  setStartPage(
                  Math.min(
                    Math.max(1, Number(e.target.value)),
                    pages.length
                  )
                )}
              }
              className="p-1 border border-gray-300 rounded w-20"
            />
          </label>
        </div>

        {/* Right page indicator */}
        <div className="text-gray-600 w-full md:w-auto text-right">
          <p className="text-sm text-right text-gray-500">
            Page {currentPage} of {pages.length}
          </p>
        </div>
      </div>
    </div>
  );
}
