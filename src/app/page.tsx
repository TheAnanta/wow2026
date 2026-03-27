'use client';

import React, { useState } from 'react';
import styles from '../styles/home.module.css';
import { Header } from '../components/sections/Header';
import { Hero } from '../components/sections/Hero';
import { BentoCard } from '../components/sections/BentoCard';
import { Footer } from '../components/sections/Footer';
import { RegistrationOverlay } from '../components/sections/RegistrationOverlay';
import { handleSaveToMyIO } from '../services/stubs';

export default function Home() {
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <div className={styles.main}>
      <Header onRegisterClick={() => setShowRegistration(true)} />
      
      <div className={styles.perspectiveGridWrapper}>
        <div className={styles.perspectiveBg}></div>
        <Hero onRegisterClick={() => setShowRegistration(true)} />
      </div>

      <main className={styles.contentContainer}>
        {/* Top Bento Grid Row */}
        <div className={styles.bentoGrid}>
          <BentoCard 
            title="Join a community group" 
            description="Meet developers, discover local groups, and build your global network."
            buttonText="Get started"
            onButtonClick={() => console.log('Get started community group')}
            className="grid-col-span-8"
            style={{ gridColumn: 'span 8' }}
          >
            <div style={{ width: '120px', height: '120px', borderTopLeftRadius: '100%', background: 'var(--primary-gradient)', border: '1px solid var(--color-border)' }}></div>
          </BentoCard>

          <BentoCard 
            title="Plan your I/O" 
            description="Notify I/O for saved content and recommendations based on your personal interests."
            buttonText="Get started"
            onButtonClick={() => handleSaveToMyIO('plan-io')}
            className="grid-col-span-4"
            style={{ gridColumn: 'span 4' }}
          >
            <div style={{ width: '80px', height: '80px', borderTopLeftRadius: '16px', background: 'linear-gradient(135deg, var(--color-blue), var(--color-red))' }}></div>
          </BentoCard>
        </div>

        {/* Second Bento Grid Row */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 500, margin: '3rem 0 1rem', color: 'var(--color-text)' }}>What are you building for?</h2>
        <div className={styles.bentoGrid} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <BentoCard title="Mobile" description="Develop for a range of audiences and form factors." style={{ height: '240px' }} />
          <BentoCard title="Web" description="Create fast, secure sites and apps for the open web." style={{ height: '240px' }} />
          <BentoCard title="ML/AI" description="Access cutting edge AI models and open source tools for machine learning." style={{ height: '240px' }} />
          <BentoCard title="Cloud" description="Simplify and scale end-to-end development." style={{ height: '240px' }} />
        </div>
      </main>

      <Footer />

      {showRegistration && (
        <RegistrationOverlay onClose={() => setShowRegistration(false)} />
      )}
    </div>
  );
}
