"use client";
import { ParsedPage } from "@/types";
import * as pdfjsLib from "pdfjs-dist";
// import { version } from 'pdfjs-dist/package.json';
// pdfjsLib.GlobalWorkerOptions.workerSrc = "cdnjs.cloudflare.com/ajax/libs/pdf.js/" + version + "/pdf.worker.min.js";
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

// pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.530/pdf.worker.min.mjs';
// pdfjsLib.GlobalWorkerOptions.workerSrc =
//   "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.149/pdf.worker.min.mjs";

  

export async function parsePdf(file: File): Promise<ParsedPage[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const pages: ParsedPage[]= [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const text = textContent.items.map((item: any) => item.str).join(" ");
    pages.push({ page: i, text });
  }

  return pages;
}
