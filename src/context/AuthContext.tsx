// src/context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { auth } from '../services/firebase';
import { fetchCurrentUser, fetchMyTickets, patchFCMToken } from '../services/registrationStubs';
import { requestFirebaseToken } from '../services/fcm';
import { User } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  profile: any | null;
  tickets: any[];
  isLoggedIn: boolean;
  isUnregistered: boolean;
  isLoading: boolean;
  error: any | null;
  refreshProfile: () => Promise<void>;
  refreshTickets: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [isUnregistered, setIsUnregistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  const fetchTickets = useCallback(async () => {
    const userTickets = await fetchMyTickets();
    setTickets(userTickets);
  }, []);

  const fetchProfile = useCallback(async () => {
    try {
      const result = await fetchCurrentUser();
      if (result === null) {
        setIsUnregistered(true);
        setProfile(null);
      } else if (result && !result.isError) {
        setIsUnregistered(false);
        setProfile(result);
        await fetchTickets();
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
  }, [fetchTickets]);

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

  // Sync FCM Token
  useEffect(() => {
    const syncFCMToken = async () => {
      if (user && profile && !isUnregistered && !isLoading) {
        // Only try to get token if user is registered and profile is loaded
        const token = await requestFirebaseToken();
        if (token) {
          console.log('Syncing FCM Token...');
          await patchFCMToken(token, 'ADD');
        }
      }
    };
    syncFCMToken();
  }, [user, profile, isUnregistered, isLoading]);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        profile, 
        tickets,
        isLoggedIn: !!user, 
        isUnregistered, 
        isLoading, 
        error, 
        refreshProfile: fetchProfile,
        refreshTickets: fetchTickets      }}
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
