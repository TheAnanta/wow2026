// src/components/ui/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'pill';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'secondary', children, className, ...props }) => {
  const base = 'inline-flex items-center justify-center py-3 px-6 rounded-full font-medium text-base cursor-pointer transition-all duration-200 border border-[#000000] bg-white text-[#202124] hover:bg-[#f1f3f4]';
  const primary = 'bg-[#202124] text-white hover:opacity-90';
  const pill = 'py-2 px-4 text-sm rounded-full';

  let variantClass = '';
  if (variant === 'primary') variantClass = primary;
  else if (variant === 'pill') variantClass = pill;

  return (
    <button className={`${base} ${variantClass} ${className || ''}`.trim()} {...props}>
      {children}
    </button>
  );
};
