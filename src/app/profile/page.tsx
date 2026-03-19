/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import {
  getDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  getCountFromServer,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "@/lib/firebase";
import { useAuthContext } from "@/context/AuthContext";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { FaSpinner, FaTimes, FaWhatsapp } from "react-icons/fa";
import {
  FiGlobe,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiGithub,
} from "react-icons/fi";
import moment from "moment";
import arcadeJson from "@/data/arcade.json";
import { FilledTextField } from "material-you-react";
import mainData from "@/data/config.json";

// import { Dialog, Transition } from '@headlessui/react';
import { MdLock, MdOutlineEmail, MdEdit } from "react-icons/md"; // Material Design Icons
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import CircularProgress from "@mui/material/CircularProgress";

const getSocialIconComponent = (providerValue?: string) => {
  switch (providerValue) {
    case "instagram":
      return <FiInstagram />;
    case "github":
      return <FiGithub />;
    case "linkedin":
      return <FiLinkedin />;
    case "website":
      return <FiGlobe />;
    default:
      return <FiGlobe />; // Default icon
  }
};

function BadgeGrid({ user, badges }: { user: any; badges: any[] }) {
  // State to manage which badge's dialog is open (index in the badges array)
  const [openBadgeIndex, setOpenBadgeIndex] = useState(null);

  const closeDialog = () => setOpenBadgeIndex(null);
  const openDialog = (index: any) => setOpenBadgeIndex(index);

  // Get the data for the currently selected badge
  const selectedBadge = openBadgeIndex !== null ? badges[openBadgeIndex] : null;

  return (
    // <v-col md="8" sm="12"> translated to a div with responsive width
    // Added mx-auto for centering if it's not already in a centered container
    <div className="w-full mx-auto">
      {/* <v-card class="pa-3"> translated */}
      <div className="p-4 bg-white dark:bg-black rounded-lg shadow-md border-gray-200 dark:border-gray-600 border">
        {" "}
        {/* pa-3 -> p-4, added shadow/rounded */}
        {/* <h2 v-if="!user" ...> translated */}
        {!user && (
          <h2 className="mb-8 mx-4 text-2xl font-semibold">
            Login to view profile!
          </h2>
        )}
        {/* <v-row> translated */}
        <div className="flex flex-wrap">
          {" "}
          {/* flex container, negative margin to counter col padding */}
          {/* <v-col v-for="..."> translated */}
          {badges.map((item, index) => (
            // cols="6" sm="6" md="3" translated to responsive width classes
            // px-4 adds horizontal padding, mb-8 adds bottom margin for vertical spacing
            <div key={index} className="w-full sm:w-1/2 md:w-1/4 mb-8">
              {/* v-dialog activator content */}
              {/* The clickable badge item */}
              <div
                className="flex flex-col items-center justify-center p-4 cursor-pointer h-full" // p-4 similar to v-container padding
                onClick={() => openDialog(index)}
              >
                <div className="relative w-[70%] flex my-auto max-h-32">
                  {" "}
                  {/* 70% width div */}
                  <img
                    src={`/images/arcade/badges/${item.image}`} // Adjust path if needed, assuming public dir
                    alt={item.name}
                    className={`w-full block ${!item.earned ? "grayscale opacity-30" : ""
                      }`} // Conditional styles
                  />
                  {!item.earned && (
                    // Lock icon positioned absolutely
                    <MdLock className="absolute inset-0 mx-auto my-auto flex items-center justify-center text-gray-600 text-4xl" /> // Center using flex on absolute div, text size
                  )}
                </div>
                <p className="text-base font-semibold mt-2 text-center">
                  {item.name}
                </p>{" "}
                {/* Font size/weight, spacing */}
                {item.date !== "Not earned" && (
                  <p className="text-sm text-gray-600 font-medium text-center opacity-60">
                    {item.date}
                  </p>
                )}
                {item.date === "Not earned" && (
                  <button className="cursor-pointer text-sm border border-black dark:border-gray-500 py-1 px-3 rounded-full mt-1 flex items-center">
                    {" "}
                    {/* Button styles */}
                    Learn More{" "}
                    <span className="material-symbols-outlined ml-1 !text-sm">
                      arrow_forward
                    </span>{" "}
                    {/* Arrow icon */}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Dialog Component (using Headless UI) */}
      {/* Rendered outside the loop, but its content depends on selectedBadge */}
      <Transition show={openBadgeIndex !== null} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDialog}>
          {" "}
          {/* z-index to appear on top */}
          {/* Backdrop overlay */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </TransitionChild>
          {/* Full-screen container to center the dialog */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              {/* Dialog Panel */}
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {/* <v-card max-width="800" ...> translated */}
                <DialogPanel className="w-full max-w-2xl rounded-xl p-4 border-2 border-black bg-white">
                  {" "}
                  {/* max-w-2xl approx 800px */}
                  {/* Dialog content container */}
                  {/* Ensure selectedBadge exists before accessing its properties */}
                  {selectedBadge && (
                    // <v-row> and <v-col> inside dialog translated
                    <div className="flex flex-wrap items-center mx-4">
                      {/* Image column cols="3" */}
                      <div className="w-full sm:w-1/4 px-4 mb-4 sm:mb-0">
                        {" "}
                        {/* Adjust width for mobile stacking */}
                        <img
                          src={`/images/arcade/badges/${selectedBadge.image}`} // Adjust path
                          alt={selectedBadge.name}
                          className="w-full"
                        />
                      </div>
                      {/* Text column */}
                      <div className="w-full sm:w-3/4 px-4">
                        <DialogTitle
                          as="h1"
                          className="mt-3 mb-1 text-2xl font-bold leading-tight"
                        >
                          {" "}
                          {/* Adjust font size/weight */}
                          {selectedBadge.name}
                        </DialogTitle>
                        <p className="font-medium text-gray-700 -mt-1">
                          {" "}
                          {/* Spacing/color */}
                          {selectedBadge.date === "Not earned"
                            ? "Not earned"
                            : "Earned on " + selectedBadge.date}
                        </p>
                        <p className="my-2 text-sm whitespace-pre-line text-gray-800 leading-6">
                          {" "}
                          {/* Spacing, pre-line for line breaks */}
                          {selectedBadge.description}
                        </p>
                        {selectedBadge.earned && (
                          <div className="flex items-center gap-3 mt-4">
                            {" "}
                            {/* Social share icons */}
                            <p className="font-semibold text-gray-800">
                              Share:
                            </p>
                            {/* Add actual sharing logic here if needed, these are just icons */}
                            <FiInstagram className="text-xl cursor-pointer" />
                            <FiLinkedin className="text-xl cursor-pointer" />
                            <MdOutlineEmail className="text-xl cursor-pointer" />
                            <FaWhatsapp className="text-xl cursor-pointer" />
                            <FiTwitter className="text-xl cursor-pointer" />
                          </div>
                        )}
                        {!selectedBadge.earned && selectedBadge.link && (
                          <a
                            href={selectedBadge.link}
                            className="inline-block bg-blue-500 text-white py-2 px-4 mt-3 hover:bg-blue-600 text-sm font-medium rounded-full"
                          >
                            {" "}
                            {/* Claim button */}
                            Claim now
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                  {/* Dialog Actions */}
                  <div className="mt-4 flex justify-end">
                    {/* <v-btn text @click="dialog = false">Close</v-btn> translated */}
                    <button
                      type="button"
                      className="text-gray-700 px-4 py-2 rounded-full cursor-pointer border-2 text-sm font-medium" // Styling like a text button
                      onClick={closeDialog}
                    >
                      Close
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

function ProfileCard({
  userDetails,
  setUserDetails,
  badgesCount,
}: {
  userDetails: any;
  setUserDetails: any;
  badgesCount: number;
}) {
  const [showEditor, setShowEditor] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const headshotFileInputRef = useRef<HTMLInputElement>(null);
  // Function to get Tailwind color class for role chip
  const getRoleChipColor = (role?: string) => {
    switch (role) {
      case "Organizer":
        return "bg-[#ea4335] text-white border-[#ea4335]";
      case "Volunteer":
        return "bg-[#4285f4] text-white border-[#4285f4]";
      case "Speaker":
        return "bg-[#34a853] text-white border-[#34a853]";
      default:
        return "bg-[#f9ab00] text-[#202023] border-[#f9ab00]"; // Attendee or default
    }
  };

  const socialProviders = [
    { label: "Instagram", value: "instagram" },
    { label: "GitHub", value: "github" },
    { label: "LinkedIn", value: "linkedin" },
    { label: "Website", value: "website" },
  ];

  const [availableSocialProviders, setAvailableSocialProviders] =
    useState(socialProviders);

  useEffect(() => {
    // Update available providers when userDetails.socials changes
    if (userDetails?.socials) {
      const usedProviderValues = userDetails.socials.map(
        (s: any) => s.provider
      );
      setAvailableSocialProviders(
        socialProviders.filter((p) => !usedProviderValues.includes(p.value))
      );
    } else {
      setAvailableSocialProviders(socialProviders);
    }
  }, [userDetails?.socials]);

  const addNewSocial = () => {
    if (!userDetails?.socials) {
      userDetails.socials = [];
    }

    const unusedProviders = socialProviders.filter(
      (provider) =>
        !userDetails.socials.some(
          (social: any) => social.provider === provider.value
        )
    );

    if (unusedProviders.length > 0) {
      setUserDetails({
        ...userDetails,
        socials: [
          ...userDetails.socials,
          {
            provider: unusedProviders[0].value,
            name: "",
            icon: getSocialIconComponent(unusedProviders[0].value), // Use helper for icon component
          },
        ],
      });
    }
  };

  const removeSocial = (index: any) => {
    const socialsCopy = [...userDetails.socials];
    socialsCopy.splice(index, 1);
    setUserDetails({ ...userDetails, socials: socialsCopy });
  };

  const handleSocialProviderChange = (
    index: number,
    newProviderValue: string
  ) => {
    const updatedSocials = [...userDetails.socials];
    const currentSocial = updatedSocials[index];
    currentSocial.provider = newProviderValue;
    currentSocial.icon = getSocialIconComponent(newProviderValue); // Use helper for icon component
    setUserDetails({ ...userDetails, socials: updatedSocials });
  };

  const handleSocialNameChange = (index: number, newName: string) => {
    const updatedSocials = [...userDetails.socials];
    updatedSocials[index].name = newName;
    setUserDetails({ ...userDetails, socials: updatedSocials });
  };

  // MODIFIED: handleDomainsChange for checkboxes
  const handleDomainsChange = (domainValue: string, checked: boolean) => {
    const currentDomains = userDetails.domainsInterested || [];
    let newDomains: string[];
    if (checked) {
      newDomains = [...currentDomains, domainValue];
    } else {
      newDomains = currentDomains.filter((d: string) => d !== domainValue);
    }
    setUserDetails({ ...userDetails, domainsInterested: newDomains });
  };

  const availableDomains = [
    { label: "Web Development", value: "Web" },
    { label: "Mobile Development", value: "Mobile" },
    { label: "Cloud Computing", value: "Cloud" },
    { label: "Artificial Intelligence", value: "AI" },
    { label: "Career Development", value: "Career" },
    { label: "Entrepreneurship", value: "Entrepreneurship" },
  ];

  const handleInputChange = (field: string, value: any) => {
    setUserDetails({ ...userDetails, [field]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("User not authenticated.");
      setIsSubmitLoading(false);
      return;
    }
    setIsSubmitLoading(true);

    try {
      const coll = collection(db, "users");
      const q = query(
        coll,
        where("username", "==", userDetails?.username),
        where("__name__", "!=", auth.currentUser.uid)
      );
      const snapshot = await getCountFromServer(q);

      if (snapshot.data().count === 0) {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        // Prepare social data for Firestore (store provider string, not component)
        const socialsToSave =
          userDetails.socials?.map((s: any) => ({
            provider: s.provider,
            name: s.name,
            // Icon is for UI, not stored, or store the mdi string if needed by other platforms
          })) || [];

        const userData = {
          email: auth.currentUser?.email,
          username: userDetails?.username.toLowerCase() || "",
          bio: userDetails?.bio || "",
          city: userDetails?.city || "",
          socials: socialsToSave,
          photoURL: userDetails?.photoURL || auth.currentUser?.photoURL || "",
          displayName:
            userDetails?.displayName || auth.currentUser?.displayName || "",
          domainsInterested: userDetails?.domainsInterested || [],
          role: userDetails?.role || "Attendee", // Persist role
          // company and communityTitle should also be persisted if they are editable
          company: userDetails?.company || {},
          communityTitle: userDetails?.communityTitle || "",
        };

        if (!userDocSnap.exists()) {
          await setDoc(userDocRef, userData);
        } else {
          await updateDoc(userDocRef, userData);
        }

        setShowEditor(false);
        alert("Profile updated successfully!");
      } else {
        alert(userDetails?.username + " is already in use!!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    } finally {
      setIsSubmitLoading(false);
    }
  };

  // Profile Picture Upload Functions
  const openFileInput = () => {
    headshotFileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && auth.currentUser) {
      setIsUploadingFile(true);
      const fileRef = storageRef(
        storage,
        `headshots/${auth.currentUser.uid}/${file.name}`
      );
      try {
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);

        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          photoURL: downloadURL,
        });
        setUserDetails({ ...userDetails, photoURL: downloadURL });
        // Update photoURL in localStorage if needed, or let parent handle it
        localStorage.setItem("dv_photo_url", downloadURL);

        alert("Profile picture updated successfully!");
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        alert("Error uploading profile picture. Please try again.");
      } finally {
        setIsUploadingFile(false);
      }
    }
  };
  return (
    <div className="w-full md:w-1/3 max-w-[400px]">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>{" "}
      <p className="text-gray-700 mb-12">
        Our mission is to equip our community members with practical skills,
        enabling them to communicate their insights.
      </p>
      {
        /*user &&*/ userDetails && (
          <div className="mt-8 flex flex-col items-center">
            {" "}
            {/* mt-8, flex, flex-col, items-center */}
            <div className="relative ">
              {" "}
              {/* position: relative; */}
              {/* Profile Picture and Upload */}
              <img
                referrerPolicy="no-referrer"
                src={
                  userDetails.photoURL ||
                  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                alt="Profile Picture"
                className="-translate-y-[20px] size-[156px] rounded-full object-cover relative z-10 cursor-pointer border-2 dark:border-black" // rounded-full, mb-2, object-cover, relative, z-10, cursor-pointer
              />
              {/* Edit button for profile picture */}
              <button
                onClick={openFileInput}
                className="absolute top-[-15px] right-[-5px] z-20 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                aria-label="Edit profile picture"
              >
                <MdEdit className="text-gray-700" />
              </button>
              {/* Hidden file input */}
              <input
                type="file"
                ref={headshotFileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              {/* Loading spinner for image upload */}
              {isUploadingFile && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full -translate-y-[20px] z-10">
                  <CircularProgress />
                </div>
              )}
            </div>
            <div className="w-full flex flex-col items-center outline-2 outline-[#202023] dark:outline-gray-500 rounded-3xl p-6 transform -translate-y-20 relative bg-white dark:bg-black">
              <div
                className="absolute top-[-106px] w-[180px] h-[180px] rounded-full border-2 border-[#202023] dark:border-gray-500 bg-white dark:bg-black z-10"
                style={{
                  clipPath: "inset(57.8% 0px 0px)",
                }}
              />{" "}
              <div className="h-20"></div>{" "}
              <div className="flex items-center gap-2 text-xl">
                <p className="text-gray-900 dark:text-gray-100 text-xl">
                  {userDetails.displayName} <span>{userDetails.paymentStatus && <div className={`!text-xs inline-flex items-center w-max px-3 py-1.5 rounded-full border bg-black dark:bg-white text-white dark:text-black mx-1 gap-2`}><span className="material-symbols-outlined !text-sm">verified</span><span>Registered</span></div>}</span>
                </p>{" "}
                {/* <span
                  className={`text-xs px-3 py-1.5 rounded border ${getRoleChipColor(
                    userDetails.role
                  )} border border-black`}
                >
                  {" "}
                  {userDetails.role || "Attendee"}
                </span> */}
              </div>
              {userDetails.company &&
                userDetails.company.designation &&
                userDetails.company.name && (
                  <p className="mt-2 text-gray-700 dark:text-gray-400 text-base">
                    {userDetails.company.designation},{" "}
                    {userDetails.company.name}
                  </p>
                )}
              {userDetails.communityTitle && (
                <p className="text-gray-700 dark:text-gray-400 text-base">
                  {userDetails.communityTitle}
                </p>
              )}
              {userDetails.username && (
                <a
                  href={`https://wow.vizag.dev/p/${userDetails.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 mt-3 border border-[#dadce0] text-[#1a73e8] font-medium px-3 py-1.5 rounded-full text-sm no-underline hover:bg-gray-50" // display: flex, align-items: center, column-gap: 4px, margin-top: 12px, border: 1px solid #dadce0, color: #1a73e8, padding: 6px 12px, border-radius: 48px, text-decoration:none;
                >
                  wow.vizag.dev/p/{userDetails.username}{" "}
                  <span className="material-symbols-outlined !text-[18px]">
                    open_in_new
                  </span>
                </a>
              )}
              <div className="w-full border-t my-3 opacity-100"></div>{" "}
              {showEditor ? (
                <form
                  onSubmit={handleSubmit}
                  className="w-full space-y-4 text-left"
                >
                  <FilledTextField
                    value={userDetails.username || ""}
                    onValueChange={(newValue: string) =>
                      handleInputChange("username", newValue)
                    }
                    labelText={"Username"}
                  />
                  <FilledTextField
                    value={userDetails.displayName || ""}
                    onValueChange={(newValue: string) =>
                      handleInputChange("displayName", newValue)
                    }
                    labelText={"Display Name"}
                  />
                  <FilledTextField
                    value={userDetails.city || ""}
                    onValueChange={(newValue: string) =>
                      handleInputChange("city", newValue)
                    }
                    labelText={"City/Town"}
                  />
                  <FilledTextField
                    type="textarea"
                    value={userDetails.bio || ""}
                    onValueChange={(newValue: string) =>
                      handleInputChange("bio", newValue)
                    }
                    labelText={"Bio"}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Domains Interested
                    </label>
                    <div className="space-y-2 mt-1">
                      {availableDomains.map((domain) => (
                        <label
                          key={domain.value}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            value={domain.value}
                            checked={(
                              userDetails.domainsInterested || []
                            ).includes(domain.value)}
                            onChange={(e) =>
                              handleDomainsChange(
                                domain.value,
                                e.target.checked
                              )
                            }
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">
                            {domain.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Social Media Links
                    </label>
                    {userDetails.socials &&
                      userDetails.socials.map((social: any, index: number) => (
                        <div
                          key={index}
                          className="flex gap-2 mb-2 items-center"
                        >
                          <select
                            value={social.provider}
                            onChange={(e) =>
                              handleSocialProviderChange(index, e.target.value)
                            }
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            {/* Ensure only available providers for this specific slot + current one are shown, or simply all */}
                            {socialProviders.map((provider) => (
                              <option
                                key={provider.value}
                                value={provider.value}
                                disabled={userDetails.socials.some(
                                  (s: any, i: number) =>
                                    i !== index && s.provider === provider.value
                                )}
                              >
                                {provider.label.charAt(0)}
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            value={social.name}
                            onChange={(e) =>
                              handleSocialNameChange(index, e.target.value)
                            }
                            placeholder={`Enter ${social.provider} handle/URL`}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => removeSocial(index)}
                            className="p-2 text-gray-500 rounded-md hover:bg-gray-200 cursor-pointer focus:outline-none"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                    <button
                      type="button"
                      onClick={addNewSocial}
                      className="mt-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={
                        availableSocialProviders.length === 0 ||
                        (userDetails.socials &&
                          userDetails.socials.length >= socialProviders.length)
                      }
                    >
                      + Add Social Handle
                    </button>
                  </div>
                  <div className="flex gap-3 mt-6 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowEditor(false)}
                      className="px-4 py-1.5 text-gray-600 border border-gray-300 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitLoading}
                      className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSubmitLoading && (
                        <FaSpinner className="animate-spin h-4 w-4" />
                      )}
                      {isSubmitLoading ? "Updating..." : "Submit"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-start w-full text-sm text-gray-800 dark:text-gray-400">
                  {userDetails.speaker && (
                    <>
                      <p className="font-semibold mt-2 mb-1">Talk Title</p>{" "}
                      <p>{userDetails.speaker.talk || "N/a"}</p>
                    </>
                  )}
                  {userDetails.city && userDetails.city !== "" && (
                    <>
                      <p className="font-semibold mt-2 mb-1">City/Town</p>{" "}
                      <p>{userDetails.city}</p>
                    </>
                  )}
                  {userDetails.bio && userDetails.bio !== "" && (
                    <>
                      <p className="font-semibold mt-2 mb-1">Bio</p>{" "}
                      <p>{userDetails.bio}</p>
                    </>
                  )}
                  {userDetails.domainsInterested &&
                    userDetails.domainsInterested.length > 0 && (
                      <>
                        <p className="font-semibold mt-2 mb-1">
                          Domains Interested
                        </p>{" "}
                        <div className="flex flex-wrap">
                          {" "}
                          {userDetails.domainsInterested.map(
                            (domain: any, index: any) => (
                              <span
                                key={index}
                                className="inline-flex items-center rounded-full bg-[#000000]/9 px-3 min-h-8 text-sm m-1"
                              >
                                {" "}
                                {domain}
                              </span>
                            )
                          )}
                        </div>
                      </>
                    )}
                  {/* Stats */}
                  <p className="font-semibold mt-2 mb-1">Stats</p>{" "}
                  <p className="flex items-center gap-1">
                    <span className="material-symbols-outlined !text-[18px]">
                      stars
                    </span>
                    {badgesCount} • Badges earned
                  </p>{" "}
                  {(userDetails.socials?.length ?? 0) > 0 && (
                    <>
                      <p className="font-semibold mt-2 mb-1">Links</p>{" "}
                      <ul className="list-none p-0 w-full">
                        {" "}
                        {userDetails.socials?.map((item: any, index: any) => (
                          <li
                            key={index}
                            className="flex items-center gap-3 my-3"
                          >
                            <span
                              className={`material-symbols-outlined !text-[18px]`}
                            >
                              {" "}
                              {item.icon}
                            </span>
                            <a
                              href={
                                item.provider === "instagram"
                                  ? `https://instagram.com/${item.name}`
                                  : item.provider === "github"
                                    ? `https://github.com/${item.name}`
                                    : item.provider === "linkedin"
                                      ? `https://linkedin.com/in/${item.name}`
                                      : item.name.startsWith("http")
                                        ? item.name
                                        : `https://${item.name}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#202023] dark:text-gray-500"
                            >
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
              {
                userDetails.teamName && (
                  <a className="text-amber-200 cursor-pointer p-1.5 border rounded-full"
                    href={`/hackathon/${userDetails.teamName.split(" ").map((e: string) => encodeURIComponent(e)).join("-")}`}>
                    {userDetails.teamName} #{userDetails.teamNumber}
                  </a>
                )
              }
              {userDetails && (
                <div className="w-full border-t my-3 opacity-100"></div>
              )}{" "}
              <div className="flex gap-3 mt-3">
                {" "}
                {userDetails && !showEditor && (
                  <button
                    onClick={() => setShowEditor(true)}
                    className="border-[1.5px] border-[#202023] px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer" // border: 1.5px solid #202023, padding: 6px 16px, margin-top: 12px, border-radius: 40px, font-size: 14px
                  >
                    Update Profile
                  </button>
                )}
                <button
                  onClick={() => {
                    auth.signOut();
                    window.location.href = "/";
                  }}
                  className="bg-[#1a73e8] text-white border border-[#1a73e8] px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer" // background-color: #1a73e8, color: white, border: 1.5px solid #1a73e8, padding: 6px 16px, margin-top: 12px, border-radius: 40px, font-size: 14px
                >
                  Sign Out
                </button>
              </div>
            </div>{" "}
          </div>
        )
      }
    </div>
  );
}

export default function Profile() {
  useEffect(() => {
    document.title = `Profile - ${mainData.eventInfo.name} | ${mainData.communityName}`;
    document
      .querySelector("meta[property='og:title']")
      ?.setAttribute(
        "content",
        `Profile - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
    document
      .querySelector("meta[name='twitter:title']")
      ?.setAttribute(
        "content",
        `Profile - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
  }, []); // Set title and meta tags on component mount

  const user = useAuthContext();
  const [userData, setUserData] = useState<any>(undefined);
  const [badges, setBadges] = useState<any[]>([]);
  const [tabIndex, setTabIndex] = useState(0);
  useEffect(() => {
    if (user == null || user === undefined) {
      return;
    }
    if (user) {
      console.log("123", user?.displayName);
      // data.value = true;
      getDoc(doc(db, "users", user.uid)).then(async (uD) => {
        let userDetails = uD.data();
        if (
          userDetails != undefined &&
          (userDetails.socials?.length || 0) > 0
        ) {
          userDetails.socials = userDetails.socials.map((social: any) => {
            if (social.provider === "instagram") {
              social.icon = <FiInstagram />;
            } else if (social.provider === "github") {
              social.icon = <FiGithub />;
            } else if (social.provider === "linkedin") {
              social.icon = <FiLinkedin />;
            } else if (social.provider === "website") {
              social.icon = <FiGlobe />;
            }
            return social;
          });
        }
        if (userDetails == null) {
          userDetails = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || "",
            username: "",
            bio: "",
            city: "",
            socials: [],
          };
        }

        // set photo url to localstorage
        if (
          userDetails.photoURL !== "" &&
          userDetails.photoURL !== null &&
          userDetails.photoURL !== undefined
        ) {
          localStorage.setItem("dv_photo_url", userDetails.photoURL);
        }

        const arcadeDataRef = collection(db, "users", user.uid, "arcade");
        const arcadeData = await getDocs(arcadeDataRef);
        const badgeData: any[] = [];
        arcadeData.forEach((doc) => {
          badgeData.push({ ...doc.data(), id: doc.id });
        });
        console.log("Badge Data", badgeData);
        const localBadges = arcadeJson.map((item: any) => {
          return {
            name: item.badge.name,
            link: item.link,
            date:
              badgeData.filter((doc) => doc.id == item.badge.id)[0]
                ?.timestamp === undefined
                ? "Not earned"
                : moment(
                  badgeData
                    .filter((doc) => doc.id == item.badge.id)[0]
                    ?.timestamp?.toDate()
                )?.format("DD MMM YYYY"),
            image: item.badge.image,
            earned:
              badgeData.filter((doc) => doc.id == item.badge.id)[0]
                ?.quizCompleted || false,
            description: badgeData.filter((doc) => doc.id == item.badge.id)[0]
              ?.quizCompleted
              ? item.badge.description.earned
              : item.badge.description.default,
          };
        });
        const team = collection(db, "teams");
        const tq = query(
          team,
          where("participants", "array-contains", user.uid),
        );
        const teamSnapshot = await getDocs(tq);
        if (teamSnapshot.docs.length > 0) {
          const teamData = teamSnapshot.docs[0].data();
          userDetails = {
            ...userDetails,
            teamName: teamData.teamName,
            teamNumber: teamData.teamNumber,
          }
          console.log("Team Data", userDetails);
        } else {
          userDetails.teamName = "";
          userDetails.teamNumber = "";
        }
        setBadges(localBadges);
        setUserData(userDetails);
        document.title = `Profile (@${userDetails.username}) - ${mainData.eventInfo.name} | ${mainData.communityName}`;
        document
          .querySelector("meta[property='og:title']")
          ?.setAttribute(
            "content",
            `Profile (@${userDetails.username}) - ${mainData.eventInfo.name} | ${mainData.communityName}`
          );
        document
          .querySelector("meta[name='twitter:title']")
          ?.setAttribute(
            "content",
            `Profile (@${userDetails.username}) - ${mainData.eventInfo.name} | ${mainData.communityName}`
          );
      });
    }
  }, [user]);
  return (
    <div className="flex flex-col md:flex-row gap-12 py-4 px-2">
      <ProfileCard
        userDetails={userData}
        setUserDetails={setUserData}
        badgesCount={badges.filter((e) => e.earned).length}
      />
      <div className="grow">
        <BadgeGrid user={user} badges={badges} />
      </div>
    </div>
  );
}
