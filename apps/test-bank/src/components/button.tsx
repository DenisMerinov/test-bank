import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1 whitespace-nowrap leading-none transition-colors disabled:pointer-events-none disabled:opacity-40 font-bold shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-brand text-bg-primary hover:bg-brand/80',
        outline: 'border border-brand text-brand',
      },
      size: {
        md: 'h-[36px] px-3 text-xs',
        lg: 'h-[40px] px-4',
        xl: 'h-[56px] px-6 text-lg',
      },
      rounded: {
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '50': 'rounded-[50px]',
        full: 'rounded-full',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary',
      rounded: 'md',
      fullWidth: false,
    },
  }
);

type HTMLAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;

export interface ButtonProps
  extends HTMLAttributes,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className, rounded }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
