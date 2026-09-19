import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline-light";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-petrol-500 text-white hover:bg-petrol-600 active:bg-petrol-600 focus-visible:outline-petrol-300",
  secondary: "bg-white text-navy-900 border border-slate-300 hover:border-navy-900 active:bg-slate-50",
  ghost: "bg-transparent text-navy-900 hover:bg-slate-100 active:bg-slate-200",
  "outline-light": "bg-transparent text-white border border-white/35 hover:border-white/70 hover:bg-white/5 active:bg-white/10",
};

const sizeClasses: Record<Size, string> = {
  md: "px-4 py-2 text-[13px]",
  lg: "px-5 py-2.5 text-sm",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-tight transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none";

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variantClasses[variant], sizeClasses[size], className)} {...rest}>
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: ButtonProps & { href: string }) {
  const isExternal = href.startsWith("http");
  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
    >
      {children}
    </Link>
  );
}
