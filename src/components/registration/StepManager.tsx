// src/components/registration/StepManager.tsx
import React, { useState } from 'react';
import styles from './Registration.module.css';
import { InterestTags } from './InterestTags';
import { BadgeSuccess } from './BadgeSuccess';
import { RegistrationData, validateProfile } from '../../services/registrationStubs';

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

  const handleProfileNext = () => {
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
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className={styles.stepTitle}>Create a developer profile</h2>
            <p className={styles.stepSubtitle}>
              Create a developer profile to get recommendations for the best I/O sessions and content for you.
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
                <p className={styles.error}>Your name may appear where you contribute and can be changed at any time.</p>
              </div>

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

              <div className={styles.formGroup}>
                <label className={styles.label}>Role or job title <span className={styles.labelRequired}>*</span></label>
                <input 
                  className={styles.input} 
                  type="text" 
                  value={data.role} 
                  onChange={(e) => updateData({ role: e.target.value })}
                  placeholder="e.g. Software Engineer"
                />
                {errors.role && <p className={styles.error}>{errors.role}</p>}
              </div>

              <button type="button" onClick={handleProfileNext} className={styles.nextButton}>Next</button>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h2 className={styles.stepTitle}>Select your interests</h2>
            <p className={styles.stepSubtitle}>
              This will help us provide you with the most relevant I/O content.
            </p>
            <InterestTags selectedInterests={data.interests} toggleInterest={toggleInterest} />
            <div style={{ marginTop: '2rem' }}>
              <button type="button" onClick={onNext} className={styles.nextButton}>Next</button>
            </div>
          </>
        );

      case 3:
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

      case 4:
        return <BadgeSuccess />;

      default:
        return null;
    }
  };

  return <div className={styles.content}>{renderStep()}</div>;
};
