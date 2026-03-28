// src/context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { auth } from '../services/firebase';
import { fetchCurrentUser } from '../services/registrationStubs';
import { User } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  profile: any | null;
  isLoggedIn: boolean;
  isUnregistered: boolean;
  isLoading: boolean;
  error: any | null;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isUnregistered, setIsUnregistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      const result = await fetchCurrentUser();
      if (result === null) {
        setIsUnregistered(true);
        setProfile(null);
      } else if (result && !result.isError) {
        setIsUnregistered(false);
        setProfile(result);
      } else {
        // Server error, keep it optimistic but not unregistered
        setIsUnregistered(false);
        setError(result);
      }
    } catch (err) {
      console.error('AuthProvider Profile Fetch Error:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchProfile();
      } else {
        setProfile(null);
        setIsUnregistered(false);
        setIsLoading(false);
      }
    });

    const handleRegisterSuccess = async () => {
      await fetchProfile();
    };

    window.addEventListener('registrationSuccess', handleRegisterSuccess);

    return () => {
      unsubscribe();
      window.removeEventListener('registrationSuccess', handleRegisterSuccess);
    };
  }, [fetchProfile]);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        profile, 
        isLoggedIn: !!user, 
        isUnregistered, 
        isLoading, 
        error, 
        refreshProfile: fetchProfile 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
