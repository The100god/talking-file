"use client";

import styled from "styled-components";

export default function BackgroundPattern() {
  return (
    <StyledWrapper>
      <svg className="texture-filter">
        <filter id="ocean-texture">
          <feTurbulence
            result="noise"
            numOctaves={3}
            baseFrequency="0.6"
            type="turbulence"
          />
          <feSpecularLighting
            result="specular"
            lightingColor="#66d9ff"
            specularExponent={20}
            specularConstant="0.8"
            surfaceScale={2}
            in="noise"
          >
            <fePointLight z={100} y={120} x={120} />
          </feSpecularLighting>
          <feComposite
            result="litNoise"
            operator="over"
            in2="SourceGraphic"
            in="specular"
          />
          <feBlend mode="screen" in2="litNoise" in="SourceGraphic" />
        </filter>
      </svg>

      <div className="ocean-depths-pattern" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: -10;
  pointer-events: none;
  overflow: hidden;       /* 🔥 IMPORTANT */
  contain: layout paint;  /* 🔥 IMPORTANT */

  .texture-filter {
    width: 0;
    height: 0;
  }

  .ocean-depths-pattern {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      #0a1e2b,
      #1a3b4a 50%,
      #092934 90%,
      #032630
    );
    filter: url(#ocean-texture);
  }
`;
