// src/app/team/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../../components/sections/Header';
import { Footer } from '../../components/sections/Footer';
import { TeamCard } from '../../components/team/TeamCard';
import { RegistrationWizard } from '../../components/registration/RegistrationWizard';
import { getTeam, TeamMember } from '../../services/teamStubs';

export default function TeamPage() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      const data = await getTeam();
      setTeamMembers(data);
      setLoading(false);
    };
    fetchTeam();
  }, []);

  const coreTeam = teamMembers.filter(m => m.type === 'Core');
  const otherTeam = teamMembers.filter(m => m.type !== 'Core');

  const groupedOtherTeam = otherTeam.reduce((acc: Record<string, TeamMember[]>, member) => {
    let group = "Project Contributors";
    if (member.community_title) {
        if (member.community_title.includes("GITAM")) {
            group = "GDGoC GITAM";
        } else if (member.community_title.includes("GDGoC")) {
            const match = member.community_title.match(/GDGoC\s+(.*?)\s+(Core )?Team/);
            if (match) group = `GDGoC ${match[1]}`;
        }
    }
    if (!acc[group]) acc[group] = [];
    acc[group].push(member);
    return acc;
  }, {});

  return (
    <div className="w-full bg-[#030303] text-white min-h-screen overflow-x-hidden">
      <Header onRegisterClick={() => setShowRegistration(true)} />

      {/* Modern Hero Section for Team - Full Width Background */}
      <section className="relative pt-32 pb-24 px-8 overflow-hidden">
        <div className="max-w-[1440px] mx-auto z-10 relative">
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8 animate-in slide-in-from-bottom duration-700">
            The force behind <span className="text-google-blue">WOW.</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium text-grey-400 leading-relaxed max-w-[500px]">
            Meet the innovators, designers, and community leaders who made Google WOW 2026 possible.
          </p>
        </div>

        {/* Decorative Background Glows */}
        <div className="absolute right-0 top-0 w-1/2 h-full -z-0 pointer-events-none">
           <div className="absolute top-10 right-20 w-64 h-64 bg-google-blue/20 rounded-full blur-[100px] animate-pulse" />
           <div className="absolute bottom-20 right-40 w-96 h-96 bg-google-green/10 rounded-full blur-[120px]" />
           <div className="absolute top-40 right-60 w-48 h-48 bg-google-red/10 rounded-full blur-[80px]" />
        </div>
      </section>

      <main className="px-8 py-20 space-y-32 max-w-[1440px] mx-auto">
        {/* Core Organizers Section */}
        <section>
          <div className="mb-16 flex flex-col md:flex-row items-center gap-6">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-none">Core Organizers</h2>
            <div className="h-px flex-1 bg-white/10" />
            <p className="text-google-blue font-bold uppercase tracking-widest text-sm">Steering Committee</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col items-center">
                  <div className="w-32 h-32 bg-white/5 rounded-full mb-4" />
                  <div className="h-4 w-24 bg-white/5 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
              {coreTeam.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </section>

        {/* Community Contributors - Grouped by Chapter */}
        {Object.entries(groupedOtherTeam)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([group, members]) => (
            <section key={group} className="animate-in fade-in slide-in-from-bottom-10 duration-500 delay-200">
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-2">
                   <div className="w-8 h-8 rounded-lg bg-google-yellow shadow-[0_0_20px_rgba(251,188,4,0.3)]" />
                   <h3 className="text-2xl md:text-3xl font-black text-white">{group}</h3>
                </div>
                <p className="text-grey-400 font-medium">Local chapter leadership and core members</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
                {members.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            </section>
          ))}
      </main>

      <Footer />

      {showRegistration && (
        <RegistrationWizard onClose={() => setShowRegistration(false)} />
      )}
    </div>
  );
}
