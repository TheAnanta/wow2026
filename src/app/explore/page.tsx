// src/app/explore/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import styles from '../../styles/explore.module.css';
import { Header } from '../../components/sections/Header';
import { Footer } from '../../components/sections/Footer';
import { RegistrationWizard } from '../../components/registration/RegistrationWizard';
import { BentoCard } from '../../components/sections/BentoCard';
import { SessionCard } from '../../components/dashboard/SessionCard';
import { FilterSidebar } from '../../components/dashboard/FilterSidebar';
import { fetchSessions } from '../../services/stubs';

export default function ExplorePage() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'saved' | 'recommended'>('recommended');

  useEffect(() => {
    const loadSessions = async () => {
      setLoading(true);
      const data = await fetchSessions({});
      setSessions(data);
      setLoading(false);
    };
    loadSessions();
  }, []);

  return (
    <div className={styles.main}>
      {showBanner && (
        <div className={styles.banner}>
          <span>All content will be available May 14 at 8 AM PT.</span>
          <button className={styles.bannerClose} onClick={() => setShowBanner(false)}>&times;</button>
        </div>
      )}

      <Header onRegisterClick={() => setShowRegistration(true)} />

      {/* Plan your I/O Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Plan your I/O</h1>
          <p className={styles.subtitle}>
            Save keynotes, technical sessions, and learning experiences so you don't miss a thing.
          </p>
          <button 
            style={{ 
              background: '#1a73e8', 
              color: '#fff', 
              border: 'none', 
              padding: '0.75rem 2rem', 
              borderRadius: '9999px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
            onClick={() => console.log('See all content')}
          >
            See all content
          </button>
        </div>
        
        <div className={styles.heroGraphic}>
          <div className={styles.floorGrid}></div>
          <div className={styles.monitorWrapper}>
            <div className={styles.monitorContent}></div>
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#000000',
              zIndex: 10
            }}>OOO</div>
          </div>
        </div>
      </section>

      {/* Featured Categories (Bento) */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>What are you building for?</h2>
          <a href="/speakers" className={styles.sectionLink}>Meet the I/O speakers</a>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {[
            { title: 'Mobile', desc: 'Develop for a range of audiences and form factors.' },
            { title: 'Web', desc: 'Create fast, secure sites and apps for the open web.' },
            { title: 'ML/AI', desc: 'Access cutting edge AI models and open source tools for machine learning.' },
            { title: 'Cloud', desc: 'Simplify and scale end-to-end development.' },
          ].map((cat, i) => (
            <BentoCard key={i} title={cat.title} description={cat.desc} />
          ))}
        </div>
      </section>

      {/* My I/O Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle} style={{ marginBottom: '1rem' }}>My I/O</h2>
        <p style={{ fontSize: '0.875rem', color: '#5f6368', marginBottom: '2.5rem' }}>
          Your saved content are automatically saved in your <a href="#" style={{ textDecoration: 'underline', color: 'inherit' }}>developer profile.</a>
        </p>

        {/* Dashboard Widget */}
        <div className={styles.myIOWidget}>
          <div className={styles.widgetHeader}>
            <div 
              className={`${styles.widgetTab} ${activeTab === 'saved' ? styles.widgetTabActive : ''}`}
              onClick={() => setActiveTab('saved')}
            >
              <span style={{ fontSize: '1.5rem' }}>📘</span>
              <span>Saved content</span>
            </div>
            <div 
              className={`${styles.widgetTab} ${activeTab === 'recommended' ? styles.widgetTabActive : ''}`}
              onClick={() => setActiveTab('recommended')}
            >
              <span style={{ fontSize: '1.5rem' }}>🎯</span>
              <span>Recommended for you</span>
              <span style={{ marginLeft: 'auto', fontSize: '0.75rem', fontWeight: 500, opacity: 0.6 }}>Hide ▲</span>
            </div>
          </div>
          <div className={styles.widgetContent}>
            {loading ? (
              <p>Loading sessions...</p>
            ) : (
              sessions.slice(0, 3).map(session => (
                <div key={session.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #E0E0E0' }}>
                  <div style={{ fontWeight: 600 }}>{session.title}</div>
                  <div style={{ fontSize: '1.25rem' }}>🔖</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Dashboard Layout */}
        <div className={styles.dashboard}>
          <div className={styles.sidebarWrapper}>
            <FilterSidebar />
          </div>
          
          <div className={styles.mainContent}>
            <div className={styles.sessionGrid}>
              {loading ? (
                <p>Loading grid...</p>
              ) : (
                sessions.map(session => (
                    <SessionCard 
                      key={session.id} 
                      id={session.id} 
                      title={session.title} 
                      time={session.time} 
                      tags={session.tags}
                      bookmarkedInitial={session.bookmarked}
                    />
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile FAB */}
      <button className={styles.filterFab} onClick={() => console.log('Open mobile filters')}>
        Filter
      </button>

      <Footer />

      {showRegistration && (
        <RegistrationWizard onClose={() => setShowRegistration(false)} />
      )}
    </div>
  );
}
