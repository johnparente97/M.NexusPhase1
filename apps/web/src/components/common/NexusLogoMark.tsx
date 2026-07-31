import React from 'react';

export interface NexusLogoMarkProps {
  className?: string;
  size?: number | string;
  color?: string;
}

/**
 * NexusLogoMark — Official Meridian Protocol Pinwheel Logo Mark
 * Exact vector geometry rendering the 4 rounded arms with flat inner edges
 * forming the signature center square cutout and #27F293 mint green fill.
 */
export const NexusLogoMark: React.FC<NexusLogoMarkProps> = ({
  className = 'h-8 w-8',
  size,
  color = '#27F293',
}) => {
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
        {/* Exact Meridian Pinwheel Arm with flat inner edge forming the center square */}
        <g id="meridianPinwheelArm">
          <path
            d="M 44 10 H 21 A 11 11 0 0 0 21 32 H 44 Z"
            fill={color}
            transform="rotate(-45 50 50)"
          />
        </g>
      </defs>

      {/* 4 Rotated Arms (0°, 90°, 180°, 270°) */}
      <g>
        <use href="#meridianPinwheelArm" />
        <use href="#meridianPinwheelArm" transform="rotate(90 50 50)" />
        <use href="#meridianPinwheelArm" transform="rotate(180 50 50)" />
        <use href="#meridianPinwheelArm" transform="rotate(270 50 50)" />
      </g>
    </svg>
  );
};
