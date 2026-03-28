// src/components/sections/Header.tsx
'use client';

import React from 'react';
import styles from './Header.module.css';
import { Button } from '../ui/Button';
import { signInWithGoogle } from '../../services/firebase';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onRegisterClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onRegisterClick }) => {
  const { user, profile, isLoggedIn, isUnregistered } = useAuth();

  const handleAction = () => {
    if (isLoggedIn && (isUnregistered || !profile)) {
      onRegisterClick();
    } else if (!isLoggedIn) {
      signInWithGoogle().catch(console.error);
    }
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
        {isLoggedIn && (profile || !isUnregistered) ? (
          <div className={styles.profileContainer}>
            <img 
              src={profile?.profile_url || user?.photoURL || ''} 
              alt="Profile" 
              className={styles.profilePic} 
            />
          </div>
        ) : (
          <Button variant="pill" onClick={handleAction}>
            {isLoggedIn ? 'Register' : 'Sign in'}
          </Button>
        )}
      </div>
    </header>
  );
};
