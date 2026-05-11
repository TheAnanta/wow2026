'use client';

import React from 'react';
import { RegistrationForm } from '../../components/registration/RegistrationForm';
import { Header } from '../../components/sections/Header';

export default function RegisterPage() {
  return (
    <div className="w-full min-h-screen bg-transparent transition-colors duration-300">
      <main className="w-full">
        <React.Suspense fallback={
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--m-primary)', borderTopColor: 'transparent' }}></div>
          </div>
        }>
          <RegistrationForm />
        </React.Suspense>
      </main>


      <style jsx global>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
