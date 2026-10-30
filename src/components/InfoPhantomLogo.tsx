import React from 'react';

interface InfoPhantomLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showGlow?: boolean;
  className?: string;
}

export function InfoPhantomLogo({
  size = 'md',
  showGlow = true,
  className = '',
}: InfoPhantomLogoProps) {
  const pixelSizes = {
    sm: 28,
    md: 40,
    lg: 52,
    xl: 68,
  };

  const dim = pixelSizes[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: dim, height: dim }}
    >
      {/* Outer subtle radar glow effect */}
      {showGlow && (
        <span
          className="absolute inset-0 rounded-xl bg-gradient-to-tr from-cyan-500/25 via-sky-500/15 to-indigo-500/20 blur-md pointer-events-none animate-pulse"
          style={{ transform: 'scale(1.2)' }}
        />
      )}

      {/* Unique InfoPhantom Vector Icon */}
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        <defs>
          {/* Main gradient for phantom frame */}
          <linearGradient id="ipFrameGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>

          {/* Core lens gradient */}
          <linearGradient id="ipCoreGrad" x1="16" y1="16" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>

          {/* Background shield fill */}
          <linearGradient id="ipBgGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#030712" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="ipGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Shield Frame (Phantom Hexagon/Diamond with rounded bevels) */}
        <rect
          x="3"
          y="3"
          width="42"
          height="42"
          rx="12"
          fill="url(#ipBgGrad)"
          stroke="url(#ipFrameGrad)"
          strokeWidth="1.75"
        />

        {/* Scattered Source Nodes (Points of evidence across the network) */}
        {/* Node 1: Top-Left Source */}
        <circle cx="13" cy="14" r="2.2" fill="#00F0FF" />
        <circle cx="13" cy="14" r="4.5" stroke="#00F0FF" strokeWidth="0.75" strokeOpacity="0.4" />

        {/* Node 2: Top-Right Source */}
        <circle cx="35" cy="13" r="2.2" fill="#38BDF8" />
        <circle cx="35" cy="13" r="4.5" stroke="#38BDF8" strokeWidth="0.75" strokeOpacity="0.4" />

        {/* Node 3: Bottom-Left Source */}
        <circle cx="13" cy="34" r="2" fill="#818CF8" />

        {/* Node 4: Bottom-Right Source */}
        <circle cx="35" cy="34" r="2.2" fill="#00F0FF" />

        {/* Hidden Connection Vectors (Lines connecting scattered sources to the center) */}
        <line x1="13" y1="14" x2="24" y2="24" stroke="#00F0FF" strokeWidth="1.2" strokeDasharray="2 2" strokeOpacity="0.7" />
        <line x1="35" y1="13" x2="24" y2="24" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="2 2" strokeOpacity="0.7" />
        <line x1="13" y1="34" x2="24" y2="24" stroke="#818CF8" strokeWidth="1.2" strokeDasharray="2 2" strokeOpacity="0.7" />
        <line x1="35" y1="34" x2="24" y2="24" stroke="#00F0FF" strokeWidth="1.2" strokeDasharray="2 2" strokeOpacity="0.7" />

        {/* Central Phantom Aperture / Revealing Eye (The discovery focal point) */}
        {/* Outer revelation pulse ring */}
        <circle cx="24" cy="24" r="8.5" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.5" />
        
        {/* Uncovering Iris Diamond */}
        <polygon
          points="24,17.5 30.5,24 24,30.5 17.5,24"
          fill="#080E1C"
          stroke="url(#ipCoreGrad)"
          strokeWidth="1.5"
        />

        {/* Hidden Evidence Core Star (Glowing revelation spark) */}
        <circle cx="24" cy="24" r="2.75" fill="#00F0FF" filter="url(#ipGlow)" />
        <circle cx="24" cy="24" r="1.5" fill="#FFFFFF" />

        {/* Forensic Scan Marks (Top/Bottom corner indicators) */}
        <path d="M7 11V7H11" stroke="#00F0FF" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M41 11V7H37" stroke="#00F0FF" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M7 37V41H11" stroke="#6366F1" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M41 37V41H37" stroke="#6366F1" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
