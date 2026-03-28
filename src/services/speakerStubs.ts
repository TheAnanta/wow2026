// src/services/speakerStubs.ts

export interface Speaker {
  id: string;
  name: string;
  title: string;
  avatar: string;
  topics: string[];
}

const mockSpeakers: Speaker[] = [
  { id: '1', name: 'Samuel Joel Wong', title: 'Senior Staff Developer Relations Engineer', avatar: '/avatar-blue.png', topics: ['Cloud', 'Android'] },
  { id: '2', name: 'Jennifer Christina Maryl...', title: 'Software Engineer', avatar: '/avatar-gray.png', topics: ['AI/Machine Learning'] },
  { id: '3', name: 'Colleen Kathleen Jos...', title: 'Developer Advocate, Global Developer Advocacy', avatar: '/avatar-dark.png', topics: ['Design', 'Web'] },
  { id: '4', name: 'David Bosemann Reso...', title: 'Marketing Manager, Global Developer Team', avatar: '/avatar-light.png', topics: ['Ads'] },
  { id: '5', name: 'Samuel Joel Wong', title: 'Senior Staff Developer Relations Engineer', avatar: '/avatar-blue.png', topics: ['Cloud'] },
  { id: '6', name: 'Jennifer Christina Maryl...', title: 'Software Engineer', avatar: '/avatar-gray.png', topics: ['Web'] },
  { id: '7', name: 'Colleen Kathleen Jos...', title: 'Developer Advocate, Global Developer Advocacy', avatar: '/avatar-dark.png', topics: ['Android', 'Cloud'] },
  { id: '8', name: 'David Bosemann Reso...', title: 'Marketing Manager, Global Developer Team', avatar: '/avatar-light.png', topics: ['Firebase'] },
  { id: '9', name: 'Samuel Joel Wong', title: 'Senior Staff Developer Relations Engineer', avatar: '/avatar-blue.png', topics: ['Accessibility'] },
  { id: '10', name: 'Jennifer Christina Maryl...', title: 'Software Engineer', avatar: '/avatar-gray.png', topics: ['AR/VR'] },
  { id: '11', name: 'Colleen Kathleen Jos...', title: 'Developer Advocate, Global Developer Advocacy', avatar: '/avatar-dark.png', topics: ['Chrome OS'] },
  { id: '12', name: 'David Bosemann Reso...', title: 'Marketing Manager, Global Developer Team', avatar: '/avatar-light.png', topics: ['Cloud', 'Firebase'] }
];

export const getSpeakers = async (): Promise<Speaker[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockSpeakers), 200));
};

export const filterByTopic = async (topicId: string): Promise<Speaker[]> => {
  console.log('Filtering by topic:', topicId);
  return new Promise((resolve) => setTimeout(() => {
    resolve(mockSpeakers.filter(s => s.topics.includes(topicId)));
  }, 200));
};

export const searchSpeakers = async (query: string): Promise<Speaker[]> => {
  console.log('Searching speakers for:', query);
  return new Promise((resolve) => setTimeout(() => {
    const q = query.toLowerCase();
    resolve(mockSpeakers.filter(s => s.name.toLowerCase().includes(q) || s.title.toLowerCase().includes(q)));
  }, 200));
};
