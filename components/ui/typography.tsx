// components/ui/typography.tsx
import React from "react";

export function AccentText({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
    function cn(...classes: (string | undefined)[]): string {
        return classes.filter(Boolean).join(" ");
    }
  return (
    <h1 className={cn("normal-case text-subheading tracking-widest font-semibold bg-linear-to-r from-rose-500 to-red-500 text-transparent bg-clip-text", className)}>
      {children}
    </h1>
  );
}

export function SectionHeading({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
    function cn(...classes: (string | undefined)[]): string {
        return classes.filter(Boolean).join(" ");
    }
  return (
    <h1 className={cn("text-heading md:text-4xl font-bold text-text-light dark:text-text-dark leading-tight uppercase", className)}>
      {children}
    </h1>
  );
}
export function SubHeading({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
    function cn(...classes: (string | undefined)[]): string {
        return classes.filter(Boolean).join(" ");
    }
  return (
    <h2 className={cn("text-2xl md:text-3xl font-bold text-white leading-tight", className)}>
      {children}
    </h2>
  );
}
export function H2({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
    function cn(...classes: (string | undefined)[]): string {
        return classes.filter(Boolean).join(" ");
    }
  return (
    <h2 className={cn("text-3xl md:text-4xl font-bold text-white leading-tight", className)}>
      {children}
    </h2>
  );
}
export function HeroHeading({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
    function cn(...classes: (string | undefined)[]): string {
        return classes.filter(Boolean).join(" ");
    }
  return (
    <span className={cn("text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight", className)}>
      {children}
    </span>
  );
}

export function Paragraph({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
    function cn(...classes: (string | undefined)[]): string {
        return classes.filter(Boolean).join(" ");
    }
  return (
    <span className={cn("text-base md:text-lg text-text-light dark:text-text-dark leading-relaxed", className)}>
      {children}
    </span>
  );
}
