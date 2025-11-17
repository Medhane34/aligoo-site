import React from 'react';
import { cn } from '@/utils/cn';

export interface BadgeTextProps {
  /** Text content of the badge */
  children: React.ReactNode;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant (for non-gradient badges) */
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /** Gradient variant */
  gradient?: 'none' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'custom';
  /** Custom gradient definition (used when gradient="custom") */
  customGradient?: string;
  /** Border radius */
  rounded?: 'sm' | 'md' | 'lg' | 'full' | 'lg';
  /** Whether to show outline version */
  variant?: 'solid' | 'outline' | 'ghost';
  /** Additional CSS class */
  className?: string;
  /** Icon to display alongside text (optional) */
  icon?: React.ReactNode;
  /** Animation type */
  animate?: 'pulse' | 'bounce' | 'none';
}

const BadgeText: React.FC<BadgeTextProps> = ({
  children,
  size = 'md',
  color = 'default',
  gradient = 'none',
  customGradient,
  rounded = 'md',
  variant = 'solid',
  className = '',
  icon,
  animate = 'none',
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  // Rounded classes
  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  // Color classes (for non-gradient badges)
  const colorClasses = {
    default: {
      solid: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
      outline: 'border border-gray-300 text-gray-800 dark:border-gray-600 dark:text-gray-100',
      ghost: 'text-gray-800 dark:text-gray-100',
    },
    primary: {
      solid: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
      outline: 'border border-blue-300 text-blue-800 dark:border-blue-600 dark:text-blue-100',
      ghost: 'text-blue-800 dark:text-blue-100',
    },
    secondary: {
      solid: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
      outline: 'border border-purple-300 text-purple-800 dark:border-purple-600 dark:text-purple-100',
      ghost: 'text-purple-800 dark:text-purple-100',
    },
    success: {
      solid: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
      outline: 'border border-green-300 text-green-800 dark:border-green-600 dark:text-green-100',
      ghost: 'text-green-800 dark:text-green-100',
    },
    warning: {
      solid: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
      outline: 'border border-yellow-300 text-yellow-800 dark:border-yellow-600 dark:text-yellow-100',
      ghost: 'text-yellow-800 dark:text-yellow-100',
    },
    error: {
      solid: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
      outline: 'border border-red-300 text-red-800 dark:border-red-600 dark:text-red-100',
      ghost: 'text-red-800 dark:text-red-100',
    },
  };

  // Gradient classes
  const gradientClasses = {
    primary: 'bg-gradient-badge-primary text-white',
    secondary: 'bg-gradient-badge-secondary text-white',
    success: 'bg-gradient-badge-success text-white',
    warning: 'bg-gradient-badge-warning text-white',
    error: 'bg-gradient-badge-error text-white',
    custom: '',
    none: '',
  };

  // Animation classes
  const animationClasses = {
    pulse: 'animate-badge-pulse',
    bounce: 'animate-badge-bounce',
    none: '',
  };

  // Check if we're using a gradient
  const isGradient = gradient !== 'none';

  const badgeClasses = cn(
    'inline-flex items-center justify-center font-medium whitespace-nowrap',
    sizeClasses[size],
    roundedClasses[rounded],
    animationClasses[animate],
    {
      // Apply gradient classes if using gradient
      [gradientClasses[gradient]]: isGradient,
      // Apply color classes if not using gradient
      [colorClasses[color][variant]]: !isGradient,
      // For outline variant with gradient, we need to handle borders
      'border border-transparent': isGradient && variant === 'outline',
      // For ghost variant with gradient, we need to remove background but keep text
      'bg-none': isGradient && variant === 'ghost',
    },
    className
  );

  // Custom gradient style
  const customStyle = gradient === 'custom' && customGradient 
    ? { backgroundImage: customGradient } 
    : {};

  return (
    <span 
      className={badgeClasses}
      style={customStyle}
      {...props}
    >
      {icon && (
        <span className="mr-1.5 flex items-center">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
};

export default BadgeText;