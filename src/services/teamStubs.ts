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
    role: 'Lead',
    category: 'Lead',
    pronouns: 'She/Her',
    responsibility: 'Design',
    university: 'Gandhi Institute of Technology and Management',
    avatar: 'https://github.com/Kavya-chandana.png'
  },

  // Core Team
  {
    id: '102',
    name: 'Varshita Palleti',
    role: 'GDGoC GITAM Core Team',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: 'https://res.cloudinary.com/dlhw4q5rh/image/upload/c_fill,w_200,h_200,g_face,f_auto,q_auto/v1767189232/Varshita_fqkkzb.jpg'
  },
  {
    id: '103',
    name: 'Jayadhar Ummadisingu',
    role: 'GDGoC GITAM Core Team',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Technology',
    university: 'Gandhi Institute of Technology and Management'
  },
  {
    id: '104',
    name: 'Harshith Lanki',
    role: 'GDGoC GITAM Core Team',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Technology',
    university: 'Gandhi Institute of Technology and Management'
  },
  {
    id: '105',
    name: 'Danush Yallamilli',
    role: 'GDGoC GITAM Team',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
  },
  {
    id: '106',
    name: 'Nikhila Pathi',
    role: 'GDGoC GITAM Team',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
  },
  {
    id: '107',
    name: 'Sai Vardhan K',
    role: 'GDGoC GITAM Team',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
  },
  {
    id: '108',
    name: 'Aneesha Yerra',
    role: 'GDGoC GITAM Team',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
  },
  {
    id: '113',
    name: 'Yashwanth Kamireddi',
    role: 'GDGoC GITAM Team',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: 'https://res.cloudinary.com/dlhw4q5rh/image/upload/c_fill,w_200,h_200,g_face,f_auto,q_auto/v1766991613/Yashwanth_Kamireddi_os8fu1.jpg'
  },
  {
    id: '114',
    name: 'Aafthab Ali',
    role: 'GDGoC GITAM Team',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: 'https://res.cloudinary.com/dlhw4q5rh/image/upload/c_fill,w_200,h_200,g_face,f_auto,q_auto/v1766991622/Aftab_Ali_j7xluo.jpg'
  },
  {
    id: '115',
    name: 'Chaitanya Sameer',
    role: 'GDGoC GITAM Team',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: 'https://res.cloudinary.com/dlhw4q5rh/image/upload/c_fill,w_200,h_200,g_face,f_auto,q_auto/v1766991618/Chaitanya_Sameer_az2ci0.jpg'
  },
  {
    id: '116',
    name: 'Deva Harshini M',
    role: 'GDGoC GITAM Team',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: 'https://res.cloudinary.com/dlhw4q5rh/image/upload/c_fill,w_200,h_200,g_face,f_auto,q_auto/v1766991620/Deva_Harshini_tiogrf.jpg'
  },
  {
    id: '117',
    name: 'Gagana Bandaru',
    role: 'GDGoC GITAM Team',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: 'https://res.cloudinary.com/dlhw4q5rh/image/upload/c_fill,w_200,h_200,g_face,f_auto,q_auto/v1766991619/Gagana_sgp8gf.jpg'
  },
  {
    id: '118',
    name: 'Jaswanth Kumar',
    role: 'GDGoC GITAM Team',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: 'https://res.cloudinary.com/dlhw4q5rh/image/upload/c_fill,w_200,h_200,g_face,f_auto,q_auto/v1766991628/Jaswanth_Kumar_cz9e9w.jpg'
  },
  {
    id: '119',
    name: 'K Sharvan Babu',
    role: 'GDGoC GITAM Team',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: 'https://res.cloudinary.com/dlhw4q5rh/image/upload/c_fill,w_200,h_200,g_face,f_auto,q_auto/v1766991623/K_Sharvan_znnlot.jpg'
  },
  {
    id: '120',
    name: 'M.G.S.S Srikar',
    role: 'GDGoC GITAM Team',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: 'https://res.cloudinary.com/dlhw4q5rh/image/upload/c_fill,w_200,h_200,g_face,f_auto,q_auto/v1766991625/M.G.S.S_Srikar_xvimcj.jpg'
  },
  {
    id: '121',
    name: 'Pavan Kumar',
    role: 'GDGoC GITAM Team',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: 'https://res.cloudinary.com/dlhw4q5rh/image/upload/c_fill,w_200,h_200,g_face,f_auto,q_auto/v1766991627/Pavan_Kumar_axeprk.jpg'
  },
  {
    id: '122',
    name: 'Sanvi Seetha',
    role: 'GDGoC GITAM Team',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: 'https://res.cloudinary.com/dlhw4q5rh/image/upload/c_fill,w_200,h_200,g_face,f_auto,q_auto/v1766991616/Sanvi_Seetha_osj2tt.jpg'
  },
  {
    id: '123',
    name: 'Tummala Somanadh',
    role: 'GDGoC GITAM Team',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: 'https://res.cloudinary.com/dlhw4q5rh/image/upload/c_fill,w_200,h_200,g_face,f_auto,q_auto/v1766991623/Tummala_Somanadh_nabuku.jpg'
  },
  {
    id: '124',
    name: 'Sohana Vuppala',
    role: 'GDGoC GITAM Team',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: 'https://res.cloudinary.com/dlhw4q5rh/image/upload/c_fill,w_200,h_200,g_face,f_auto,q_auto/v1766991615/V_Sohana_hmydkm.jpg'
  },
  {
    id: '125',
    name: 'Vaibhav TSLV',
    role: 'GDGoC GITAM Team',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: 'https://res.cloudinary.com/dlhw4q5rh/image/upload/c_fill,w_200,h_200,g_face,f_auto,q_auto/v1766991617/Vaibhav_af7o5n.jpg'
  },
  {
    id: '126',
    name: 'Satwika Rejeti',
    role: 'GDGoC GITAM Team',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: 'https://res.cloudinary.com/dlhw4q5rh/image/upload/c_fill,w_200,h_200,g_face,f_auto,q_auto/v1766991614/Satwika_Rejeti_rnn0fh.jpg'
  },
  {
    id: '127',
    name: 'Aashita Jolly',
    role: 'GDGoC GITAM Team',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: 'https://res.cloudinary.com/dlhw4q5rh/image/upload/c_fill,w_200,h_200,g_face,f_auto,q_auto/v1767021669/Aashita_fq7qbd.jpg'
  },
  {
    id: '128',
    name: 'Srinivasam Konchada',
    role: 'GDGoC GITAM Team',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: 'https://res.cloudinary.com/dlhw4q5rh/image/upload/c_fill,w_200,h_200,g_face,f_auto,q_auto/v1767021669/Srinivasam_Konchada_rfp5ku.jpg'
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
    avatar: 'https://res.cloudinary.com/dlhw4q5rh/image/upload/c_fill,w_200,h_200,g_face,f_auto,q_auto/v1767021669/Srinivasam_Konchada_rfp5ku.jpg'
  },
];

export const getTeam = async (): Promise<TeamMember[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockTeam), 200));
};
