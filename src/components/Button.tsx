import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { LoaderCircle } from 'lucide-react';

export type ButtonVariant = 'primary' | 'gold' | 'outline' | 'ghost' | 'soft';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-gradient-verde text-creme shadow-card hover:shadow-float active:shadow-soft",
  gold: "bg-gradient-gold text-verde-900 shadow-gold hover:brightness-105 font-semibold",
  outline: "border border-verde-700/30 text-verde-700 bg-white/60 hover:bg-white active:bg-creme-200",
  ghost: "text-verde-700 hover:bg-verde-700/5 active:bg-verde-700/10",
  soft: "bg-verde-700/8 text-verde-700 hover:bg-verde-700/12"
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm rounded-xl",
  md: "h-12 px-5 text-[15px] rounded-2xl",
  lg: "h-14 px-6 text-base rounded-2xl"
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  loading,
  fullWidth,
  className = '',
  children,
  disabled,
  ...props
}, ref) => {
  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-sans font-medium transition-all duration-200 select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";
