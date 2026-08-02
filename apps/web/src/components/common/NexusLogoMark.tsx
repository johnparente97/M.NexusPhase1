import React from 'react';
import { cn } from '../../utils/cn';

export interface NexusLogoMarkProps {
  className?: string;
  size?: number | string;
  alt?: string;
  glow?: boolean;
}

export const NexusLogoMark: React.FC<NexusLogoMarkProps> = ({
  className,
  size = 28,
  glow = true,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0 transition-transform duration-300 hover:scale-105", className)}
    >
      <defs>
        {/* Prismatic Cyber Sigil Gradients */}
        <linearGradient id="sigil-cyan-violet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F5D4" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#FF007F" />
        </linearGradient>

        <linearGradient id="sigil-magenta-gold" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF007F" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#00F5D4" />
        </linearGradient>

        <radialGradient id="sigil-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A855F7" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#00F5D4" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FF007F" stopOpacity="0" />
        </radialGradient>

        {/* Glow Filter */}
        {glow && (
          <filter id="sigil-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        )}
      </defs>

      {/* Ambient Core Aura */}
      <circle cx="50" cy="50" r="42" fill="url(#sigil-core-glow)" opacity="0.6" />

      {/* Cyber Sigil Outer Mecha Ring */}
      <polygon
        points="50,4 96,50 50,96 4,50"
        stroke="url(#sigil-cyan-violet)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
        filter={glow ? "url(#sigil-glow)" : undefined}
      />

      {/* Inner Cyber-Sigil Inverted Rhombus */}
      <polygon
        points="50,16 84,50 50,84 16,50"
        stroke="url(#sigil-magenta-gold)"
        strokeWidth="1.5"
        strokeDasharray="4 2 2 2"
        fill="none"
        opacity="0.85"
      />

      {/* Central Cybernetic Convergence Facets (Mecha Core) */}
      <polygon points="50,28 72,50 50,72 28,50" fill="url(#sigil-cyan-violet)" opacity="0.9" />

      {/* Crosshair Laser Lines & Sigil Spikes */}
      <line x1="50" y1="0" x2="50" y2="18" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="82" x2="50" y2="100" stroke="#FF007F" strokeWidth="2" strokeLinecap="round" />
      <line x1="0" y1="50" x2="18" y2="50" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
      <line x1="82" y1="50" x2="100" y2="50" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />

      {/* Mecha Orbital Convergence Nodes */}
      <circle cx="50" cy="50" r="6" fill="#FFFFFF" />
      <circle cx="50" cy="50" r="3" fill="#00F5D4" />
      
      <circle cx="50" cy="16" r="2.5" fill="#00F5D4" />
      <circle cx="50" cy="84" r="2.5" fill="#FF007F" />
      <circle cx="16" cy="50" r="2.5" fill="#A855F7" />
      <circle cx="84" cy="50" r="2.5" fill="#FFD700" />
    </svg>
  );
};
