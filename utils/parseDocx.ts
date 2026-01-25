import { ParsedPage } from "@/types";
import mammoth from "mammoth";

export async function parseDocx(file: File): Promise<ParsedPage[]> {

    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });

    const chunks = result.value.match(/(.|[\r\n]){1,1500}/g) || [];


    return chunks.map((chunks, index)=>({
        page:index+1,
        text:chunks
    })) ;
}