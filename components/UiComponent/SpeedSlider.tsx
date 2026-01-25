"use client";

import styled from "styled-components";

interface SpeedSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export default function SpeedSlider({
  value,
  onChange,
  min = 0.5,
  max = 2,
  step = 0.1,
}: SpeedSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <StyledWrapper>
      <div className="relative w-full">
        {/* Floating value bubble */}
        <div
          className={`absolute -top-8 -translate-x-1/2 bg-emerald-500 text-white text-xs font-semibold px-2 py-1 rounded-full`}
          style={{ left: `${percentage}%` }}
        >
          {value.toFixed(1)}x
        </div>

        {/* Slider */}
        <input
          title="speech rate"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full appearance-none bg-transparent cursor-pointer"
        />

        {/* Track */}
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="w-full h-1 rounded-full bg-gray-700" />
          <div
            className={`absolute h-1 rounded-full bg-emerald-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Thumb styling */}
      </div>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  /* Remove default styles */
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    outline: none;
  }

  /* WebKit (Chrome, Edge, Safari) */
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 18px;
    width: 18px;
    border-radius: 9999px;
    background: #10b981;
    border: 3px solid #ffffff;
    cursor: pointer;
    margin-top: -8px;
    position: relative;
    z-index: 20;
  }

  /* Firefox */
  input[type="range"]::-moz-range-thumb {
    height: 18px;
    width: 18px;
    border-radius: 9999px;
    background: #10b981;
    border: 3px solid #ffffff;
    cursor: pointer;
  }

  /* Remove Firefox track background */
  input[type="range"]::-moz-range-track {
    background: transparent;
  }

  /* Focus state (accessibility) */
  input[type="range"]:focus-visible::-webkit-slider-thumb {
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.3);
  }

  input[type="range"]:focus-visible::-moz-range-thumb {
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.3);
  }
`;
