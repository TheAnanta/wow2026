'use client';

import React from 'react';

const TierCard: React.FC<{
  name: string;
  price: React.ReactNode;
  buttonText: string;
  features: React.ReactNode[];
  isRecommended?: boolean;
  pricingSubtext?: React.ReactNode;
  badge?: React.ReactNode;
}> = ({ name, price, buttonText, features, isRecommended, pricingSubtext, badge }) => {
  return (
    <div
      className="flex flex-col h-full bg-white dark:bg-[#191c21] rounded-[16px]"
      style={{
        borderTop: isRecommended ? '3px solid #4285F4' : '1px solid #dadce0',
        borderRight: isRecommended ? '3px solid #EA4335' : '1px solid #dadce0',
        borderBottom: isRecommended ? '3px solid #FBBC04' : '1px solid #dadce0',
        borderLeft: isRecommended ? '3px solid #34A853' : '1px solid #dadce0',
        overflow: 'hidden'
      }}
    >
      <div className="text-center">
        {(isRecommended || badge) && (
          <div className="pt-4 pb-2">
            {isRecommended ? (
              <span className="text-[14px] text-[#2c5fd9] dark:text-[#adc6ff]">
                Recommended
              </span>
            ) : (
              badge
            )}
          </div>
        )}
        <div className={`${isRecommended || badge ? 'pb-4 pt-1' : 'py-8'} px-4`}>
          <p className="text-base text-[#1b1b21] dark:text-[#e2e2e9] mb-1">
            {name}
          </p>
          <p className={`${isRecommended ? 'text-[28px]' : 'text-2xl'} font-bold text-[#1b1b21] dark:text-[#e2e2e9] mb-1`}>
            {price}
          </p>
          {pricingSubtext && (
            <div className="mb-4 text-[12px] text-[#46464f] dark:text-[#c6c6d0]">
              {pricingSubtext}
            </div>
          )}
          <a
            href="#"
            className={`inline-block text-sm font-semibold px-6 py-2.5 rounded-full transition-all ${isRecommended ? 'bg-[#2c5fd9] text-white shadow-sm' : 'border border-[#dadce0] dark:border-[#46464f] text-[#2c5fd9] dark:text-[#adc6ff]'}`}
          >
            {buttonText}
          </a>
        </div>
      </div>

      <div className="px-5">
        <hr className="border-0 border-t border-[#e0e0e0] dark:border-[#46464f] m-0" />
      </div>

      <div className="p-5 text-[13px] text-[#46464f] dark:text-[#c6c6d0] leading-[1.8] text-left flex-1">
        {features.map((feature, idx) => (
          <div key={idx} className="mb-1 flex items-start">
            <span className="text-[#2c5fd9] dark:text-[#adc6ff] font-bold mr-2.5">✓</span>
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
};

export const RegistrationTiers = () => {
  return (
    <section className="pb-20 bg-white dark:bg-grey-900 overflow-hidden">
      <div className="page-wrapper">
        <h2 className="text-4xl md:text-5xl font-bold text-[#1b1b21] dark:text-[#e2e2e9] mb-16 tracking-tight text-center">
          How do I register for WOW?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          <TierCard
            name="Basic"
            price="₹1,200"
            buttonText="Get started"
            features={[
              "15+ Hands-on Workshops",
              "72+ Talks",
              <span key="hackathon" className="underline underline-offset-2">Hackathon</span>,
              "AI Playgrounds",
              "Arcade Zone",
              "Lunch & Refreshments",
              "Exclusive Premium Swag Kit",
              <span key="career-zone"><span className="underline underline-offset-2">Career Zone</span> & Job Mentoring</span>,
              <span key="startup" className="underline underline-offset-2">Startup Showcase</span>,
              <span key="investors" className="underline underline-offset-2">Investors Meet</span>,
              "Community Networking"
            ]}
          />
          <TierCard
            name="WOW+"
            price="₹350*"
            buttonText="Get started"
            isRecommended
            pricingSubtext={
              <>
                *Pay ₹0-₹600 later based on your score. <a href="#" className="text-[#2c5fd9] font-medium hover:underline">Know more</a>
              </>
            }
            features={[
              <span key="cert">140+ hr of <span className="underline underline-offset-2">online certification courses</span></span>,
              "Access to leaderboards, badges & virtual games",
              "Upto 100% refund on ticket",
              <span key="priority-hackathon">Priority <span className="underline underline-offset-2">Hackathon</span> Entry</span>,
              "1:1 Mentoring with GDEs",
              "15+ Hands-on Workshops",
              "72+ Talks",
              "AI Playgrounds",
              "Arcade Zone",
              "Community Networking",
              "Exclusive Premium Swag Kit",
              <span key="career-zone"><span className="underline underline-offset-2">Career Zone</span> & Job Mentoring</span>,
              <span key="startup" className="underline underline-offset-2">Startup Showcase</span>,
              <span key="investors" className="underline underline-offset-2">Investors Meet</span>,
              "Lunch & Refreshments",
            ]}
          />
          <TierCard
            name="Group Pass"
            badge={
              <div className="inline-flex items-center gap-1.5 bg-[#e6f4ea] text-[#137333] dark:bg-[#137333]/20 dark:text-[#81c995] px-3 py-1 rounded-full">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <circle cx="7" cy="7" r="2"></circle>
                </svg>
                <span className="text-[12px] font-medium tracking-wide">Discounted price</span>
              </div>
            }
            price={
              <span className="flex items-center justify-center">
                <span className="text-xl line-through text-[#767680] font-normal mr-2">₹6,000</span>
                ₹4,000
              </span>
            }
            pricingSubtext={
              <span className="text-[#137333] dark:text-[#81c995]">Save 33% with Group Pass.</span>
            }
            buttonText="Get started"
            features={[
              "Access for 5 People",
              "Save ₹2000 on total",
              "15+ Hands-on Workshops",
              "72+ Talks",
              <span key="hackathon" className="underline underline-offset-2">Hackathon</span>,
              "AI Playgrounds",
              "Arcade Zone",
              "Lunch & Refreshments",
              "Exclusive Premium Swag Kit",
              <span key="career-zone"><span className="underline underline-offset-2">Career Zone</span> & Job Mentoring</span>,
              <span key="startup" className="underline underline-offset-2">Startup Showcase</span>,
              <span key="investors" className="underline underline-offset-2">Investors Meet</span>,
              "Community Networking"
            ]}
          />
        </div>
      </div>
    </section>
  );
};
