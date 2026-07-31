import React from 'react';

export interface NexusLogoMarkProps {
  className?: string;
  size?: number | string;
  alt?: string;
}

/**
 * NexusLogoMark — Official Meridian Protocol Pinwheel Logo Mark
 * Renders the exact pixel-perfect logo image asset (logo-symbol.png).
 * DO NOT ALTER ART.
 */
export const NexusLogoMark: React.FC<NexusLogoMarkProps> = ({
  className = 'h-8 w-8',
  size,
  alt = 'Nexus Logo',
}) => {
  const style = size ? { width: size, height: size } : undefined;
  const baseUrl = import.meta.env.BASE_URL || '/';
  const logoSrc = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}logo-symbol.png`;

  return (
    <img
      src={logoSrc}
      alt={alt}
      className={`object-contain select-none ${className}`}
      style={style}
    />
  );
};
