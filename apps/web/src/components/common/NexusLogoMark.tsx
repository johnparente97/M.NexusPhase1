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
        {/* Emerald Core Glow Gradient */}
        <radialGradient id="nexusGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34D399" stopOpacity="1" />
          <stop offset="60%" stopColor="#10B981" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
        </radialGradient>

        {/* Sphere 3D Metallic Emerald Gradient */}
        <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#A7F3D0" />
          <stop offset="40%" stopColor="#34D399" />
          <stop offset="80%" stopColor="#059669" />
          <stop offset="100%" stopColor="#064E3B" />
        </radialGradient>

        {/* Linear Arc Stroke Gradient */}
        <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="50%" stopColor="#6EE7B7" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>

        {/* Ambient Glow Filter */}
        <filter id="emeraldFilterGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Glow Halo */}
      <circle cx="50" cy="50" r="44" fill="url(#nexusGlow)" opacity="0.25" />

      {/* Outer Thin Ring */}
      <circle
        cx="50"
        cy="50"
        r="34"
        stroke="#34D399"
        strokeWidth="0.8"
        strokeOpacity="0.6"
      />
      <circle
        cx="50"
        cy="50"
        r="36"
        stroke="#10B981"
        strokeWidth="0.4"
        strokeOpacity="0.3"
      />

      {/* Horizontal & Vertical Crosshair Lines */}
      <line x1="14" y1="50" x2="86" y2="50" stroke="#34D399" strokeWidth="0.5" strokeOpacity="0.4" />
      <line x1="50" y1="14" x2="50" y2="86" stroke="#34D399" strokeWidth="0.5" strokeOpacity="0.4" />

      {/* Hyperbolic Curved Connecting Arcs between 4 Spheres */}
      <path
        d="M 24,24 Q 50,42 76,24 Q 58,50 76,76 Q 50,58 24,76 Q 42,50 24,24 Z"
        fill="#10B981"
        fillOpacity="0.12"
        stroke="url(#arcGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#emeraldFilterGlow)"
      />

      {/* Inner Central Ring */}
      <circle cx="50" cy="50" r="11" stroke="#34D399" strokeWidth="0.9" strokeOpacity="0.8" />

      {/* 4 Corner Orbital Spheres */}
      {/* Top-Left */}
      <circle cx="24" cy="24" r="7.5" fill="url(#sphereGrad)" stroke="#A7F3D0" strokeWidth="0.5" />
      {/* Top-Right */}
      <circle cx="76" cy="24" r="7.5" fill="url(#sphereGrad)" stroke="#A7F3D0" strokeWidth="0.5" />
      {/* Bottom-Right */}
      <circle cx="76" cy="76" r="7.5" fill="url(#sphereGrad)" stroke="#A7F3D0" strokeWidth="0.5" />
      {/* Bottom-Left */}
      <circle cx="24" cy="76" r="7.5" fill="url(#sphereGrad)" stroke="#A7F3D0" strokeWidth="0.5" />

      {/* Central Core Sphere */}
      <circle cx="50" cy="50" r="5" fill="url(#sphereGrad)" />
      <circle cx="50" cy="50" r="2" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
};

export default NexusLogoMark;
