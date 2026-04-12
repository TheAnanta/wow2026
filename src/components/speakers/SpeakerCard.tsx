import { useTranslations } from "next-intl";
// src/components/speakers/SpeakerCard.tsx
import React from 'react';
interface SpeakerCardProps {
  name: string;
  title: string;
  pronouns?: string;
  image?: string;
  href: string;
}
export const SpeakerCard: React.FC<SpeakerCardProps> = ({
  name,
  title,
  pronouns = 'He/Him',
  image,
  href
}) => {
  const t = useTranslations();
  return <a href={href} className="speaker-item flex md:flex-col items-start md:items-center w-full md:w-52 p-4 md:p-2 rounded-2xl border-2 border-grey-600 dark:border-grey-bg! md:border-transparent m-auto h-full md:min-h-[270px] xs:p-4 sm:p-5 hover:border-grey-900 focus:border-grey-900 dark:hover:border-grey-bg! md:dark:border-transparent dark:focus:border-grey-bg! cursor-pointer">
    <div className="relative">
      {image ? <img height="136" width="136" className="rounded-full object-cover aspect-square border-[2.25px] border-grey-900 dark:border-white mb-1 max-w-[100px] md:max-w-none" src={image} alt={name} loading="lazy" /> : <div className="w-[100px] h-[100px] md:w-[136px] md:h-[136px] rounded-full border-[2.25px] border-grey-900 dark:border-white mb-1 flex items-center justify-center bg-grey-bg dark:bg-grey-900!">
        <span className="text-2xl font-bold">{name.charAt(0)}</span>
      </div>}
    </div>

    <div className="md:mt-1 ml-[12px] md:ml-[unset] text-grey-900 dark:text-grey-bg!">
      <p className="sm:l-cta2 font-medium text-left md:text-center">{name}</p>
      <p className="sm:l-tags font-normal text-left md:text-center mt-2 md:mt-1">{title}</p>
      <p className="sm:l-eyeline font-bold text-left md:text-center uppercase">{pronouns}</p>
    </div>
  </a>;
};