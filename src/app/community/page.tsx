'use client';

import React, { useState } from 'react';
import styles from '../../styles/community.module.css';
import { Header } from '../../components/sections/Header';
import { Footer } from '../../components/sections/Footer';
import { Button } from '../../components/ui/Button';
import { RegistrationWizard } from '../../components/registration/RegistrationWizard';
import { handleSearchCommunities } from '../../services/stubs';
import { BentoCard } from '../../components/sections/BentoCard';

export default function CommunityPage() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ id: string, name: string, type: string }[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      setIsSearching(true);
      const results = await handleSearchCommunities(query);
      setSearchResults(results);
      setIsSearching(false);
    } else {
      setSearchResults(null);
    }
  };

  return (
    <div className={styles.container}>
      <Header onRegisterClick={() => setShowRegistration(true)} />

      {/* Community Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Community</h1>
          <p className={styles.subtitle}>Meet developers, discover local groups, and build your global network.</p>
          <Button style={{ background: '#1a73e8', color: '#fff', border: 'none' }} onClick={() => setShowRegistration(true)}>
            Register for Google I/O
          </Button>
        </div>
        
        {/* Wireframe Sphere graphic */}
        <div className={styles.graphic}>
          <div className={styles.graphicQ1}></div>
          <div className={styles.graphicQ2}></div>
          <div className={styles.graphicQ3}></div>
          <div className={styles.graphicQ4}></div>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 10 }}>
            <circle cx="200" cy="200" r="198" stroke="black" strokeWidth="1" fill="none" />
            <path d="M 0 200 Q 200 100 400 200 Q 200 300 0 200" stroke="black" strokeWidth="1" fill="none" />
            <path d="M 200 0 Q 300 200 200 400 Q 100 200 200 0" stroke="black" strokeWidth="1" fill="none" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Join a community group</h2>
          <p className={styles.subtitle}>Engage with developers and technology experts to collaborate and build your network.</p>
        </div>

        <div className={styles.searchBar}>
          <div className={styles.searchInput}>
            <span style={{ fontSize: '1.25rem' }}>&#8981;</span>
            <input 
              type="text" 
              placeholder="Enter your city/town" 
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <a href="#" className={styles.seeAllLink}>See all communities</a>
        </div>

        {/* Search Results / Workflow */}
        {searchResults && searchResults.length > 0 ? (
          <div className={styles.resultsGrid}>
            {searchResults.map(result => (
              <div key={result.id} className={styles.resultItem}>
                <div className={styles.resultIcon}></div>
                <div className={styles.resultInfo}>
                  <div className={styles.resultTitle}>{result.name}</div>
                  <div className={styles.resultLink} onClick={() => console.log('Joined chapter', result.id)}>Join chapter</div>
                </div>
              </div>
            ))}
          </div>
        ) : isSearching ? (
          <div style={{ marginBottom: '3rem' }}>Searching...</div>
        ) : null}

        {/* Community Cards Grid */}
        <div className={styles.cardsGrid}>
          {[
            { title: 'Google Developer Student Clubs', link: 'Join a club', icon: 'GDSC' },
            { title: 'Google Developer Experts', link: 'Become an expert', icon: 'GDE' },
            { title: 'Women Techmakers', link: 'Find out more', icon: 'WTM' },
            { title: 'Google Developer Groups', link: 'Join a chapter', icon: 'GDG' },
            { title: 'Accelerators', link: 'Explore programs', icon: 'ACCEL' },
            { title: 'Tech Equity Collective', link: 'Find out more', icon: 'TEC' },
          ].map((card, i) => (
            <div key={i} className={styles.communityCard}>
              <div className={styles.cardTop}>
                {/* Visual Placeholders for wireframe images */}
              </div>
              <div className={styles.cardBottom}>
                <div className={styles.cardBottomTitle}>{card.title}</div>
                <a href="#" className={styles.cardBottomLink}>{card.link}</a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Promos */}
        <div className={styles.bottomPromoGrid}>
          <BentoCard 
            title="Tune in for Google I/O"
            description="May 14, 2026\nWatch live keynotes and on-demand sessions to hear our latest announcements."
            buttonText="Register"
            onButtonClick={() => setShowRegistration(true)}
          />
          <BentoCard 
            title="Get ready for I/O"
            description="Learn everything you need to know about Google I/O."
            buttonText="Learn more"
            onButtonClick={() => console.log('Learn more')}
          />
        </div>
      </main>

      <Footer />

      {showRegistration && (
        <RegistrationWizard onClose={() => setShowRegistration(false)} />
      )}
    </div>
  );
}
