import React from 'react';

export const CyberSigilMark: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-violet-500/60"
    />
    <path
      d="M50 15 L80 30 L80 70 L50 85 L20 70 L20 30 Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="4 2"
      className="text-cyan-400/80"
    />
    <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="2" className="text-fuchsia-500" />
    <path d="M50 20 L50 80 M20 50 L80 50" stroke="currentColor" strokeWidth="1.5" className="text-violet-400/50" />
    <circle cx="50" cy="50" r="4" fill="currentColor" className="text-cyan-300" />
  </svg>
);
