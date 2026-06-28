import React from 'react';

export const Icon: React.FC<{ children: React.ReactNode; size?: number; className?: string; stroke?: number }> = ({ children, size = 24, className = '', stroke = 2, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...rest}
  >
    {children}
  </svg>
);

export const IconMenu: React.FC<any> = (p) => (
  <Icon {...p}><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></Icon>
);
export const IconBack: React.FC<any> = (p) => (
  <Icon {...p}><polyline points="15,5 8,12 15,19" /></Icon>
);
export const IconInfo: React.FC<any> = (p) => (
  <Icon {...p}><circle cx="12" cy="12" r="9" /><line x1="12" y1="11" x2="12" y2="16" /><circle cx="12" cy="8" r="0.5" fill="currentColor" /></Icon>
);
export const IconCheck: React.FC<any> = (p) => (
  <Icon {...p}><polyline points="5,12 10,17 19,7" /></Icon>
);
export const IconClose: React.FC<any> = (p) => (
  <Icon {...p}><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></Icon>
);
export const IconTag: React.FC<any> = (p) => (
  <Icon {...p}><path d="M3 12 V4 H11 L21 14 L14 21 L4 11" /><circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" stroke="none" /></Icon>
);
export const IconChevronDown: React.FC<any> = (p) => (
  <Icon {...p}><polyline points="6,9 12,15 18,9" /></Icon>
);
export const IconLock: React.FC<any> = (p) => (
  <Icon {...p}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11 V8 a4 4 0 0 1 8 0 V11" /></Icon>
);
export const IconShield: React.FC<any> = (p) => (
  <Icon {...p}><path d="M12 3 L20 6 V12 C20 16.5 16.5 20 12 21 C7.5 20 4 16.5 4 12 V6 Z" /><polyline points="9,12 11,14 15,10" /></Icon>
);
export const IconSparkle: React.FC<any> = (p) => (
  <Icon {...p}><path d="M12 4 L13.5 10 L19 11.5 L13.5 13 L12 19 L10.5 13 L5 11.5 L10.5 10 Z" /></Icon>
);
export const IconTrash: React.FC<any> = (p) => (
  <Icon {...p}><polyline points="4,7 20,7" /><path d="M6 7 V19 a2 2 0 0 0 2 2 H16 a2 2 0 0 0 2 -2 V7" /><path d="M9 7 V5 a2 2 0 0 1 2 -2 H13 a2 2 0 0 1 2 2 V7" /></Icon>
);
export const IconTrophy: React.FC<any> = (p) => (
  <Icon {...p}>
    <path d="M7 4 H17 V10 a5 5 0 0 1 -10 0 Z" />
    <path d="M7 6 H4 V8 a3 3 0 0 0 3 3" />
    <path d="M17 6 H20 V8 a3 3 0 0 0 -3 3" />
    <line x1="10" y1="20" x2="14" y2="20" />
    <line x1="12" y1="15" x2="12" y2="20" />
  </Icon>
);
export const IconArrowUp: React.FC<any> = (p) => (
  <Icon {...p}><line x1="12" y1="19" x2="12" y2="5" /><polyline points="6,11 12,5 18,11" /></Icon>
);
export const IconUser: React.FC<any> = (p) => (
  <Icon {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></Icon>
);
export const IconSchool: React.FC<any> = (p) => (
  <Icon {...p}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></Icon>
);
export const IconSignOut: React.FC<any> = (p) => (
  <Icon {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></Icon>
);
export const IconPhone: React.FC<any> = (p) => (
  <Icon {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></Icon>
);

export const IconPartyPopper: React.FC<any> = ({ size = 24, className = '', ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 -960 960 960"
    fill="currentColor"
    className={className}
    {...rest}
  >
    <path d="m80-80 200-560 360 360L80-80Zm132-132 282-100-182-182-100 282Zm370-246-42-42 224-224q32-32 77-32t77 32l24 24-42 42-24-24q-14-14-35-14t-35 14L582-458ZM422-618l-42-42 24-24q14-14 14-34t-14-34l-26-26 42-42 26 26q32 32 32 76t-32 76l-24 24Zm80 80-42-42 144-144q14-14 14-35t-14-35l-64-64 42-42 64 64q32 32 32 77t-32 77L502-538Zm160 160-42-42 64-64q32-32 77-32t77 32l64 64-42 42-64-64q-14-14-35-14t-35 14l-64 64ZM212-212Z" />
  </svg>
);
