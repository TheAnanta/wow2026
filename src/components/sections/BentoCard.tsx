// src/components/sections/BentoCard.tsx
import React from 'react';
import styles from './BentoCard.module.css';
import { Button } from '../ui/Button';

interface BentoCardProps {
  title: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  title,
  description,
  buttonText,
  onButtonClick,
  className,
  style,
  children,
}) => {
  return (
    <div className={`${styles.card} ${className || ''}`} style={style}>
      <div>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
        {buttonText && (
          <div className={styles.action}>
            <Button onClick={onButtonClick}>{buttonText}</Button>
          </div>
        )}
      </div>
      {children && <div className={styles.graphic}>{children}</div>}
    </div>
  );
};
