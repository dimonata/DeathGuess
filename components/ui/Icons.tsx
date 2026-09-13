import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function SkullMark(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path
        d="M24 4C13.5 4 5 12.1 5 22c0 6.2 3.4 11.6 8.5 14.8V43h6v-4h3v4h4v-4h3v4h6v-6.2A17.8 17.8 0 0 0 43 22C43 12.1 34.5 4 24 4Z"
        fill="currentColor"
      />
      <circle cx="17.5" cy="22.5" r="4" fill="var(--ink, #0a0b0d)" />
      <circle cx="30.5" cy="22.5" r="4" fill="var(--ink, #0a0b0d)" />
      <path d="m24 27-3.3 5h6.6L24 27Z" fill="var(--ink, #0a0b0d)" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function MapPin(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function ExternalLink(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M14 5h5v5M19 5l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="18" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function RotateCcw(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 4v6h6M5.5 15a7 7 0 1 0 1-8.5L4 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Spark(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 2c.7 6.3 3.7 9.3 10 10-6.3.7-9.3 3.7-10 10-.7-6.3-3.7-9.3-10-10 6.3-.7 9.3-3.7 10-10Z" fill="currentColor" />
    </svg>
  );
}
