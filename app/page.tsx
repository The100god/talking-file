"use client";

import FileUpload from "@/components/FileUpload";
import ParsedText from "@/components/ParsedText";
import { parseDocx } from "@/utils/parseDocx";
import { useAtom } from "jotai";
import {
  pagesAtom,
  startPageAtom,
  fileNameAtom,
  visiblePagesAtom,
  currentPageAtom,
  loadingAtom,
} from "@/store/readerAtoms";
import { useEffect } from "react";
import ReaderHeader from "@/components/ReaderHeader";
import Loader from "@/components/UiComponent/Loader";
import LoaderModal from "@/components/LoaderModal";

export default function Home() {
  const [, setPages] = useAtom(pagesAtom);
  const [, setStartPage] = useAtom(startPageAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const [visiblePages] = useAtom(visiblePagesAtom);
  const [currentPage] = useAtom(currentPageAtom);
  const [loading, setLoading] = useAtom(loadingAtom);

  const handleFileSelect = async (file: File) => {
    setLoading(true);
    setPages([]);
    setFileName(file.name);
    setStartPage(1);
    try {
      let parsed = [];
      if (file.type === "application/pdf") {
        const { parsePdf } = await import("@/utils/parsePdf");
        parsed = await parsePdf(file);
      } else if (file.type.includes("image")) {
        const { ocrImage } = await import("@/utils/ocrImage");
        parsed = await ocrImage(file);
      } else {
        parsed = await parseDocx(file);
      }
      setPages(parsed);
      localStorage.setItem("offline_pages", JSON.stringify(parsed));
      localStorage.setItem("offline_filename", file.name);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    speechSynthesis.getVoices();
    const cachedPages = localStorage.getItem("offline_pages");
    const cachedName = localStorage.getItem("offline_filename");

    if (cachedPages) {
      setPages(JSON.parse(cachedPages));
    }

    if (cachedName) {
      setFileName(cachedName);
    }
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [loading]);

  return (
    <>
      {loading && <LoaderModal />}
      <main className="relative flex flex-col p-2 w-[90%] px-4 md:px-10 md:max-w-4xl m-auto">
        <h1 className="text-4xl font-bold text-center mb-6">
          Welcome to Talking File
        </h1>

        <p className="text-xl mb-5 text-center">
          Upload PDF, DOCX, or Images to get started.
        </p>

        <FileUpload onFileSelect={handleFileSelect} />

        {visiblePages.length > 0 && (
          <ReaderHeader
            title={fileName || "Reading Mode"}
            currentPage={currentPage}
            totalPages={visiblePages.length}
          />
        )}

        {/* LOADER */}
        {/* {loading && (
          <div className="flex flex-col items-center gap-4 mt-10">
            <Loader />
            <p className="text-gray-500 text-sm animate-pulse">
              Processing your document…
            </p>
          </div>
        )} */}

        <div className="flex flex-col gap-6 min-h-75 border-t-2 pt-2 mt-8 border-gray-300">
          {/* {fileName && (
          <p className="text-2xl text-green-500 text-center mt-6">
            {fileName}
          </p>
        )} */}

          {!loading && visiblePages.length > 0 && (
            <ParsedText pages={visiblePages} />
          )}
        </div>
      </main>
    </>
  );
}
