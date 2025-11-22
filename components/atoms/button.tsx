import React, { ButtonHTMLAttributes } from 'react';

// --- UTILITY: Class Name Merger ---
// Filters out falsey values and joins class strings, allowing for clean conditional classes.
function cn(...classes: (string | undefined)[]): string {
    return classes.filter(Boolean).join(" ");
}
// ------------------------------------


// --- TYPES & CONSTANTS ---

// The primary brand color constant set to the requested hex code.
// Used for CSS variable injection (GlowOutlineButton) and literal class generation (Standard Button).
const BRAND_COLOR = '#FF595E'; 

// 1. Variant Type: Defines the color/style of the button
type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'; 

// 2. Size Type: Defines the padding/scale of the button
type Size = 'sm' | 'md' | 'lg';

// 3. Props Interface: Inherits all standard button props and adds our custom ones
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    className?: string;
    loading?: boolean; // Optional: for showing a loading spinner
}

// 4. Style Maps: Centralized Tailwind classes for easy management
const baseClasses = 
    // HeroUI Standard Base Styles
    "inline-flex items-center justify-center font-medium rounded-full focus:outline-none focus:ring-4 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed relative whitespace-nowrap";

const variantClasses: Record<Variant, string> = {
    // --- PRIMARY (Brand Gradient Solid) ---
    // Using literal hex codes for Tailwind compilation
    primary: 
        `bg-gradient-to-r from-[#FF595E] to-[#FF595E]/80 ` + 
        `text-white shadow-lg shadow-[#FF595E]/25 ` + 
        `hover:shadow-[#FF595E]/40 focus:ring-[#FF595E]/40
         `,
    
    // --- SECONDARY (Outline/White Tint) ---
    secondary: 
        "bg-white/10 text-white border border-white/20 hover:bg-white/20 " +
        "focus:ring-white/20 shadow-none",
    
    // Ghost Button: Fully transparent
    ghost: 
        "bg-transparent text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 " +
        "focus:ring-gray-300 shadow-none border-none",
    
    // Danger Button: Solid red color for destructive actions
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300 shadow-md",
};

const sizeClasses: Record<Size, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
};

// ------------------------------------


// --- ATOMIC BUTTON COMPONENT (The Standard Solid Button) ---

/**
 * A highly flexible, atomic button component that handles size, variant, and disabled states.
 */
export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    ...rest
}) => {
    
    // Combine base styles, variant styles, size styles, and custom className overrides
    const classes = cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
    );

    // Determine content to display
    const buttonContent = loading ? (
        // For the loader, we use currentColor so it adapts to the text color of the button
        <svg 
            className={cn(
                "animate-spin h-5 w-5", 
                variant !== 'ghost' ? "text-white" : undefined // Ensure spinner is white on colored buttons
            )} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
        >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    ) : children;


    return (
        <button
            className={classes}
            disabled={disabled || loading} // Button is disabled if explicitly set OR if loading is true
            {...rest}
        >
            {buttonContent}
        </button>
    );
};

// ------------------------------------
// DEDICATED COMPLEX OUTLINE BUTTON COMPONENT (Glow Outline)
// ------------------------------------

// Custom Props for the Outline Button to handle the required icon slot
interface OutlineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
    size?: Size; // Reuse the size prop for padding consistency
    className?: string;
}

/**
 * Custom-styled outline button with internal gradient glow effects.
 */
export const GlowOutlineButton: React.FC<OutlineButtonProps> = ({
    children,
    size = 'md',
    className,
    icon,
    ...rest
}) => {
    // We reuse the size classes here for padding consistency
    const buttonSizeClasses = cn(
        size === 'sm' ? "px-4 py-2 text-sm" :
        size === 'md' ? "px-6 py-3 text-base" :
        size === 'lg' ? "px-8 py-4 text-lg" : ""
    );

    // The classes defining the unique visual style and hover effect
    const glowClasses =
        "group relative inline-flex items-center gap-2 rounded-full transition-all bg-black/50 text-white font-medium active:scale-[0.98] " +
        "border border-[var(--brand-color-border)] hover:border-[var(--brand-color-hover)] hover:bg-[var(--brand-color-bg-hover)] duration-300";

    // Set CSS variables using the unified BRAND_COLOR
    // This allows the GlowOutlineButton to use the brand color consistently via runtime style injection
    const style = {
        '--brand-color-border': BRAND_COLOR,
        '--brand-color-hover': BRAND_COLOR,
        '--brand-color-bg-hover': `${BRAND_COLOR}1A`, // Adding 1A for 10% opacity
    } as React.CSSProperties;

    // The structure needs two internal divs for the gradient borders/glows
    return (
        <button
            className={cn(glowClasses, buttonSizeClasses, className)}
            style={style}
            {...rest}
        >
            {/* Top Glow Divider: Uses hardcoded hex for guaranteed Tailwind class generation */}
            <div className={`absolute inset-x-0 -top-px mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-[#FF595E]/40 to-transparent`}></div>
            
            {/* Bottom Glow Divider: Uses hardcoded hex for guaranteed Tailwind class generation */}
            <div className={`absolute inset-x-0 -bottom-px mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-[#FF595E]/40 to-transparent`}></div>
            
            {/* Icon Slot - ensures the icon itself uses the brand color for color consistency */}
            {icon && React.cloneElement(icon as React.ReactElement, {
                className: cn((icon as React.ReactElement).props.className, `text-[${BRAND_COLOR}]`)
            })}
            
            {/* Content */}
            {children}
        </button>
    );
};


// ------------------------------------
// Optional: Export specific variant components as shortcuts (Molecules)
// ------------------------------------

export const PrimaryButton: React.FC<ButtonProps> = (props) => (
    <Button {...props} variant="primary" />
);

export const SecondaryButton: React.FC<ButtonProps> = (props) => (
    <Button {...props} variant="secondary" />
);

export const SimpleOutlineButton: React.FC<ButtonProps> = (props) => (
    <Button {...props} variant="danger" />
);

export const GhostButton: React.FC<ButtonProps> = (props) => (
    <Button {...props} variant="ghost" />
);