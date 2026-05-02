// src/services/stubs.ts

export interface Session {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  topics: string[];
  level: string[];
  type: string[];
  stack: string[];
  sessionCode: string;
  time?: string;
  bookmarked?: boolean;
  speakerIds?: string[];
}

export const fetchSessions = async (filters: { q?: string }): Promise<Session[]> => {
  console.log('Fetching sessions with filters:', filters);
  // const mockSessions: Session[] = [
  //   {
  //     id: 'a6eb8619-5c2e-4671-84cb-b938c27103be',
  //     title: 'Google keynote',
  //     description: "Tune in to find out how we're furthering our mission to organize the world's information and make it universally accessible and useful.",
  //     thumbnail: '/images/io24-featured-keynote-google.webp',
  //     tags: ['Beginner', 'Keynote'],
  //     topics: [],
  //     level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
  //     type: ['keynote-filter'],
  //     stack: ['14574666-1892-4a0e-b305-44d6e3f66c56', 'b31f8e49-c3ba-438e-a7e1-589b4da62640', '622b18d9-a6c2-4d31-b506-a2d58e034186', '13eba1ea-1c78-47b8-86ef-c7808d2507db'],
  //     sessionCode: 'IO24_GOOGLEKEY_001',
  //     time: '10:00AM PT'
  //   },
  //   {
  //     id: 'af9317b5-1c42-471a-99db-1bc8108d06a8',
  //     title: 'Developer keynote',
  //     description: 'Learn about Google’s newest developer tools and discover how they fuel innovation and enhance your workflow for maximum productivity.',
  //     thumbnail: '/images/io24-featured-keynote-developer.webp',
  //     tags: ['Beginner', 'Keynote'],
  //     topics: [],
  //     level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
  //     type: ['keynote-filter'],
  //     stack: ['14574666-1892-4a0e-b305-44d6e3f66c56', 'b31f8e49-c3ba-438e-a7e1-589b4da62640', '622b18d9-a6c2-4d31-b506-a2d58e034186', '13eba1ea-1c78-47b8-86ef-c7808d2507db'],
  //     sessionCode: 'IO24_DEVKEY_002',
  //     time: '1:30PM PT'
  //   },
  //   {
  //     id: '12782059-aef8-450d-acfd-e1d616fdb48e',
  //     title: "What's new in Android",
  //     description: 'The latest in Android development covering generative AI, Android 15, form factors, Jetpack, Compose, tooling, perfor...',
  //     thumbnail: '/images/_____0__-aef_-__0d-acfd-e_d___fdb__e.webp',
  //     tags: ['Beginner', 'Android', 'Keynote'],
  //     topics: ['088d506d-5c55-4b15-9b95-0be49b939c2a'],
  //     level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
  //     type: ['keynote-filter'],
  //     stack: ['b31f8e49-c3ba-438e-a7e1-589b4da62640'],
  //     sessionCode: 'IO24_PAKEY_LIVE_004'
  //   },
  //   {
  //     id: 'a646262c-dafd-495c-b5f2-146fefad0df1',
  //     title: "What's new in Google AI",
  //     description: "Discover Google's latest AI tools in action and learn about the Gemini API, Google AI Studio, Gemma, and more.",
  //     thumbnail: '/images/a______c-dafd-___c-b_f_-___fefad0df_.webp',
  //     tags: ['Beginner', 'Keynote'],
  //     topics: ['88574f1d-9051-4f14-9c60-f83160bcd560'],
  //     level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
  //     type: ['keynote-filter'],
  //     stack: ['14574666-1892-4a0e-b305-44d6e3f66c56'],
  //     sessionCode: 'IO24_PAKEY_LIVE_003'
  //   },
  //   {
  //     id: '9986e95b-c506-40f1-b233-54f7e7092fdb',
  //     title: "What's new in Android development tools",
  //     description: 'Learn about Android developer tool updates to enhance workflow with Android APIs.',
  //     thumbnail: '/images/____e__b-c_0_-_0f_-b___-__f_e_0__fdb.webp',
  //     tags: ['Intermediate', 'Android'],
  //     topics: ['088d506d-5c55-4b15-9b95-0be49b939c2a', 'd73701c9-6652-4f18-a628-5237920e7415'],
  //     level: ['a0d5636a-51e6-4cd8-a809-85aa7a67d8d3'],
  //     type: ['keynote-filter'],
  //     stack: ['b31f8e49-c3ba-438e-a7e1-589b4da62640'],
  //     sessionCode: 'IO24_TS_LIVE_065'
  //   },
  //   {
  //     id: '8c3a958c-52f6-4c07-8798-897b260c177c',
  //     title: "What's new in Firebase for building gen AI features",
  //     description: 'Learn how Firebase is evolving to help you harness the power of generative AI to build modern, dynamic apps users love.',
  //     thumbnail: '/images/_c_a___c-__f_-_c0_-____-___b__0c___c.webp',
  //     tags: ['Intermediate', 'Firebase', 'Keynote'],
  //     topics: ['d73701c9-6652-4f18-a628-5237920e7415'],
  //     level: ['a0d5636a-51e6-4cd8-a809-85aa7a67d8d3'],
  //     type: ['keynote-filter'],
  //     stack: ['b31f8e49-c3ba-438e-a7e1-589b4da62640'],
  //     sessionCode: 'IO24_TS_LIVE_077'
  //   },
  //   {
  //     id: 'c6185b55-88e6-4b47-b31c-5b1f758a16a7',
  //     title: "What's new in Google Play",
  //     description: 'Learn how to grow your business on Google Play with the latest tools and updates.',
  //     thumbnail: '/images/c____b__-__e_-_b__-b__c-_b_f___a__a_.webp',
  //     tags: ['Beginner', 'Google Play', 'Keynote'],
  //     topics: ['503cdf28-8e62-4751-b10e-d9fe5499e10a'],
  //     level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
  //     type: ['keynote-filter'],
  //     stack: ['b31f8e49-c3ba-438e-a7e1-589b4da62640'],
  //     sessionCode: 'IO24_PAKEY_LIVE_005'
  //   },
  //   {
  //     id: 'a4da7132-3f33-4723-8bb4-5989011dca7c',
  //     title: 'Visual Blocks: Bring AI ideas to life with custom nodes for your APIs',
  //     description: 'Learn how to make your own custom nodes in our no-code framework, Visual Blocks, and go from idea to prototype faster.',
  //     thumbnail: '/images/a4da7132-3f33-4723-8bb4-5989011dca7c.webp',
  //     tags: ['Intermediate', 'Workshop'],
  //     topics: ['88574f1d-9051-4f14-9c60-f83160bcd560'],
  //     level: ['a0d5636a-51e6-4cd8-a809-85aa7a67d8d3'],
  //     type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
  //     stack: ['14574666-1892-4a0e-b305-44d6e3f66c56'],
  //     sessionCode: 'IO24_WS_LIVE_098'
  //   },
  //   {
  //     id: '21b9116b-3c75-41bf-91c7-ffcaf2163970',
  //     title: 'How to deploy all the JavaScript frameworks to Cloud Run',
  //     description: "Can I deploy [JavaScript framework] to Google Cloud Run? Yes. Let's prove it by deploying as many as we can.",
  //     thumbnail: '/images/21b9116b-3c75-41bf-91c7-ffcaf2163970.webp',
  //     tags: ['Intermediate', 'Cloud', 'Workshop'],
  //     topics: ['ad532883-dda3-4066-aa6f-1f858968915d'],
  //     level: ['a0d5636a-51e6-4cd8-a809-85aa7a67d8d3'],
  //     type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
  //     stack: ['622b18d9-a6c2-4d31-b506-a2d58e034186'],
  //     sessionCode: 'IO24_WS_LIVE_097'
  //   }
  // ];

  const mockSessions: Session[] = [
    // --- Auditorium ---
    {
      id: 'aud-1',
      title: 'Check-in',
      description: 'Join us for Check-in at Auditorium.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Check In', 'Auditorium', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-check-in'],
      stack: ['stack-general'],
      sessionCode: 'AUD-1',
      time: '08:30 AM'
    },
    {
      id: 'aud-2',
      title: 'Inauguration (Lighting of lamp, keynote)',
      description: 'Join us for Inauguration (Lighting of lamp, keynote) at Auditorium.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Talk', 'Auditorium', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['stack-general'],
      sessionCode: 'AUD-2',
      time: '10:00 AM'
    },
    {
      id: 'aud-3',
      title: 'Welcome By GITAM',
      description: 'Join us for Welcome By GITAM at Auditorium.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Talk', 'Auditorium', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['stack-general'],
      sessionCode: 'AUD-3',
      time: '10:10 AM'
    },
    {
      id: 'aud-4',
      title: 'Keynote',
      description: 'Join us for Keynote at Auditorium.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Talk', 'Auditorium', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['stack-general'],
      sessionCode: 'AUD-4',
      time: '10:20 AM'
    },
    {
      id: 'aud-5',
      title: 'Latest in Google Tech',
      description: 'Join us for Latest in Google Tech at Auditorium.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Panel', 'Auditorium', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-panel'],
      stack: ['stack-general'],
      sessionCode: 'AUD-5',
      time: '10:30 AM'
    },
    {
      id: 'aud-6',
      title: 'Sponsor slot',
      description: 'Join us for Sponsor slot at Auditorium.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Sponsor', 'Auditorium', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-sponsor'],
      stack: ['stack-general'],
      sessionCode: 'AUD-6',
      time: '11:20 AM'
    },
    {
      id: 'aud-7',
      title: 'Building with Gemini',
      description: 'Join us for Building with Gemini at Auditorium.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['AI/ML', 'Workshop', 'Auditorium', '28 June 2025'],
      topics: ['88574f1d-9051-4f14-9c60-f83160bcd560'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['14574666-1892-4a0e-b305-44d6e3f66c56'],
      sessionCode: 'AUD-7',
      time: '11:40 AM',
      speakerIds: ['100', '111']
    },
    {
      id: 'aud-8',
      title: 'Embracing AI in the workspace',
      description: 'Join us for Embracing AI in the workspace at Auditorium.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['AI/ML', 'Workshop', 'Auditorium', '28 June 2025'],
      topics: ['88574f1d-9051-4f14-9c60-f83160bcd560'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['14574666-1892-4a0e-b305-44d6e3f66c56'],
      sessionCode: 'AUD-8',
      time: '12:15 PM',
      speakerIds: ['101', '102']
    },
    {
      id: 'aud-9',
      title: 'Lunch',
      description: 'Join us for Lunch at Auditorium.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Networking', 'Auditorium', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-networking'],
      stack: ['stack-general'],
      sessionCode: 'AUD-9',
      time: '12:30 PM'
    },
    {
      id: 'aud-10',
      title: 'Building with Agentic Development Kit',
      description: 'Join us for Building with Agentic Development Kit at Auditorium.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['AI/ML', 'Workshop', 'Auditorium', '28 June 2025'],
      topics: ['88574f1d-9051-4f14-9c60-f83160bcd560'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['14574666-1892-4a0e-b305-44d6e3f66c56'],
      sessionCode: 'AUD-10',
      time: '02:00 PM'
    },
    {
      id: 'aud-11',
      title: 'Getting started with Tensorflow',
      description: 'Join us for Getting started with Tensorflow at Auditorium.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['AI/ML', 'Workshop', 'Auditorium', '28 June 2025'],
      topics: ['88574f1d-9051-4f14-9c60-f83160bcd560'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['14574666-1892-4a0e-b305-44d6e3f66c56'],
      sessionCode: 'AUD-11',
      time: '02:30 PM'
    },
    {
      id: 'aud-12',
      title: 'Coffeeside with team ananta',
      description: 'Join us for Coffeeside with team ananta at Auditorium.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Panel', 'Auditorium', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-panel'],
      stack: ['stack-general'],
      sessionCode: 'AUD-12',
      time: '02:40 PM'
    },
    {
      id: 'aud-13',
      title: 'Dinner',
      description: 'Join us for Dinner at Auditorium.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Networking', 'Auditorium', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-networking'],
      stack: ['stack-general'],
      sessionCode: 'AUD-13',
      time: '07:30 PM'
    },
    // --- Day 2 ---
    {
      id: 'aud-14',
      title: 'Breakfast',
      description: 'Join us for BREAKFAST at Auditorium.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Networking', 'Auditorium', '29 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-networking'],
      stack: ['stack-general'],
      sessionCode: 'AUD-14',
      time: '07:00 AM'
    },
    {
      id: 'aud-15',
      title: 'DJ',
      description: 'Join us for DJ at Auditorium.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Other', 'Networking', 'Auditorium', '29 June 2025'],
      topics: ['topic-other'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-networking'],
      stack: ['stack-other'],
      sessionCode: 'AUD-15',
      time: '10:00 AM'
    },
    {
      id: 'aud-16',
      title: 'Awards',
      description: 'Join us for Awards at Auditorium.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Talk', 'Auditorium', '29 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['stack-general'],
      sessionCode: 'AUD-16',
      time: '11:00 AM'
    },
    {
      id: 'aud-17',
      title: 'Thank you note',
      description: 'Join us for Thank you note at Auditorium.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Talk', 'Auditorium', '29 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['stack-general'],
      sessionCode: 'AUD-17',
      time: '11:30 AM'
    },
    {
      id: 'aud-18',
      title: 'Photographs & Volunteer Swags',
      description: 'Join us for Photographs & Volunteer Swags at Auditorium.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Networking', 'Auditorium', '29 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-networking'],
      stack: ['stack-general'],
      sessionCode: 'AUD-18',
      time: '11:40 AM'
    },

    // --- Kalinga 1 ---
    {
      id: 'k1-1',
      title: 'Hands-on with Firebase',
      description: 'Join us for Hands-on with Firebase at Kalinga 1.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Cloud', 'Workshop', 'Kalinga 1', '28 June 2025'],
      topics: ['ad532883-dda3-4066-aa6f-1f858968915d'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['622b18d9-a6c2-4d31-b506-a2d58e034186'],
      sessionCode: 'K1-1',
      time: '11:40 AM'
    },
    {
      id: 'k1-2',
      title: 'Why migrate to the Cloud',
      description: 'Join us for Why migrate to the Cloud at Kalinga 1.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Cloud', 'Talk', 'Kalinga 1', '28 June 2025'],
      topics: ['ad532883-dda3-4066-aa6f-1f858968915d'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['622b18d9-a6c2-4d31-b506-a2d58e034186'],
      sessionCode: 'K1-2',
      time: '02:00 PM'
    },
    {
      id: 'k1-3',
      title: 'Dockers and containers',
      description: 'Join us for Dockers and containers at Kalinga 1.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Cloud', 'Workshop', 'Kalinga 1', '28 June 2025'],
      topics: ['ad532883-dda3-4066-aa6f-1f858968915d'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['622b18d9-a6c2-4d31-b506-a2d58e034186'],
      sessionCode: 'K1-3',
      time: '02:20 PM'
    },
    {
      id: 'k1-4',
      title: 'Introduction to Looker Studio',
      description: 'Join us for Introduction to Looker Studio at Kalinga 1.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Cloud', 'Workshop', 'Kalinga 1', '28 June 2025'],
      topics: ['ad532883-dda3-4066-aa6f-1f858968915d'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['622b18d9-a6c2-4d31-b506-a2d58e034186'],
      sessionCode: 'K1-4',
      time: '02:30 PM'
    },
    // --- Day 2 Kalinga 1 ---
    {
      id: 'k1-7',
      title: 'Code Continues',
      description: 'Join us for Code Continues at Kalinga 1.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Networking', 'Kalinga 1', '29 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-networking'],
      stack: ['stack-general'],
      sessionCode: 'K1-7',
      time: '12:00 AM'
    },
    {
      id: 'k1-8',
      title: 'Presentation',
      description: 'Join us for Presentation at Kalinga 1.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Talk', 'Kalinga 1', '29 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['stack-general'],
      sessionCode: 'K1-8',
      time: '08:30 AM'
    },
    {
      id: 'k1-9',
      title: 'Grand Finale',
      description: 'Join us for Grand Finale at Kalinga 1.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Talk', 'Kalinga 1', '29 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['stack-general'],
      sessionCode: 'K1-9',
      time: '10:00 AM'
    },

    // --- Kalinga 2 ---
    {
      id: 'k2-1',
      title: 'Making your app comptabile with Android 17',
      description: 'Join us for Making your app comptabile with Android 17 at Kalinga 2.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Mobile', 'Workshop', 'Kalinga 2', '28 June 2025'],
      topics: ['088d506d-5c55-4b15-9b95-0be49b939c2a'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['b31f8e49-c3ba-438e-a7e1-589b4da62640'],
      sessionCode: 'K2-1',
      time: '11:40 AM'
    },
    {
      id: 'k2-2',
      title: 'Building your first "Super App" with Flutter',
      description: 'Join us for Building your first "Super App" with Flutter at Kalinga 2.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Mobile', 'Workshop', 'Kalinga 2', '28 June 2025'],
      topics: ['088d506d-5c55-4b15-9b95-0be49b939c2a'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['b31f8e49-c3ba-438e-a7e1-589b4da62640'],
      sessionCode: 'K2-2',
      time: '11:55 AM'
    },
    {
      id: 'k2-3',
      title: 'The ML Kit GenAI APIs',
      description: 'Join us for The ML Kit GenAI APIs at Kalinga 2.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Mobile', 'Workshop', 'Kalinga 2', '28 June 2025'],
      topics: ['088d506d-5c55-4b15-9b95-0be49b939c2a'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['b31f8e49-c3ba-438e-a7e1-589b4da62640'],
      sessionCode: 'K2-3',
      time: '02:00 PM'
    },
    {
      id: 'k2-4',
      title: 'Flutter with WASM',
      description: 'Join us for Flutter with WASM at Kalinga 2.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Mobile', 'Workshop', 'Kalinga 2', '28 June 2025'],
      topics: ['088d506d-5c55-4b15-9b95-0be49b939c2a'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['b31f8e49-c3ba-438e-a7e1-589b4da62640'],
      sessionCode: 'K2-4',
      time: '02:30 PM'
    },
    {
      id: 'k2-5',
      title: 'Building for Android XR',
      description: 'Join us for Building for Android XR at Kalinga 2.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Mobile', 'Talk', 'Kalinga 2', '28 June 2025'],
      topics: ['088d506d-5c55-4b15-9b95-0be49b939c2a'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['b31f8e49-c3ba-438e-a7e1-589b4da62640'],
      sessionCode: 'K2-5',
      time: '02:40 PM'
    },

    // --- Kalinga 3 ---
    {
      id: 'k3-1',
      title: 'DevTools and Interceptors',
      description: 'Join us for DevTools and Interceptors at Kalinga 3.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Web', 'Workshop', 'Kalinga 3', '28 June 2025'],
      topics: ['f753bf55-c398-4f4a-941b-329b296bd287'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['13eba1ea-1c78-47b8-86ef-c7808d2507db'],
      sessionCode: 'K3-1',
      time: '11:40 AM'
    },
    {
      id: 'k3-2',
      title: 'Lightening shift to serverless & databases',
      description: 'Join us for Lightening shift to serverless & databases at Kalinga 3.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Web', 'Talk', 'Kalinga 3', '28 June 2025'],
      topics: ['f753bf55-c398-4f4a-941b-329b296bd287'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['13eba1ea-1c78-47b8-86ef-c7808d2507db'],
      sessionCode: 'K3-2',
      time: '12:15 PM'
    },
    {
      id: 'k3-3',
      title: 'LLM-Readable Web: Moving from SEO to AEO',
      description: 'Join us for LLM-Readable Web: Moving from SEO to AEO at Kalinga 3.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Web', 'Talk', 'Kalinga 3', '28 June 2025'],
      topics: ['f753bf55-c398-4f4a-941b-329b296bd287'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['13eba1ea-1c78-47b8-86ef-c7808d2507db'],
      sessionCode: 'K3-3',
      time: '02:00 PM'
    },
    {
      id: 'k3-4',
      title: 'Building for the web',
      description: 'Join us for Building for the web at Kalinga 3.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Web', 'Case Study', 'Kalinga 3', '28 June 2025'],
      topics: ['f753bf55-c398-4f4a-941b-329b296bd287'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-case-study'],
      stack: ['13eba1ea-1c78-47b8-86ef-c7808d2507db'],
      sessionCode: 'K3-4',
      time: '02:20 PM'
    },
    {
      id: 'k3-5',
      title: 'Fullstack development with Dart',
      description: 'Join us for Fullstack development with Dart at Kalinga 3.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Web', 'Workshop', 'Kalinga 3', '28 June 2025'],
      topics: ['f753bf55-c398-4f4a-941b-329b296bd287'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['13eba1ea-1c78-47b8-86ef-c7808d2507db'],
      sessionCode: 'K3-5',
      time: '02:30 PM'
    },

    // --- Kalinga 4 ---
    {
      id: 'k4-1',
      title: 'App Script',
      description: 'Join us for App Script at Kalinga 4.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Other', 'Talk', 'Kalinga 4', '28 June 2025'],
      topics: ['topic-other'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['stack-other'],
      sessionCode: 'K4-1',
      time: '11:40 AM'
    },
    {
      id: 'k4-2',
      title: 'Building for Google Wallet',
      description: 'Join us for Building for Google Wallet at Kalinga 4.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Other', 'Workshop', 'Kalinga 4', '28 June 2025'],
      topics: ['topic-other'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['stack-other'],
      sessionCode: 'K4-2',
      time: '11:55 AM'
    },
    {
      id: 'k4-3',
      title: 'Getting started with DevOps',
      description: 'Join us for Getting started with DevOps at Kalinga 4.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Other', 'Talk', 'Kalinga 4', '28 June 2025'],
      topics: ['topic-other'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['stack-other'],
      sessionCode: 'K4-3',
      time: '12:15 PM'
    },
    {
      id: 'k4-4',
      title: 'Introduction to SLP and GoLang',
      description: 'Join us for Introduction to SLP and GoLang at Kalinga 4.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Other', 'Talk', 'Kalinga 4', '28 June 2025'],
      topics: ['topic-other'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['stack-other'],
      sessionCode: 'K4-4',
      time: '02:00 PM'
    },
    {
      id: 'k4-5',
      title: 'Migrating to Passkeys',
      description: 'Join us for Migrating to Passkeys at Kalinga 4.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Other', 'Talk', 'Kalinga 4', '28 June 2025'],
      topics: ['topic-other'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['stack-other'],
      sessionCode: 'K4-5',
      time: '02:20 PM'
    },
    {
      id: 'k4-6',
      title: 'Grow your bussiness with Google Ads',
      description: 'Join us for Grow your bussiness with Google Ads at Kalinga 4.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Other', 'Talk', 'Kalinga 4', '28 June 2025'],
      topics: ['topic-other'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['stack-other'],
      sessionCode: 'K4-6',
      time: '02:30 PM'
    },
    {
      id: 'k4-7',
      title: 'Exploring Google Checks',
      description: 'Join us for Exploring Google Checks at Kalinga 4.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Other', 'Talk', 'Kalinga 4', '28 June 2025'],
      topics: ['topic-other'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['stack-other'],
      sessionCode: 'K4-7',
      time: '02:40 PM'
    },

    // --- Kalinga 5 ---
    {
      id: 'k5-1',
      title: 'Prototype with Figma',
      description: 'Join us for Prototype with Figma at Kalinga 5.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Design', 'Workshop', 'Kalinga 5', '28 June 2025'],
      topics: ['1177d688-c358-4598-a88e-86fe69f2cfb7'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: [],
      sessionCode: 'K5-1',
      time: '11:40 AM'
    },
    {
      id: 'k5-2',
      title: 'UX Research: Why users hate your app',
      description: 'Join us for UX Research: Why users hate your app at Kalinga 5.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Design', 'Talk', 'Kalinga 5', '28 June 2025'],
      topics: ['1177d688-c358-4598-a88e-86fe69f2cfb7'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: [],
      sessionCode: 'K5-2',
      time: '12:15 PM'
    },
    {
      id: 'k5-3',
      title: 'Material 3 Motion & Micro-interactions',
      description: 'Join us for Material 3 Motion & Micro-interactions at Kalinga 5.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Design', 'Workshop', 'Kalinga 5', '28 June 2025'],
      topics: ['1177d688-c358-4598-a88e-86fe69f2cfb7'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: [],
      sessionCode: 'K5-3',
      time: '02:00 PM'
    },
    {
      id: 'k5-4',
      title: 'Uncovering M3E',
      description: 'Join us for Uncovering M3E at Kalinga 5.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Design', 'Talk', 'Kalinga 5', '28 June 2025'],
      topics: ['1177d688-c358-4598-a88e-86fe69f2cfb7'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: [],
      sessionCode: 'K5-4',
      time: '02:20 PM'
    },
    {
      id: 'k5-5',
      title: 'Introduction to Design Systems',
      description: 'Join us for Introduction to Design Systems at Kalinga 5.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Design', 'Workshop', 'Kalinga 5', '28 June 2025'],
      topics: ['1177d688-c358-4598-a88e-86fe69f2cfb7'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: [],
      sessionCode: 'K5-5',
      time: '02:30 PM'
    },

    // --- Kalinga 6 ---
    {
      id: 'k6-1',
      title: 'Tech byte',
      description: 'Join us for Tech byte at Kalinga 6.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Tech Byte', 'Kalinga 6', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-tech-byte'],
      stack: ['stack-general'],
      sessionCode: 'K6-1',
      time: '11:40 AM'
    },
    {
      id: 'k6-2',
      title: 'Tech byte',
      description: 'Join us for Tech byte at Kalinga 6.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Tech Byte', 'Kalinga 6', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-tech-byte'],
      stack: ['stack-general'],
      sessionCode: 'K6-2',
      time: '11:55 AM'
    },
    {
      id: 'k6-3',
      title: 'Tech byte',
      description: 'Join us for Tech byte at Kalinga 6.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Tech Byte', 'Kalinga 6', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-tech-byte'],
      stack: ['stack-general'],
      sessionCode: 'K6-3',
      time: '12:15 PM'
    },
    {
      id: 'k6-4',
      title: 'Tech byte',
      description: 'Join us for Tech byte at Kalinga 6.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Tech Byte', 'Kalinga 6', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-tech-byte'],
      stack: ['stack-general'],
      sessionCode: 'K6-4',
      time: '02:00 PM'
    },
    {
      id: 'k6-5',
      title: 'Tech byte',
      description: 'Join us for Tech byte at Kalinga 6.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Tech Byte', 'Kalinga 6', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-tech-byte'],
      stack: ['stack-general'],
      sessionCode: 'K6-5',
      time: '02:20 PM'
    },
    {
      id: 'k6-6',
      title: 'Tech byte',
      description: 'Join us for Tech byte at Kalinga 6.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Tech Byte', 'Kalinga 6', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-tech-byte'],
      stack: ['stack-general'],
      sessionCode: 'K6-6',
      time: '02:30 PM'
    },
    {
      id: 'k6-7',
      title: 'Tech byte',
      description: 'Join us for Tech byte at Kalinga 6.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Tech Byte', 'Kalinga 6', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-tech-byte'],
      stack: ['stack-general'],
      sessionCode: 'K6-7',
      time: '02:40 PM'
    },

    // --- Kalinga 7 ---
    {
      id: 'k7-1',
      title: 'Prototype with Stitch',
      description: 'Join us for Prototype with Stitch at Kalinga 7.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Design', 'Workshop', 'Kalinga 7', '28 June 2025'],
      topics: ['1177d688-c358-4598-a88e-86fe69f2cfb7'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: [],
      sessionCode: 'K7-1',
      time: '11:40 AM'
    },
    {
      id: 'k7-2',
      title: 'Prototype with Opal',
      description: 'Join us for Prototype with Opal at Kalinga 7.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Design', 'Workshop', 'Kalinga 7', '28 June 2025'],
      topics: ['1177d688-c358-4598-a88e-86fe69f2cfb7'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: [],
      sessionCode: 'K7-2',
      time: '11:55 AM'
    },
    {
      id: 'k7-3',
      title: 'Build your branding with Pomelli',
      description: 'Join us for Build your branding with Pomelli at Kalinga 7.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Design', 'Workshop', 'Kalinga 7', '28 June 2025'],
      topics: ['1177d688-c358-4598-a88e-86fe69f2cfb7'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: [],
      sessionCode: 'K7-3',
      time: '02:00 PM'
    },
    {
      id: 'k7-4',
      title: 'Working with Postman',
      description: 'Join us for Working with Postman at Kalinga 7.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Web', 'Workshop', 'Kalinga 7', '28 June 2025'],
      topics: ['f753bf55-c398-4f4a-941b-329b296bd287'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['13eba1ea-1c78-47b8-86ef-c7808d2507db'],
      sessionCode: 'K7-4',
      time: '02:20 PM'
    },
    {
      id: 'k7-5',
      title: 'Building on ML for the future',
      description: 'Join us for Building on ML for the future at Kalinga 7.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['AI/ML', 'Talk', 'Kalinga 7', '28 June 2025'],
      topics: ['88574f1d-9051-4f14-9c60-f83160bcd560'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['14574666-1892-4a0e-b305-44d6e3f66c56'],
      sessionCode: 'K7-5',
      time: '02:30 PM'
    },
    {
      id: 'k7-6',
      title: 'Working with Jules',
      description: 'Join us for Working with Jules at Kalinga 7.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Design', 'Workshop', 'Kalinga 7', '28 June 2025'],
      topics: ['1177d688-c358-4598-a88e-86fe69f2cfb7'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: [],
      sessionCode: 'K7-6',
      time: '02:40 PM'
    },

    // --- Kalinga 8 ---
    {
      id: 'k8-1',
      title: 'Hands on Git & GitHub',
      description: 'Join us for Hands on Git & GitHub at Kalinga 8.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Workshop', 'Kalinga 8', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['stack-general'],
      sessionCode: 'K8-1',
      time: '11:40 AM'
    },
    {
      id: 'k8-2',
      title: 'Build models quick with TeachableMachines',
      description: 'Join us for Build models quick with TeachableMachines at Kalinga 8.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['AI/ML', 'Workshop', 'Kalinga 8', '28 June 2025'],
      topics: ['88574f1d-9051-4f14-9c60-f83160bcd560'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['14574666-1892-4a0e-b305-44d6e3f66c56'],
      sessionCode: 'K8-2',
      time: '02:00 PM'
    },
    {
      id: 'k8-3',
      title: 'Algorithmic Thinking',
      description: 'Join us for Algorithmic Thinking at Kalinga 8.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Talk', 'Kalinga 8', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['stack-general'],
      sessionCode: 'K8-3',
      time: '02:30 PM'
    },

    // --- Kalinga 9 ---
    {
      id: 'k9-1',
      title: 'Composing with Compose',
      description: 'Join us for Composing with Compose at Kalinga 9.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Mobile', 'Workshop', 'Kalinga 9', '28 June 2025'],
      topics: ['088d506d-5c55-4b15-9b95-0be49b939c2a'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['b31f8e49-c3ba-438e-a7e1-589b4da62640'],
      sessionCode: 'K9-1',
      time: '11:40 AM'
    },
    {
      id: 'k9-2',
      title: 'Build applications fastly with no-code using FlutterFlow!',
      description: 'Join us for Build applications fastly with no-code using FlutterFlow! at Kalinga 9.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Mobile', 'Workshop', 'Kalinga 9', '28 June 2025'],
      topics: ['088d506d-5c55-4b15-9b95-0be49b939c2a'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['b31f8e49-c3ba-438e-a7e1-589b4da62640'],
      sessionCode: 'K9-2',
      time: '02:00 PM'
    },
    {
      id: 'k9-3',
      title: 'Kaggle Competition (challenge)',
      description: 'Join us for Kaggle Competition (challenge) at Kalinga 9.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['AI/ML', 'Talk', 'Kalinga 9', '28 June 2025'],
      topics: ['88574f1d-9051-4f14-9c60-f83160bcd560'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['14574666-1892-4a0e-b305-44d6e3f66c56'],
      sessionCode: 'K9-3',
      time: '02:40 PM'
    },

    // --- Kalinga 10 ---
    {
      id: 'k10-1',
      title: 'Building with Next.js',
      description: 'Join us for Building with Next.js at Kalinga 10.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Web', 'Workshop', 'Kalinga 10', '28 June 2025'],
      topics: ['f753bf55-c398-4f4a-941b-329b296bd287'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['13eba1ea-1c78-47b8-86ef-c7808d2507db'],
      sessionCode: 'K10-1',
      time: '11:40 AM'
    },
    {
      id: 'k10-2',
      title: 'Build your own server',
      description: 'Join us for Build your own server at Kalinga 10.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Cloud', 'Workshop', 'Kalinga 10', '28 June 2025'],
      topics: ['ad532883-dda3-4066-aa6f-1f858968915d'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['622b18d9-a6c2-4d31-b506-a2d58e034186'],
      sessionCode: 'K10-2',
      time: '02:00 PM'
    },
    {
      id: 'k10-3',
      title: 'Design with Figma in 20 mins (challenge)',
      description: 'Join us for Design with Figma in 20 mins (challenge) at Kalinga 10.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Design', 'Talk', 'Kalinga 10', '28 June 2025'],
      topics: ['1177d688-c358-4598-a88e-86fe69f2cfb7'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: [],
      sessionCode: 'K10-3',
      time: '02:40 PM'
    },

    // --- Kalinga 11 ---
    {
      id: 'k11-1',
      title: 'Entrepreneurship: Is it for me?',
      description: 'Join us for Entrepreneurship: Is it for me? at Kalinga 11.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Talk', 'Kalinga 11', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['stack-general'],
      sessionCode: 'K11-1',
      time: '11:40 AM'
    },
    {
      id: 'k11-2',
      title: 'Communities - Usha Ramani Vemuru',
      description: 'Join us for Communities - Usha Ramani Vemuru at Kalinga 11.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Talk', 'Kalinga 11', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['stack-general'],
      sessionCode: 'K11-2',
      time: '12:15 PM'
    },
    {
      id: 'k11-3',
      title: 'Responsible AI',
      description: 'Join us for Responsible AI at Kalinga 11.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['AI/ML', 'Talk', 'Kalinga 11', '28 June 2025'],
      topics: ['88574f1d-9051-4f14-9c60-f83160bcd560'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['14574666-1892-4a0e-b305-44d6e3f66c56'],
      sessionCode: 'K11-3',
      time: '02:00 PM'
    },
    {
      id: 'k11-4',
      title: 'Women in Tech',
      description: 'Join us for Women in Tech at Kalinga 11.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Talk', 'Kalinga 11', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['stack-general'],
      sessionCode: 'K11-4',
      time: '02:20 PM'
    },
    {
      id: 'k11-5',
      title: 'Be Career Ready with Career Dreamer',
      description: 'Join us for Be Career Ready with Career Dreamer at Kalinga 11.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Workshop', 'Kalinga 11', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['stack-general'],
      sessionCode: 'K11-5',
      time: '02:40 PM'
    },

    // --- Kalinga 12 ---
    {
      id: 'k12-5', // Adjusted ID since k11-5 was duplicated in your payload
      title: 'Be Career Ready with Career Dreamer',
      description: 'Join us for Be Career Ready with Career Dreamer at Kalinga 12.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Workshop', 'Kalinga 12', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['stack-general'],
      sessionCode: 'K12-5',
      time: '02:30 PM'
    },

    // --- Kurukeshetra 13-16 ---
    {
      id: 'kr-3',
      title: 'Building a startup from scratch',
      description: 'Join us for Building a startup from scratch at Kurukeshetra 13-16.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Workshop', 'Kurukeshetra 13-16', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['stack-general'],
      sessionCode: 'KR-3',
      time: '02:30 PM'
    },

    // --- Kosala 17-21 ---
    {
      id: 'kos-1',
      title: "I'm Remarkable [talk]",
      description: "Join us for I'm Remarkable [talk] at Kosala 17-21.",
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Talk', 'Kosala 17-21', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-talk'],
      stack: ['stack-general'],
      sessionCode: 'KOS-1',
      time: '02:30 PM'
    },

    // --- Community Lounge ---
    {
      id: 'com-1',
      title: 'Innovation & Startup Showcase',
      description: 'Join us for Innovation & Startup Showcase at Community Lounge.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Networking', 'Community Lounge', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-networking'],
      stack: ['stack-general'],
      sessionCode: 'COM-1',
      time: '08:30 AM'
    },
    {
      id: 'com-2',
      title: 'Indoor WOW+ experience',
      description: 'Join us for Indoor WOW+ experience at Community Lounge.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Other', 'WOW+ Experience', 'Community Lounge', '28 June 2025'],
      topics: ['topic-other'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-wow-plus'],
      stack: ['stack-other'],
      sessionCode: 'COM-2',
      time: '02:00 PM'
    },
    {
      id: 'com-3',
      title: 'Swag Distribution and Bye Bye',
      description: 'Join us for Swag Distribution and Bye Bye at Community Lounge.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Networking', 'Community Lounge', '29 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-networking'],
      stack: ['stack-general'],
      sessionCode: 'COM-3',
      time: '11:40 AM'
    },

    // --- KRC Lawn ---
    {
      id: 'krc-1',
      title: 'Outdoor WOW+ experience',
      description: 'Join us for Outdoor WOW+ experience at KRC Lawn.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['Other', 'WOW+ Experience', 'KRC Lawn', '28 June 2025'],
      topics: ['topic-other'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-wow-plus'],
      stack: ['stack-other'],
      sessionCode: 'KRC-1',
      time: '02:30 PM'
    },

    // --- Gandhi Park ---
    {
      id: 'gp-1',
      title: 'Snack It',
      description: 'Join us for Snack It at Gandhi Park.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Networking', 'Gandhi Park', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-networking'],
      stack: ['stack-general'],
      sessionCode: 'GP-1',
      time: '03:00 PM'
    },

    // --- Separate Tracks ---
    {
      id: 'k1-5',
      title: 'Code',
      description: 'Join us for Code at Kalinga 1.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Networking', 'Kalinga 1', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-networking'],
      stack: ['stack-general'],
      sessionCode: 'K1-5',
      time: '05:00 PM'
    },
    {
      id: 'k1-6',
      title: 'Code Continues',
      description: 'Join us for Code Continues at Kalinga 1.',
      thumbnail: '/images/io24-featured-keynote-developer.webp',
      tags: ['General', 'Networking', 'Kalinga 1', '28 June 2025'],
      topics: ['topic-general'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['type-networking'],
      stack: ['stack-general'],
      sessionCode: 'K1-6',
      time: '09:30 PM'
    }
  ];

  if (filters.q) {
    const query = filters.q.toLowerCase();
    const filtered = mockSessions.filter(s =>
      s.title.toLowerCase().includes(query) ||
      s.tags.some(tag => tag.toLowerCase().includes(query))
    );
    return new Promise((resolve) => setTimeout(() => resolve(filtered), 500));
  }

  return new Promise((resolve) => setTimeout(() => resolve(mockSessions), 500));
};

export const handleRegistration = async (data: any) => {
  console.log('Registering user:', data);
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
};

export const toggleBookmark = async (id: string) => {
  console.log('Toggling bookmark for:', id);
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 300));
};

export const searchSpeakers = async (query: string) => {
  console.log('Searching speakers for:', query);
  return new Promise((resolve) => setTimeout(() => resolve([]), 300));
};

export const handleSaveToMyIO = async (id: string) => {
  console.log('Saving to My I/O:', id);
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 300));
};

export const handleSearchCommunities = async (query: string): Promise<{ id: string, name: string, type: string }[]> => {
  return new Promise((resolve) => setTimeout(() => resolve([]), 300));
};
