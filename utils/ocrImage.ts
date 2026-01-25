"use client";

import { ParsedPage } from "@/types";
import Tesseract from "tesseract.js";

export async function ocrImage(file: File): Promise<ParsedPage[]> {

    const {data} = await Tesseract.recognize(file, "eng", {
        logger: (m) => console.log(m),
    })

    // console.log(data);


    const chunks = data.text.match(/(.|[\r\n]){1,1200}/g) || [];

    // console.log("chunks",chunks);


    return chunks.map((text, index) => ({
        page: index+1,
        text: text.trim(),
    }));
}