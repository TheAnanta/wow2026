import React from 'react';

const attendees = [
  { name: "Students", desc: "Kickstart your tech career, learn from experts, and build your network.", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800", gradient: "from-[#FBBC04] to-[#34A853]" },
  { name: "Developers", desc: "Deep dive into the latest technologies, frameworks, and best practices.", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800", gradient: "from-[#4285F4] to-[#EA4335]" },
  { name: "Marketing", desc: "Explore the intersection of digital marketing, AI, and user experience.", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800", gradient: "from-[#34A853] to-[#4285F4]" },
  { name: "Startups", desc: "Connect with investors, find co-founders, and scale your product.", image: "https://payu.in/blog/wp-content/uploads/2022/08/startup.png", gradient: "from-[#FBBC04] to-[#EA4335]" },
  { name: "Recruiters", desc: "Meet top talent and build your next generation engineering teams.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800", gradient: "from-[#4285F4] to-[#34A853]" },
  { name: "Tech Enthusiasts", desc: "Immerse yourself in a 30-hour festival of pure innovation and tech vibes.", image: "/images/tech_enthusiasts.jpg", gradient: "from-[#34A853] to-[#FBBC04]" },
  { name: "Influencers", desc: "Create content, share stories, and engage with a massive tech community.", image: "https://www.livemint.com/lm-img/img/2026/05/03/1600x900/logo/insta360_flow_pro_2_1742531114371_1777811273478.jpg", gradient: "from-[#34A853] to-[#4285F4]" },
  { name: "Researchers", desc: "Present your findings and collaborate on cutting-edge technological research.", image: "https://media.nature.com/lw767/magazine-assets/d41586-025-00343-5/d41586-025-00343-5_50595186.jpg", gradient: "from-[#EA4335] to-[#34A853]" },
  { name: "Freelancers", desc: "Network with potential clients, learn new skills, and grow your solo business.", image: "https://wpblogassets.paytm.com/paytmblog/uploads/2023/10/Blog_Paytm_Income-Tax-Guide-for-Freelancers-1.jpg", gradient: "from-[#FBBC04] to-[#EA4335]" }
];

export const WhoCanAttendWOW = () => {
  return (
    <section className="py-20 md:py-32 bg-white dark:bg-grey-900 overflow-hidden">
      <div className="page-wrapper">
        <h2 className="text-4xl md:text-5xl font-bold text-[#1b1b21] dark:text-[#e2e2e9] mb-12 tracking-tight text-center">
          Who can attend WOW?
        </h2>

        {/* Featured Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
          {attendees.map((attendee, index) => (
            <div
              key={index}
              className="relative h-[320px] md:h-[400px] w-full rounded-[24px] md:rounded-[32px] overflow-hidden border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg group"
            >
              {/* Background Image */}
              <img
                src={attendee.image}
                alt={attendee.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Card Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-start z-10">
                {/* Gradient Chip with Black Border */}
                <div
                  className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${attendee.gradient} text-[#1b1b21] font-bold text-sm mb-4 border border-[#1b1b21] shadow-sm tracking-wide`}
                >
                  {attendee.name}
                </div>

                {/* Descriptive Text */}
                <p className="text-white text-sm md:text-[15px] font-medium leading-relaxed drop-shadow-md">
                  {attendee.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
