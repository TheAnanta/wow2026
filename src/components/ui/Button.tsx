// src/components/ui/Button.tsx
import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'pill';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'secondary', children, className, ...props }) => {
  const baseClass = `${styles.btn} ${styles[variant] || ''} ${className || ''}`;

  return (
    <button className={baseClass.trim()} {...props}>
      {children}
    </button>
  );
};
