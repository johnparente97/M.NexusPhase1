import React from 'react';
import { cn } from '../../utils/cn';

interface NexusLogoMarkProps {
  className?: string;
  size?: number;
  alt?: string;
}

export function NexusLogoMark({ className, size = 32, alt = "Nexus Logo" }: NexusLogoMarkProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn("flex-shrink-0", className)}
      aria-label={alt}
      role="img"
    >
      <defs>
        <linearGradient id="nx-grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        <linearGradient id="nx-grad-accent" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      
      {/* Outer Orbital */}
      <circle cx="24" cy="24" r="20" stroke="url(#nx-grad-primary)" strokeWidth="3" opacity="0.3" strokeDasharray="8 4" />
      
      {/* Inner Convergence Paths */}
      <path d="M 14 24 C 14 14, 34 14, 34 24 C 34 34, 14 34, 14 24" stroke="url(#nx-grad-primary)" strokeWidth="3" fill="none" />
      <path d="M 24 14 C 34 14, 34 34, 24 34 C 14 34, 14 14, 24 14" stroke="url(#nx-grad-accent)" strokeWidth="3" fill="none" />
      
      {/* Nodes */}
      <circle cx="24" cy="14" r="3" fill="#8B5CF6" />
      <circle cx="24" cy="34" r="3" fill="#06B6D4" />
      <circle cx="14" cy="24" r="3" fill="#06B6D4" />
      <circle cx="34" cy="24" r="3" fill="#8B5CF6" />
      
      {/* Core */}
      <circle cx="24" cy="24" r="4" fill="url(#nx-grad-accent)" />
    </svg>
  );
}
