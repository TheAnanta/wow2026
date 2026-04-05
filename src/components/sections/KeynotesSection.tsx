// src/components/sections/KeynotesSection.tsx

const CalendarIcon = () => (
  <svg aria-hidden="true" role="presentation" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.5 3H18V2.25C18 2.05109 17.921 1.86032 17.7803 1.71967C17.6397 1.57902 17.4489 1.5 17.25 1.5C17.0511 1.5 16.8603 1.57902 16.7197 1.71967C16.579 1.86032 16.5 2.05109 16.5 2.25V3H7.5V2.25C7.5 2.05109 7.42098 1.86032 7.28033 1.71967C7.13968 1.57902 6.94891 1.5 6.75 1.5C6.55109 1.5 6.36032 1.57902 6.21967 1.71967C6.07902 1.86032 6 2.05109 6 2.25V3H4.5C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5V4.5C21 4.10218 20.842 3.72064 20.5607 3.43934C20.2794 3.15804 19.8978 3 19.5 3ZM19.5 4.5V6H4.5V4.5H19.5ZM4.5 19.5V7.5H19.5V19.5H4.5Z"
      className="dark:fill-white forced-white-color fill-white!"
    />
  </svg>
);

const BookmarkIcon = () => (
  <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="forced-white-color">
    <path d="M1 1v18l6.079-4.5 7.184 4.5V1H1Z" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round" className="hcm-link-text-stroke stroke-grey-bg! black dark:stroke-grey-bg" />
  </svg>
);

interface KeynoteCardProps {
  sessionId: string;
  sessionCode: string;
  href: string;
  time: string;
  title: string;
  description: string;
  thumbnail: string;
  calendarTitle: string;
  calendarDescription: string;
}

function KeynoteCard({ sessionId, sessionCode, href, time, title, description, thumbnail, calendarTitle, calendarDescription }: KeynoteCardProps) {
  return (
    <div role="" className="session w-full md:max-w-[484px]" data-session-id={sessionId}>
      <div className="w-full p-4 rounded-xl border-[1.2px] border-grey-bg md:border-none">
        <a href={href} className="focus:outline-none card-link">
          <div className="w-full aspect-w-16 aspect-h-9 relative mb-5">
            <img loading="lazy" role="img" aria-hidden="true" className="absolute h-full w-full object-cover" src={thumbnail} />
          </div>
          <div className="mb-4 md:min-h-[136px] body-outlined">
            <p className="sm:l-eyebrow uppercase">{time}</p>
            <div className="font-medium! sm:s-p1 md:l-h6 mt-2">{title}</div>
            <p className="mt-2 sm:s-p2">{description}</p>
          </div>
        </a>
        <div className="flex mt-auto flex-row md:flex-col ml:flex-row gap-2 md:gap-2 lg:gap-9">
          <div className="h-calendar" data-id={sessionId} data-code={sessionCode} data-title={calendarTitle} data-description={calendarDescription} data-start-time="0001-01-01T00:00:00" data-end-time="0001-01-01T00:00:00" data-add-label="True" data-force-white-color="True">
            <button aria-label="Add to calendar" className="flex cursor-pointer">
              <span className="flex justify-center items-center w-6 h-6"><CalendarIcon /></span>
              <span aria-hidden="true" className="sm:s-cta1 md:l-cta2 ml-1 truncate text-white!">Add to calendar</span>
            </button>
          </div>
          <div className="r-bookmark" data-bm-session-id={sessionId} data-session-code={sessionCode} data-disable-dark-mode="False" data-white-spinner="" data-myio-label="True" data-title={calendarTitle} data-force-white-color="True" data-label-style="sm:s-cta1 md:l-cta2">
            <button type="button" className="flex items-center  cursor-pointer" aria-label="Bookmark this session">
              <span className="flex justify-center items-center w-6 h-6"><BookmarkIcon /></span>
              <span className="ml-1 truncate text-white! sm:s-cta1 md:l-cta2">Save to My I/O</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const KEYNOTES: KeynoteCardProps[] = [
  {
    sessionId: 'a6eb8619-5c2e-4671-84cb-b938c27103be',
    sessionCode: 'IO24_GOOGLEKEY_001',
    href: 'https://io.google/2024/explore/a6eb8619-5c2e-4671-84cb-b938c27103be/',
    time: '10:00AM PT',
    title: 'Google keynote',
    description: "Tune in to find out how we're furthering our mission to organize the world's information and make it universally acce...",
    thumbnail: 'https://io.google/2024/app/images/io24-featured-keynote-google.webp',
    calendarTitle: 'Google keynote',
    calendarDescription: "Tune in to find out how we're furthering our mission to organize the world's information and make it universally accessible and useful.",
  },
  {
    sessionId: 'af9317b5-1c42-471a-99db-1bc8108d06a8',
    sessionCode: 'IO24_DEVKEY_002',
    href: 'https://io.google/2024/explore/af9317b5-1c42-471a-99db-1bc8108d06a8/',
    time: '1:30PM PT',
    title: 'Developer keynote',
    description: "Learn about Google's newest developer tools and discover how they fuel innovation and enhance your workflow for maxim...",
    thumbnail: 'https://io.google/2024/app/images/io24-featured-keynote-developer.webp',
    calendarTitle: 'Developer keynote',
    calendarDescription: "Learn about Google's newest developer tools and discover how they fuel innovation and enhance your workflow for maximum productivity.",
  },
];

export function KeynotesSection() {
  return (
    <div className="bg-grey">
      <div className="page-wrapper flex flex-col text-white! pt-0!">
        <div className="mt-8 md:mt-10">
          <div className="flex flex-col items-center md:items-start justify-between gap-y-4 md:gap-x-8 md:flex-row">
            <div className="flex flex-col gap-2 w-full md:max-w-[25%] md:gap-[22px]">
              <div className="sm:s-h4 md:l-h4 md:max-w-[319px]">
                Join the keynotes online
              </div>
            </div>
            <div className="flex flex-col gap-y-4 md:flex-row flex-1 w-full">
              {KEYNOTES.map((keynote) => (
                <KeynoteCard key={keynote.sessionId} {...keynote} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
