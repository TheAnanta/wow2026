// src/app/explore/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
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
    <div className="w-full min-h-screen bg-white">
      {/* Banner */}
      {showBanner && (
        <div className="bg-[#202124] text-white py-3 px-4 text-center text-sm flex justify-center items-center relative">
          <span>All content will be available May 14 at 8 AM PT.</span>
          <button
            className="absolute right-4 bg-transparent border-none text-white text-xl cursor-pointer"
            onClick={() => setShowBanner(false)}
          >
            &times;
          </button>
        </div>
      )}

      <Header onRegisterClick={() => setShowRegistration(true)} />

      {/* Plan your WOW Hero */}
      <section className="flex justify-between items-center px-8 pt-24 pb-16 border-b border-[#000000] overflow-hidden relative max-md:flex-col max-md:px-6 max-md:pt-16 max-md:text-center">
        <div className="max-w-[500px] z-10">
          <h1 className="text-[4rem] font-bold mb-4 tracking-[-0.02em]">Plan your WOW</h1>
          <p className="text-lg text-[#5f6368] mb-8">
            Save keynotes, technical sessions, and learning experiences so you don't miss a thing.
          </p>
          <button
            style={{ background: '#1a73e8', color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '9999px', fontWeight: 700, cursor: 'pointer' }}
            onClick={() => console.log('See all content')}
          >
            See all content
          </button>
        </div>

        <div className="w-[500px] h-[350px] relative flex justify-center items-center max-md:w-full max-md:mt-8">
          {/* Floor grid */}
          <div
            className="absolute bottom-0 w-full h-[150px] z-[1]"
            style={{
              backgroundImage: 'linear-gradient(to right, #E0E0E0 1px, transparent 1px), linear-gradient(to bottom, #E0E0E0 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              transform: 'perspective(500px) rotateX(60deg)',
              transformOrigin: 'top',
            }}
          />
          {/* Monitor */}
          <div className="w-[320px] h-[240px] border-4 border-[#000000] rounded-xl bg-white relative overflow-hidden flex justify-center items-center shadow-[20px_20px_0_#E0E0E0]">
            <div
              className="w-[80%] h-[60%] border-4 border-[#000000] rounded-[40px_10px_40px_10px]"
              style={{ background: 'linear-gradient(135deg, #a4f21d 0%, #00ffff 33%, #4169e1 66%, #ff00ff 100%)' }}
            />
            <div className="absolute top-[10px] left-[10px] text-xs font-bold text-[#000000] z-10">OOO</div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="px-8 py-16 max-w-[1440px] mx-auto">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold">What are you building for?</h2>
          <a href="/speakers" className="text-sm font-bold underline text-[#000000]">Meet the WOW speakers</a>
        </div>
        <div className="grid grid-cols-4 gap-6">
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

      {/* My WOW Section */}
      <section className="px-8 py-16 max-w-[1440px] mx-auto pt-0">
        <h2 className="text-3xl font-bold mb-4">My WOW</h2>
        <p className="text-sm text-[#5f6368] mb-10">
          Your saved content are automatically saved in your <a href="#" className="underline text-inherit">developer profile.</a>
        </p>

        {/* Dashboard Widget */}
        <div className="mb-16 border border-[#000000] rounded-xl overflow-hidden">
          <div className="bg-white border-b border-[#000000] grid grid-cols-2 gap-0 max-md:grid-cols-1">
            <div
              className={`flex items-center gap-4 p-4 cursor-pointer border-r border-[#000000] font-bold max-md:border-r-0 max-md:border-b max-md:border-[#000000] ${activeTab === 'saved' ? 'bg-white' : 'bg-[#f8f9fa]'}`}
              onClick={() => setActiveTab('saved')}
            >
              <span className="text-2xl">📘</span>
              <span>Saved content</span>
            </div>
            <div
              className={`flex items-center gap-4 p-4 cursor-pointer font-bold ${activeTab === 'recommended' ? 'bg-white' : 'bg-[#f8f9fa]'}`}
              onClick={() => setActiveTab('recommended')}
            >
              <span className="text-2xl">🎯</span>
              <span>Recommended for you</span>
              <span className="ml-auto text-xs font-medium opacity-60">Hide ▲</span>
            </div>
          </div>
          <div className="p-8 bg-white grid grid-cols-3 gap-6 max-md:grid-cols-1">
            {loading ? (
              <p>Loading sessions...</p>
            ) : (
              sessions.slice(0, 3).map(session => (
                <div key={session.id} className="flex justify-between items-center p-4 border-b border-[#E0E0E0]">
                  <div className="font-semibold">{session.title}</div>
                  <div className="text-xl">🔖</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Dashboard Layout */}
        <div className="grid gap-12 items-start max-lg:grid-cols-[240px_1fr] max-lg:gap-8 max-md:grid-cols-1" style={{ gridTemplateColumns: '280px 1fr' }}>
          <div className="max-md:hidden">
            <FilterSidebar />
          </div>
          <div className="flex flex-col w-full">
            <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
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
      <button
        className="hidden max-md:block fixed bottom-8 right-6 px-8 py-3 bg-[#000000] text-white border-none rounded-full font-bold z-[100] shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
        onClick={() => console.log('Open mobile filters')}
      >
        Filter
      </button>

      <Footer />

      {showRegistration && (
        <RegistrationWizard onClose={() => setShowRegistration(false)} />
      )}
    </div>
  );
}
