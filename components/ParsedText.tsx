"use client";

import { ParsedTextProps } from "@/types";
import {
  loadProgress,
  pauseSpeech,
  resumeSpeech,
  setSpeechRate,
  speakPages,
  // speakText,
  stopSpeech,
} from "@/utils/speakText";
import { useEffect, useRef, useState } from "react";
import AudioBar from "./AudioBar";
import { useAtom } from "jotai";
import { currentPageAtom, highlightedWordAtom } from "@/store/readerAtoms";

export default function ParsedText({ pages }: ParsedTextProps) {
  const [speechRate, setLocalSpeechRate] = useState(1);
  // const [fileName, ] = useAtom(fileNameAtom);
  const [highlight] = useAtom(highlightedWordAtom);

  const [, setCurrentPage] = useAtom(currentPageAtom);
  const pageRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // const combinedText = pages.map((p) => p.text).join(" ");
  // console.log("combinedText:", combinedText);

  console.log("highlightedText:", highlight);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const page = Number(entry.target.getAttribute("data-page"));
            setCurrentPage(page);
          }
        });
      },
      {
        root: null,
        threshold: 0.3,
      }
    );

    Object.values(pageRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [pages]);

  useEffect(() => {
    if (!highlight) return;

    const el = document.querySelector("mark");
    el?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [highlight]);

  useEffect(() => {
    loadProgress();
  }, []);
  return (
    <div className="flex flex-col mt-4 w-full overflow-x-hidden">
      {/* language selector */}
      {/* <ReaderHeader
        title={fileName || "Reading Mode"}
        currentPage={currentPage ?? 1}
        totalPages={pages.length}
      /> */}
      <div className="px-6 py-8 space-y-10 leading-relaxed text-lg bg-black/45 rounded-lg border border-gray-300 mt-4 mb-22">
        {pages.map((p) => (
          <div
            key={p.page}
            ref={(el) => {
              pageRefs.current[p.page] = el;
            }}
            data-page={p.page}
            className="scroll-mt-20"
          >
            <h2 className="text-sm text-gray-400 mb-2">Page {p.page}</h2>
            {/* <p className="whitespace-pre-line leading-relaxed">
              {highlightedRange ? (
                <>
                  {p.text.slice(0, highlightedRange.start)}
                  <mark className="bg-yellow-300 text-black rounded px-0.5">
                    {p.text.slice(highlightedRange.start, highlightedRange.end)}
                  </mark>
                  {p.text.slice(highlightedRange.end)}
                </>
              ) : (
                p.text
              )}
            </p> */}

            <p className="whitespace-pre-line">
              {highlight && highlight.page === p.page ? (
                <>
                  {p.text.slice(0, highlight.start)}
                  <mark className="bg-yellow-300 text-black px-0.5 rounded">
                    {p.text.slice(highlight.start, highlight.end)}
                  </mark>
                  {p.text.slice(highlight.end)}
                </>
              ) : (
                p.text
              )}
            </p>
          </div>
        ))}
      </div>

      <AudioBar
        onPlay={() => speakPages(pages)}
        onPause={pauseSpeech}
        onResume={() => resumeSpeech(pages)}
        onStop={stopSpeech}
        speechRate={speechRate}
        onSpeedChange={(rate) => {
          setLocalSpeechRate(rate);
          setSpeechRate(rate);
          stopSpeech();
          speakPages(pages);
        }}
      />
    </div>
  );
}
