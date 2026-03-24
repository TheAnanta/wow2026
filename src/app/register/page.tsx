/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import * as crypto from "crypto";
import "../register/style.css";
import React, { useEffect, useState } from "react";
import initialFormData from "@/utils/formstate";
import { useAuthContext } from "@/context/AuthContext";
import addData from "@/utils/addData";
import Loader from "@/components/LoadingAnimation/page";
import { ArrowForwardIos, EmojiEventsOutlined } from "@mui/icons-material";
import GetUserProgress from "@/utils/getUserProgress";
import Progress from "@/utils/progress";
import navbarConfig from "@/data/navbar.json";
import mainData from "@/data/config.json";
import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Checkbox } from "material-you-react";
import { set } from "firebase/database";

function getPaymentAmount({
  course,
  accommodation,
  isLateBird,
}: {
  course: string;
  accommodation: boolean;
  isLateBird: boolean;
}) {
  let amount = 500; // Base ticket price
  if(isLateBird){
    amount += 150;
  }
  if (course !== "Nah, I&apos;m not interested") {
    // Add course fee based on the course
    switch (course) {
      case "GenAI in Action with ML":
        amount += 150;
        break;
      case "Firebase: Get Cloud-Ready":
        amount += 120;
        break;
      case "Android Basics with Compose":
        amount += 100;
        break;
      case "Namasthe Full-Stack":
        amount += 135;
        break;
      case "Flutter Basics with Dart":
        amount += 120;
        break;
      default:
        break;
    }
  }
  if (accommodation) {
    amount += 200; // Add accommodation fee
  }
  return amount;
  // Comment the above if we ever want to go back to the old payment system
  const paymentAndQr: any = {
    [500]: {
      image: "/images/payment-qr/five-hundred.png",
      text: "₹500",
    },
    [650]: {
      image: "/images/payment-qr/six-fifty.png",
      text: "₹650",
    },
    [700]: {
      image: "/images/payment-qr/seven-hundred.png",
      text: "₹700",
    },
    [800]: {
      image: "/images/payment-qr/eight-hundred.png",
      text: "₹800",
    },
    [850]: {
      image: "/images/payment-qr/eight-fifty.png",
      text: "₹850",
    },
    [635]: {
      image: "/images/payment-qr/six-thirtyfive.png",
      text: "₹635",
    },
    [835]: {
      image: "/images/payment-qr/eight-thirtyfive.png",
      text: "₹835",
    },
    [620]: {
      image: "/images/payment-qr/six-twenty.png",
      text: "₹620",
    },
    [820]: {
      image: "/images/payment-qr/eight-twenty.png",
      text: "₹820",
    },
    [600]: {
      image: "/images/payment-qr/six-hundred.png",
      text: "₹600",
    },
  };
  return paymentAndQr[amount];
}

const MyForm: React.FC = () => {
  useEffect(() => {
    document.title = `Get Tickets - ${mainData.eventInfo.name} | ${mainData.communityName}`;
    document
      .querySelector("meta[property='og:title']")
      ?.setAttribute(
        "content",
        `Get Tickets - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
    document
      .querySelector("meta[name='twitter:title']")
      ?.setAttribute(
        "content",
        `Get Tickets - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
  }, []); // Set title and meta tags on component mount

  const user = useAuthContext();
  const [loading, setLoadingState] = useState(true);
  const [registered, setRegistrationStatus] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [agreedToRules, setAgreedToRules] = useState(false);
  const [isCompleteRegistration, setIsCompleteRegistration] = useState(false);
  const [showPaymentQr, setPaymentQrStatus] = useState(false);
  const [paymentUtr, setPaymentUtr] = useState("");
  useEffect(() => {
    if (user === null) {
      alert("Please login to register for WoW");
      window.location.href = "/";
      return;
    }
    GetUserProgress(user.uid).then((response) => {
      console.log(response);
      if (response === Progress.noApplication) {
        setLoadingState(false);
        setRegistrationStatus(false);
        setPopUp(false);
      }
      if (response === Progress.paymentPending) {
        setLoadingState(true);
        const userData = getDoc(doc(db, "users", user.uid)).then(
          async (doc) => {
            const data = doc.data();
            if (data) {
              console.log(data.registrationDetails.university);
              setFormState((prevState) => ({
                ...prevState,
                firstName: data.registrationDetails.firstName || "",
                lastName: data.registrationDetails.lastName || "",
                email: data.email || "",
                phoneNumber: data.phoneNumber || "",
                city: data.city || "",
                gender: data.gender || "",
                socialProfile: data.socials?.[0]?.name || "",
                university: [
                  "Gandhi Institute of Technology and Management",
                  "Gayatri Vidya Parishad College of Engineering",
                  "Gayatri Vidya Parishad College of Engineering for Women",
                  "Andhra University College of Engineering",
                  "Vignan's Institute of Information Technology",
                  "Vignan Institute of Engineering Women",
                  "Raghu Engineering College",
                  "GMR Institute of Technology",
                  "SVR Engineering College",
                  "G. Pullaiah College of Engineering and Technology",
                  "Maharaj Vijayaram Gajapathi Raj College of Engineering",
                  "Sagi Ramakrishnam Raju Engineering College",
                  "Pragati Engineering College",
                  "Geethanjali Institute of Science and Technology",
                  "Aditya Institute of Technology and Management",
                ].includes(data.company.name)
                  ? data.company.name
                  : "Other",
                ["course"]: data.course || "",
                ["accommodation"]: data.accommodation?.status ? 1 : 0 || 0,
              }));
              
              const calculatedAmount = getPaymentAmount({
                course: data.course,
                accommodation: data.accommodation?.status || false,
                isLateBird: data.isLateBird || false
              });
              const userId = user?.uid;
              console.log("User ID:", userId);
              const originalBody = {
                course: formState.course,
                accommodation: formState.accommodation === 1,
                description: "WoW 2026 Registration",
                userId: user?.uid,
                amount: calculatedAmount * 100, // Convert to paise
                firstName: formState.firstName,
              };
              const encryptedPayload = await encryptRequestBody(originalBody);
              // Prepare the request body - send the encrypted parts
              const requestBodyToSend = JSON.stringify(encryptedPayload);
              const url =
                "https://asia-south1-wonder-of-wonders-2026.cloudfunctions.net/createOrder";
              try {
                const response = await fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: requestBodyToSend,
                });
                if (!response.ok) {
                  // Handle potential errors from the server (e.g., decryption failure)
                  console.error(`HTTP error! status: ${response.status}`);
                  const errorBody = await response.text();
                  console.error("Error body:", errorBody);
                  setLoadingState(false);
                  // setPopUp(true);
                  return;
                }
                const result = await response.json();
                const tokenUrl = result.redirectUrl;
                (window as any).PhonePeCheckout.transact({
                  tokenUrl,
                  callback: async (response: any) => {
                    console.log("Payment response:", response);
                    callback(response, setLoadingState, setRegistrationStatus);
                  },
                  type: "IFRAME",
                });
                console.log("Server response:", result);
              } catch (error) {
                console.error("Error sending request:", error);
              }
            }
            setRegistrationStatus(false);
          }
        );
      }
      if (response === Progress.incompleteRegistration) {
        window.location.href = "/confirmation";
        return;
      }
      if (response === Progress.notYetTeamMember) {
        setLoadingState(true);
        setRegistrationStatus(true);
        setPopUp(false);
      }
      if (
        response === Progress.completeRegistration ||
        response === Progress.completeRegistrationTeamLead
      ) {
        setLoadingState(true);
        setRegistrationStatus(true);
        setIsCompleteRegistration(true);
        setPopUp(false);
      }
    });
  }, [user]);

  const [formState, setFormState] = useState(initialFormData);
  // const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingState(true);
    console.log(formState);
    setFormState((prevState) => ({
      ...prevState,
      ["coc"]: 1,
      ["terms"]: 1,
    }));

    let userName = `${formState.firstName}${formState.lastName}`
      .split(".")
      .join("")
      .split(" ")
      .join("");

    const uniqueUserNameCount = await getCountFromServer(
      query(
        collection(db, "users"),
        where("username", "==", userName),
        limit(1)
      )
    );
    if (uniqueUserNameCount.data().count > 0) {
      console.warn("Username exists : " + userName);
      userName = user!.email!.split("@")[0] + "df";
    }

    await addData("users", user?.uid, {
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      email: user?.email,
      registration: true,
      paymentStatus: false,
      role: "Attendee",
      course: formState.course,
      city: formState.city,
      isLateBird: true,
      ...(formState.accommodation === 1
        ? {
          accommodation: {
            status: true,
          },
        }
        : {}),
      gender: formState.gender,
      company: {
        designation: "Student",
        name:
          formState.university === "Other"
            ? formState.otherUniversity
            : formState.university,
      },
      ...(formState.socialProfile != ""
        ? {
          socials: [
            formState.socialProfile.includes("instagram.com")
              ? {
                icon: "mdi-instagram",
                name: formState.socialProfile
                  .split("instagram.com/")[1]
                  .split("/")[0],
                provider: "instagram",
              }
              : formState.socialProfile.includes("linkedin.com")
                ? {
                  icon: "mdi-linkedin",
                  name: formState.socialProfile
                    .split("linkedin.com/in/")[1]
                    .split("/")[0]
                    .split("?")[0],
                  provider: "linkedin",
                }
                : formState.socialProfile.includes("github.com")
                  ? {
                    icon: "mdi-github",
                    name: formState.socialProfile
                      .split("github.com/")[1]
                      .split("/")[0],
                    provider: "github",
                  }
                  : {
                    icon: "mdi-globe",
                    name: formState.socialProfile,
                    provider: "website",
                  },
          ],
        }
        : {}),
      registrationDetails: {
        ...{
          firstName: formState.firstName,
          lastName: formState.lastName,
        },
        university:
          formState.university === "Other"
            ? formState.otherUniversity
            : formState.university,
        ["isTeamMember"]: -1,
        ["isTeamLead"]: 0,
      },
      username: userName.toLowerCase(),
      phoneNumber: formState.phoneNumber,
      ["terms"]: true,
      ["coc"]: true,
    });
    const calculatedAmount = getPaymentAmount({
      course: formState.course,
      accommodation: formState.accommodation === 1,
      isLateBird: true,
    });
    const userId = user?.uid;
    console.log("User ID:", userId);
    const originalBody = {
      course: formState.course,
      accommodation: formState.accommodation === 1,
      description: "WoW 2026 Registration",
      userId: user?.uid,
      amount: calculatedAmount * 100, // Convert to paise
      firstName: formState.firstName,
    };
    const encryptedPayload = await encryptRequestBody(originalBody);
    // Prepare the request body - send the encrypted parts
    const requestBodyToSend = JSON.stringify(encryptedPayload);
    const url =
      "https://asia-south1-wonder-of-wonders-2026.cloudfunctions.net/createOrder";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBodyToSend,
      });
      if (!response.ok) {
        // Handle potential errors from the server (e.g., decryption failure)
        console.error(`HTTP error! status: ${response.status}`);
        const errorBody = await response.text();
        console.error("Error body:", errorBody);
        setLoadingState(false);
        // setPopUp(true);
        return;
      }
      const result = await response.json();
      const tokenUrl = result.redirectUrl;
      (window as any).PhonePeCheckout.transact({
        tokenUrl,
        callback: async (response: any) => {
          console.log("Payment response:", response);
          callback(response, setLoadingState, setRegistrationStatus);
        },
        type: "IFRAME",
      });
      console.log("Server response:", result);
    } catch (error) {
      console.error("Error sending request:", error);
    }
    // setRegistrationStatus(true);
  };

  useEffect(() => {
    const firstName = user?.displayName?.split(" ").at(0) ?? "";
    const lastName = user?.displayName?.replaceAll(firstName + " ", "") ?? "";

    setFormState((prevState) => ({
      ...prevState,
      ["firstName"]: firstName,
      ["lastName"]: lastName,
      ["email"]: user?.email ?? "",
    }));
  }, [user]);

  return (
    <>
      <div
        className={`flex flex-col justify-center items-center md:py-[60px] md:px-[20px]`}
      >
        <div className="flex flex-col justify-center items-center md:rounded-xl md:border-[1.5px] border-gray-500 md:w-4/5">
          <div className="w-full md:rounded-t-xl bg-gray-200 dark:bg-gray-900 flex flex-col md:flex-row md:items-center p-[20px] pt-[32px] pb-0 border-gray-500 border-b-[1.5px]">
            <div className="md:grow pt-[20px] pb-[40px] md:p-10">
              <h1 className="text-3xl font-medium">Register for WoW 2026</h1>

              <p className="opacity-60 mt-3 text-lg">July 2026</p>

              <p className="opacity-60">
                GITAM Deemed to be University, Visakhapatnam
              </p>
            </div>
            <img
              src={`/images/gdsc_sc.webp`}
              alt={navbarConfig.logo.alt}
              className="md:h-56 -scale-x-100 translate-y-1 md:translate-y-2"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:w-4/5 md:mr-auto md:mt-10 p-[20px] pb-0 md:p-[unset] md:ml-auto">
            <div className="md:pr-8 pb-4 md:pb-[unset]">
              <p className="text-7xl">₹500/ ₹650 (late bird)</p>
              <p className="text-xl">(Inc. of taxes)</p>
            </div>
            <p>
              <ul className="text-start list-disc list-inside my-4 text-sm border-t md:border-t-0 md:border-l pt-6 md:pt-[unset] md:pl-8 grid grid-cols-2 gap-3 gap-x-6">
                <li>
                  Access to the <b>24 hour hackathon</b>
                </li>
                <li>
                  Chance to win upto <b>30K cash prize</b> pool
                </li>
                <li>Chance to showcase your projects</li>
                <li>
                  <b>Get funded</b> for your amazing projects
                </li>
                <li>Official 2026 WOW Merchandise</li>
                <li>
                  Access to the <b>official Pixel 9 Photo Booth</b>
                </li>
                <li>
                  <b>1-1 Mentoring</b> with Google Developer Experts
                </li>
                <li>
                  First-of-its-kind <b>futuristic outdoor arcade</b>
                </li>
                <li>4 rounds of yummy itenary</li>
                <li>Swags and goodies</li>
                <li>Networking with industry experts</li>
                <li>Certificate of participation</li>
              </ul>
            </p>
            {/* <h3 className="text-xl font-medium">Create a developer profile</h3>
            <p className="mt-2 max-w-[480px] md:text-base text-sm">
              Create your developer profile to apply for a ticket to GDGoC WOW
              AP 2026 Visakhapatnam so that you don&apos;t miss out on the fun
              and learning. You can also use your profile to earn badges during
              the conference.
            </p>
            <p className="font-medium">
              Note: This is a paid event, an offline <b>ticket costs ₹500</b>.
            </p> */}
          </div>
          <form
            onSubmit={handleSubmit}
            className="px-[20px] md:px-[unset] md:w-4/5"
          >
            <div className="mb-4 py-8 rounded-3xl w-full flex flex-col space-y-4 md:space-y-8">
              <div className="flex flex-col md:flex-row md:space-x-8 gap-y-4 md:gap-y-[unset]">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  placeholder="First Name"
                  value={formState.firstName}
                  onChange={handleChange}
                  className="register-input"
                />

                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  placeholder="Last Name"
                  value={formState.lastName}
                  onChange={handleChange}
                  className="register-input grow"
                />
              </div>
              <div className="flex  flex-col md:flex-row md:space-x-8 gap-y-4 md:gap-y-[unset]">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  value={formState.email}
                  onChange={handleChange}
                  className="register-input grow md:w-1/2"
                />
                <label className="register-input grow md:w-1/2 flex gap-3 group focus-within:!outline-2 focus-within:!outline-[#005fcc] focus-within:border-offset-0 focus-within:!border-0">
                  <p>+91</p>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    pattern="\d{5}\s\d{5}"
                    required
                    placeholder="Phone Number"
                    value={formState.phoneNumber}
                    onChange={(e) => {
                      if (e.target.value.trim().length > 5) {
                        setFormState((prevState) => ({
                          ...prevState,
                          ["phoneNumber"]:
                            e.target.value.slice(0, 5).trim() +
                            " " +
                            e.target.value.slice(5, 11).trim(),
                        }));
                      } else {
                        setFormState((prevState) => ({
                          ...prevState,
                          ["phoneNumber"]: e.target.value,
                        }));
                      }
                    }}
                    maxLength={11}
                    minLength={11}
                    className="ring-0 outline-0"
                  />
                </label>
                {/* <select
                  name="gender"
                  className="register-input grow md:w-1/2 bg-white dark:bg-black"
                  onChange={handleSelectChange}
                  value={formState.gender}
                  required
                >
                  <option value="">Pronouns (select)</option>
                  <option>She/Her</option>
                  <option>He/Him</option>
                  <option>They/Them</option>
                </select> */}
              </div>
              {/* <div className="flex  flex-col md:flex-row md:space-x-8 gap-y-4 md:gap-y-[unset]">
               

                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  placeholder="City"
                  value={formState.city}
                  onChange={handleChange}
                  className="register-input grow md:w-1/2"
                />
              </div> */}
              <div className="flex  flex-col md:flex-row md:space-x-8 gap-y-4 md:gap-y-[unset">
                {/* <div className="grow md:w-1/2">
                  <input
                    type="url"
                    id="socialProfile"
                    name="socialProfile"
                    placeholder="Website (optional)"
                    value={formState.socialProfile}
                    onChange={handleChange}
                    className="register-input w-full"
                  />
                  <p className="mt-2 md:mt-4 max-w-[440px] text-[12px]">
                    Share us a link where we can get to know more about you. It
                    can be your website, social media, or literally anything you
                    want us to know
                  </p>
                </div> */}
                <div className="md:w-1/2">
                  <select
                    className="w-full register-input h-max bg-white dark:bg-black"
                    required
                    value={
                      formState.university === "Other"
                        ? "Other"
                        : formState.university
                    }
                    onChange={handleSelectChange}
                    name="university"
                  >
                    <option value="">University (select)</option>
                    <option>
                      Gandhi Institute of Technology and Management
                    </option>

                    <option>
                      Gayatri Vidya Parishad College of Engineering
                    </option>
                    <option>
                      Gayatri Vidya Parishad College of Engineering for Women
                    </option>
                    <option>Andhra University College of Engineering</option>
                    <option>
                      Vignan&apos;s Institute of Information Technology
                    </option>
                    <option>Vignan Institute of Engineering Women</option>
                    <option>Raghu Engineering College</option>
                    <option>GMR Institute of Technology</option>
                    <option>SVR Engineering College</option>
                    <option>
                      G. Pullaiah College of Engineering and Technology
                    </option>
                    <option>
                      Maharaj Vijayaram Gajapathi Raj College of Engineering
                    </option>
                    <option>Sagi Ramakrishnam Raju Engineering College</option>
                    <option>Pragati Engineering College</option>
                    <option>
                      Geethanjali Institute of Science and Technology
                    </option>
                    <option>
                      Aditya Institute of Technology and Management
                    </option>
                    <option>Other</option>
                  </select>
                  {formState.university === "Other" && (
                    <input
                      type="text"
                      id="otherUniversity"
                      name="otherUniversity"
                      required
                      placeholder="Institution Name"
                      value={formState.otherUniversity}
                      onChange={handleChange}
                      className="register-input grow mt-4 w-full"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="mr-3 text-[20px]">Accommodation</label>
                <br />
                <input
                  name="acco"
                  type="radio"
                  id="accoYes"
                  className="mr-2"
                  checked={formState.accommodation == 1}
                  onChange={() => {
                    setFormState((prevState) => ({
                      ...prevState,
                      ["accommodation"]: 1,
                    }));
                  }}
                />
                <label htmlFor="accoYes" className="mr-8 ml-1">
                  Yes
                </label>
                <input
                  name="acco"
                  type="radio"
                  id="accoNo"
                  className="mr-2"
                  checked={formState.accommodation == 0}
                  onChange={() => {
                    setFormState((prevState) => ({
                      ...prevState,
                      ["accommodation"]: 0,
                    }));
                  }}
                />
                <label htmlFor="accoNo" className="mr-2 ml-1">
                  No
                </label>
                <p className="mt-2 md:mt-4 text-[16px]">
                  <b>Note</b>: Accommodation costs of ₹200 will be additionally
                  included in the event registration fee.
                </p>
              </div>

              <div className="relative">
                <div className="bg-blue-500 flex rounded-2xl p-6 md:p-8 pb-0 pr-0 text-white relative overflow-hidden z-20">
                  <div className="flex flex-col mr-4">
                    <div className="flex gap-2 items-center">
                      <div>
                        <p className="text-xs font-bold bg-white text-blue-500 py-2 px-4 mb-4 w-max rounded-full">
                          LIMITED TIME
                        </p>
                        <h3 className="font-medium">
                          <b>SURPRISE</b>
                        </h3>
                        <h3 className="text-2xl leading-8">
                          Something Just{" "}
                          <span className=" font-bold">For YOU</span>{" "}
                        </h3>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between w-full">
                      <p className="text-white mt-2 max-w-[36ch] text-sm">
                        Exclusive for GDGoC WoW&apos;25 attendees
                      </p>
                      <select
                        required
                        value={formState.course}
                        onChange={handleSelectChange}
                        name="course"
                        id="course"
                        className="bg-white text-black dark:bg-black dark:text-white rounded-full px-8 py-2 mt-4 md:mt-2 font-medium border-2"
                      >
                        <option value="">Select a workshop</option>
                        <option>GenAI in Action with ML</option>
                        <option>Namasthe Full-Stack</option>
                        <option>Firebase: Get Cloud-Ready</option>
                        <option>Flutter Basics with Dart</option>
                        <option>Android Basics with Compose</option>
                        <option>Nah, I&apos;m not interested</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mt-6 pb-36 md:pb-16">
                      <div className="bg-white hover:bg-orange-500 hover:text-white border-black cursor-default border-[1.5px] rounded-xl text-black p-4 group">
                        <div className="flex justify-between">
                          <p className="font-bold max-w-[14ch] mb-1">
                            GenAI in Action with ML
                          </p>
                          <div className="flex flex-col items-end">
                            <p className="text-xl font-bold text-amber-600 group-hover:text-black">
                              ₹150
                            </p>
                            <p className="text-xs line-through opacity-60 -translate-y-1 font-medium">
                              ₹450
                            </p>
                          </div>
                        </div>
                        <p className="text-xs line-clamp-3 md:line-clamp-none">
                          This course introduces you to practical Machine
                          Learning and Generative AI concepts to help you create
                          smarter, more intuitive applications. Ideal for those
                          looking to add a touch of intelligence and innovation
                          to their tech solutions.
                        </p>
                      </div>
                      <div className="bg-white border-[1.5px] hover:bg-orange-500 hover:text-white border-black cursor-default rounded-xl text-black p-4 group">
                        <div className="flex justify-between">
                          <p className="font-bold max-w-[14ch] mb-1">
                            Namasthe
                            <br />
                            Full-Stack
                          </p>
                          <div className="flex flex-col items-end">
                            <p className="text-xl font-bold text-amber-600 group-hover:text-black">
                              ₹135
                            </p>
                            <p className="text-xs line-through opacity-60 -translate-y-1 font-medium">
                              ₹350
                            </p>
                          </div>
                        </div>
                        <p className="text-xs line-clamp-3 md:line-clamp-none">
                          Master both frontend and backend development in one
                          cohesive course. Whether you&apos;re creating
                          interactive interfaces or powerful server-side logic,
                          this course empowers you to turn ideas into polished,
                          full-stack web experiences.
                        </p>
                      </div>
                      <div className="bg-white border-[1.5px] hover:bg-orange-500 hover:text-white border-black cursor-default rounded-xl text-black p-4 group">
                        <div className="flex justify-between">
                          <p className="font-bold max-w-[14ch] mb-1">
                            Firebase: Get Cloud-Ready
                          </p>
                          <div className="flex flex-col items-end">
                            <p className="text-xl font-bold text-amber-600 group-hover:text-black">
                              ₹120
                            </p>
                            <p className="text-xs line-through opacity-60 -translate-y-1 font-medium">
                              ₹360
                            </p>
                          </div>
                        </div>
                        <p className="text-xs line-clamp-3 md:line-clamp-none">
                          Learn to set up robust backend systems using
                          Firebase—from real-time databases to authentication
                          and hosting. Perfect for turning your concepts into
                          fully functional, cloud-powered applications with ease
                          and speed.
                        </p>
                      </div>
                      <div className="relative z-10 bg-white border-[1.5px] hover:bg-orange-500 hover:text-white border-black cursor-default rounded-xl text-black p-4 group">
                        <div className="flex justify-between">
                          <p className="font-bold max-w-[12ch] mb-1">
                            Flutter Basics with Dart
                          </p>
                          <div className="flex flex-col items-end">
                            <p className="text-xl font-bold text-amber-600 group-hover:text-black">
                              ₹120
                            </p>
                            <p className="text-xs line-through opacity-60 -translate-y-1 font-medium">
                              ₹360
                            </p>
                          </div>
                        </div>
                        <p className="text-xs line-clamp-3 md:line-clamp-none">
                          Learn how to build beautiful, high-performance apps
                          for both Android and iOS from a single codebase.
                          Flutter’s speed and flexibility make it an excellent
                          choice for turning concepts into cross-platform
                          reality—fast.
                        </p>
                      </div>
                      <div className="bg-white hover:bg-orange-500 hover:text-white border-black cursor-default border-[1.5px] rounded-xl text-black p-4 group">
                        <div className="flex justify-between">
                          <p className="font-bold max-w-[14ch] mb-1">
                            Android Basics with Compose
                          </p>
                          <div className="flex flex-col items-end">
                            <p className="text-xl font-bold text-amber-600 group-hover:text-black">
                              ₹100
                            </p>
                            <p className="text-xs line-through opacity-60 -translate-y-1 font-medium">
                              ₹300
                            </p>
                          </div>
                        </div>
                        <p className="text-xs line-clamp-3 md:line-clamp-none">
                          Discover modern Android development using Jetpack
                          Compose—designed for rapid UI development with less
                          boilerplate. This course helps you build sleek and
                          responsive apps that leave a lasting impression.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <p className="py-4 px-2 bg-white rounded-full w-fit text-sm text-black border-2 border-black">
                        🎓 Completion certificate
                      </p>
                      <p className="py-4 px-2 bg-white rounded-full w-fit text-sm text-black border-2 border-black">
                        📁 Project templates
                      </p>
                      <p className="py-4 px-2 bg-white rounded-full w-fit text-sm text-black border-2 border-black">
                        Attendees claimed -{" "}
                        <span className="font-black text-orange-500">200</span>
                      </p>
                    </div>
                  </div>
                  <img
                    src="/images/sponsors/dark-theananta.png"
                    className="w-20 absolute right-8 top-6"
                  />
                  <img
                    src="/images/register-cliff-hero.png"
                    className="md:w-[40%] object-bottom object-contain ml-auto absolute bottom-0 right-0 pointer-events-none"
                  />
                  <br />
                </div>
                <a
                  href="https://ekalavya.theananta.in"
                  target="_blank"
                  className="absolute left-0 -bottom-14 w-full bg-orange-500 google-font font-bold flex rounded-2xl p-4 pt-12 text-center items-center justify-center text-white overflow-hidden"
                >
                  Know more at ekalavya.theananta.in | Starts 9th June &apos;25
                </a>
              </div>
            </div>
            <div className="h-10"></div>
            <div>
              <div className="flex space-x-3">
                <input type="checkbox" name="terms" required />
                <p>
                  I agree to the{" "}
                  <button
                    onClick={() => {
                      window
                        .open(
                          "/faq#terms-conditions",
                          "Terms and Conditions | WoW 2024 Visakhapatnam",
                          "popup, location,status,scrollbars,resizable,width=600, height=600"
                        )
                        ?.focus();
                    }}
                  >
                    <b className="text-blue-500 dark:text-blue-300 font-medium cursor-pointer">
                      terms and conditions
                    </b>
                  </button>
                  .
                </p>
              </div>
              <div className="flex space-x-3">
                <input type="checkbox" name="coc" required />
                <p>
                  I agree to abide by the code of conduct{" "}
                  <a
                    href="/coc"
                    target="_blank"
                    className="text-blue-500 dark:text-blue-300 font-medium"
                  >
                    here
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <button
                type="submit"
                className="py-2 px-6 text-blue-500 dark:text-blue-300 rounded border-neutral-300 border text-sm mb-16 mt-8 cursor-pointer"
              >
                Submit
                <span>
                  <ArrowForwardIos
                    sx={{
                      fontSize: "10px",
                      fill: "currentColor !important",
                    }}
                  />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black/50 text-center overflow-hidden">
          <div className="px-[24px] md:px-[80px] pb-[40px] bg-white dark:bg-black rounded-2xl shadow-2xl mx-8 md:mx-[unset] max-h-[480px] overflow-y-scroll">
            {!popUp && <Loader></Loader>}
            {!registered && !popUp && (
              <p className="font-medium">
                Please wait while we process your registration
              </p>
            )}
            {registered && !isCompleteRegistration && (
              <>
                <h2 className="text-2xl font-medium">Application Recieved</h2>
                <p className="text-sm mt-4 mb-8 max-w-[420px]">
                  You&apos;ll be notified of the status of your hackathon team
                  soon. If you&apos;re not into a team before the hackathon,
                  we&apos;ll try to get you a team at the venue. Otherwise,
                  request your team lead to add you to the team.
                  <br />
                  Make sure to keep an eye on your email.
                </p>
                <button
                  onClick={() => {
                    setLoadingState(false);
                    setRegistrationStatus(false);
                    window.location.href = "/";
                  }}
                  className="border-[1.5px] px-8 py-2 rounded-full border-gray-500 cursor-pointer"
                >
                  Done
                </button>
              </>
            )}
            {registered && isCompleteRegistration && (
              <>
                <EmojiEventsOutlined fontSize="large" className="mt-8" />
                <h2 className="text-2xl font-medium mt-4">You&apos;re in.</h2>
                <p className="text-sm mt-4 mb-8 max-w-[420px]">
                  Excited to host you for WoW 2026.
                  <br />
                  Earn badges and have fun before the event.
                  <br />
                  <br />
                  Make sure to keep an eye on your email.
                </p>
                <button
                  onClick={() => {
                    setLoadingState(false);
                    setRegistrationStatus(false);
                    window.location.href = "/";
                  }}
                  className="border-[1.5px] px-8 py-2 rounded-full border-gray-500 cursor-pointer"
                >
                  Done
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

function callback(response: any, setLoadingState: (loading: boolean) => void, setRegistrationStatus: (status: boolean) => void) {
  if (response === "USER_CANCEL") {
    setLoadingState(false);
    setRegistrationStatus(false);
    /* Add merchant's logic if they have any custom thing to trigger on UI after the transaction is cancelled by the user*/
    // window.location.href = "/processing-ticket";
    return;
  } else if (response === "CONCLUDED") {
    /* Add merchant's logic if they have any custom thing to trigger on UI after the transaction is in terminal state*/
    window.location.href = "/processing-ticket";
    return;
  }
}

interface EncryptedPayload {
  iv: string; // Base64 encoded IV
  encryptedData: string; // Base64 encoded ciphertext
  authTag: string; // Base64 encoded authentication tag (for GCM)
}
async function encryptRequestBody(requestBody: any): Promise<EncryptedPayload> {
  const data = JSON.stringify(requestBody); // Stringify the body
  const iv = crypto.randomBytes(12); // GCM recommended IV size is 12 bytes
  const SECRET_AES_KEY = Buffer.from(
    process.env.SECRET_AES_KEY_STRING || "",
    "utf8"
  );
  const cipher = crypto.createCipheriv("aes-256-gcm", SECRET_AES_KEY, iv);

  let encryptedData = cipher.update(data, "utf8", "base64");
  encryptedData += cipher.final("base64");

  const authTag = cipher.getAuthTag().toString("base64");

  return {
    iv: iv.toString("base64"),
    encryptedData: encryptedData,
    authTag: authTag,
  };
}

export default MyForm;