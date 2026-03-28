// src/components/registration/StepManager.tsx
'use client';

import React, { useState, useEffect } from 'react';
import styles from './Registration.module.css';
import { InterestTags } from './InterestTags';
import { BadgeSuccess } from './BadgeSuccess';
import { RegistrationData, validateProfile } from '../../services/registrationStubs';
import { auth, signInWithGoogle } from '../../services/firebase';

interface StepManagerProps {
  currentStep: number;
  data: RegistrationData;
  updateData: (updates: Partial<RegistrationData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const StepManager: React.FC<StepManagerProps> = ({ 
  currentStep, 
  data, 
  updateData, 
  onNext 
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFirebaseLoading, setIsFirebaseLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const isAuthNow = !!user;
      setIsAuthenticated(isAuthNow);
      setIsFirebaseLoading(false);

      // Auto-populate from Firebase if currently empty
      if (isAuthNow && user.displayName && !data.displayName) {
        updateData({ 
          displayName: user.displayName,
        });
      }
    });
    return () => unsubscribe();
  }, [data.displayName, updateData]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // onAuthStateChanged will trigger and update isAuthenticated
    } catch (err) {
      console.error('Google Sign In Error:', err);
    }
  };

  const handleProfileAndInterestsNext = () => {
    const newErrors = validateProfile(data);
    if (Object.keys(newErrors).length === 0) {
      onNext();
    } else {
      setErrors(newErrors);
    }
  };

  const toggleInterest = (interest: string) => {
    const current = data.interests || [];
    const updated = current.includes(interest) 
      ? current.filter(i => i !== interest) 
      : [...current, interest];
    updateData({ interests: updated });
  };

  const renderStep = () => {
    // If we are on Step 1 (Registration form) but not authenticated, show Auth Page first
    if (currentStep === 1 && !isAuthenticated && !isFirebaseLoading) {
      return (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <h2 className={styles.stepTitle}>Sign in to continue</h2>
          <p className={styles.stepSubtitle}>
            To register for Google I/O 2026, please sign in with your Google account.
          </p>
          <button 
            onClick={handleGoogleSignIn}
            className={styles.nextButton}
            style={{ 
              background: '#ffffff', 
              color: '#000000', 
              border: '1px solid #000000',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              margin: '2rem auto',
              width: 'fit-content',
              padding: '0.75rem 2rem'
            }}
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="20" />
            Sign in with Google
          </button>
        </div>
      );
    }

    if (isFirebaseLoading && currentStep === 1) {
      return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading auth state...</div>;
    }

    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className={styles.stepTitle}>Create a developer profile</h2>
            <p className={styles.stepSubtitle}>
              Create a developer profile to get recommendations for the best I/O sessions and content for you. You can also use your profile to save content to watch on demand.
            </p>
            <div className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Display name <span className={styles.labelRequired}>*</span></label>
                <input 
                  className={styles.input} 
                  type="text" 
                  value={data.displayName} 
                  onChange={(e) => updateData({ displayName: e.target.value })}
                  placeholder="Developer"
                />
                {errors.displayName && <p className={styles.error}>{errors.displayName}</p>}
                <p style={{ fontSize: '0.75rem', color: '#5f6368', marginTop: '0.25rem' }}>Your name may appear where you contribute and can be changed at any time.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Pronoun</label>
                  <select className={styles.select} value={data.pronoun} onChange={(e) => updateData({ pronoun: e.target.value })}>
                    <option value="">Select pronoun</option>
                    <option value="he/him">He/Him</option>
                    <option value="she/her">She/Her</option>
                    <option value="they/them">They/Them</option>
                    <option value="prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>City/town <span className={styles.labelRequired}>*</span></label>
                  <input 
                    className={styles.input} 
                    type="text" 
                    value={data.cityTown} 
                    onChange={(e) => updateData({ cityTown: e.target.value })}
                    placeholder="Your City"
                  />
                  {errors.cityTown && <p className={styles.error}>{errors.cityTown}</p>}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Role or job title</label>
                  <select className={styles.select} value={data.role} onChange={(e) => updateData({ role: e.target.value })}>
                    <option value="">Role or job title</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Designer">Designer</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Google</label>
                  <input className={styles.input} type="text" placeholder="e.g. Google" />
                  <p style={{ fontSize: '0.75rem', color: '#5f6368', marginTop: '0.25rem' }}>Name of your Company, Employer, or School</p>
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h3 className={styles.label} style={{ marginBottom: '1rem' }}>Select your interests</h3>
                <p className={styles.stepSubtitle} style={{ marginBottom: '1.5rem' }}>
                  This will help us provide you with the most relevant I/O content.
                </p>
                <InterestTags selectedInterests={data.interests} toggleInterest={toggleInterest} />
                <a href="#" style={{ display: 'block', marginTop: '1rem', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'underline' }}>See all</a>
              </div>

              <p style={{ fontSize: '0.75rem', color: '#5f6368', marginTop: '2rem', lineHeight: '1.4' }}>
                By creating a Google developer profile, you agree to the Content Policy, Google's Terms of Service and Privacy Policy apply to your use of this service. Your display name, organization, role, and interests will be used in your profile, along with the location entered in registration. Your display name may appear where you contribute and can be changed at any time.
              </p>

              <button 
                type="button" 
                onClick={handleProfileAndInterestsNext} 
                className={styles.nextButton}
                style={{ background: '#000000', color: '#ffffff', width: 'fit-content', paddingLeft: '3rem', paddingRight: '3rem', marginTop: '1rem' }}
              >
                Next
              </button>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h2 className={styles.stepTitle}>Terms</h2>
            <div className={styles.termsList}>
              <div className={styles.checkboxItem} onClick={() => updateData({ termsAgreed: !data.termsAgreed })}>
                <div className={`${styles.checkbox} ${data.termsAgreed ? styles.checkboxChecked : ''}`}></div>
                <span>I am 18 years of age or older. <span className={styles.labelRequired}>*</span></span>
              </div>
              <div className={styles.checkboxItem} onClick={() => updateData({ agreeToTerms: !data.agreeToTerms })}>
                <div className={`${styles.checkbox} ${data.agreeToTerms ? styles.checkboxChecked : ''}`}></div>
                <span>I agree to I/O 2026 Terms and Conditions, including Google Terms and Community Guidelines. <span className={styles.labelRequired}>*</span></span>
              </div>
              <div className={styles.checkboxItem} onClick={() => updateData({ marketingConsent: !data.marketingConsent })}>
                <div className={`${styles.checkbox} ${data.marketingConsent ? styles.checkboxChecked : ''}`}></div>
                <span>I would like to receive marketing and events emails and updates about Google I/O.</span>
              </div>
            </div>
            <div style={{ marginTop: '2rem' }}>
              <button 
                type="button" 
                disabled={!data.termsAgreed || !data.agreeToTerms} 
                onClick={onNext} 
                className={styles.nextButton}
              >
                Register
              </button>
            </div>
          </>
        );

      case 3:
        return <BadgeSuccess />;

      default:
        return null;
    }
  };

  return <div className={styles.content}>{renderStep()}</div>;
};
