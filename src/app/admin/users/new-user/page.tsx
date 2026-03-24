/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

"use client";
import React, { useEffect, useState } from "react";
import addData from "@/utils/addData";
import "./styles.css";
import Loader from "@/components/LoadingAnimation/page";
import { ArrowForwardIos } from "@mui/icons-material";
import mainData from "@/data/config.json";
import {
    addDoc,
    collection,
    doc,
    getCountFromServer,
    limit,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuthContext } from "@/context/AuthContext";
import { fetchSignInMethodsForEmail } from "firebase/auth";
const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    gender: "",
    socialProfile: "",
    university: "",
    otherUniversity: "",
    accommodation: 0,
    tshirtSize: "",
};

const NewUserForm: React.FC = () => {
    useEffect(() => {
        document.title = `On-Spot Registration - ${mainData.eventInfo.name} | ${mainData.communityName}`;
        document
            .querySelector("meta[property='og:title']")
            ?.setAttribute(
                "content",
                `On-Spot Registration - ${mainData.eventInfo.name} | ${mainData.communityName}`
            );
        document
            .querySelector("meta[name='twitter:title']")
            ?.setAttribute(
                "content",
                `On-Spot Registration - ${mainData.eventInfo.name} | ${mainData.communityName}`
            );
    }, []);
    const newUser = useAuthContext();
    const [loading, setLoadingState] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [formState, setFormState] = useState(initialFormData);

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


        // check if user with email id exists in firestore
        const url =
            `https://asia-south1-wonder-of-wonders-2026.cloudfunctions.net/createOnSpotUser?email=${formState.email}&displayName=${formState.firstName + ' ' + formState.lastName}`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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
            const userUid = (await response.json()).uid;

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
                userName = newUser!.email!.split("@")[0] + "df"; // fallback username
            }

            try {
                const newUserDoc = await setDoc(doc(collection(db, "users",), userUid), {
                    displayName: `${formState.firstName} ${formState.lastName}`,
                    email: formState.email,
                    registration: true,
                    paymentStatus: true, // On-spot registration implies payment received
                    role: "Attendee",
                    city: formState.city,
                    gender: formState.gender,
                    tshirtSize: formState.tshirtSize,
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
                        ["isTeamMember"]: 0,
                        ["isTeamLead"]: 0,
                    },
                    username: userName.toLowerCase(),
                    phoneNumber: formState.phoneNumber,
                    ["terms"]: true,
                    ["coc"]: true,
                });

                console.log("Document written with ID: ", userUid);
                setRegistrationSuccess(true);
            } catch (error) {
                console.error("Error adding document: ", error);
                alert("Registration failed. Please try again."); // Better error handling could be implemented
            } finally {
                setLoadingState(false);
            }
        } catch (error) {
            console.error("Error sending request:", error);
        };



    };

    return (
        <>
            <div
                className={`flex flex-col justify-center items-center md:py-[60px] md:px-[20px]`}
            >
                <div className="flex flex-col justify-center items-center md:rounded-xl md:border-[1.5px] border-gray-500 md:w-4/5">
                    <div className="w-full md:rounded-t-xl bg-gray-200 dark:bg-gray-900 flex flex-col md:flex-row md:items-center p-[20px] pt-[32px] pb-0 border-gray-500 border-b-[1.5px]">
                        <div className="md:grow pt-[20px] pb-[40px] md:p-10">
                            <h1 className="text-3xl font-medium">On-Spot Registration for WoW 2026</h1>

                            <p className="opacity-60 mt-3 text-lg">4-5th July 2026</p>

                            <p className="opacity-60">
                                GITAM Deemed to be University, Visakhapatnam
                            </p>
                        </div>
                        <img
                            src={`/images/gdsc_sc.webp`}
                            alt={"GDSC SC"}
                            className="md:h-56 -scale-x-100 translate-y-1 md:translate-y-2"
                        />
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
                                    className="register-input grow"
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

                            </div>
                            <div className="flex  flex-col md:flex-row md:space-x-8 gap-y-4 md:gap-y-[unset]">
                                <select
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
                                </select>

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
                            </div>
                            <div className="flex flex-col md:flex-row md:space-x-8 gap-y-4 md:gap-y-[unset">
                                <div className="grow md:w-1/2">
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
                                </div>
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
                                            Vignan's Institute of Information Technology
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
                            <div>
                                <p className="font-medium text-lg">T-shirt size</p>
                                <div className="space-x-4 mt-2">
                                    <div className="w-max inline-flex gap-x-3">
                                        <label className="gap-3 flex">
                                            <input
                                                type="radio"
                                                name="tshirt-size"
                                                checked={formState.tshirtSize === "S"}
                                                onChange={(e) => setFormState((prevState) => ({
                                                    ...prevState,
                                                    ["tshirtSize"]: e.target.value,
                                                }))}
                                                value={"S"}
                                                required
                                            />
                                            Small (S)
                                        </label>
                                    </div>
                                    <div className="w-max inline-flex  gap-x-3">
                                        <label className="gap-3 flex">
                                            <input
                                                type="radio"
                                                name="tshirt-size"
                                                checked={formState.tshirtSize === "M"}
                                                onChange={(e) => setFormState((prevState) => ({
                                                    ...prevState,
                                                    ["tshirtSize"]: e.target.value,
                                                }))}
                                                value={"M"}
                                                required
                                            />
                                            Medium (M)
                                        </label>
                                    </div>
                                    <div className="w-max inline-flex  gap-x-3">
                                        <label className="gap-3 flex">
                                            <input
                                                type="radio"
                                                name="tshirt-size"
                                                checked={formState.tshirtSize === "L"}
                                                onChange={(e) => setFormState((prevState) => ({
                                                    ...prevState,
                                                    ["tshirtSize"]: e.target.value,
                                                }))}
                                                value={"L"}
                                                required
                                            />
                                            Large (L)
                                        </label>
                                    </div>

                                    <div className="w-max inline-flex  gap-x-3">
                                        <label className="gap-3 flex">
                                            <input
                                                type="radio"
                                                name="tshirt-size"
                                                checked={formState.tshirtSize === "XL"}
                                                onChange={(e) => setFormState((prevState) => ({
                                                    ...prevState,
                                                    ["tshirtSize"]: e.target.value,
                                                }))}
                                                value={"XL"}
                                                required
                                            />
                                            Extra Large (XL)
                                        </label>
                                    </div>
                                    <div className="w-max inline-flex  gap-x-3">
                                        <label className="gap-3 flex">
                                            <input
                                                type="radio"
                                                name="tshirt-size"
                                                checked={formState.tshirtSize === "XXL"}
                                                onChange={(e) => setFormState((prevState) => ({
                                                    ...prevState,
                                                    ["tshirtSize"]: e.target.value,
                                                }))}
                                                value={"XXL"}
                                                required
                                            />
                                            <p>Double Extra Large (XXL/2XL)</p>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-center items-center">
                            <button
                                type="submit"
                                className="py-2 px-6 text-blue-500 dark:text-blue-300 rounded border-neutral-300 border text-sm mb-16 mt-8 cursor-pointer"
                            >
                                Register On-Spot
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
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black/50 text-center">
                    <Loader />
                    <p className="font-medium">Registering user...</p>
                </div>
            )}
            {registrationSuccess && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black/50 text-center">
                    <div className="px-[24px] md:px-[80px] pb-[40px] bg-white dark:bg-black rounded-2xl shadow-2xl mx-8 md:mx-[unset] max-h-[480px] overflow-y-scroll">
                        <h2 className="text-2xl font-medium mt-4">Registration Successful!</h2>
                        <p className="text-sm mt-4 mb-8 max-w-[420px]">
                            The user has been successfully registered for the event.
                        </p>
                        <button
                            onClick={() => setRegistrationSuccess(false)}
                            className="border-[1.5px] px-8 py-2 rounded-full border-gray-500 cursor-pointer"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

// interface EncryptedPayload {
//     iv: string; // Base64 encoded IV
//     encryptedData: string; // Base64 encoded ciphertext
//     authTag: string; // Base64 encoded authentication tag (for GCM)
// }
// async function encryptRequestBody(requestBody: any): Promise<EncryptedPayload> {
//     const data = JSON.stringify(requestBody); // Stringify the body
//     const iv = crypto.randomBytes(12); // GCM recommended IV size is 12 bytes
//     const SECRET_AES_KEY = Buffer.from(
//         process.env.SECRET_AES_KEY_STRING || "",
//         "utf8"
//     );
//     const cipher = crypto.createCipheriv("aes-256-gcm", SECRET_AES_KEY, iv);

//     let encryptedData = cipher.update(data, "utf8", "base64");
//     encryptedData += cipher.final("base64");

//     const authTag = cipher.getAuthTag().toString("base64");

//     return {
//         iv: iv.toString("base64"),
//         encryptedData: encryptedData,
//         authTag: authTag,
//     };
// }

export default NewUserForm;