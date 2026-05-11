import '../payment/checkout.css';
import React, { useState, useEffect, useRef } from 'react';
import { RegistrationData, validateProfile, submitRegistration } from '../../services/registrationStubs';
import { requestFirebaseToken } from '../../services/fcm';
import { analyticsService } from '../../services/analytics';
import { useAuth } from '../../context/AuthContext';
import { signInWithGoogle } from '../../services/firebase';
import { ErrorOverlay } from './ErrorOverlays';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  IconBack, IconMenu, IconUser, IconSchool, IconPhone, IconChevronDown, IconCheck, IconInfo, IconSparkle
} from '../payment/Icons';

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
          Registration
        </span>
      </div>
      <button className="m-pressable rounded-full flex items-center justify-center -mr-2"
        style={{ width: 48, height: 48, color: 'var(--m-on-surface)' }} aria-label="Menu">
        <IconMenu size={24} />
      </button>
    </div>
  </header>
);

const MaterialInput = ({ icon: Icon, placeholder, value, onChange, error, detail, type = "text", prefix }: any) => (
  <div className="w-full">
    <div
      className="flex items-center gap-3 px-4 rounded-2xl transition-all duration-200"
      style={{
        height: 56,
        background: 'var(--m-surface-container-high)',
        borderBottom: error ? '2px solid var(--m-error)' : 'none'
      }}
    >
      <div className="flex-none" style={{ color: error ? 'var(--m-error)' : 'var(--m-on-surface-variant)' }}>
        <Icon size={22} />
      </div>
      <div className="flex-1 flex items-center gap-1">
        {prefix && <span className="t-body-l font-bold opacity-60">{prefix}</span>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none t-body-l"
          style={{ color: 'var(--m-on-surface)' }}
        />
      </div>
    </div>
    {error ? (
      <p className="t-label-s mt-1 px-4" style={{ color: 'var(--m-error)' }}>{error}</p>
    ) : detail ? (
      <p className="t-label-s mt-1 px-4 opacity-60" style={{ color: 'var(--m-on-surface-variant)' }}>{detail}</p>
    ) : null}
  </div>
);

const MaterialSelect = ({ icon: Icon, value, onChange, options, placeholder, error }: any) => (
  <div className="w-full relative">
    <div
      className="flex items-center gap-3 px-4 rounded-2xl transition-all duration-200"
      style={{
        height: 56,
        background: 'var(--m-surface-container-high)',
        borderBottom: error ? '2px solid var(--m-error)' : 'none'
      }}
    >
      <div className="flex-none" style={{ color: error ? 'var(--m-error)' : 'var(--m-on-surface-variant)' }}>
        <Icon size={22} />
      </div>
      <select
        value={value}
        onChange={onChange}
        className="flex-1 bg-transparent outline-none t-body-l appearance-none"
        style={{ color: value ? 'var(--m-on-surface)' : 'var(--m-on-surface-variant)' }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="flex-none opacity-60 pointer-events-none" style={{ color: 'var(--m-on-surface-variant)' }}>
        <IconChevronDown size={20} />
      </div>
    </div>
    {error && <p className="t-label-s mt-1 px-4" style={{ color: 'var(--m-error)' }}>{error}</p>}
  </div>
);

const MaterialCheckbox = ({ label, checked, onChange }: any) => (
  <label className="flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all hover:bg-black/5 dark:hover:bg-white/5 active:scale-[0.98]">
    <div
      className={`flex-none w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${checked ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`}
      onClick={(e) => { e.preventDefault(); onChange(); }}
    >
      {checked && <IconCheck size={18} stroke={3} style={{ color: '#fff' }} />}
    </div>
    <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
    <span className="t-body-m" style={{ color: 'var(--m-on-surface)' }}>{label}</span>
  </label>
);



export const RegistrationForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [scrolled, setScrolled] = useState(false);
  const formStartTimeRef = useRef(Date.now());
  const [data, setData] = useState<RegistrationData>({
    displayName: '',
    pronoun: '',
    phoneNumber: '',
    cityTown: '',
    role: '',
    organization: '',
    interests: [],
    termsAgreed: true,
    agreeToTerms: true,
    marketingConsent: false,
    newsletterConsent: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { user, profile, isLoggedIn, isLoading: isAuthLoading, refreshProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorType, setErrorType] = useState<'signin' | 'account' | 'general' | null>(null);



  useEffect(() => {
    if (profile) {
      setData(prev => ({
        ...prev,
        displayName: profile.first_name + (profile.last_name !== '.' ? ' ' + profile.last_name : ''),
        pronoun: profile.gender?.toLowerCase().replace(/_/g, ' ').replace(/(he)\s(him)/, '$1/$2').replace(/(she)\s(her)/, '$1/$2').replace(/(they)\s(them)/, '$1/$2') || '',
        phoneNumber: profile.phone?.replace('+91', '') || '',
        cityTown: profile.city || '',
        role: profile.designation || '',
        organization: profile.organization || '',
        interests: profile.interests || [],
      }));
    } else if (user && !data.displayName) {
      setData(prev => ({ ...prev, displayName: user.displayName || '' }));
    }
  }, [profile, user]);

  useEffect(() => {
    if (isLoggedIn && profile && searchParams.get('update') !== 'true') {
      router.replace('/payment');
    }
  }, [isLoggedIn, profile, searchParams, router]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const updateData = (updates: Partial<RegistrationData>) => {
    setData((prev) => ({ ...prev, ...updates }));
    const key = Object.keys(updates)[0];
    if (errors[key]) {
      const newErrors = { ...errors };
      delete newErrors[key];
      setErrors(newErrors);
    }
  };



  const handleGoogleSignIn = async () => {
    try {
      setErrorType(null);
      await signInWithGoogle();
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        setErrorType('signin');
      }
    }
  };

  const handleSubmit = async () => {
    const newErrors = validateProfile(data);
    if (Object.keys(newErrors).length !== 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    try {
      const fcm_token = await requestFirebaseToken();
      const result = await submitRegistration({ ...data, fcm_token: fcm_token || undefined });
      if (result.success) {
        await refreshProfile();
        router.push('/payment');
      } else {
        setErrors({ submit: result.error || 'Account type not allowed.' });
        setErrorType('account');
      }
    } catch (err: any) {
      setErrors({ submit: err.message || 'An error occurred.' });
      setErrorType('general');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: 'var(--m-primary)', borderTopColor: 'transparent' }}></div>
      </div>
    );
  }

  if (errorType) {
    return (
      <div className="checkout-root min-h-screen flex flex-col" style={{ background: 'var(--m-surface)' }}>
        <TopBar scrolled={scrolled} onBack={() => setErrorType(null)} />
        <div className="flex-1 flex flex-col justify-center">
          <ErrorOverlay type={errorType} onTryAgain={() => setErrorType(null)} errorMessage={errors.submit} />
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="checkout-root min-h-screen flex flex-col" style={{ background: 'var(--m-surface)' }}>
        <TopBar scrolled={scrolled} onBack={() => window.history.back()} />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-24 h-24 mb-8 flex items-center justify-center rounded-3xl" style={{ background: 'var(--m-primary-container)', color: 'var(--m-primary)' }}>
            <IconSparkle size={48} />
          </div>
          <h1 className="t-headline-m mb-4" style={{ color: 'var(--m-on-surface)' }}>Welcome to WOW</h1>
          <p className="t-body-l mb-10 max-w-sm" style={{ color: 'var(--m-on-surface-variant)' }}>
            Sign in to create your student profile and unlock exclusive sessions and swags.
          </p>
          <button
            onClick={handleGoogleSignIn}
            className="m-cta h-14 px-8 bg-white border rounded-full t-label-l flex items-center gap-3 hover:bg-gray-50 transition-all shadow-sm"
            style={{ borderColor: 'var(--m-outline-variant)', color: '#202124' }}
          >
            <img src="/images/google.svg" alt="Google" width="20" />
            Sign in with Google
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="checkout-root min-h-screen flex flex-col" style={{ background: 'var(--m-surface)' }}>
      <TopBar scrolled={scrolled} onBack={() => window.history.back()} />

      <main className="flex-1 w-full max-w-[800px] mx-auto px-4 py-12 relative z-10">
        <div className="mb-12 toast-in">

          <h1 className="t-display-s mb-2" style={{ color: 'var(--m-on-surface)' }}>Create your profile</h1>
          <p className="t-body-l opacity-70" style={{ color: 'var(--m-on-surface-variant)' }}>
            Join the community and tailor your WOW experience.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <section className="rounded-[32px] p-8 flex flex-col gap-8 toast-in"
            style={{
              background: 'var(--m-surface-container-lowest)',
              animationDelay: '100ms'
            }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-none" style={{ background: 'var(--m-primary-container)', color: 'var(--m-primary)' }}>
                <IconUser size={28} />
              </div>
              <div className="flex-1">
                <h2 className="t-headline-s">Basic Information</h2>
                <p className="t-body-m opacity-70">Personalize your public developer profile.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <MaterialInput
                icon={IconUser}
                placeholder="Display Name*"
                value={data.displayName}
                onChange={(e: any) => updateData({ displayName: e.target.value })}
                error={errors.displayName}
                detail="This name will appear on your event badge and profile."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MaterialSelect
                  icon={IconSparkle}
                  placeholder="Pronoun*"
                  value={data.pronoun}
                  onChange={(e: any) => updateData({ pronoun: e.target.value })}
                  error={errors.pronoun}
                  options={[
                    { value: 'he/him', label: 'He/Him' },
                    { value: 'she/her', label: 'She/Her' },
                    { value: 'they/them', label: 'They/Them' },
                    { value: 'prefer not to say', label: 'Prefer not to say' },
                  ]}
                />
                <MaterialInput
                  icon={IconSchool}
                  placeholder="University Name*"
                  value={data.organization}
                  onChange={(e: any) => updateData({ organization: e.target.value })}
                  error={errors.organization}
                  detail="Your current educational institution."
                />
              </div>

              <MaterialInput
                icon={IconPhone}
                prefix="+91"
                placeholder="Phone Number*"
                value={data.phoneNumber}
                onChange={(e: any) => updateData({ phoneNumber: e.target.value })}
                error={errors.phoneNumber}
                detail="For important event updates via SMS/WhatsApp."
                type="tel"
              />
            </div>
          </section>

          <section className="rounded-[32px] p-8 toast-in"
            style={{
              background: 'var(--m-surface-container-low)',
              animationDelay: '200ms'
            }}>
            <h2 className="t-title-l mb-6 flex items-center gap-3">
              Preferences & Consents
            </h2>
            <div className="space-y-1">
              {[
                {
                  key: 'marketingConsent',
                  label: 'I would like to receive marketing and event updates about GDG WOW 2026.',
                },
                {
                  key: 'newsletterConsent',
                  label: 'I would like to receive newsletters with the latest features and news.',
                },
              ].map(({ key, label }) => (
                <MaterialCheckbox
                  key={key}
                  label={label}
                  checked={!!data[key as keyof RegistrationData]}
                  onChange={() => updateData({ [key]: !data[key as keyof RegistrationData] })}
                />
              ))}
            </div>
          </section>

          <div className="toast-in" style={{ animationDelay: '300ms' }}>
            <p className="t-body-s px-4 leading-relaxed opacity-60 text-center mb-8" style={{ color: 'var(--m-on-surface)' }}>
              By registering, you agree to our <a href="/terms" className="underline font-bold">Terms of Service</a> and <a href="/privacy" className="underline font-bold">Privacy Policy</a>.
            </p>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="m-cta h-16 rounded-full flex items-center justify-center gap-3 t-label-l shadow-lg group relative overflow-hidden"
                style={{
                  background: 'var(--m-primary)',
                  color: 'var(--m-on-primary)',
                  boxShadow: '0 4px 20px rgba(44,95,217,0.3)'
                }}
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--m-on-primary)', borderTopColor: 'transparent' }}></div>
                ) : (
                  <>
                    <IconCheck size={24} stroke={3} />
                    <span className="text-lg">{profile ? 'Save Changes' : 'Complete Registration'}</span>
                  </>
                )}
              </button>

              {!profile && (
                <div className="flex items-center justify-center gap-3 t-label-m py-4" style={{ color: 'var(--m-on-surface-variant)' }}>
                  <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5">Step 1 of 2</span>
                  <div className="w-8 h-[2px] bg-current opacity-10"></div>
                  <span>Next: Checkout & Payment</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
