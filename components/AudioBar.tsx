"use client";

import { AudioBarProps } from "@/types";
import SpeedSlider from "./UiComponent/SpeedSlider";
import { useState } from "react";

export default function AudioBar({
  onPlay,
  onPause,
  onResume,
  onStop,
  speechRate,
  onSpeedChange,
}: AudioBarProps) {
  const [showSpeedModal, setShowSpeedModal] = useState(false);

  return (
    <>
    {showSpeedModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowSpeedModal(false)}
          />

          {/* Modal */}
          <div className="relative flex flex-col gap-5 mb-20 w-[90%] max-w-sm bg-white rounded-xl p-3 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm text-black font-semibold">Playback Speed</h3>
              <button className="text-red-800 font-extrabold border border-red-500 rounded-full hover:bg-red-200 cursor-pointer w-8 h-8 text-center" onClick={() => setShowSpeedModal(false)}>✕</button>
            </div>

            {/* Speed slider */}
            <SpeedSlider
              value={speechRate}
              onChange={onSpeedChange}
              min={0.5}
              max={2}
              step={0.1}
            />
          </div>
        </div>
      )}
   
    <div className="fixed bottom-0 left-0 right-0 bg-transparent backdrop-blur-lg border-t-transparent inset-shadow-teal-400 p-4 flex z-30 flex-col gap-3 overflow-x-hidden m-auto">
      <div className="flex justify-center gap-4 text-ls">
        <button
          title="play"
          className="cursor-pointer border-2 border-green-600 hover:bg-emerald-300 bg-white/95 text-sm text-black px-2 py-1 rounded-lg"
          onClick={onPlay}
        >
          <span className="hidden md:flex">
            Play 
            </span>
            ▶
        </button>
        <button
          title="pause"
          className="cursor-pointer bg-white/95 border-2 border-green-600 hover:bg-yellow-100 text-sm text-black px-2 py-1 rounded-lg"
          onClick={onPause}
        >
            <span className="hidden md:flex">Pause</span>
           ⏸
        </button>
        <button
          title="resume"
          className="cursor-pointer bg-white/95 border-2 border-green-600 hover:bg-emerald-100 text-sm text-black px-2 py-1 rounded-lg"
          onClick={onResume}
        >
            <span className="hidden md:flex">Resume</span>
           ▶️
        </button>
        <button
          title="stop"
          className="cursor-pointer border-2 bg-white/95 border-red-600 hover:bg-red-200 text-sm text-red-800 px-2 py-1 rounded-lg"
          onClick={onStop}
        >
            <span className="hidden md:flex">Stop</span>
           ⏹
        </button>

        <button
          onClick={() => setShowSpeedModal(true)}
          className=" px-3 py-1.5 rounded-full bg-gray-800 text-white cursor-pointer text-center text-sm"
        >
          ⚡ {speechRate.toFixed(1)}x
        </button>
      </div>
      

      {/* <div className="flex items-center justify-center gap-3 w-full">
        <div className="p-3 w-full"> */}
          {/* <label className="block mb-4 text-sm font-medium text-gray-400">
            Playback Speed
          </label> */}

          {/* <SpeedSlider
            value={speechRate}
            onChange={onSpeedChange}
            min={0.5}
            max={2}
            step={0.1}
          />
        </div> */}
        {/* <span className="text-sm">Speed</span> */}
        {/* <input
          title="speech rate"
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={speechRate}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="flex-1 cursor-grab"
        /> */}
        {/* <SpeedSlider value={speechRate} onChange={onSpeedChange} /> */}
        {/* <DualRangeSlider
          label={() => <>x/>}
          value={[celPer]}
          labelPosition='static'
          onValueChange={([celPer]) => celPer != null && setCelPer(celPer)}
          min={0}
          max={100}
          step={1}
        /> */}
        {/* <span className="text-sm text-black font-semibold">{speechRate}x</span>
      </div> */}
    </div>
     </>
  );
}
