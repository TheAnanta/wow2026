// src/services/teamStubs.ts

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  pronouns?: string;
  category: 'Organizer' | 'Lead' | 'Core Team' | 'Contributors';
  responsibility: string;
  university: string;
}

const mockTeam: TeamMember[] = [
  // Organizers
  {
    id: '100',
    name: 'Manas Malla',
    role: 'Google Product Expert for Android',
    avatar: 'https://manasmalla.dev/_next/image?url=%2Fgallery%2Fimage-main.jpg&w=384&q=100',
    category: 'Organizer',
    pronouns: 'He/Him',
    responsibility: 'Technology',
    university: 'Gandhi Institute of Technology and Management'
  },

  // Leads
  {
    id: '101',
    name: 'Kavya Chandana',
    role: 'GDGoC GITAM Lead',
    category: 'Lead',
    pronouns: 'She/Her',
    responsibility: 'Design',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/Kavya-chandana.png'
  },

  // Core Team
  {
    id: '102',
    name: 'Varshita Palleti',
    role: 'SWE, TCS',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/Varshita_fqkkzb.jpg'
  },
  {
    id: '103',
    name: 'Jayadhar Ummadisingu',
    role: 'SWE, Tata Consultancy Services',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Technology',
    university: 'Gandhi Institute of Technology and Management'
  },
  {
    id: '104',
    name: 'Harshith Lanki',
    role: 'Student, GITAM',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Technology',
    university: 'Gandhi Institute of Technology and Management'
  },
  {
    id: '105',
    name: 'Danush Yallamilli',
    role: 'Student, GITAM',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
  },
  {
    id: '106',
    name: 'Nikhila Pathi',
    role: 'Student, GITAM',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
  },
  {
    id: '107',
    name: 'Sai Vardhan K',
    role: 'Student, GITAM',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
  },
  {
    id: '108',
    name: 'Aneesha Yerra',
    role: 'Student, GITAM',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
  },
  {
    id: '113',
    name: 'Yashwanth Kamireddi',
    role: 'Student, GITAM',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/Yashwanth_Kamireddi_os8fu1.jpg'
  },
  {
    id: '114',
    name: 'Aafthab Ali',
    role: 'Student, GITAM',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/Aftab_Ali_j7xluo.jpg'
  },
  {
    id: '115',
    name: 'Chaitanya Sameer',
    role: 'CTO, the ananta',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/Chaitanya_Sameer_az2ci0.jpg'
  },
  {
    id: '116',
    name: 'Deva Harshini M',
    role: 'Student, GITAM',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/Deva_Harshini_tiogrf.jpg'
  },
  {
    id: '117',
    name: 'Gagana Bandaru',
    role: 'Founding Engineer, the ananta',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/Gagana_sgp8gf.jpg'
  },
  {
    id: '118',
    name: 'Jaswanth Kumar',
    role: 'Student, GITAM',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/Jaswanth_Kumar_cz9e9w.jpg'
  },
  {
    id: '119',
    name: 'K Sharvan Babu',
    role: 'Founder, Luna',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/K_Sharvan_znnlot.jpg'
  },
  {
    id: '120',
    name: 'M.G.S.S Srikar',
    role: 'Student, GITAM',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/M.G.S.S_Srikar_xvimcj.jpg'
  },
  {
    id: '121',
    name: 'Pavan Kumar',
    role: 'Student, GITAM',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/Pavan_Kumar_axeprk.jpg'
  },
  {
    id: '122',
    name: 'Sanvi Seetha',
    role: 'Student, GITAM',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/Sanvi_Seetha_osj2tt.jpg'
  },
  {
    id: '123',
    name: 'Tummala Somanadh',
    role: 'Student, GITAM',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/Tummala_Somanadh_nabuku.jpg'
  },
  {
    id: '124',
    name: 'Sohana Vuppala',
    role: 'Co-Founder, Luna',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/V_Sohana_hmydkm.jpg'
  },
  {
    id: '125',
    name: 'Vaibhav TSLV',
    role: 'Student, GITAM',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/Vaibhav_af7o5n.jpg'
  },
  {
    id: '126',
    name: 'Satwika Rejeti',
    role: 'Student, GITAM',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/Satwika_Rejeti_rnn0fh.jpg'
  },
  {
    id: '127',
    name: 'Aashita Jolly',
    role: 'Student, GITAM',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/Aashita_fq7qbd.jpg'
  },
  {
    id: '128',
    name: 'Srinivasam Konchada',
    role: 'Student, GITAM',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/Srinivasam_Konchada_rfp5ku.jpg'
  },
  //Contributors
  {
    id: '129',
    name: 'Pranathi',
    role: 'GDGoC GITAM Team',
    category: 'Contributors',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/Srinivasam_Konchada_rfp5ku.jpg'
  },
];

export const getTeam = async (): Promise<TeamMember[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockTeam), 200));
};
