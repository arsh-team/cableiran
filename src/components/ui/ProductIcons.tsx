'use client';

interface IconProps {
  className?: string;
  size?: number;
}

const defaultSize = 48;

export function FiberOpticIcon({ className, size = defaultSize }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="20" stroke="#0D9488" strokeWidth="1.5" opacity="0.25" />
      <circle cx="24" cy="24" r="15" stroke="#0D9488" strokeWidth="1.5" opacity="0.4" />
      <circle cx="24" cy="24" r="10" stroke="#0D9488" strokeWidth="1.5" opacity="0.6" />
      <circle cx="24" cy="24" r="5" fill="#0D9488" opacity="0.85" />
      <circle cx="24" cy="24" r="12" stroke="#0D9488" strokeWidth="0.5" opacity="0.2">
        <animate attributeName="r" from="5" to="20" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function PowerIcon({ className, size = defaultSize }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M28 4L12 26H22L18 44L36 20H26L28 4Z" stroke="#0D9488" strokeWidth="2" fill="#0D9488" fillOpacity="0.12" strokeLinejoin="round" />
    </svg>
  );
}

export function OverheadIcon({ className, size = defaultSize }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M24 4V12" stroke="#0D9488" strokeWidth="2" />
      <path d="M16 12L24 4L32 12" stroke="#0D9488" strokeWidth="2" strokeLinejoin="round" fill="none" />
      <path d="M18 12L14 44" stroke="#0D9488" strokeWidth="1.5" />
      <path d="M30 12L34 44" stroke="#0D9488" strokeWidth="1.5" />
      <path d="M20 24H28" stroke="#0D9488" strokeWidth="1.5" />
      <path d="M19 30H29" stroke="#0D9488" strokeWidth="1.5" />
      <path d="M4 12H16" stroke="#0D9488" strokeWidth="1" opacity="0.5" />
      <path d="M32 12H44" stroke="#0D9488" strokeWidth="1" opacity="0.5" />
      <path d="M2 9H14" stroke="#0D9488" strokeWidth="1" opacity="0.3" />
      <path d="M34 9H46" stroke="#0D9488" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

export function RigidIcon({ className, size = defaultSize }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="6" y="18" width="36" height="12" rx="3" stroke="#0D9488" strokeWidth="2" fill="#0D9488" fillOpacity="0.12" />
      <path d="M12 24H36" stroke="#0D9488" strokeWidth="1" opacity="0.4" />
      <circle cx="12" cy="24" r="2" fill="#0D9488" opacity="0.6" />
      <circle cx="24" cy="24" r="2" fill="#0D9488" opacity="0.6" />
      <circle cx="36" cy="24" r="2" fill="#0D9488" opacity="0.6" />
    </svg>
  );
}

export function NetworkIcon({ className, size = defaultSize }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="12" y="8" width="24" height="28" rx="3" stroke="#0D9488" strokeWidth="2" fill="#0D9488" fillOpacity="0.08" />
      <line x1="16" y1="12" x2="16" y2="22" stroke="#0D9488" strokeWidth="1.5" opacity="0.6" />
      <line x1="20" y1="12" x2="20" y2="22" stroke="#0D9488" strokeWidth="1.5" opacity="0.6" />
      <line x1="24" y1="12" x2="24" y2="22" stroke="#0D9488" strokeWidth="1.5" opacity="0.6" />
      <line x1="28" y1="12" x2="28" y2="22" stroke="#0D9488" strokeWidth="1.5" opacity="0.6" />
      <line x1="32" y1="12" x2="32" y2="22" stroke="#0D9488" strokeWidth="1.5" opacity="0.6" />
      <path d="M18 36L24 44L30 36" stroke="#0D9488" strokeWidth="2" fill="none" />
    </svg>
  );
}

export function MicroFiberIcon({ className, size = defaultSize }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="16" stroke="#0D9488" strokeWidth="1.5" opacity="0.3" />
      <circle cx="24" cy="24" r="10" stroke="#0D9488" strokeWidth="1.5" opacity="0.5" />
      <circle cx="24" cy="24" r="4" fill="#0D9488" opacity="0.75" />
      <path d="M10 10L38 38" stroke="#0D9488" strokeWidth="0.5" opacity="0.15" />
      <path d="M38 10L10 38" stroke="#0D9488" strokeWidth="0.5" opacity="0.15" />
    </svg>
  );
}

export function DropCableIcon({ className, size = defaultSize }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M8 8C8 8 20 24 24 24C28 24 40 8 40 8" stroke="#0D9488" strokeWidth="2" fill="none" />
      <path d="M8 40C8 40 20 24 24 24C28 24 40 40 40 40" stroke="#0D9488" strokeWidth="2" fill="none" />
      <circle cx="24" cy="24" r="4" fill="#0D9488" opacity="0.55" />
      <path d="M24 28V44" stroke="#0D9488" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
    </svg>
  );
}

export function MicroductIcon({ className, size = defaultSize }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="8" y="12" width="32" height="24" rx="12" stroke="#0D9488" strokeWidth="2" fill="#0D9488" fillOpacity="0.08" />
      <circle cx="18" cy="24" r="5" stroke="#0D9488" strokeWidth="1" opacity="0.4" />
      <circle cx="30" cy="24" r="5" stroke="#0D9488" strokeWidth="1" opacity="0.4" />
      <line x1="16" y1="24" x2="20" y2="24" stroke="#0D9488" strokeWidth="1" opacity="0.6" />
      <line x1="28" y1="24" x2="32" y2="24" stroke="#0D9488" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

export function getProductIcon(iconType: string, size?: number) {
  const props = { size };
  switch (iconType) {
    case 'fiber':
      return <FiberOpticIcon {...props} />;
    case 'power':
      return <PowerIcon {...props} />;
    case 'overhead':
      return <OverheadIcon {...props} />;
    case 'rigid':
      return <RigidIcon {...props} />;
    case 'network':
      return <NetworkIcon {...props} />;
    case 'micro':
      return <MicroFiberIcon {...props} />;
    case 'drop':
      return <DropCableIcon {...props} />;
    case 'duct':
      return <MicroductIcon {...props} />;
    default:
      return <FiberOpticIcon {...props} />;
  }
}
