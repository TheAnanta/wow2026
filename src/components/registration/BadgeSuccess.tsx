import '../payment/checkout.css';
import React, { useEffect, useRef, useState } from 'react';
import { analyticsService } from '../../services/analytics';
import { updateProfile } from '../../services/registrationStubs';
import { 
  IconCheck, IconSparkle, IconUser, IconBack, IconMenu, IconShield, IconInfo, IconChevronDown
} from '../payment/Icons';

interface BadgeSuccessProps {
  badgeName: string;
  orderId?: string | null;
  couponCode?: string | null;
  onClose?: () => void;
}

const TopBar = ({ scrolled, onBack }: { scrolled: boolean; onBack: () => void }) => (
  <header
    className={`flex items-center ${scrolled ? 'scrolled-shadow' : ''} transition-shadow sticky top-0 z-[50]`}
    style={{ height: 56, background: 'var(--m-surface)', borderBottom: scrolled ? 'none' : '1px solid var(--m-outline-variant)' }}
  >
    <div className="flex-1 flex items-center gap-2 px-4 max-w-[800px] mx-auto w-full">
      <button onClick={onBack} className="m-pressable rounded-full flex items-center justify-center -ml-2"
        style={{ width: 48, height: 48, color: 'var(--m-on-surface)' }} aria-label="Back">
        <IconBack size={24} />
      </button>
      <div className="flex-1 flex items-baseline">
        <span className="t-title-l tracking-tight" style={{ color: 'var(--m-on-surface)' }}>
          {"gdgoc".toLowerCase()}
        </span>
        <span className="t-title-l font-extrabold mr-3" style={{ color: 'var(--m-primary)' }}>
          wow
        </span>
        <span className="t-label-m ml-2" style={{ color: 'var(--m-on-surface-variant)' }}>
          Confirmation
        </span>
      </div>
      <button className="m-pressable rounded-full flex items-center justify-center -mr-2"
        style={{ width: 48, height: 48, color: 'var(--m-on-surface)' }} aria-label="Menu">
        <IconMenu size={24} />
      </button>
    </div>
  </header>
);

const InterestChip = ({ label, selected, onClick }: any) => (
  <button
    onClick={onClick}
    className={`h-10 px-4 rounded-full t-label-l flex items-center gap-2 transition-all duration-200 m-pressable border`}
    style={{
      background: selected ? 'var(--m-primary-container)' : 'transparent',
      borderColor: selected ? 'var(--m-primary)' : 'var(--m-outline-variant)',
      color: selected ? 'var(--m-on-primary-container)' : 'var(--m-on-surface-variant)'
    }}
  >
    {selected && <IconCheck size={16} stroke={3} />}
    {label}
  </button>
);

export const BadgeSuccess: React.FC<BadgeSuccessProps> = ({ badgeName, orderId, couponCode, onClose }) => {
  const isWOWPlus = badgeName?.includes('Explorer');
  const isBetterTogether = couponCode === 'BETTERTOGETHER';
  const startTimeRef = useRef(Date.now());
  const [scrolled, setScrolled] = useState(false);
  
  const [step, setStep] = useState(isBetterTogether ? 'team' : 'interests');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [teamMembers, setTeamMembers] = useState(['', '', '', '']);
  const [showAllInterests, setShowAllInterests] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const INTEREST_OPTIONS = [
    'Android', 'Mobile', 'AI & Machine Learning', 'Web', 'Cloud', 'Open Source', 'Design', 'Location/Maps', 'A11y', 'Ads',
    'AR/VR', 'ChromeOS', 'Firebase', 'Flutter', 'Gaming', 'Google Play', 'Internet of Things (IoT)', 'iOS', 'Payments', 'Search', 'Smart Home Ecosystem', 'Quantum Computing', 'Wear OS', 'Health & Fitness'
  ];

  useEffect(() => {
    analyticsService.trackCheckoutActivity('success_screen', badgeName, 'viewed');
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [badgeName]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile({ 
        interests: selectedInterests,
        team_members: isBetterTogether ? teamMembers.filter(m => m.trim()) : undefined
      });
    } catch (err) {
      console.error('Failed to save details:', err);
    } finally {
      setIsSaving(false);
      if (onClose) onClose();
    }
  };

  return (
    <div className="checkout-root min-h-screen flex flex-col" style={{ background: 'var(--m-surface)' }}>
      <TopBar scrolled={scrolled} onBack={onClose} />

      <main className="flex-1 w-full max-w-[800px] mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col items-center text-center mb-12 toast-in">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-xl animate-bounce-slow" style={{ background: 'var(--m-success-container)', color: 'var(--m-on-success-container)' }}>
            <IconCheck size={40} stroke={3} />
          </div>
          <h1 className="t-display-s mb-2" style={{ color: 'var(--m-on-surface)' }}>Congratulations!</h1>
          <p className="t-body-l opacity-70 max-w-md" style={{ color: 'var(--m-on-surface-variant)' }}>
            Your registration for GDG WOW 2026 is confirmed. You're now part of the journey.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Badge Section */}
          <section className="rounded-[40px] p-10 flex flex-col items-center gap-8 toast-in" 
            style={{ 
              background: 'var(--m-surface-container-low)',
              animationDelay: '100ms'
            }}>
            <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
              <div className="absolute inset-0 rounded-full blur-[60px] opacity-30 animate-pulse" style={{ background: 'var(--m-primary)' }}></div>
              <img
                src={isWOWPlus ? "/images/wow26-arcade-badge-registration.png" : "/images/io24-badge-registration.svg"}
                alt="Badge"
                className="w-full h-full object-contain relative z-10 transition-transform hover:scale-110 duration-500 cursor-zoom-in"
              />
            </div>
            
            <div className="text-center">
              <div className="t-label-s opacity-60 uppercase tracking-widest mb-1">Badge Earned</div>
              <h2 className="t-headline-m">{badgeName}</h2>
              <p className="t-label-m mt-2 opacity-60">ORDER #{orderId?.slice(-8).toUpperCase()}</p>
            </div>

            <div className="flex gap-4 w-full">
              <button className="flex-1 m-cta h-12 rounded-full border flex items-center justify-center gap-2 t-label-l" style={{ borderColor: 'var(--m-outline-variant)' }}>
                Download
              </button>
              <button className="flex-1 m-cta h-12 rounded-full flex items-center justify-center gap-2 t-label-l" style={{ background: 'var(--m-primary)', color: 'var(--m-on-primary)' }}>
                Share
              </button>
            </div>
          </section>

          {/* Data Collection Steps */}
          {step === 'team' && (
            <section className="rounded-[32px] p-8 flex flex-col gap-8 toast-in" 
              style={{ 
                background: 'var(--m-surface-container-highest)',
                animationDelay: '200ms'
              }}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-none" style={{ background: 'var(--m-secondary-container)', color: 'var(--m-on-surface)' }}>
                  <IconSchool size={28} />
                </div>
                <div className="flex-1">
                  <h2 className="t-headline-s">Better Together</h2>
                  <p className="t-body-m opacity-70">Add your 4 team members to complete the group registration.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamMembers.map((email, i) => (
                  <div key={i} className="relative">
                    <input
                      type="email"
                      placeholder={`Team Member ${i + 1} Email`}
                      value={email}
                      onChange={(e) => {
                        const newMembers = [...teamMembers];
                        newMembers[i] = e.target.value;
                        setTeamMembers(newMembers);
                      }}
                      className="w-full h-14 px-4 rounded-2xl bg-white/50 dark:bg-black/20 outline-none t-body-m border-2 border-transparent focus:border-[#2c5fd9] transition-all"
                    />
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setStep('interests')}
                disabled={teamMembers.some(m => !m)}
                className="m-cta h-14 rounded-full flex items-center justify-center gap-2 t-label-l"
                style={{ background: 'var(--m-primary)', color: 'var(--m-on-primary)' }}
              >
                Continue to Interests
                <IconSparkle size={18} />
              </button>
            </section>
          )}

          {step === 'interests' && (
            <section className="rounded-[32px] p-8 flex flex-col gap-6 toast-in" 
              style={{ 
                background: 'var(--m-surface-container-lowest)', 
                animationDelay: '200ms'
              }}>
              <div>
                <h2 className="t-headline-s mb-1">What are you into?</h2>
                <p className="t-body-m opacity-60">Help us personalize your event feed and session recommendations.</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {(showAllInterests ? INTEREST_OPTIONS : INTEREST_OPTIONS.slice(0, 10)).map(interest => (
                  <InterestChip 
                    key={interest} 
                    label={interest} 
                    selected={selectedInterests.includes(interest)}
                    onClick={() => toggleInterest(interest)}
                  />
                ))}
              </div>
              <button 
                onClick={() => setShowAllInterests(!showAllInterests)}
                className="t-label-l w-max px-4 py-2 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                style={{ color: 'var(--m-primary)' }}
              >
                {showAllInterests ? 'See less' : 'See all'}
              </button>

              <div className="pt-4">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full m-cta h-14 rounded-full flex items-center justify-center gap-2 t-label-l"
                  style={{ background: 'var(--m-primary)', color: 'var(--m-on-primary)' }}
                >
                  {isSaving ? (
                    <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--m-on-primary)', borderTopColor: 'transparent' }}></div>
                  ) : (
                    <>
                      <span>Complete & continue to Arcade</span>
                      <IconSparkle size={18} />
                    </>
                  )}
                </button>
              </div>
            </section>
          )}
        </div>
      </main>

      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
