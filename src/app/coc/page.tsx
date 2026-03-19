"use client";
import React, { useEffect } from "react";
import cocData from "@/data/coc.json";
import mainData from "@/data/config.json";

const CodeOfConduct = () => {
  useEffect(() => {
    document.title = `Code of Conduct - ${mainData.eventInfo.name} | ${mainData.communityName}`;
    document
      .querySelector("meta[property='og:title']")
      ?.setAttribute(
        "content",
        `Code of Conduct - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
    document
      .querySelector("meta[name='twitter:title']")
      ?.setAttribute(
        "content",
        `Code of Conduct - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
  }, []); // Set title and meta tags on component mount

  return (
    <main className="p-16 ">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Code of Conduct
        </h1>
        <p className="text-lg text-gray-600 mt-2 mb-10 dark:text-gray-400">
          All participants of GDGoC WOW AP 2025 event, attendees, event staff,
          and speakers, must abide by the following policy:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cocData.map((item, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-md bg-white dark:bg-black"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {item.name}
              </h2>
              <p className="text-gray-600 mt-2 dark:text-gray-400">
                {item.des}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CodeOfConduct;
