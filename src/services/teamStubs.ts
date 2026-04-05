// src/services/teamStubs.ts

export interface TeamMember {
  id: string;
  name: string;
  company: {
    name: string;
    designation: string;
  };
  community_title?: string;
  image: string;
  bio: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    web?: string;
    instagram?: string;
    youtube?: string;
    medium?: string;
  };
  type: 'Core' | 'Core-Contributor' | string;
}

import teamDataJson from './data/team_utf8.json';

const mockTeam: TeamMember[] = teamDataJson as TeamMember[];

export const getTeam = async (): Promise<TeamMember[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockTeam), 200));
};

export const getCoreTeam = async (): Promise<TeamMember[]> => {
  return new Promise((resolve) => setTimeout(() => 
    resolve(mockTeam.filter(m => m.type === 'Core')), 200)
  );
};

export const getContributorTeam = async (): Promise<TeamMember[]> => {
  return new Promise((resolve) => setTimeout(() => 
    resolve(mockTeam.filter(m => m.type !== 'Core')), 200)
  );
};
