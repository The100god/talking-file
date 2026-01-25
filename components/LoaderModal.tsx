"use client";

import Loader from "./UiComponent/Loader";


export default function LoaderModal() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Loader />
        <p className="text-white text-sm tracking-wide animate-pulse">
          Processing your document…
        </p>
      </div>
    </div>
  );
}
