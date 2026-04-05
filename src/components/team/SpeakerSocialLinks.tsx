// src/components/team/SpeakerSocialLinks.tsx
import React from 'react';
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaGlobe,
  FaYoutube,
  FaMedium,
} from "react-icons/fa";

interface SocialLinksProps {
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
    web?: string;
    youtube?: string;
    medium?: string;
  };
  dark?: boolean;
}

export const SpeakerSocialLinks: React.FC<SocialLinksProps> = ({
  socialLinks,
  dark,
}) => {
  const iconClass = `w-8 h-8 p-1 rounded hover:opacity-80 transition flex items-center justify-center ${
    dark ? "text-white hover:bg-white/10" : "text-grey-900 hover:bg-grey-100"
  }`;

  const links = [
    { key: "linkedin", icon: <FaLinkedin /> },
    { key: "github", icon: <FaGithub /> },
    { key: "twitter", icon: <FaTwitter /> },
    { key: "instagram", icon: <FaInstagram /> },
    { key: "web", icon: <FaGlobe /> },
    { key: "youtube", icon: <FaYoutube /> },
    { key: "medium", icon: <FaMedium /> },
  ];

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {links.map(
        ({ key, icon }) =>
          (socialLinks as any)[key] && (socialLinks as any)[key].length > 0 && (
            <a
              key={key}
              href={(socialLinks as any)[key]}
              target="_blank"
              rel="noopener noreferrer"
              className={iconClass}
              aria-label={key}
            >
              {icon}
            </a>
          )
      )}
    </div>
  );
};
