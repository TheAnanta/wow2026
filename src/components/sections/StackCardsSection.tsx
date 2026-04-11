// src/components/sections/StackCardsSection.tsx

interface StackCard {
  href: string;
  label: string;
  ariaLabel: string;
  gradient: string;
  lightImg: string;
  darkImg: string;
  imgWidth: number;
  imgHeight: number;
  description: string;
  analyticsEvent: string;
}

const STACK_CARDS: StackCard[] = [
  {
    href: '/explore?q=mobile',
    label: 'Mobile',
    ariaLabel: 'Explore Mobile content, opens Explore page with Mobile content filter',
    gradient: 'linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)',
    lightImg: '/images/io24-stacks-m.svg',
    darkImg: '/images/io24-stacks-m-dark.webp',
    imgWidth: 316,
    imgHeight: 170,
    description: 'Develop for a range of audiences and form factors.',
    analyticsEvent: 'mobile',
  },
  {
    href: '/explore/?q=web',
    label: 'Web',
    ariaLabel: 'Explore Web content, opens Explore page with Web content filter',
    gradient: 'linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)',
    lightImg: '/images/io24-stacks-w.svg',
    darkImg: '/images/io24-stacks-w-dark.webp',
    imgWidth: 316,
    imgHeight: 170,
    description: 'Create fast, secure sites and apps for the open web.',
    analyticsEvent: 'web',
  },
  {
    href: '/explore/?q=ai',
    label: 'ML/AI',
    ariaLabel: 'Explore ML/AI content, opens Explore page with AI content filter',
    gradient: 'linear-gradient(90deg, #FFCB32 -0.15%, #FFCB32 17.85%, #F46831 52.85%, #EA4335 78.85%, #EA4335 99.85%)',
    lightImg: '/images/io24-stacks-a.png',
    darkImg: '/images/io24-stacks-a-dark.webp',
    imgWidth: 316,
    imgHeight: 170,
    description: 'Access cutting-edge AI models and open source tools for machine learning.',
    analyticsEvent: 'ai',
  },
  {
    href: '/explore/?q=cloud',
    label: 'Cloud',
    ariaLabel: 'Explore Cloud content, opens Explore page with Cloud content filter',
    gradient: 'linear-gradient(270.11deg, #5382EB 1.91%, #5382EB 25.69%, #9F6CD4 51.37%, #EA4335 79.9%, #EA4335 97.02%)',
    lightImg: '/images/io24-stacks-c.svg',
    darkImg: '/images/io24-stacks-c-dark.webp',
    imgWidth: 316,
    imgHeight: 170,
    description: 'Simplify and scale end-to-end development.',
    analyticsEvent: 'cloud',
  },
];

export function StackCardsSection() {
  return (
    <div className="page-wrapper flex flex-col pt-0! pb-0!">
      <div className="flex flex-col mt-8 md:mt-10 mb-4 md:mb-0">
        <span className="sm:s-h4 md:l-h3">What are you building for?</span>
        <div className="grid grid-cols-1 md:grid-cols-2 ml:grid-cols-4 md:justify-around ml:justify-between gap-y-8 md:gap-3 mt-4 md:mt-10">
          {STACK_CARDS.map((card) => (
            <a
              key={card.label}
              href={card.href}
              aria-label={card.ariaLabel}
              className="relative rounded-[20px] md:border-2 dark:md:border-transparent md:border-transparent min-h-[135px] md:min-h-[297px] hover:border-grey! group dark:hover:border-grey-bg! group"
              data-analytics-event="content_card_select"
              data-analytics-event-data={`{"cardName": "${card.analyticsEvent}"}`}
            >
              <div style={{ background: card.gradient }} className="absolute w-full h-full top-[11px] rounded-[20px] border-[1.2px] border-grey dark:border-grey-bg md:border-0 md:hidden" />
              <div className="absolute md:relative w-full h-full flex flex-row md:flex-col p-4 md:p-3 bg-white dark:bg-grey! rounded-[20px] border-[1.2px] border-grey dark:border-grey-bg md:border-0">
                <img className="hidden md:inline-block w-full group-hover:hidden dark:hidden dark:group-hover:hidden dark:md:group-hover:block" src={card.lightImg} role="img" aria-hidden="true" width={card.imgWidth} height={card.imgHeight} />
                <img className="hidden dark:md:inline-block w-full group-hover:md:block dark:hidden dark:group-hover:hidden" src={card.darkImg} role="img" aria-hidden="true" width={card.imgWidth} height={card.imgHeight} />
                <div className="flex-1 flex flex-col md:mt-6">
                  <span className="sm:s-h5 md:l-h6">{card.label}</span>
                  <p className="sm:s-p2 md:l-p1 mt-1 md:mt-2">{card.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
