import React from 'react';

export interface NexusLogoMarkProps {
  className?: string;
  size?: number | string;
}

export const NexusLogoMark: React.FC<NexusLogoMarkProps> = ({ className = 'h-9 w-9', size }) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        {/* Soft Radial Glow behind the central aperture */}
        <radialGradient id="meridianApertureGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34D399" stopOpacity="0.3" />
          <stop offset="70%" stopColor="#27F293" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>

        {/* Meridian Mint Emerald Gradient */}
        <linearGradient id="meridianMintGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="50%" stopColor="#27F293" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>

        {/* Single Aperture Blade definition for rotational symmetry */}
        <g id="meridianApertureBlade">
          <path
            d="M 34 14 
               L 61 14 
               C 63.5 14 65.5 15.2 66.5 17 
               L 85.5 36 
               C 86.5 37 86.5 39 85.5 40 
               L 67 58.5 
               C 66 59.5 64 59.5 63 58.5 
               L 36.5 32 
               C 35.5 31 35.5 29.5 36.5 28.5 
               L 34 14 Z"
            fill="url(#meridianMintGrad)"
          />
        </g>
      </defs>

      {/* Central Ambient Glow */}
      <circle cx="50" cy="50" r="42" fill="url(#meridianApertureGlow)" />

      {/* 4 Interlocking Rotated Meridian Blades */}
      <g>
        <use href="#meridianApertureBlade" />
        <use href="#meridianApertureBlade" transform="rotate(90 50 50)" />
        <use href="#meridianApertureBlade" transform="rotate(180 50 50)" />
        <use href="#meridianApertureBlade" transform="rotate(270 50 50)" />
      </g>
    </svg>
  );
};

export default NexusLogoMark;
