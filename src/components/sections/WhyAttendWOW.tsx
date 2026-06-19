'use client';

import React from 'react';

const CARD_GRADIENTS = [
  'linear-gradient(90deg, rgb(66,133,244) -36.98%, rgb(66,133,244) 22.31%, rgb(52,168,83) 78.95%, rgb(52,168,83) 132.93%)',
  'linear-gradient(270deg, rgb(255,203,50) 6.94%, rgb(255,203,50) 27.99%, rgb(52,168,83) 73.59%, rgb(52,168,83) 94.64%)',
  'linear-gradient(90deg, rgb(255,203,50) -0.15%, rgb(255,203,50) 17.85%, rgb(244,104,49) 52.85%, rgb(234,67,53) 78.85%, rgb(234,67,53) 99.85%)',
  'linear-gradient(270deg, rgb(83,130,235) 1.91%, rgb(83,130,235) 25.69%, rgb(159,108,212) 51.37%, rgb(234,67,53) 79.9%, rgb(234,67,53) 97.02%)',
];

const reasons = [
  { text: "Upto 2L in cash prize*" },
  // { text: "Meet 36+ Google Experts" },
  { text: "Certificates for all" },
  { text: "Learn AICTE approved courses" },
  { text: "I Am Remarkable workshop" },
  { text: "Google Gemini Cricket Arcade" },
  { text: "72+ talks" },
  { text: "15+ workshops" },
  { text: "Be ready with Career Dreamer" },
  { text: "Generative AI upskilling" },
  { text: "Building startups from scratch" },
  { text: "Get funding for your ideas" },
];

const featuredReasons = [
  {
    title: "Massive Networking",
    description: "Connect with a community of 2,000+ developers and students from 36+ Google on Campus chapters.",
    image: "https://cdn.prod.website-files.com/5fb3c15a6d283576bfb75ffa/661569422c51ab945dc3ae09_blog%20post%20images-2.png"
  },
  {
    title: "Professional Opportunities",
    description: "Skip the traditional application process by networking directly with recruiters at the Career Zone.",
    image: "https://www.gstatic.com/marketing-cms/assets/images/cc/14/f49c99284b6aa4891078c85aa934/osvwtiuoqee-wgntfgmoce5klrr-zhtg66hkrmwueniyb0aazrbr5irgimdpez1g-jpuqcb2pmjhiq0hwcncvztbnmdcvdxbq9-w9w3fsu5ja-qdmho.webp=n-w543-h422-fcrop64=1,000004a8fffffb58-rw"
  },
  {
    title: "Food",
    description: "Fuel your innovation with a variety of gourmet lunch options, snacks, and unlimited coffee.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Swags",
    description: "Take home exclusive GDG WOW 2026 merchandise, limited-edition tech accessories, and premium event kits.",
    image: "https://fangledgifting.com/cdn/shop/files/WhatsApp_Image_2024-08-09_at_17.41.00.jpg?v=1723206432"
  }
];

const WhyAttendCard: React.FC<{ title: string; description: string; image: string; gradientIndex: number }> = ({ title, description, image, gradientIndex }) => {
  const gradient = CARD_GRADIENTS[gradientIndex % CARD_GRADIENTS.length];

  return (
    <div className="flex flex-col h-full">
      <div className="relative h-[240px] md:h-[280px] mb-10">
        {/* Single Shadow Card (Following WhatIsWOW style) */}
        <div
          style={{ backgroundImage: gradient }}
          className="absolute w-full h-full top-[12px] md:top-[20px] rounded-[24px] md:rounded-[32px] border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg bg-cover z-0"
        />

        {/* Front Card - Full Image */}
        <div className="absolute inset-0 bg-white dark:bg-grey! w-full h-full rounded-[24px] md:rounded-[32px] border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg z-10 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xl md:text-2xl font-bold text-grey-900 dark:text-white tracking-tight leading-tight">{title}</h3>
        <p className="text-grey-700 dark:text-grey-text text-base md:text-lg leading-snug">{description}</p>
      </div>
    </div>
  );
};

export const WhyAttendWOW = () => {
  return (
    <section className="pt-10 bg-white dark:bg-grey-900 overflow-hidden">
      <div className="page-wrapper">
        <h2 className="text-5xl md:text-7xl font-medium text-grey-900 dark:text-white mb-20 tracking-tighter text-center">
          Why attend WOW?
        </h2>

        {/* Featured Vertical Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mb-24">
          {featuredReasons.map((reason, index) => (
            <WhyAttendCard
              key={index}
              title={reason.title}
              description={reason.description}
              image={reason.image}
              gradientIndex={index}
            />
          ))}
        </div>

        {/* Thick Border Chip Cloud (Reference Style) */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-5 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="px-4 py-2 md:px-8 md:py-3 rounded-full bg-white dark:bg-white text-grey-900 border-2 md:border-[3px] border-grey-900 dark:border-grey-900 shadow-none hover:bg-grey-50 transition-colors cursor-default"
            >
              <span className="text-sm sm:text-base md:text-xl font-bold tracking-tight">{reason.text}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-10">
          <span className="text-lg md:text-2xl font-bold text-grey-900 dark:text-white">
            and many more...
          </span>
        </div>

        <p className="text-center text-grey-500 dark:text-grey-text mt-20 text-sm italic">
          *Terms and conditions apply. Some benefits may be exclusive to specific ticket tiers.
        </p>
      </div>
    </section>
  );
};
