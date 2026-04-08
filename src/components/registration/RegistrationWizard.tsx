// src/components/registration/RegistrationWizard.tsx
'use client';

import React, { useState } from 'react';
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
  organization: '',
  phoneNumber: ''
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
    <div className="fixed inset-0 w-screen h-screen bg-black/40 backdrop-blur-[8px] flex justify-center items-center z-[1000] overflow-y-auto">
      <div className="bg-white w-full max-w-[600px] max-h-[94vh] rounded-xl border border-[#000000] relative flex flex-col overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.2)] max-md:max-h-full max-md:rounded-none max-md:border-none">

        {/* Header */}
        {!errorType && currentStep < 3 && (
          <div className="px-8 py-6 flex justify-between items-center bg-white z-10">
            <h2 className="text-2xl font-medium text-[#202124]">Register for WOW</h2>
            <button
              className="bg-transparent border-none text-2xl cursor-pointer w-8 h-8 flex justify-center items-center transition-opacity duration-200 hover:opacity-60"
              onClick={onClose}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        )}

        {/* Banner */}
        {!errorType && currentStep < 3 && (
          <div
            className="h-[140px] relative flex justify-center items-end border-t border-b border-[#000000]"
            style={{ background: 'linear-gradient(135deg, #a4f21d 0%, #00ffff 33%, #4169e1 66%, #ff00ff 100%)' }}
          >
            <div className="w-[280px] h-[140px] bg-white border border-[#000000] border-b-0 rounded-tl-[140px] rounded-tr-[140px] flex justify-center items-center relative translate-y-[1px]">
              {/* Abstract Google WOW Shapes */}
              <div className="relative w-full h-full flex justify-center items-center">
                <div style={{
                  position: 'absolute', bottom: '0',
                  width: '200px', height: '100px',
                  background: 'conic-gradient(from 180deg at 50% 100%, #8BC34A, #FFEB3B, #FF9800, #F44336, #9C27B0, #2196F3, #00BCD4)',
                  borderRadius: '100px 100px 0 0', opacity: 0.8
                }} />
                <div style={{ position: 'absolute', top: '10px', left: '60px', width: '30px', height: '30px', background: '#f1f3f4', border: '1px solid black', clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }} />
                <div style={{ position: 'absolute', top: '40px', left: '100px', width: '24px', height: '24px', background: 'white', border: '1px solid black', transform: 'rotate(15deg)' }} />
                <div style={{ position: 'absolute', top: '15px', right: '70px', fontSize: '24px' }}>✨</div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {errorType ? (
          <div className="flex-1 px-12 py-10 overflow-y-auto flex flex-col">
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

        {/* Mobile Close Button for full-screen states */}
        {(errorType || currentStep === 3) && (
          <button
            className="bg-transparent border-none text-2xl cursor-pointer w-8 h-8 flex justify-center items-center absolute top-5 right-5"
            onClick={onClose}
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
};
