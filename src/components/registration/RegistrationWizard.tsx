// src/components/registration/RegistrationWizard.tsx
'use client';

import React, { useState } from 'react';
import styles from './Registration.module.css';
import { StepManager } from './StepManager';
import { ErrorOverlay } from './ErrorOverlays';
import { RegistrationData, submitRegistration } from '../../services/registrationStubs';

interface RegistrationWizardProps {
  onClose: () => void;
}

const initialData: RegistrationData = {
  displayName: '',
  pronoun: '',
  cityTown: '',
  role: '',
  interests: [],
  termsAgreed: false,
  agreeToTerms: false,
  marketingConsent: false,
};

export const RegistrationWizard: React.FC<RegistrationWizardProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<RegistrationData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorType, setErrorType] = useState<'signin' | 'account' | null>(null);

  const updateData = (updates: Partial<RegistrationData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = async () => {
    if (currentStep === 2) {
      setIsSubmitting(true);
      try {
        const result = await submitRegistration(data);
        if (result.success) {
          window.dispatchEvent(new CustomEvent('registrationSuccess'));
          setCurrentStep(3);
        } else {
          setErrorType('signin');
        }
      } catch (err) {
        setErrorType('account');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };


  const handleTryAgain = () => {
    setErrorType(null);
    setCurrentStep(1);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header (not visible on success/error states according to some screens) */}
        {!errorType && currentStep < 3 && (
          <div className={styles.header}>
            <h2 className={styles.headerTitle}>Register for I/O</h2>
            <button className={styles.closeButton} onClick={onClose} aria-label="Close">
              &times;
            </button>
          </div>
        )}

        {/* Global Progress Graphic Area */}
        {!errorType && currentStep < 3 && (
          <div className={styles.banner}>
            <div className={styles.bannerGraphic}>
              {/* Abstract Google I/O Shapes per screenshot */}
              <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* Fan Spectrum */}
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  width: '200px',
                  height: '100px',
                  background: 'conic-gradient(from 180deg at 50% 100%, #8BC34A, #FFEB3B, #FF9800, #F44336, #9C27B0, #2196F3, #00BCD4)',
                  borderRadius: '100px 100px 0 0',
                  opacity: 0.8
                }}></div>
                {/* Pentagon */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '60px',
                  width: '30px',
                  height: '30px',
                  background: '#f1f3f4',
                  border: '1px solid black',
                  clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
                }}></div>
                {/* Square */}
                <div style={{
                  position: 'absolute',
                  top: '40px',
                  left: '100px',
                  width: '24px',
                  height: '24px',
                  background: 'white',
                  border: '1px solid black',
                  transform: 'rotate(15deg)'
                }}></div>
                {/* Star/Pencil Sparkle */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '70px',
                  fontSize: '24px'
                }}>✨</div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Areas */}
        {errorType ? (
          <div className={styles.content}>
            <ErrorOverlay type={errorType} onTryAgain={handleTryAgain} />
          </div>
        ) : (
          <StepManager 
            currentStep={currentStep} 
            data={data} 
            updateData={updateData} 
            onNext={handleNext} 
            onPrevious={handlePrevious} 
            onClose={onClose}
          />
        )}

        {/* Mobile Close Button for full-screen states if needed */}
        {(errorType || currentStep === 3) && (
          <button 
            className={styles.closeButton} 
            style={{ position: 'absolute', top: '20px', right: '20px' }} 
            onClick={onClose}
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
};
