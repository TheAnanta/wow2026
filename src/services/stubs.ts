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
}

export const fetchSessions = async (filters: { q?: string }) => {
  console.log('Fetching sessions with filters:', filters);
  const mockSessions: Session[] = [
    {
      id: 'a6eb8619-5c2e-4671-84cb-b938c27103be',
      title: 'Google keynote',
      description: "Tune in to find out how we're furthering our mission to organize the world's information and make it universally accessible and useful.",
      thumbnail: 'https://io.google/2024/app/images/io24-featured-keynote-google.webp',
      tags: ['Beginner', 'Keynote'],
      topics: [],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['keynote-filter'],
      stack: ['14574666-1892-4a0e-b305-44d6e3f66c56', 'b31f8e49-c3ba-438e-a7e1-589b4da62640', '622b18d9-a6c2-4d31-b506-a2d58e034186', '13eba1ea-1c78-47b8-86ef-c7808d2507db'],
      sessionCode: 'IO24_GOOGLEKEY_001',
      time: '10:00AM PT'
    },
    {
      id: 'af9317b5-1c42-471a-99db-1bc8108d06a8',
      title: 'Developer keynote',
      description: 'Learn about Google’s newest developer tools and discover how they fuel innovation and enhance your workflow for maximum productivity.',
      thumbnail: 'https://io.google/2024/app/images/io24-featured-keynote-developer.webp',
      tags: ['Beginner', 'Keynote'],
      topics: [],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['keynote-filter'],
      stack: ['14574666-1892-4a0e-b305-44d6e3f66c56', 'b31f8e49-c3ba-438e-a7e1-589b4da62640', '622b18d9-a6c2-4d31-b506-a2d58e034186', '13eba1ea-1c78-47b8-86ef-c7808d2507db'],
      sessionCode: 'IO24_DEVKEY_002',
      time: '1:30PM PT'
    },
    {
      id: '12782059-aef8-450d-acfd-e1d616fdb48e',
      title: "What's new in Android",
      description: 'The latest in Android development covering generative AI, Android 15, form factors, Jetpack, Compose, tooling, perfor...',
      thumbnail: 'https://web.archive.org/web/20240427125258im_/https://io.google/2024/data/im/12782059-aef8-450d-acfd-e1d616fdb48e.webp',
      tags: ['Beginner', 'Android', 'Keynote'],
      topics: ['088d506d-5c55-4b15-9b95-0be49b939c2a'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['keynote-filter'],
      stack: ['b31f8e49-c3ba-438e-a7e1-589b4da62640'],
      sessionCode: 'IO24_PAKEY_LIVE_004'
    },
    {
      id: 'a646262c-dafd-495c-b5f2-146fefad0df1',
      title: "What's new in Google AI",
      description: "Discover Google's latest AI tools in action and learn about the Gemini API, Google AI Studio, Gemma, and more.",
      thumbnail: 'https://web.archive.org/web/20240427125258im_/https://io.google/2024/data/im/a646262c-dafd-495c-b5f2-146fefad0df1.webp',
      tags: ['Beginner', 'Keynote'],
      topics: ['88574f1d-9051-4f14-9c60-f83160bcd560'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['keynote-filter'],
      stack: ['14574666-1892-4a0e-b305-44d6e3f66c56'],
      sessionCode: 'IO24_PAKEY_LIVE_003'
    },
    {
      id: '9986e95b-c506-40f1-b233-54f7e7092fdb',
      title: "What's new in Android development tools",
      description: 'Learn about Android developer tool updates to enhance workflow with Android APIs.',
      thumbnail: 'https://web.archive.org/web/20240427125258im_/https://io.google/2024/data/im/9986e95b-c506-40f1-b233-54f7e7092fdb.webp',
      tags: ['Intermediate', 'Android'],
      topics: ['088d506d-5c55-4b15-9b95-0be49b939c2a', 'd73701c9-6652-4f18-a628-5237920e7415'],
      level: ['a0d5636a-51e6-4cd8-a809-85aa7a67d8d3'],
      type: ['keynote-filter'],
      stack: ['b31f8e49-c3ba-438e-a7e1-589b4da62640'],
      sessionCode: 'IO24_TS_LIVE_065'
    },
    {
      id: '8c3a958c-52f6-4c07-8798-897b260c177c',
      title: "What's new in Firebase for building gen AI features",
      description: 'Learn how Firebase is evolving to help you harness the power of generative AI to build modern, dynamic apps users love.',
      thumbnail: 'https://web.archive.org/web/20240427125258im_/https://io.google/2024/data/im/8c3a958c-52f6-4c07-8798-897b260c177c.webp',
      tags: ['Intermediate', 'Firebase', 'Keynote'],
      topics: ['d73701c9-6652-4f18-a628-5237920e7415'],
      level: ['a0d5636a-51e6-4cd8-a809-85aa7a67d8d3'],
      type: ['keynote-filter'],
      stack: ['b31f8e49-c3ba-438e-a7e1-589b4da62640'],
      sessionCode: 'IO24_TS_LIVE_077'
    },
    {
      id: 'c6185b55-88e6-4b47-b31c-5b1f758a16a7',
      title: "What's new in Google Play",
      description: 'Learn how to grow your business on Google Play with the latest tools and updates.',
      thumbnail: 'https://web.archive.org/web/20240427125258im_/https://io.google/2024/data/im/c6185b55-88e6-4b47-b31c-5b1f758a16a7.webp',
      tags: ['Beginner', 'Google Play', 'Keynote'],
      topics: ['503cdf28-8e62-4751-b10e-d9fe5499e10a'],
      level: ['e351b55e-b8ab-4b3c-aff9-cee0d294ea29'],
      type: ['keynote-filter'],
      stack: ['b31f8e49-c3ba-438e-a7e1-589b4da62640'],
      sessionCode: 'IO24_PAKEY_LIVE_005'
    },
    {
      id: 'a4da7132-3f33-4723-8bb4-5989011dca7c',
      title: 'Visual Blocks: Bring AI ideas to life with custom nodes for your APIs',
      description: 'Learn how to make your own custom nodes in our no-code framework, Visual Blocks, and go from idea to prototype faster.',
      thumbnail: 'https://web.archive.org/web/20240427125258im_/https://io.google/2024/data/im/a4da7132-3f33-4723-8bb4-5989011dca7c.webp',
      tags: ['Intermediate', 'Workshop'],
      topics: ['88574f1d-9051-4f14-9c60-f83160bcd560'],
      level: ['a0d5636a-51e6-4cd8-a809-85aa7a67d8d3'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['14574666-1892-4a0e-b305-44d6e3f66c56'],
      sessionCode: 'IO24_WS_LIVE_098'
    },
    {
      id: '21b9116b-3c75-41bf-91c7-ffcaf2163970',
      title: 'How to deploy all the JavaScript frameworks to Cloud Run',
      description: "Can I deploy [JavaScript framework] to Google Cloud Run? Yes. Let's prove it by deploying as many as we can.",
      thumbnail: 'https://web.archive.org/web/20240427125258im_/https://io.google/2024/data/im/21b9116b-3c75-41bf-91c7-ffcaf2163970.webp',
      tags: ['Intermediate', 'Cloud', 'Workshop'],
      topics: ['ad532883-dda3-4066-aa6f-1f858968915d'],
      level: ['a0d5636a-51e6-4cd8-a809-85aa7a67d8d3'],
      type: ['98b75245-0ae8-4524-9272-760afbbd1458'],
      stack: ['622b18d9-a6c2-4d31-b506-a2d58e034186'],
      sessionCode: 'IO24_WS_LIVE_097'
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

export const handleSearchCommunities = async (query: string) => {
  return new Promise((resolve) => setTimeout(() => resolve([]), 300));
};
