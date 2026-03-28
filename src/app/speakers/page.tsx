'use client';

import React, { useState, useEffect } from 'react';
import styles from '../../styles/speakers.module.css';
import { Header } from '../../components/sections/Header';
import { Footer } from '../../components/sections/Footer';
import { SpeakerCard } from '../../components/speakers/SpeakerCard';
import { FilterSidebar } from '../../components/speakers/FilterSidebar';
import { SearchBar } from '../../components/speakers/SearchBar';
import { BentoCard } from '../../components/sections/BentoCard';
import { RegistrationWizard } from '../../components/registration/RegistrationWizard';
import { Speaker, getSpeakers, searchSpeakers } from '../../services/speakerStubs';

const TOPICS = [
  'Accessibility', 'Ads', 'AI/Machine Learning', 'Android', 'AR/VR', 
  'Chrome OS', 'Cloud', 'Design', 'Firebase', 'Web', 'Mobile'
];

export default function SpeakersPage() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize speakers
  useEffect(() => {
    fetchInitially();
  }, []);

  // Update speakers on filters changed
  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedTopics]);

  const fetchInitially = async () => {
    setLoading(true);
    const data = await getSpeakers();
    setSpeakers(data);
    setLoading(false);
  };

  const applyFilters = async () => {
    setLoading(true);
    // In a real app we'd call the stub with filters, here we emulate it
    let results = await getSpeakers(); 

    if (searchQuery.trim().length > 0) {
      results = await searchSpeakers(searchQuery);
    }

    if (selectedTopics.length > 0) {
      results = results.filter(s => s.topics.some(t => selectedTopics.includes(t)));
    }
    
    setSpeakers(results);
    setLoading(false);
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const removeTopic = (topic: string) => {
    setSelectedTopics(prev => prev.filter(t => t !== topic));
  };

  return (
    <div className={styles.container}>
      <Header onRegisterClick={() => setShowRegistration(true)} />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Meet the speakers</h1>
          <p className={styles.subtitle}>Learn about the Googlers presenting at Google I/O.</p>
        </div>
        
        <div className={styles.micGraphic}>
          <div className={styles.micLeft}>
            <div className={styles.micIcon}></div>
          </div>
          <div className={styles.micRight}></div>
        </div>
      </section>

      <div className={styles.layout}>
        {/* Sidebar / Mobile Drawer */}
        <div className={`${styles.sidebarContainer} ${showMobileFilters ? styles.mobileVisible : ''}`}>
          <div className={styles.sidebarHeaderMobile}>
            <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>Topics</span>
            <button className={styles.sidebarClose} onClick={() => setShowMobileFilters(false)}>&times;</button>
          </div>
          <FilterSidebar 
            topics={TOPICS} 
            selectedTopics={selectedTopics} 
            onToggleTopic={toggleTopic} 
          />
          {showMobileFilters && (
            <div style={{ marginTop: 'auto', padding: '2rem 0' }}>
              <button 
                className={styles.filterFab} 
                style={{ position: 'static', width: '100%', justifyContent: 'center' }}
                onClick={() => setShowMobileFilters(false)}
              >
                Show {speakers.length} results
              </button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          <SearchBar 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />

          {/* Active Filter Chips */}
          <div className={styles.chipsContainer}>
            {selectedTopics.map(topic => (
              <div key={topic} className={styles.chip} onClick={() => removeTopic(topic)}>
                {topic}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            ))}
            {selectedTopics.length > 0 && (
              <span className={styles.clearAll} onClick={() => setSelectedTopics([])}>Clear all</span>
            )}
          </div>

          <div className={styles.grid}>
            {loading ? (
              <p>Loading speakers...</p>
            ) : speakers.length > 0 ? (
              speakers.map(speaker => (
                <SpeakerCard key={speaker.id} name={speaker.name} title={speaker.title} />
              ))
            ) : (
              <p>No speakers found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Floating Filter Button for Mobile */}
      <button className={styles.filterFab} onClick={() => setShowMobileFilters(true)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line>
          <line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line>
          <line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line>
          <line x1="17" y1="16" x2="23" y2="16"></line>
        </svg>
        Filter
      </button>

      <div className={styles.bottomPromoGrid}>
        <BentoCard 
          title="Join a community group"
          description="Meet developers, discover local groups, and build your global network."
          buttonText="Get started"
          onButtonClick={() => {}}
        />
        <BentoCard 
          title="Plan your I/O"
          description="Visit My I/O for saved content and recommendations based on your personal interests."
          buttonText="Get started"
          onButtonClick={() => {}}
        />
      </div>

      <Footer />

      {showRegistration && (
        <RegistrationWizard onClose={() => setShowRegistration(false)} />
      )}
    </div>
  );
}
