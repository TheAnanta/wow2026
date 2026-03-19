/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import Loader from "@/components/LoadingAnimation/page";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";

import "./style.css";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { set, update } from "firebase/database";
import { useRouter } from "next/navigation";
import {
  and,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  or,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BadgeOutlined, EmojiEventsOutlined } from "@mui/icons-material";
import { useMemo } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import navbarConfig from "@/data/navbar.json";
import mainData from "@/data/config.json";

export default function Confirmation() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  useEffect(() => {
    console.log(prefersDarkMode);
    document.title = `Payment Confirmation - ${mainData.eventInfo.name} | ${mainData.communityName}`;
    document
      .querySelector("meta[property='og:title']")
      ?.setAttribute(
        "content",
        `Payment Confirmation - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
    document
      .querySelector("meta[name='twitter:title']")
      ?.setAttribute(
        "content",
        `Payment Confirmation - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
  }, []); // Set title and meta tags on component mount

  interface Attendee {
    label: string;
    userId: string;
    image: string;
    profession: string;
    lastName: string;
    email: string;
    isPaid: boolean;
    gender: string;
    isTeamMember: number;
  }

  const router = useRouter();
  const user = useAuthContext();
  const [loading, setLoadingState] = useState(false);
  const [isTeamLead, setTeamLead] = useState<boolean | undefined>(undefined);
  const [team, setTeam] = useState<Attendee[]>([]);
  const [totalUsers, setTotalUsers] = useState<Attendee[]>([]);
  const [teamSearchAutocomplete, setTeamSearchAutocomplete] =
    useState<null | Attendee>(null);
  const [teamName, setTeamName] = useState<string>("");
  const [github_profile, setGithubProfile] = useState<string>("");
  const [linkedin_profile, setLinkedinProfile] = useState<string>("");
  const [tshirt_size, setTshirtSize] = useState<string>("");
  const [isCompleteRegistration, setIsCompleteRegistration] = useState(false);

  useEffect(() => {
    if (user === null) {
      alert("Please login to register for WoW");
      window.location.href = "/";
      return;
    }
    const ref = collection(db, "payments");
    getDocs(ref).then((docs) => {
      const arraysForEveryting: any[] = [];
      docs.forEach((docT) => {
        try {
          getDoc(doc(db, "users", ((docT.data())["user_id"] ?? ""))).then((docC) => {
            arraysForEveryting.push(docC.get("email"));
          })
        } catch (error) {
          console.log("Error for email payment" + docT.id);
        }
      });
      console.log(arraysForEveryting);
    });
  });

  useEffect(() => {
    if (user === null) {
      alert("Please login to register for WoW");
      window.location.href = "/";
      return;
    }
    const ref = collection(db, "users");

    getDocs(
      query(
        ref,
        and(
          where("registrationDetails.isTeamLead", "!=", 1),
          or(
            where("registrationDetails.isTeamMember", "==", 0),
            where("registrationDetails.isTeamMember", "==", -1)
          )
        )
      )
    ).then((snapshot) => {
      const result = snapshot.docs.map((doc) => {
        const r = doc.data();
        console.log(r);
        if (doc.id === user?.uid) {
          console.log("User is already registered");
          setGithubProfile(
            r.socials?.filter((e: any) => e.provider === "github")[0]?.name
          );
          setLinkedinProfile(
            r.socials?.filter((e: any) => e.provider === "linkedin")[0]?.name
          );
        }
        return {
          label: r.displayName.split(" ")[0],
          lastName: r.displayName.replace(
            r.displayName.split(" ")[0] + " ",
            ""
          ),
          userId: doc.id,
          image: r["photoURL"],
          profession: r.registrationDetails["university"] || r.company.name,
          email: r["email"],
          isPaid: r["paymentStatus"],
          gender: r["gender"],
          isTeamMember: r.registrationDetails["isTeamMember"],
        } as Attendee;
      });
      console.log(result);
      setTotalUsers(result);
    });
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingState(true);
    if (isTeamLead === false) {
      const updatableData = {
        tshirtSize: tshirt_size,
        checkInStatus: false,
        goodiesStatus: false,
        socials:
          github_profile != undefined && github_profile != ""
            ? [
              {
                provider: "linkedin",
                name:
                  linkedin_profile.split("linkedin.com/in/").length > 1
                    ? linkedin_profile
                      .split("linkedin.com/in/")[1]
                      .split("/")[0]
                      .split("?")[0]
                    : linkedin_profile,
              },

              {
                provider: "github",
                name: github_profile.includes("github.com/")
                  ? github_profile.split("github.com/")[1].split("/")[0]
                  : github_profile,
              },
            ]
            : [
              {
                provider: "linkedin",
                name:
                  linkedin_profile.split("linkedin.com/in/").length > 1
                    ? linkedin_profile
                      .split("linkedin.com/in/")[1]
                      .split("/")[0]
                      .split("?")[0]
                    : linkedin_profile,
              },
            ],
        registrationDetails: {
          isTeamLead: 0,
          isTeamMember: 0,
        },
      };
      console.log(updatableData);
      await updateDoc(doc(db, "users", user?.uid ?? ""), updatableData);
      setIsCompleteRegistration(true);
    } else {
      //CHECK IF TEAM NAME IS UNIQUE
      const isUniqueTeam =
        (
          await getCountFromServer(
            query(
              collection(db, "teams"),
              where("teamName", "==", teamName.trim())
            )
          )
        ).data().count <= 0;

      if (!isUniqueTeam) {
        alert("Team name must be unique");
        setLoadingState(false);
        return;
      }
      const teamNumber =
        (await getCountFromServer(query(collection(db, "teams")))).data()
          .count + 1;
      //SET ISTEAMLEAD =1 and update details of user
      const updatableData = {
        tshirtSize: tshirt_size,
        socials:
          github_profile != undefined && github_profile != ""
            ? [
              {
                provider: "linkedin",
                name:
                  linkedin_profile.split("linkedin.com/in/").length > 1
                    ? linkedin_profile
                      .split("linkedin.com/in/")[1]
                      .split("/")[0]
                      .split("?")[0]
                    : linkedin_profile,
              },
              {
                provider: "github",
                name:
                  github_profile.split("github.com/")[1].split("/")[0] ||
                  github_profile,
              },
            ]
            : [
              {
                provider: "linkedin",
                name:
                  linkedin_profile.split("linkedin.com/in/").length > 1
                    ? linkedin_profile
                      .split("linkedin.com/in/")[1]
                      .split("/")[0]
                      .split("?")[0]
                    : linkedin_profile,
              },
            ],
        registrationDetails: {
          isTeamLead: 1,
          isTeamMember: 1,
        },
      };
      console.log(updatableData);
      await updateDoc(doc(db, "users", user?.uid ?? ""), updatableData);
      //CREATE TEAM TABLE
      await setDoc(doc(db, "teams", teamName.trim()), {
        teamName: teamName.trim(),
        teamNumber: teamNumber,
        participants: team.map((e) => e.userId),
      });
      //UPDATE IS IN TEAM FOR OTHERS
      await Promise.all(
        team
          .filter((e) => e.userId != user?.uid)
          .map(async (e) => {
            const updatableData = {
              registrationDetails: {
                isTeamMember: 1,
              },
            };
            console.log(updatableData);
            await updateDoc(doc(db, "users", e.userId ?? ""), updatableData);
          })
      );
      setIsCompleteRegistration(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-[20px] md:py-[60px] md:px-[unset]">
      <div className="flex flex-col justify-center items-center md:rounded-xl md:border-[1.5px] border-gray-500 md:w-4/5">
        <div className="w-full md:rounded-t-xl bg-[#FBBC04] dark:bg-[#d9a204] flex flex-col md:flex-row md:items-center p-[20px] pt-[32px] pb-0 border-gray-500 border-b-[1.5px]">
          <div className="md:grow md:pt-[30px] md:pl-[40px] pt-[20px] pb-[40px]">
            <h1 className="text-2xl md:text-6xl font-bold">Hurray!</h1>
            <h2 className="text-xl md:text-4xl font-medium mt-2">
              We've reserved you a seat.
            </h2>

            <p className="mt-3 text-lg">28-29th June 2025</p>
            <p>GITAM Deemed to be University, Visakhapatnam</p>
          </div>
          <img
            src="/images/gdsc_sc.webp"
            className="md:h-56 -scale-x-100 translate-y-1 md:translate-y-2"
          />
        </div>
        <div className="md:w-4/5 md:mr-auto md:mt-10 p-[20px] pb-0 md:p-[unset] md:ml-auto">
          <h3 className="text-xl font-medium">Complete your registration</h3>
          <p className="mt-2 max-w-[480px] md:text-base text-sm">
            We need some more details from your provide the best experience and
            make sure everything is in place for you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-[20px] md:px-[unset] md:w-4/5"
        >
          <div className="mb-4 py-8 rounded-3xl w-full  flex flex-col space-y-4 md:space-y-8">
            <div className="gap-x-4 flex">
              <div className="w-1/2 space-y-2">
                <label htmlFor="github_profile" className="flex flex-col w-1/2">
                  <p className="font-medium text-lg">GitHub Profile</p>
                </label>
                <input
                  type="url"
                  id="github_profile"
                  name="github_profile"
                  value={github_profile}
                  onChange={(e) => {
                    setGithubProfile(e.target.value);
                  }}
                  placeholder="GitHub Profile(Optional)"
                  className="register-input w-full disabled:bg-gray-200"
                />
              </div>
              <div className="w-1/2 space-y-2">
                <label
                  htmlFor="linkedin_profile"
                  className="flex flex-col w-1/2"
                >
                  <p className="font-medium text-lg">LinkedIn Profile</p>
                </label>
                <input
                  type="url"
                  id="linkedin_profile"
                  name="linkedin_profile"
                  value={linkedin_profile}
                  onChange={(e) => {
                    setLinkedinProfile(e.target.value);
                  }}
                  required
                  placeholder="LinkedIn Profile"
                  className="register-input w-full disabled:bg-gray-200"
                />
              </div>
            </div>
            <div>
              <p className="font-medium mt-1 text-lg">T-shirt size</p>
              <div className="space-x-4 mt-2">
                <div className="w-max inline-flex gap-x-3">
                  <label className="gap-3 flex">
                    <input
                      type="radio"
                      name="tshirt-size"
                      checked={tshirt_size === "S"}
                      onChange={(e) => setTshirtSize(e.target.value)}
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
                      checked={tshirt_size === "M"}
                      onChange={(e) => setTshirtSize(e.target.value)}
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
                      checked={tshirt_size === "L"}
                      onChange={(e) => setTshirtSize(e.target.value)}
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
                      checked={tshirt_size === "XL"}
                      onChange={(e) => setTshirtSize(e.target.value)}
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
                      checked={tshirt_size === "XXL"}
                      onChange={(e) => setTshirtSize(e.target.value)}
                      value={"XXL"}
                      required
                    />
                    <p>Double Extra Large (XXL/2XL)</p>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <p className="font-bold text-xl">Hackathon Related Information</p>
              <p className="font-medium mt-1 text-lg">Are you the team lead?</p>
              <p className="text-sm">
                If you don't have a team, we can help you find one at the venue.
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="radio"
                  name="isLead"
                  checked={isTeamLead == true}
                  onChange={(e) => {
                    setTeamLead(true);

                    const firstName = user?.displayName?.split(" ").at(0) ?? "";
                    const lastName =
                      user?.displayName?.replaceAll(firstName + " ", "") ?? "";
                    setTeam([
                      {
                        label: firstName,
                        lastName: lastName,
                        gender: totalUsers.filter(
                          (e) => e.userId == user?.uid
                        )[0].gender,
                        isTeamMember: 0,
                        userId: user?.uid ?? "",
                        image: user?.photoURL ?? "",
                        profession: totalUsers.filter(
                          (e) => e.userId == user?.uid
                        )[0].profession,
                        email: user?.email ?? "",
                        isPaid: true,
                      } as Attendee,
                    ]);
                  }}
                  required
                />
                <p>Yes</p>
                <input
                  type="radio"
                  name="isLead"
                  checked={isTeamLead == false}
                  onChange={(e) => {
                    setTeamLead(false);
                  }}
                  required
                />
                <p>No</p>
              </div>
              <div className="h-3" />

              {isTeamLead && (
                <div className="flex flex-col md:flex-row md:space-x-8 mt-2 gap-y-4 md:gap-y-[unset]">
                  <input
                    type="text"
                    id="team_name"
                    name="team_name"
                    value={teamName}
                    onChange={(e) => {
                      if (isTeamLead) {
                        setTeamName(e.target.value);
                      }
                    }}
                    disabled={!isTeamLead}
                    required
                    placeholder="Team Name"
                    className="register-input grow"
                  />
                </div>
              )}
              {isTeamLead && team.length > 0 && (
                <div className="flex flex-col md:flex-row gap-x-4">
                  {team.map((attendee, index) => (
                    <div
                      key={index}
                      className="inline-flex flex-col p-[20px] bg-amber-200 dark:bg-amber-500 w-max mt-3 rounded-xl"
                    >
                      <p className="text-2xl font-medium">{attendee.label}</p>
                      <p className="text-2xl font-medium">
                        {attendee.lastName}
                      </p>
                      <p className="mt-2 text-sm border-[1px] border-black px-3 py-1 rounded-full">
                        {attendee.email}
                      </p>
                      {attendee.userId != user?.uid && (
                        <button
                          className="mt-2 px-6 text-white bg-black h-max py-2 my-auto rounded-full cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            setTeam(team.filter((_, i) => i !== index));
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {isTeamLead && (
                <div className="flex gap-x-8 items-center align-middle my-4">
                  <ThemeProvider theme={theme}>
                    {/* <CssBaseline /> */}
                    <Autocomplete
                      noOptionsText="No users found. Write to wowvizag@gmail.com to get your teammates shortlisted"
                      value={teamSearchAutocomplete}
                      onChange={(event, newValue) => {
                        console.log(event);
                        setTeamSearchAutocomplete(newValue);
                      }}
                      getOptionLabel={(option) =>
                        option.label +
                        " " +
                        option.lastName +
                        " (" +
                        option.email +
                        ")"
                      }
                      getOptionDisabled={(o) =>
                        !o.isPaid || o.isTeamMember == -1
                      }
                      renderOption={({ ...props }, option: Attendee) => (
                        <li className="px-4 w-full" {...props}>
                          <div className="flex gap-4 py-4 border-b w-full border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                            <img
                              src={option.image}
                              referrerPolicy="no-referrer"
                              className="size-12 rounded-full object-cover"
                            />
                            <div>
                              <p>
                                {option.label} {option.lastName}
                              </p>
                              <p className="text-sm opacity-70">
                                {option.profession}
                              </p>
                            </div>
                            {!option.isPaid && <Chip label="Payment Pending" />}
                            {option.isTeamMember == -1 && option.isPaid && (
                              <Chip label="Application Incomplete" />
                            )}
                          </div>
                        </li>
                      )}
                      filterOptions={(options: Attendee[], state) => {
                        return options.filter(
                          (e) =>
                            e.email?.includes(state.inputValue) ||
                            e.label?.includes(state.inputValue) ||
                            e.lastName?.includes(state.inputValue) ||
                            `${e.label} ${e.lastName}`.includes(
                              state.inputValue
                            )
                        );
                      }}
                      options={totalUsers
                        .filter(
                          (e) =>
                            e.userId !== user?.uid &&
                            team.filter((f) => f.userId == e.userId).length <= 0
                        )
                        .sort(
                          (a, b) =>
                            (!a.isPaid || a.isTeamMember == -1 ? 1 : 0) -
                            (!b.isPaid || b.isTeamMember == -1 ? 1 : 0)
                        )}
                      renderValue={(option) => (
                        <Chip
                          avatar={
                            <img
                              src={option.image}
                              alt=""
                              referrerPolicy="no-referrer"
                              className="rounded-full p-[2px]"
                            />
                          }
                          label={`${option.label} ${option.lastName}`}
                        />
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{
                            borderRadius: "12px",
                            width: "80vw",
                            maxWidth: "480px",
                          }}
                          label="Add team members"
                        />
                      )}
                    />
                  </ThemeProvider>

                  <button
                    className="px-6 text-white bg-black dark:bg-white dark:text-black h-max py-2 my-auto rounded-full cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      if (team.length == 5) {
                        alert("Maximum team size is 5.");
                        return;
                      }
                      if (teamSearchAutocomplete === null) {
                        return;
                      }
                      if (
                        team.filter(
                          (attendee) =>
                            attendee.email === teamSearchAutocomplete?.email
                        ).length > 0
                      ) {
                        setTeamSearchAutocomplete(null);
                        alert("This team member is already added");
                        return;
                      }
                      if (team.length >= 5) {
                        setTeamSearchAutocomplete(null);
                        alert("Team size should be within 1-5 only.");
                        return;
                      }
                      setTeam([...team, teamSearchAutocomplete!]);
                      setTeamSearchAutocomplete(null);
                    }}
                  >
                    Add
                  </button>
                </div>
              )}
              {isTeamLead && (
                <p className="mt-2">
                  <b>Note</b>: Team size should be within <b>1-5 only</b>. You
                  can edit your team anytime.
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="py-2 px-6 text-blue-500 dark:text-blue-300 rounded border-neutral-300 border font-medium mb-16 mt-8 cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>

        {loading && (
          <div className="absolute top-0 w-full h-full flex items-center justify-center z-10 bg-opacity-50 bg-black md:ml-[80px] text-center">
            <div className="px-[40px] md:px-[80px] pb-[40px] bg-white dark:bg-black rounded-2xl shadow-2xl mx-8 md:mx-[unset]">
              {isCompleteRegistration ? (
                <>
                  <EmojiEventsOutlined fontSize="large" className="mt-8" />
                  <h2 className="text-2xl font-medium mt-4">You're in.</h2>
                  <p className="text-sm mt-4 mb-8 max-w-[420px]">
                    Excited to host you for WoW 2025.
                    <br />
                    Earn badges and have fun before the event.
                    <br />
                    <br />
                    Make sure to keep an eye on your email.
                  </p>
                  <button
                    onClick={() => {
                      setLoadingState(false);
                      setIsCompleteRegistration(false);
                      window.location.href = "/";
                    }}
                    className="border-[1.5px] px-8 py-2 rounded-full border-gray-500 cursor-pointer"
                  >
                    Done
                  </button>
                </>
              ) : (
                <>
                  <Loader></Loader>
                  <p className="font-medium">
                    Please wait while we process your application.
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
