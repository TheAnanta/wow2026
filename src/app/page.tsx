// src/app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/sections/Header';
import { Hero } from '../components/sections/Hero';
import { CountdownSection } from '../components/sections/CountdownSection';
import { CTACards } from '../components/sections/CTACards';
import { KeynotesSection } from '../components/sections/KeynotesSection';
import { StackCardsSection } from '../components/sections/StackCardsSection';
import { Footer } from '../components/sections/Footer';
import { RegistrationWizard } from '../components/registration/RegistrationWizard';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [showRegistration, setShowRegistration] = useState(false);
  const { isUnregistered, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn && isUnregistered) {
      setShowRegistration(true);
    }
  }, [isLoggedIn, isUnregistered]);

  return (
    <div className="w-full min-h-screen bg-white text-grey-900 overflow-x-hidden">
      <Header onRegisterClick={() => setShowRegistration(true)} />

      <main>
        <Hero onRegisterClick={() => setShowRegistration(true)} />

        <div className="page-wrapper flex flex-col">
          <CountdownSection />
          <CTACards />
        </div>

        <KeynotesSection />
        <StackCardsSection />
      </main>

      <Footer />

      {showRegistration && (
        <RegistrationWizard onClose={() => setShowRegistration(false)} />
      )}
    </div>
  );
}
