import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { RankCard } from '../payment/CheckoutCards';
import '../payment/checkout.css';

export const HowWOWPlusWorks = () => {
  const { tickets } = useAuth();
  const [showCalculator, setShowCalculator] = useState(false);
  const [rank, setRank] = useState(1500);

  const hasArcade = tickets?.some((t: any) =>
    (t.tier?.name || t.name || "").toLowerCase().includes("arcade") ||
    (t.tier?.name || t.name || "").toLowerCase().includes("wow")
  );

  const steps = [
    {
      title: "Pay ₹350 now",
      description: "Before 25th May",
      number: "1",
      button: hasArcade
        ? { text: "Paid", link: "#", isPaid: true }
        : { text: "Pay now", link: "/register?tier=wowplus" }
    },
    {
      title: "Attend online workshops\nand play games",
      description: "May 18 - June 18",
      number: "2",
      button: hasArcade ? { text: "Go to Arcade", link: "/arcade" } : undefined
    },
    {
      title: "Score points",
      description: "Every week",
      number: "3",
      button: hasArcade ? { text: "View profile", link: "/profile" } : undefined
    },
    {
      title: "Win a league",
      description: "18th June",
      number: "4",
      button: { text: "Calculate Pay Later", onClick: () => setShowCalculator(true) }
    },
    {
      title: "Pay rest & get WOW pass",
      description: "Before 25th June",
      number: "5",
    }
  ];
  return (
    <section id="how-wow-plus-works" className="pb-20 md:pb-32 bg-white dark:bg-grey-900 overflow-hidden px-4">
      <div className="max-w-5xl mx-auto bg-white dark:bg-[#191c21] rounded-[24px] shadow-sm relative overflow-hidden"
        style={{
          borderTop: '3px solid #4285F4',
          borderRight: '3px solid #EA4335',
          borderBottom: '3px solid #FBBC04',
          borderLeft: '3px solid #34A853',
        }}
      >
        <div className="p-8 md:p-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1b1b21] dark:text-[#e2e2e9] tracking-tight">
              {hasArcade ? "Welcome to WOW+" : "How does WOW+ work?"}
            </h2>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between relative z-10">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-[24px] left-[60px] right-[60px] h-[2px] bg-[#dadce0] dark:bg-[#46464f] z-0"></div>

            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center relative group w-full md:w-[180px] mb-8 md:mb-0">

                {/* Number Circle */}
                <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center mb-0 md:mb-5 text-lg font-bold bg-white dark:bg-[#191c21] text-[#2c5fd9] dark:text-[#adc6ff] border-2 border-[#dadce0] dark:border-[#46464f] relative z-10 shrink-0 mr-5 md:mr-0">
                  {step.number}
                </div>

                {/* Text Content */}
                <div className="flex flex-col flex-1 pt-2 md:pt-0 items-start md:items-center">
                  <h3 className="text-[15px] font-bold text-[#1b1b21] dark:text-[#e2e2e9] mb-1.5 leading-tight whitespace-pre-line">
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="text-[13.5px] text-[#46464f] dark:text-[#c6c6d0]">
                      {step.description}
                    </p>
                  )}
                  {step.button && (
                    <div className="mt-4">
                      {step.button.isPaid ? (
                        <span className="inline-block text-[13px] font-bold px-5 py-2 bg-[#dadce0] dark:bg-[#46464f] text-[#767680] dark:text-[#9aa0a6] rounded-full cursor-not-allowed shadow-none border border-[#dadce0] dark:border-[#46464f]">
                          {step.button.text}
                        </span>
                      ) : step.button.onClick ? (
                        <button
                          onClick={step.button.onClick}
                          className="inline-block text-[13px] font-bold px-5 py-2 bg-[#2c5fd9] text-white rounded-full hover:bg-[#1a4bba] transition-colors shadow-sm cursor-pointer border-0"
                        >
                          {step.button.text}
                        </button>
                      ) : (
                        <a href={step.button.link} className="inline-block text-[13px] font-bold px-5 py-2 bg-[#2c5fd9] text-white rounded-full hover:bg-[#1a4bba] transition-colors shadow-sm">
                          {step.button.text}
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Vertical Connector for Mobile */}
                {idx !== steps.length - 1 && (
                  <div className="md:hidden absolute left-[23px] top-[48px] bottom-[-32px] w-[2px] bg-[#dadce0] dark:bg-[#46464f] z-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rank Calculator Modal */}
      {showCalculator && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] animate-fade-in cursor-pointer"
          onClick={() => setShowCalculator(false)}
        >
          <div
            className="checkout-root w-full max-w-[580px] cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <RankCard
              rank={rank}
              setRank={setRank}
              interactive={true}
              brand="WOW"
              disabled={false}
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.25s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
};
