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
        {/* Ambient Glow */}
        <radialGradient id="meridianGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#27F293" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>

        {/* Meridian Mint Emerald Color Gradient */}
        <linearGradient id="meridianBrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#27F293" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>

        {/* Official Meridian Pinwheel Bar */}
        <g id="meridianPinwheelBar">
          <rect x="20" y="10" width="46" height="22" rx="11" fill="url(#meridianBrandGrad)" transform="rotate(-45 50 50)" />
        </g>
      </defs>

      {/* Background Glow */}
      <circle cx="50" cy="50" r="44" fill="url(#meridianGlow)" />

      {/* 4 Rotated Meridian Pinwheel Bars (0°, 90°, 180°, 270°) */}
      <g>
        <use href="#meridianPinwheelBar" />
        <use href="#meridianPinwheelBar" transform="rotate(90 50 50)" />
        <use href="#meridianPinwheelBar" transform="rotate(180 50 50)" />
        <use href="#meridianPinwheelBar" transform="rotate(270 50 50)" />
      </g>
    </svg>
  );
};
