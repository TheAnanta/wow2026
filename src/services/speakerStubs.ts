// src/services/speakerStubs.ts

export interface Speaker {
  id: string;
  name: string;
  title: string;
  avatar: string;
  topics: string[];
  pronouns?: string;
  isGDE?: boolean;
}

const mockSpeakers: Speaker[] = [
  {
    id: '100',
    name: 'Adit Lal',
    title: 'Android Architect, Equal',
    avatar: '/adit.jpeg',
    pronouns: 'He/Him',
    topics: ['Android', 'Cloud'],
    isGDE: true,
  },
  {
    id: '101',
    name: 'Dhrumil Shah',
    title: 'Lead Architect, Tata Digital',
    avatar: '/dhrumil.png',
    pronouns: 'He/Him',
    topics: ['Flutter', 'Android'],
    isGDE: true,
  },
  {
    id: '102',
    name: 'Sampath Balivada',
    title: 'Software Engineer, PayPal',
    avatar: '/sampath-balivada.jpeg',
    pronouns: 'He/Him',
    topics: ['Cloud', 'Go']
  },
  {
    id: '103',
    name: 'Sasi Teja',
    title: 'Solutions Architect, Atlan',
    avatar: '/Sasi-Teja.jpg',
    pronouns: 'He/Him',
    topics: ['Cloud', 'Web']
  },
  {
    id: '104',
    name: 'Mani Teja',
    title: 'Frontend Developer, Laiout',
    avatar: '/Mani-teja.jpeg',
    pronouns: 'He/Him',
    topics: ['Web', 'Design']
  },
  {
    id: '105',
    name: 'Vasanth Korada',
    title: 'Senior Software Engineer, HDFC securities',
    avatar: '/Vasanth-korada.jpeg',
    pronouns: 'He/Him',
    topics: ['AI / Machine Learning', 'Web']
  },
  {
    id: '106',
    name: 'Diksha Patro B',
    title: 'Product Manager, Skai Lama',
    avatar: '/Diksha-patro.jpeg',
    pronouns: 'She/Her',
    topics: ['General', 'Other']
  },
  {
    id: '107',
    name: 'Charan Manikanta N',
    title: 'Software Engineer Intern, Aegion Dynamic Solutions',
    avatar: '/Charan-manikanta.jpeg',
    pronouns: 'He/Him',
    topics: ['Web', 'General']
  },
  {
    id: '108',
    name: 'Swapna Dande',
    title: 'System Engineer, Tata Consultancy Services',
    avatar: '/swapna-dande.png',
    pronouns: 'She/Her',
    topics: ['Cloud', 'Other']
  },
  {
    id: '109',
    name: 'Gireesh Kumar Yejju',
    title: 'Professional',
    avatar: '/Gireesh-kumar.jpeg',
    pronouns: 'He/Him',
    topics: ['Other']
  },
  {
    id: '110',
    name: 'Usha Ramani Vemuru',
    title: 'C0-Founder, GURUJADA IT Solutions',
    avatar: '/Usha-ramani-min.png',
    pronouns: 'She/Her',
    topics: ['General', 'Other']
  },
  {
    id: '111',
    name: 'Manas Malla',
    title: 'Founder, CEO, The Ananta Studio',
    avatar: '/manas.jpg',
    pronouns: 'He/Him',
    topics: ['Android', 'Flutter']
  },
  {
    id: '112',
    name: 'Kavya Chandana',
    title: 'COO, CFO, The Ananta Studio',
    avatar: '/kavya.png',
    pronouns: 'She/Her',
    topics: ['Design', 'Web']
  },
  {
    id: '113',
    name: 'Varshita Palleti',
    title: 'Web Intern, The Ananta Studio',
    avatar: '/varshita.jpeg',
    pronouns: 'She/Her',
    topics: ['Web', 'Design']
  },
  {
    id: '114',
    name: 'Jayadhar Ummadisingu',
    title: 'ML Intern, The Ananta Studio',
    avatar: '/jayadhar.jpg',
    pronouns: 'He/Him',
    topics: ['AI / Machine Learning', 'Other']
  },
  {
    id: '115',
    name: 'Neharika Sathagopam',
    title: 'Software Engineer, Natwest Group',
    avatar: '/neharika.jpeg',
    pronouns: 'She/Her',
    topics: ['Web', 'Cloud']
  }
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
