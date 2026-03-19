/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react"; // Using Headless UI for dialog

function CallForSpeakersTopicCard({
  session,
  isSelected,
  selectSession,
}: {
  session: any;
  isSelected: boolean;
  selectSession: () => void;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  // Determine button styles based on selection
  const buttonBaseStyle =
    "mt-auto w-fit py-2 px-6 rounded-full font-semibold text-sm transition duration-200 ease-in-out cursor-pointer";
  const buttonSelectedStyle = "bg-[#D2E3FC] text-[#174EA6] google-font"; // Tailwind for #D2E3FC / #174EA6 approx
  const buttonUnselectedStyle =
    "bg-[#174EA6] text-white hover:bg-blue-700 google-font"; // Tailwind for #174EA6 / #D2E3FC approx

  return (
    <>
      {/* Card Activator */}
      <div className="cursor-pointer h-full" onClick={openDialog}>
        {/* v-card translated */}
        <div className="p-4 border-[0px] border-gray-800 rounded-lg shadow-md dark:border h-full flex flex-col aspect-[1.24] max-w-3xs">
          {" "}
          {/* Aspect ratio, flex column */}
          <p className="font-semibold text-lg leading-7 google-font">
            {session.title}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 opacity-70">
            {session.track}
          </p>
          <p className="text-gray-800 text-sm flex-grow">
            {session.description.substring(0, 100)}
            {session.description.length > 100 ? "..." : ""}
          </p>{" "}
          {/* Increased substring length for slightly more text */}
          {/* Select Button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent click from bubbling up and opening the dialog
              selectSession(); // Call the select session handler
            }}
            className={`${buttonBaseStyle} ${
              isSelected ? buttonSelectedStyle : buttonUnselectedStyle
            }`}
          >
            {isSelected ? "Unselect" : "Select"}
          </button>
        </div>
      </div>

      {/* Dialog */}
      <Transition show={dialogOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDialog}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {/* v-card translated */}
                <Dialog.Panel className="w-full max-w-2xl rounded-xl p-4 border-2 border-black bg-white dark:bg-black dark:border-gray-600">
                  {/* v-container fluid translated */}
                  <div className="p-4">
                    {" "}
                    {/* Added internal padding mirroring v-container */}
                    <Dialog.Title as="p" className="text-xl font-semibold mb-1">
                      {session.title}
                    </Dialog.Title>{" "}
                    {/* Used p semantically */}
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-3 opacity-70">
                      {session.format} | {session.timeDuration} mins
                    </p>
                    <p className="text-gray-800">{session.description}</p>
                  </div>

                  {/* v-slot:actions translated */}
                  <div className="mt-4 flex justify-end">
                    {/* v-btn text translated */}
                    <button
                      type="button"
                      className="text-gray-700 px-4 py-2 rounded-full border-2 cursor-pointer dark:text-gray-500 "
                      onClick={closeDialog}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default CallForSpeakersTopicCard;
