'use client';

import React from 'react';
import { RegistrationForm } from '../../../components/registration/RegistrationForm';
import { Header } from '../../../components/sections/Header';

export default function RegisterPage() {
  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] dark:bg-grey-900! text-grey-900 dark:text-white flex flex-col transition-colors duration-300">
      <Header onRegisterClick={() => { }} />

      <main className="flex-1 flex flex-col items-center py-0 md:py-16 px-0 md:px-6">
        <div className="w-full md:max-w-[800px] bg-white dark:bg-grey-800! md:rounded-2xl md:border border-grey-200 dark:border-grey-700 md:shadow-sm overflow-hidden animate-slide-up">
          <RegistrationForm />
        </div>
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
