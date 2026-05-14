// src/services/speakerStubs.ts

export interface Speaker {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  topics: string[];
  pronouns?: string;
  isGDE?: boolean;
}

const mockSpeakers: Speaker[] = [
  {
    id: '100',
    name: 'Namrata More',
    title: 'Google Developer Expert, Payments',
    pronouns: 'She/Her',
    topics: ['Payments', 'Wallet'],
    isGDE: true,
  },
  {
    id: '101',
    name: 'Sathish Vj',
    title: 'Google Developer Expert, Cloud',
    pronouns: 'He/Him',
    topics: ['Cloud'],
    isGDE: true,
  },
  {
    id: '102',
    name: 'Vrijraj Singh',
    title: 'Google Developer Expert, Firebase',
    pronouns: 'He/Him',
    topics: ['Firebase', 'Cloud'],
    isGDE: true,
  },
  {
    id: '103',
    name: 'Ashok Vishwakarma',
    title: 'Google Developer Expert, Web',
    pronouns: 'He/Him',
    topics: ['Web', 'DevOps', 'Chrome', 'AI'],
    isGDE: true,
  },
  {
    id: '104',
    name: 'Sampath Balivada',
    title: 'Software Engineer, PayPal',
    avatar: '/sampath-balivada.jpeg',
    pronouns: 'He/Him',
    topics: ['Cloud', 'Go']
  },
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
