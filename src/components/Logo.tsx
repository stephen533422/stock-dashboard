interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 24, className }: Readonly<LogoProps>) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 34 18 22 26 28 42 10" />
      <polyline points="33 10 42 10 42 19" />
    </svg>
  );
}
