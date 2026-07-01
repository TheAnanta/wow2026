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
    avatar: 'namrata_more.jpg',
    isGDE: true,
  },
  {
    id: '101',
    name: 'Sathish Vj',
    title: 'Google Developer Expert, Cloud',
    pronouns: 'He/Him',
    topics: ['Cloud'],
    avatar: 'sathish_vj.png',
    isGDE: true,
  },
  {
    id: '102',
    name: 'Vrijraj Singh',
    title: 'Google Developer Expert, Firebase',
    pronouns: 'He/Him',
    topics: ['Firebase', 'Cloud'],
    avatar: 'vrijraj.jpg',
    isGDE: true,
  },
  {
    id: '120',
    name: 'Ajoe',
    title: 'Google Developer Expert, Cloud',
    pronouns: 'He/Him',
    topics: ['Cloud'],
    avatar: 'ajoe.png',
    isGDE: true,
  },
  {
    id: '103',
    name: 'Ashok Vishwakarma',
    title: 'Google Developer Expert, Web',
    pronouns: 'He/Him',
    topics: ['Web', 'DevOps', 'Chrome', 'AI'],
    avatar: 'ashok.jpg',
    isGDE: true,
  },
  {
    id: '104',
    name: 'Krupa Galiya',
    title: 'Google Developer Expert, AI',
    pronouns: 'She/Her',
    topics: ['AI', 'Workspace'],
    avatar: 'krupa.jpg',
    isGDE: true,
  },
  {
    id: '105',
    name: 'Pawan Kumar',
    title: 'Google Developer Expert, Flutter & AI',
    pronouns: 'He/Him',
    topics: ['AI', 'Flutter', 'Gemini'],
    avatar: 'pawan.jpeg',
    isGDE: true,
  },
  {
    id: '106',
    name: 'Vivek Yadav',
    title: 'Google Developer Expert, Flutter',
    pronouns: 'He/Him',
    topics: ['Flutter'],
    avatar: 'vivek.png',
    isGDE: true,
  },
  {
    id: '107',
    name: 'Bhavik Makhwana',
    title: 'Google Developer Expert, Flutter & Dart',
    pronouns: 'He/Him',
    topics: ['Flutter', 'Dart'],
    avatar: 'bhavik.jpg',
    isGDE: true,
  },
  {
    id: '108',
    name: 'Sampath Balivada',
    title: 'Software Engineer, PayPal',
    avatar: '/sampath-balivada.jpeg',
    pronouns: 'He/Him',
    topics: ['Cloud', 'Go']
  },
  {
    id: '109',
    name: 'Harsh Mer',
    title: 'GDG Organizer',
    pronouns: 'He/Him',
    avatar: 'harsh_me.jpeg',
    topics: ['AI', 'Opal']
  },
  {
    id: '111',
    name: 'Tarun R Jain',
    title: 'Google Developer Expert, AI',
    pronouns: 'He/Him',
    topics: ['AI', 'ADK', 'Agents'],
    avatar: 'trj.jpg',
    isGDE: true,
  },
  {
    id: '112',
    name: 'Srasthi Jain',
    title: 'Google Developer Expert, Web',
    pronouns: 'She/Her',
    topics: ['Web', 'Angular'],
    avatar: 'srashti.jpeg',
    isGDE: true,
  },
  {
    id: '113',
    name: 'Saurabh Mishra',
    title: 'Google Developer Expert, Cloud',
    pronouns: 'He/Him',
    topics: ['Cloud', 'Kubernetes', 'GKE'],
    avatar: 'saurabh.jpeg',
    isGDE: true,
  },
  {
    id: '114',
    name: 'Rivu Chakraborty',
    title: 'Google Developer Expert, Android',
    pronouns: 'He/Him',
    topics: ['Android'],
    avatar: 'rivu.png',
    isGDE: true,
  },
  {
    id: '116',
    name: 'Belal Khan',
    title: 'Google Developer Expert, Android',
    pronouns: 'He/Him',
    topics: ['Android', 'AI', 'ML'],
    avatar: 'belal.jpeg',
    isGDE: true,
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
