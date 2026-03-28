// src/services/stubs.ts

export const handleRegistration = async (data: any) => {
  console.log('Registering user:', data);
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
};

export const fetchSessions = async (filters: any) => {
  console.log('Fetching sessions with filters:', filters);
  const mockSessions = [
    { id: '1', title: 'Google keynote', time: '10:00AM [PT]', tags: ['Keynote', 'Beginner'], bookmarked: false },
    { id: '2', title: 'Developer keynote', time: '1:30PM [PT]', tags: ['Keynote', 'Beginner'], bookmarked: true },
    { id: '3', title: 'What\'s new in Maps', time: 'Ongoing', tags: ['Keynote', 'Android', 'Beginner'], bookmarked: false },
    { id: '4', title: 'Jetpack Compose Basics', time: 'Ongoing', tags: ['Keynote', 'Android', 'Beginner'], bookmarked: true },
    { id: '5', title: 'Progressive Web Applications', time: 'Ongoing', tags: ['Keynote', 'Android', 'Beginner'], bookmarked: false },
    { id: '6', title: 'What\'s new in Material Design', time: 'Ongoing', tags: ['Keynote', 'Android', 'Beginner'], bookmarked: false },
  ];
  return new Promise((resolve) => setTimeout(() => resolve(mockSessions), 500));
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
