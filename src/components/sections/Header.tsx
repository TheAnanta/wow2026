// src/components/sections/Header.tsx
'use client';

import React from 'react';
import styles from './Header.module.css';
import { Button } from '../ui/Button';
import { auth, signInWithGoogle } from '../../services/firebase';

interface HeaderProps {
  onRegisterClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onRegisterClick }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    // Reactive Auth State Listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleAction = () => {
    onRegisterClick();
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Google <span>I/O</span></a>
      </div>
      <nav className={styles.nav}>
        <a href="/explore">Explore</a>
        <a href="/speakers">Speakers</a>
        <a href="/community">Community</a>
        <a href="#about">About</a>
      </nav>
      <div className={styles.actions}>
        <span style={{ fontSize: '0.875rem' }}>English</span>
        <Button variant="pill" onClick={handleAction}>
          {isLoggedIn ? 'Register' : 'Sign in'}
        </Button>
      </div>
    </header>
  );
};
