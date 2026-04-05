'use client';

import React, { useState } from 'react';
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
    <div className="w-full max-w-[1440px] mx-auto">
      <Header onRegisterClick={() => setShowRegistration(true)} />

      {/* Community Hero */}
      <section className="flex items-center justify-between px-8 pt-24 pb-16 border-b border-[#000000] relative overflow-hidden">
        <div className="max-w-[600px] z-10">
          <h1 className="text-[3.5rem] font-medium mb-4">Community</h1>
          <p className="text-lg mb-8 text-[#202124]">Meet developers, discover local groups, and build your global network.</p>
          <Button style={{ background: '#1a73e8', color: '#fff', border: 'none' }} onClick={() => setShowRegistration(true)}>
            Register for Google WOW
          </Button>
        </div>

        {/* Wireframe sphere graphic */}
        <div
          className="absolute right-8 -bottom-10 w-[400px] h-[400px] rounded-full border border-[#000000] z-[1] overflow-hidden"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            transform: 'perspective(1000px) rotateX(20deg) rotateZ(-15deg)',
            clipPath: 'circle(50% at 50% 50%)',
          }}
        >
          <div className="absolute top-0 left-1/2 right-0 bottom-1/2 bg-[#4285F4]" />
          <div className="absolute top-0 left-0 right-1/2 bottom-1/2 bg-[#34A853]" />
          <div className="absolute top-1/2 left-0 right-1/2 bottom-0 bg-[#FBBC04]" />
          <div className="absolute top-1/2 left-1/2 right-0 bottom-0 bg-[#EA4335]" />
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 10 }}>
            <circle cx="200" cy="200" r="198" stroke="black" strokeWidth="1" fill="none" />
            <path d="M 0 200 Q 200 100 400 200 Q 200 300 0 200" stroke="black" strokeWidth="1" fill="none" />
            <path d="M 200 0 Q 300 200 200 400 Q 100 200 200 0" stroke="black" strokeWidth="1" fill="none" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-8 py-16">
        <div className="flex flex-col mb-8">
          <h2 className="text-3xl font-medium mb-2">Join a community group</h2>
          <p className="text-lg text-[#202124]">Engage with developers and technology experts to collaborate and build your network.</p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-between mb-12 gap-8">
          <div className="flex items-center border border-[#000000] rounded-full py-2 px-4 w-full max-w-[400px]">
            <span className="text-xl mr-2">&#8981;</span>
            <input
              type="text"
              placeholder="Enter your city/town"
              value={searchQuery}
              onChange={handleSearch}
              className="border-none outline-none text-base w-full bg-transparent"
            />
          </div>
          <a href="#" className="text-sm font-medium underline">See all communities</a>
        </div>

        {/* Search Results */}
        {searchResults && searchResults.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 mb-12">
            {searchResults.map(result => (
              <div key={result.id} className="flex items-center p-4 border border-[#000000] rounded-lg bg-white">
                <div className="w-10 h-10 border border-[#000000] rounded-[4px] mr-4 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #34A853, #4285F4)' }} />
                <div className="flex flex-col">
                  <div className="font-medium mb-1">{result.name}</div>
                  <div className="text-sm underline cursor-pointer" onClick={() => console.log('Joined chapter', result.id)}>Join chapter</div>
                </div>
              </div>
            ))}
          </div>
        ) : isSearching ? (
          <div className="mb-12">Searching...</div>
        ) : null}

        {/* Community Cards Grid */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { title: 'Google Developer Student Clubs', link: 'Join a club' },
            { title: 'Google Developer Experts', link: 'Become an expert' },
            { title: 'Women Techmakers', link: 'Find out more' },
            { title: 'Google Developer Groups', link: 'Join a chapter' },
            { title: 'Accelerators', link: 'Explore programs' },
            { title: 'Tech Equity Collective', link: 'Find out more' },
          ].map((card, i) => (
            <div key={i} className="border border-[#000000] rounded-2xl overflow-hidden flex flex-col bg-white">
              <div
                className="h-[200px] border-b border-[#000000] relative"
                style={{
                  backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              <div className="p-6 bg-[#202124] text-white flex flex-col items-center justify-center text-center min-h-[120px]">
                <div className="text-lg font-medium mb-4">{card.title}</div>
                <a href="#" className="text-sm underline text-white">{card.link}</a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Promo Grid */}
        <div className="grid grid-cols-2 gap-6 mt-16">
          <BentoCard
            title="Tune in for Google WOW"
            description={"May 14, 2026\nWatch live keynotes and on-demand sessions to hear our latest announcements."}
            buttonText="Register"
            onButtonClick={() => setShowRegistration(true)}
          />
          <BentoCard
            title="Get ready for WOW"
            description="Learn everything you need to know about Google WOW."
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
