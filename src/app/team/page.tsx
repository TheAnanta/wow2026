/*eslint-disable @typescript-eslint/no-explicit-any*/

"use client";
import teamData from "@/data/team.json"; // Assuming you have this as a separate JS file or JSON

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaGlobe,
  FaYoutube,
  FaMedium,
} from "react-icons/fa";
import mainData from "@/data/config.json";

function SpeakerSocialLinks({
  socialLinks,
  dark,
}: {
  socialLinks: any;
  dark?: boolean;
}) {
  const iconClass = `w-8 h-8 p-1 rounded hover:opacity-80 transition ${
    dark ? "text-white" : "text-gray-700"
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
          socialLinks[key]?.length > 0 && (
            <a
              key={key}
              href={socialLinks[key]}
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
}

function TeamProfileCard({ data }: { data: any }) {
  const [open, setOpen] = useState(false);

  const avatarSrc = data.image?.length
    ? `/images/team/${data.image}`
    : "/common/avatar.png";

  return (
    <>
      {/* Trigger */}
      <div
        onClick={() => setOpen(true)}
        className="text-center cursor-pointer relative w-4/5 mx-auto mt-5"
      >
        <div className="relative w-full mb-4">
          <Image
            src="/common/frame.png"
            alt="frame"
            width={300}
            height={300}
            className="absolute top-0 left-0 w-full z-10 dark:hidden"
          />
          <Image
            src="/common/frame_dark.png"
            alt="frame"
            width={300}
            height={300}
            className="absolute top-0 left-0 w-full z-10 dark:block hidden"
          />
          <Image
            src={avatarSrc}
            alt={data.name}
            width={300}
            height={300}
            className="relative border object-cover w-full aspect-square"
          />
        </div>
        <h3 className="-mt-2 font-semibold text-lg">{data.name}</h3>
        <p className="text-sm">{data.company?.name}</p>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 dark:bg-stone-900/80 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-black rounded-xl max-w-3xl w-full p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-4 text-gray-600 hover:text-black dark:hover:text-white transition duration-200 cursor-pointer"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Image */}
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-40">
                  <Image
                    src="/common/frame.png"
                    alt="frame"
                    width={160}
                    height={160}
                    className="absolute top-0 left-0 w-full z-10 dark:hidden"
                  />
                  <Image
                    src="/common/frame_dark.png"
                    alt="frame"
                    width={160}
                    height={160}
                    className="absolute top-0 left-0 w-full z-10 dark:block hidden"
                  />
                  <Image
                    src={avatarSrc}
                    alt={data.name}
                    width={160}
                    height={160}
                    className="relative border border-white overflow-hidden aspect-square object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="w-full md:w-2/3">
                <h1 className="text-2xl font-bold mb-1">{data.name}</h1>
                <p className="font-medium mb-4">
                  {data.community_title ? (
                    <>
                      {data.community_title} | {data.company.designation},{" "}
                      {data.company.name}
                    </>
                  ) : (
                    <>
                      {data.company.designation}, {data.company.name}
                    </>
                  )}
                </p>
                <p className="text-gray-700 dark:text-gray-400 mb-4">
                  {data.bio}
                </p>
                <SpeakerSocialLinks socialLinks={data.social} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function TeamPage() {
  useEffect(() => {
    document.title = `Team - ${mainData.eventInfo.name} | ${mainData.communityName}`;
    document
      .querySelector("meta[property='og:title']")
      ?.setAttribute(
        "content",
        `Team - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
    document
      .querySelector("meta[name='twitter:title']")
      ?.setAttribute(
        "content",
        `Team - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
  }, []); // Set title and meta tags on component mount

  const coreTeam = teamData.filter(
    (item: { type: string }) => item.type === "Core"
  );
  const otherTeam = teamData.filter(
    (item: { type: string }) => item.type !== "Core"
  );

  return (
    <div>
      <div className="container mx-auto px-4 mt-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">Leads</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4 max-w-[64ch]">
            Our mission is to equip our community members with practical skills,
            enabling them to communicate their insights and drive innovative
            solutions effectively. Whatever your challenge, these leaders on the
            front line of transformation, innovation, and exploration helped
            solve it with you.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-16">
          {coreTeam.map((item: any, index: any) => (
            <TeamProfileCard key={index} data={item} />
          ))}
        </div>

        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-4">Crew</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {otherTeam.map((item: any, index: any) => (
            <TeamProfileCard key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
