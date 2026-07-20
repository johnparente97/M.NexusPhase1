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
        {/* Deep Core Glow */}
        <radialGradient id="nexusCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#10B981" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>

        {/* Sphere 3D Metallic Emerald Gradient */}
        <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#A7F3D0" />
          <stop offset="35%" stopColor="#34D399" />
          <stop offset="75%" stopColor="#059669" />
          <stop offset="100%" stopColor="#064E3B" />
        </radialGradient>

        {/* Linear Arc Stroke Gradient */}
        <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="50%" stopColor="#6EE7B7" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>

        {/* Safe, Low-Blur Glow Filter to prevent Safari rasterization */}
        <filter id="cleanEmeraldGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ambient background glow ring */}
      <circle cx="50" cy="50" r="45" fill="url(#nexusCoreGlow)" />

      {/* Outer Thin Ring */}
      <circle
        cx="50"
        cy="50"
        r="34"
        stroke="#34D399"
        strokeWidth="1.2"
        strokeOpacity="0.75"
      />

      <circle
        cx="50"
        cy="50"
        r="38"
        stroke="#10B981"
        strokeWidth="0.8"
        strokeOpacity="0.4"
      />

      {/* Horizontal & Vertical Crosshair Lines */}
      <line x1="16" y1="50" x2="84" y2="50" stroke="#34D399" strokeWidth="0.75" strokeOpacity="0.5" />
      <line x1="50" y1="16" x2="50" y2="84" stroke="#34D399" strokeWidth="0.75" strokeOpacity="0.5" />

      {/* Curved Hyperbolic Arcs connecting the outer nodes */}
      <path
        d="M 24,24 Q 50,42 76,24 Q 58,50 76,76 Q 50,58 24,76 Q 42,50 24,24 Z"
        fill="#10B981"
        fillOpacity="0.15"
        stroke="url(#arcGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#cleanEmeraldGlow)"
      />

      {/* Inner Central Ring */}
      <circle cx="50" cy="50" r="11" stroke="#34D399" strokeWidth="1.2" strokeOpacity="0.8" />

      {/* 4 Corner Orbital Spheres */}
      {/* Top-Left */}
      <circle cx="24" cy="24" r="7.5" fill="url(#sphereGrad)" stroke="#A7F3D0" strokeWidth="0.75" />
      {/* Top-Right */}
      <circle cx="76" cy="24" r="7.5" fill="url(#sphereGrad)" stroke="#A7F3D0" strokeWidth="0.75" />
      {/* Bottom-Right */}
      <circle cx="76" cy="76" r="7.5" fill="url(#sphereGrad)" stroke="#A7F3D0" strokeWidth="0.75" />
      {/* Bottom-Left */}
      <circle cx="24" cy="76" r="7.5" fill="url(#sphereGrad)" stroke="#A7F3D0" strokeWidth="0.75" />

      {/* Central Core Sphere */}
      <circle cx="50" cy="50" r="5" fill="url(#sphereGrad)" />
      <circle cx="50" cy="50" r="2.2" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
};

export default NexusLogoMark;
