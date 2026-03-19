/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";

export default function NetworkConnectionCard({ connection }: any) {
  const [isOpen, setIsOpen] = useState(false);

  if (!connection) return null;

  return (
    <>
      {/* Card preview */}
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer rounded-xl p-6 flex flex-col items-center text-center shadow-xl hover:shadow-2xl transition dark:shadow-white/10 dark:border-2 dark:border-white/15 dark:shadow-lg"
        key={connection?.username}
      >
        <img
          referrerPolicy="no-referrer"
          src={connection?.photoURL}
          alt={connection?.displayName}
          className="w-24 h-24 rounded-full border border-gray-800 p-1 object-cover"
        />
        <h3 className="mt-4 text-lg font-semibold">
          {connection?.displayName ?? "User"}
        </h3>
        {connection?.company && connection?.company.designation && (
          <p className="text-sm mt-1">
            {connection?.company?.designation}, {connection?.company?.name}
          </p>
        )}
        <span className="mt-3 px-3 py-1 text-xs bg-sky-100 text-sky-800 rounded-full">
          Attendee
        </span>
      </div>
      {/* Dialog */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 "
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 ">
          <Dialog.Panel className="bg-[#cee6c1] rounded-3xl p-4 max-w-lg mx-auto overflow-auto relative ">
            <div className="flex flex-col md:flex-row gap-6 ">
              <img
                src={connection?.photoURL}
                alt={connection?.displayName}
                className="w-full aspect-square md:w-60 h-60 object-cover rounded-xl object-top"
              />
              <div className="flex flex-col h-max my-auto">
                <h2 className="text-2xl text-black google-font font-bold leading-7">
                  {connection?.displayName}
                </h2>
                <p className="text-black/60 font-semibold google-font">
                  @{connection.username}
                </p>
                {connection?.company && (
                  <p className="text-sm text-black my-1">
                    {connection?.company?.designation},{" "}
                    {connection?.company?.name}
                  </p>
                )}

                {/* Icons */}
                <div className="flex items-center gap-4 text-gray-800 mt-2">
                  <FaLinkedin className="w-5 h-5 cursor-pointer" />
                  <FaGithub className="w-5 h-5 cursor-pointer" />
                  <FiGlobe className="w-5 h-5 cursor-pointer" />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4 max-w-xs">
                  {["#WebAssembly", "#Android", "#Kotlin", "#Kotlin"].map(
                    (tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center rounded-full bg-[#000000]/9 text-black px-3 min-h-8 text-sm"
                      >
                        {" "}
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Badge image */}
            <img
              src="/mobile.png"
              alt="badge"
              className="absolute h-20 left-3 top-3 object-contain"
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
