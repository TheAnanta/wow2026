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
    if (currentStep === 3) {
      setIsSubmitting(true);
      try {
        const result = await submitRegistration(data);
        if (result.success) {
          setCurrentStep(4);
        } else {
          setErrorType('signin'); // Simulated sign-in error
        }
      } catch (err) {
        setErrorType('account'); // Simulated account error
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
        {!errorType && currentStep < 4 && (
          <div className={styles.header}>
            <h2 className={styles.headerTitle}>Register for I/O</h2>
            <button className={styles.closeButton} onClick={onClose} aria-label="Close">
              &times;
            </button>
          </div>
        )}

        {/* Global Progress Graphic Area */}
        {!errorType && currentStep < 4 && (
          <div className={styles.banner}>
            <div className={styles.bannerGraphic}>
              {/* Simple CSS Graphic Placeholder */}
              <div style={{
                width: '60px',
                height: '60px',
                border: '2px solid black',
                borderRadius: '50%',
                background: 'var(--primary-gradient)',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  width: '30px',
                  height: '30px',
                  border: '2px solid black',
                  background: 'white'
                }}></div>
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
          />
        )}

        {/* Mobile Close Button for full-screen states if needed */}
        {(errorType || currentStep === 4) && (
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
