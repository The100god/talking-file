"use client";

import { FileUploadProps } from "@/types";
import { FileUploadButton } from "./UiComponent/FileUploadButtonComponent";

export default function FileUpload({ onFileSelect }: FileUploadProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF and DOCX files are allowed.");
      return;
    }
    // console.log(file.type);

    onFileSelect(file);
  };

  return (
    <div className="mb-4">
      <FileUploadButton onFileChange={handleChange} />
    </div> 
  );
}
