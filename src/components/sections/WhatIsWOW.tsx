'use client';

import React from 'react';

const CARD_GRADIENTS = [
  'linear-gradient(90deg, rgb(66,133,244) -36.98%, rgb(66,133,244) 22.31%, rgb(52,168,83) 78.95%, rgb(52,168,83) 132.93%)',
  'linear-gradient(270deg, rgb(255,203,50) 6.94%, rgb(255,203,50) 27.99%, rgb(52,168,83) 73.59%, rgb(52,168,83) 94.64%)',
  'linear-gradient(90deg, rgb(255,203,50) -0.15%, rgb(255,203,50) 17.85%, rgb(244,104,49) 52.85%, rgb(234,67,53) 78.85%, rgb(234,67,53) 99.85%)',
  'linear-gradient(270deg, rgb(83,130,235) 1.91%, rgb(83,130,235) 25.69%, rgb(159,108,212) 51.37%, rgb(234,67,53) 79.9%, rgb(234,67,53) 97.02%)',
];

interface WOWCardProps {
  title: string;
  description: string;
  image: string;
  className?: string;
  gradientIndex: number;
}

const WOWCard: React.FC<WOWCardProps> = ({ title, description, image, className, gradientIndex }) => {
  const gradient = CARD_GRADIENTS[gradientIndex % CARD_GRADIENTS.length];

  return (
    <div className={`relative ${className} h-[180px] md:h-[520px] mb-6 md:mb-12`}>
      {/* Shadow cards with Google gradients */}
      <div
        style={{ backgroundImage: gradient }}
        className="absolute w-full h-full top-[16px] md:top-[24px] rounded-[24px] md:rounded-[32px] border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg bg-cover opacity-80"
      />
      <div
        style={{ backgroundImage: gradient }}
        className="absolute w-full h-full top-[8px] md:top-[12px] rounded-[24px] md:rounded-[32px] border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg bg-cover opacity-90"
      />

      {/* Front card */}
      <div className="absolute inset-0 bg-white dark:bg-[#1B1B21] w-full h-full rounded-[24px] md:rounded-[32px] border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg z-10 overflow-hidden flex flex-row md:flex-col">
        {/* Image - Beside text on mobile, on top on desktop */}
        <div className="w-[35%] md:w-full h-full md:h-[240px] relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Text - Beside image on mobile, below on desktop */}
        <div className="flex-1 p-5 md:p-8 flex flex-col justify-center md:justify-start">
          <h3 className="text-xl md:text-4xl font-medium text-grey-900 dark:text-white mb-2 md:mb-4 tracking-tighter leading-tight">
            {title}
          </h3>
          <p className="text-[13px] md:text-lg text-grey-700 dark:text-grey-text leading-tight md:leading-snug font-normal">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export const WhatIsWOW = () => {
  const items = [
    {
      title: "Conferences",
      description: "High-impact technical sessions and keynotes delivered by 50+ Google Developer Experts (GDEs).",
      image: "/images/wow-conference.png"
    },
    {
      title: "Hackathon",
      description: "A 20-hour high-stakes build-fest with a ₹2,00,000 prize pool starting on the evening of July 4th.",
      image: "/images/wow-hackathon.png"
    },
    {
      title: "Career Zone",
      description: "A dedicated space featuring 20+ job stalls and 1:1 career mentoring opportunities.",
      image: "/images/wow-career.png"
    },
    {
      title: "Arcade Zone",
      description: "Interactive futuristic gaming zones and exclusive Pixel 9 photo booths for all attendees.",
      image: "/images/wow-arcade.png"
    },
    {
      title: "Startup Showcase",
      description: "Pitch your ideas, explore innovative solutions from emerging startups, and connect with potential investors.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Google Experts",
      description: "Meet and learn from Google engineers and product leaders directly in specialized mentoring sessions.",
      image: "https://miro.medium.com/v2/resize:fit:1400/1*C1c-gLXa6o1fvbhGIeiovg.jpeg"
    },
    {
      title: "Workshops",
      description: "Deep-dive into the latest Google technologies with guided, practical coding sessions led by industry pros.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000"
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

  return (
    <section className="pt-20 md:pt-16 overflow-hidden">
      <div className="page-wrapper">
        <h2 className="text-5xl md:text-7xl font-medium text-grey-900 dark:text-white mb-8 tracking-tighter text-center">
          What is WOW?
        </h2>

        <p className="max-w-4xl mx-auto text-xl md:text-2xl text-grey-700 dark:text-grey-text text-center mb-16 leading-relaxed">
          Brought to life by a massive network of 36 Google Developer Groups on Campus (GDGoCs), it is a high-octane, two-day festival (July 4–5) designed to be entirely interactive, immersive, and competitive.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-x-8 md:gap-y-8">
          {items.map((item, index) => (
            <WOWCard
              key={index}
              title={item.title}
              description={item.description}
              image={item.image}
              gradientIndex={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
