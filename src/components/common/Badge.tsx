import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'success';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantClass = 
    variant === 'accent' ? 'frosted-badge-accent' :
    variant === 'success' ? 'frosted-badge-success' :
    'frosted-badge';

  return (
    <span className={`${variantClass} ${className}`}>
      {children}
    </span>
  );
}
