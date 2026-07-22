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
        {/* Soft Ambient Glow */}
        <radialGradient id="meridianGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34D399" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>

        {/* Meridian Mint Emerald Color Gradient */}
        <linearGradient id="meridianBrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#27F293" />
        </linearGradient>

        {/* 
          Exact Meridian Pinwheel / Aperture Blade 
          4-fold rotational symmetry around (50, 50).
        */}
        <g id="meridianPinwheelBlade">
          <path
            d="M 37,14 
               L 62,14 
               C 64.5,14 66.5,15 67.5,17 
               L 86,37.5 
               C 87,38.5 87,40.5 86,41.5 
               L 67.5,60 
               C 66.5,61 64.5,61 63.5,60 
               L 37,33.5 
               C 35.5,32 35.5,29.5 37,28 
               L 37,14 Z"
            fill="url(#meridianBrandGrad)"
          />
        </g>
      </defs>

      {/* Central Background Glow */}
      <circle cx="50" cy="50" r="44" fill="url(#meridianGlow)" />

      {/* The 4 Rotated Meridian Aperture Blades */}
      <g>
        <use href="#meridianPinwheelBlade" />
        <use href="#meridianPinwheelBlade" transform="rotate(90 50 50)" />
        <use href="#meridianPinwheelBlade" transform="rotate(180 50 50)" />
        <use href="#meridianPinwheelBlade" transform="rotate(270 50 50)" />
      </g>
    </svg>
  );
};

export default NexusLogoMark;
