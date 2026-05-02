// src/services/teamStubs.ts

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  pronouns?: string;
  category: 'Organizer' | 'Lead' | 'Core Team' | 'Contributors' | 'Mentors';
  responsibility: string;
  university: string;
  bio?: string;
  socials?: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
  };
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
    university: 'Gandhi Institute of Technology and Management',
    socials: {
      instagram: 'https://www.instagram.com/manasmalla/',
      linkedin: 'https://www.linkedin.com/in/manasmalla/',
      twitter: 'https://twitter.com/manasmalla',
      portfolio: 'https://manasmalla.dev'
    }
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
    avatar: '/images/chandana_kavya_B4zneuz.webp'
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
    university: 'Gandhi Institute of Technology and Management',
    avatar: 'https://theananta.in/team/jayadhar.jpg'
  },
  {
    id: '104',
    name: 'Harshith Lanki',
    role: 'Student, GITAM',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Technology',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/coreteam_gitam_6.jpeg'
  },
  {
    id: '105',
    name: 'Danush Yallamilli',
    role: 'Student, GITAM',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/coreteam_gitam_2.jpeg',
    // avatar: '/images/danush_yallamilli.jpg',
    bio: 'Computer Science undergraduate, tech enthusiast.',
    socials: { linkedin: 'www.linkedin.com/in/danush-datta-yallamilli' }
  },
  {
    id: '106',
    name: 'Nikhila Pathi',
    role: 'Student, GITAM',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/coreteam_gitam_3.jpeg',
    bio: 'Tech Enthusiast Content, social media, marketing',
  },
  {
    id: '107',
    name: 'Sai Vardhan K',
    role: 'Student, GITAM',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/coreteam_gitam_5.jpeg'
  },
  {
    id: '108',
    name: 'Aneesha Yerra',
    role: 'Student, GITAM',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/coreteam_gitam_4.jpeg'
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
    avatar: '/images/Chaitanya_Sameer_az2ci0.jpg',
    bio: 'Love to delve deeper into things and try to understand from first principles.',
    socials: { instagram: 'chaitanya_sameer' }
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
    avatar: '/images/Vaibhav_af7o5n.jpg',
    bio: 'A 19-year-old individual with a strong interest in technology and automobiles.',
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
    avatar: '/images/Aashita_fq7qbd.jpg',
    bio: 'Exploring DevOps & Web3 | Data Analytics Enthusiast',
    socials: { linkedin: 'https://www.linkedin.com/in/aashita-jolly/' }
  },
  {
    id: '128',
    name: 'Srinivasam Konchada',
    role: 'Student, GITAM',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    // avatar: '/images/Srinivasam_Konchada_rfp5ku.jpg'
    bio: 'Gitam student marketing',
    avatar: '/images/srinivasam_konchada.jpg',
    socials: { linkedin: 'https://www.linkedin.com/in/konchada-srinivasam-533197345/' }
  },
  {
    id: '130',
    name: 'Poorna Shankar Narayanan',
    role: 'Student Life, GITAM',
    category: 'Mentors',
    pronouns: 'He/Him',
    responsibility: 'Guidance',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/coreteam_gitam_1.jpeg'
  },
  //Contributors
  {
    id: '129',
    name: 'Pranathi Jerripothula',
    role: 'GDGoC GITAM Team',
    category: 'Contributors',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    university: 'Gandhi Institute of Technology and Management',
    avatar: '/images/Srinivasam_Konchada_rfp5ku.jpg'
  },
  // Other colleges
  {
    id: '131',
    name: 'Ahanaf Aziz',
    role: 'Student, Andhra University College of Engineering',
    university: 'Andhra University College of Engineering',
    avatar: '/images/ahanaf_aziz.jpg',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Technology',
    bio: 'ML Lead at GDGOC @AUCE',
    socials: { instagram: 'https://instagram.com/ahanafion' }
  },
  {
    id: '132',
    name: 'Valla Pujitha',
    role: 'Student, R.V.R. & J.C. College of Engineering',
    university: 'R.V.R. & J.C. College of Engineering',
    avatar: '/images/valla_pujitha.jpg',
    category: 'Lead',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    bio: 'GDGoC Lead RVRJC, HR and Event Management intern @RJ E-Nest',
    socials: { linkedin: 'https://www.linkedin.com/in/vallapujitha' }
  },
  {
    id: '133',
    name: 'Jai Santhoshi Thapa',
    role: "Student, Vignan's Institute of Engineering for Women",
    university: "Vignan's Institute of Engineering for Women",
    avatar: '/images/jai_santhoshi_thapa.jpg',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Technology',
    bio: 'She/Her Result Over talk.',
    socials: { instagram: 'ja.___.ya' }
  },
  {
    id: '134',
    name: 'Palletisai Praharshitha',
    role: "Student, Vignan's Institute of Engineering for Women",
    university: "Vignan's Institute of Engineering for Women",
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Content',
    bio: "Current 2nd year student, working as media and content managers for gdgoc-view. I'm into full stack development.",
    socials: { instagram: 'praharshitha__25' }
  },
  {
    id: '135',
    name: 'Yoshith Kesari',
    role: 'Student, R.V.R. & J.C. College of Engineering',
    university: 'R.V.R. & J.C. College of Engineering',
    avatar: '/images/yoshith_kesari.jpg',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Technology',
    bio: 'Prince in exile',
    socials: { instagram: 'yoshith.kesari' }
  },
  {
    id: '136',
    name: 'Kotla Rupasri Devi Akshaya',
    role: "Student, Vignan's Institute of Engineering for Women",
    university: "Vignan's Institute of Engineering for Women",
    avatar: '/images/kotla_rupasri_devi_akshaya.jpg',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    bio: 'Crafting a life with purpose, pursuing meaningful endeavors ✨💫',
    socials: { instagram: '@akshaya_kotla' }
  },
  {
    id: '137',
    name: 'Sumam Maharana',
    role: "Student, Vignan's Institute of Engineering for Women",
    university: "Vignan's Institute of Engineering for Women",
    avatar: '/images/sumam_maharana.jpg',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Technology',
    bio: 'I am Sumam Maharana studying final year ECE.',
    socials: { instagram: 'sumam._' }
  },
  {
    id: '138',
    name: 'Satti Meghana',
    role: "Student, Vignan's Institute of Engineering for Women",
    university: "Vignan's Institute of Engineering for Women",
    avatar: '/images/satti_meghana.jpg',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    bio: 'Ambitious & Career-Focused Building solutions, not excuses',
    socials: { instagram: 'Instagram' }
  },
  {
    id: '139',
    name: 'Gayatri Meenakshi Susarla',
    role: "Student, Vignan's Institute of Engineering for Women",
    university: "Vignan's Institute of Engineering for Women",
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Technology',
    bio: 'Passionate Senior Technology Member at GDG, focused on building scalable solutions.',
  },
  {
    id: '140',
    name: 'Prahasini Sharma',
    role: "Student, Vignan's Institute of Engineering for Women",
    university: "Vignan's Institute of Engineering for Women",
    avatar: '/images/prahasini_sharma.jpg',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Technology',
    bio: 'Junior Tech Team member at Google Developer Groups on Campus VIEW.',
  },
  {
    id: '141',
    name: 'Sharvani Subudhi',
    role: "Student, Vignan's Institute of Engineering for Women",
    university: "Vignan's Institute of Engineering for Women",
    avatar: '/images/sharvani_subudhi.jpg',
    category: 'Lead',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    bio: 'GDGOC VIEW LEAD',
    socials: {
      instagram: 'https://www.instagram.com/sharvanisubudhi',
      linkedin: 'https://www.linkedin.com/in/sharvani-subudhi-a83a5732b'
    }
  },
  {
    id: '142',
    name: 'Pediredla Charishma',
    role: "Student, Vignan's Institute of Engineering for Women",
    university: "Vignan's Institute of Engineering for Women",
    avatar: '/images/pediredla_charishma.jpg',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Technology',
    bio: 'Aspiring AI Engineer pursuing B.Tech in CSE (AI).',
    socials: { instagram: 'Instagram, Pinterest, X' }
  },
  {
    id: '144',
    name: 'Benkula Achuta Rao',
    role: 'Student, Andhra University College of Engineering',
    university: 'Andhra University College of Engineering',
    avatar: '/images/benkula_achuta_rao.jpg',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Technology',
    bio: 'Game Development Lead at GDG on Campus (GDGoC AU).',
    socials: { linkedin: 'https://www.linkedin.com/in/benkula-achutarao/' }
  },
  {
    id: '145',
    name: 'Palavalasa Tanushri',
    role: "Student, Vignan's Institute of Engineering for Women",
    university: "Vignan's Institute of Engineering for Women",
    avatar: '/images/palavalasa_tanushri.jpg',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Operations',
    bio: 'PR Manager, GDG on Campus. Blending communication, creativity, and community.',
  },
  {
    id: '146',
    name: 'Kovilapalli Maruthi Siva Akhila',
    role: "Student, Vignan's Institute of Engineering for Women",
    university: "Vignan's Institute of Engineering for Women",
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Design',
    bio: 'Senior Design team member. 4th year btech cse student.',
  },
  {
    id: '148',
    name: 'Singamsetty Subhash',
    role: 'Student, KKR & KSR Institute of Technology & Sciences',
    university: 'KKR & KSR Institute of Technology & Sciences',
    avatar: '/images/singamsetty_subhash.jpg',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    bio: 'Co-ordinator of google development group on campus kits',
    socials: { instagram: 'https://share.google/7xuZFDuYMjiLOCpIE' }
  },
  {
    id: '151',
    name: 'Varada Hemasree',
    role: "Student, Vignan's Institute of Engineering for Women",
    university: "Vignan's Institute of Engineering for Women",
    avatar: '/images/varada_hemasree.jpg',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Technology',
    bio: 'Tech enthusiastic and problem solver.',
  },
  {
    id: '152',
    name: 'Prasanth Changala',
    role: 'Student, Maharaj Vijayaram Gajapathi Raj College of Engineering',
    university: 'Maharaj Vijayaram Gajapathi Raj College of Engineering',
    avatar: '/images/prasanth_changala.jpg',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Technology',
    bio: 'My name is Prasanth changala.',
  },
  {
    id: '153',
    name: 'Chintala Aditya',
    role: 'Student, Maharaj Vijayaram Gajapathi Raj College of Engineering',
    university: 'Maharaj Vijayaram Gajapathi Raj College of Engineering',
    avatar: '/images/chintala_aditya.jpg',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Technology',
    bio: 'Developer Lead, GDG MVGR',
    socials: { linkedin: 'https://www.linkedin.com/in/aditya-chintala-6549a62bb/' }
  },
  {
    id: '156',
    name: 'Kavyasree Gompa',
    role: "Student, Vignan's Institute of Engineering for Women",
    university: "Vignan's Institute of Engineering for Women",
    avatar: '/images/kavyasree_gompa.jpg',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Design',
    bio: 'Designer',
    socials: { linkedin: 'https://www.linkedin.com/in/kavya-gompa-80720832b' }
  },
  {
    id: '157',
    name: 'Rejeti Nikhil Bhuvana Sharma',
    role: "Student, Vignan's Institute of Information Technology",
    university: "Vignan's Institute of Information Technology",
    avatar: '/images/rejeti_nikhil_bhuvana_sharma.jpg',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Technology',
    bio: 'Gdg on campus VIIT co lead. Good in AIML Full stack development.',
    socials: { portfolio: 'https://my-portifolio-main-nikhilsharma.vercel.app/' }
  },
  {
    id: '158',
    name: 'A. Chaitanya',
    role: 'Student, KKR & KSR Institute of Technology & Sciences',
    university: 'KKR & KSR Institute of Technology & Sciences',
    avatar: '/images/a_chaitanya.jpg',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Technology',
    bio: 'Active GDG campus member, passionate about technology and innovation.',
    socials: { instagram: 'https://www.instagram.com/chayamirineni' }
  },
  {
    id: '159',
    name: 'Shanmukeswar',
    role: 'Student, KKR & KSR Institute of Technology & Sciences',
    university: 'KKR & KSR Institute of Technology & Sciences',
    avatar: '/images/shanmukeswar.jpg',
    category: 'Lead',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    bio: 'GDGOC KITS Organizer'
  },
  {
    id: '160',
    name: 'Kedareswar Bandlamudi',
    role: 'Student, KKR & KSR Institute of Technology & Sciences',
    university: 'KKR & KSR Institute of Technology & Sciences',
    avatar: '/images/kedareswar_bandlamudi.jpg',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    bio: 'Lead of GDGOC event management at KITS.',
  },
  {
    id: '161',
    name: 'Akhil Kumar Boligala',
    role: 'Student, Annamacharya Institute of Technology and Sciences',
    university: 'Annamacharya Institute of Technology and Sciences',
    avatar: '/images/akhil_kumar_boligala.jpg',
    category: 'Lead',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    bio: 'Pre-final Student lead & Organizer',
    socials: { instagram: 'https://www.instagram.com/__.rareboynani.__' }
  },
  {
    id: '162',
    name: 'A V Durgesh',
    role: "Student, Vignan's Institute of Information Technology",
    university: "Vignan's Institute of Information Technology",
    avatar: '/images/a_v_durgesh.jpg',
    category: 'Lead',
    pronouns: 'He/Him',
    responsibility: 'Technology',
    bio: 'GDG OnCampus Organizer with a strong passion for competitive programming.',
    socials: { portfolio: 'https://durgesh.ankoji.com' }
  },
  {
    id: '163',
    name: 'Kavali Sathya Varshini',
    role: 'Student, Sri Venkateswara College of Engineering',
    university: 'Sri Venkateswara College of Engineering',
    avatar: '/images/kavali_sathya_varshini.jpg',
    category: 'Lead',
    pronouns: 'She/Her',
    responsibility: 'Technology',
    bio: 'GDG Organizer leading student tech initiatives.',
    socials: { linkedin: 'www.linkedin.com/in/sathyavarshini-fsd' }
  },
  {
    id: '164',
    name: 'Vanamu Yashash Chandra Srinivas',
    role: "Student, Vignan's Institute of Information Technology",
    university: "Vignan's Institute of Information Technology",
    avatar: '/images/vanamu_yashash_chandra_srinivas.png',
    category: 'Core Team',
    pronouns: 'He/Him',
    responsibility: 'Operations',
    bio: 'Event Lead at GDG On Campus and active member of SAC.',
    socials: { portfolio: 'https://portfolio-v2-ytfy.vercel.app' }
  },
  {
    id: '165',
    name: 'Bandaru Pravallika',
    role: "Student, Vignan's Institute of Information Technology",
    university: "Vignan's Institute of Information Technology",
    avatar: '/images/bandaru_pravallika.jpg',
    category: 'Core Team',
    pronouns: 'She/Her',
    responsibility: 'Design',
    bio: 'UI/UX Lead at GDG On Campus VIIT.',
    socials: { linkedin: 'https://www.linkedin.com/in/bandaru-pravallika-21a51b283' }
  }
];

export const getTeam = async (): Promise<TeamMember[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockTeam), 200));
};
