/* eslint-disable @typescript-eslint/no-unused-vars */
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
  documentId,
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
import {
  BadgeOutlined,
  EmojiEventsOutlined,
  PeopleOutline,
} from "@mui/icons-material";
import navbarConfig from "@/data/navbar.json";
import mainData from "@/data/config.json";
import { useMemo } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

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
  useEffect(() => {
    document.title = `Edit Team - ${mainData.eventInfo.name} | ${mainData.communityName}`;
    document
      .querySelector("meta[property='og:title']")
      ?.setAttribute(
        "content",
        `Edit Team - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
    document
      .querySelector("meta[name='twitter:title']")
      ?.setAttribute(
        "content",
        `Edit Team - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
  }, []); // Set title and meta tags on component mount

  const BASE_URL = "https://wow-2024-server.onrender.com";
  const router = useRouter();
  const user = useAuthContext();
  const [loading, setLoadingState] = useState(false);
  const [isTeamLead, setTeamLead] = useState<boolean | undefined>(true);
  const [team, setTeam] = useState<Attendee[]>([]);
  const [totalUsers, setTotalUsers] = useState<Attendee[]>([]);
  const [teamSearchAutocomplete, setTeamSearchAutocomplete] =
    useState<null | Attendee>(null);
  const [teamName, setTeamName] = useState<string>("");
  const [teamNumber, setTeamNumber] = useState<number>(-1);
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
    const ref = collection(db, "users");
    const refTeam = collection(db, "teams");
    console.log(user.uid.toString());
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
    getDocs(
      query(refTeam, where("participants", "array-contains", user.uid))
    ).then(async (snapshot) => {
      // console.log(snapshot.docs);
      const teamDetails = snapshot.docs[0].data();
      setTeamName(teamDetails.teamName);
      setTeamNumber(teamDetails.teamNumber);
      const rp = (
        (await Promise.all(
          teamDetails.participants.map(async (uid: string) => {
            const s = await getDocs(query(ref, where(documentId(), "==", uid)));
            const result = s.docs.map((doc) => {
              const r = doc.data();
              return {
                label: r.displayName.split(" ")[0],
                lastName: r.displayName.replace(
                  r.displayName.split(" ")[0] + " ",
                  ""
                ),
                userId: doc.id,
                image: r["photoURL"],
                profession:
                  r.registrationDetails["university"] || r.company.name,
                email: r["email"],
                isPaid: r["paymentStatus"],
                gender: r["gender"],
                isTeamMember: r.registrationDetails["isTeamMember"],
              } as Attendee;
            });
            return result;
          })
        )) as Attendee[][]
      ).reduce((p, c) => [...p, ...c]);

      // console.log(result);
      setTeam(rp);
    });
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingState(true);

    await updateDoc(doc(db, "teams", teamName), {
      teamName: teamName,
      teamNumber: teamNumber,
      participants: team.map((e) => e.userId),
    });
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
  };

  return (
    <div className="flex flex-col justify-center items-center py-[20px] md:py-[60px] md:px-[unset]">
      <div className="flex flex-col justify-center items-center md:rounded-xl md:border-[1.5px] border-gray-500 md:w-4/5">
        <div className="w-full md:rounded-t-xl bg-[#FBBC04] dark:bg-[#d9a204] flex flex-col md:flex-row md:items-center p-[20px] pt-[32px] pb-0 border-gray-500 border-b-[1.5px]">
          <div className="md:grow md:pt-[30px] md:pl-[40px] pt-[20px] pb-[40px]">
            <h1 className="text-2xl md:text-6xl font-bold">Edit Team</h1>
            <h2 className="text-xl md:text-4xl font-medium mt-2">
              {teamName} #{teamNumber == -1 ? "" : teamNumber}
            </h2>

            <p className="mt-3 text-lg">28-29th June 2025</p>
            <p>GITAM Deemed to be University Visakhapatnam</p>
          </div>
          <img
            src="/images/gdsc_sc.webp"
            className="md:h-56 -scale-x-100 translate-y-1 md:translate-y-2"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-[20px] md:px-[unset] md:w-4/5"
        >
          <div className="mb-4 py-8 rounded-3xl w-full  flex flex-col space-y-4 md:space-y-8">
            <div>
              {isTeamLead && team.length > 0 && (
                <div className="flex flex-col md:flex-row gap-x-4">
                  {team.map((attendee, index) => (
                    <div
                      key={index}
                      className="inline-flex flex-col p-[20px] bg-amber-200  dark:bg-amber-500 w-max mt-3 rounded-xl"
                    >
                      <p className="text-2xl font-medium">{attendee.label}</p>
                      <p className="text-2xl font-medium">
                        {attendee.lastName}
                      </p>
                      <p className="text-sm">{attendee.gender}</p>
                      <p className="mt-2 text-sm border-[1px] border-black px-3 py-1 rounded-full">
                        {attendee.email}
                      </p>
                      {attendee.userId != user?.uid && (
                        <button
                          className="mt-2 px-6 text-white bg-black h-max py-2 my-auto rounded-full"
                          onClick={async (e) => {
                            e.preventDefault();
                            const updatableData = {
                              registrationDetails: {
                                isTeamMember: 0,
                              },
                            };
                            console.log(updatableData);
                            await updateDoc(
                              doc(
                                db,
                                "users",
                                team.filter((_, i) => i === index)[0].userId ??
                                  ""
                              ),
                              updatableData
                            );

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
                <div className="flex gap-x-8 items-center align-middle">
                  <ThemeProvider theme={theme}>
                    <Autocomplete
                      noOptionsText="No users found. Write to wowvizag@gmail.com to get your teammates shortlisted"
                      className="mt-4 grow"
                      value={teamSearchAutocomplete}
                      onChange={(event, newValue) => {
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
                            e.email.includes(state.inputValue) ||
                            e.label.includes(state.inputValue) ||
                            e.lastName.includes(state.inputValue) ||
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
              className="py-2 px-6 text-blue-500 rounded border-neutral-300 border font-medium mb-16 mt-8 cursor-pointer"
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
                  <PeopleOutline fontSize="large" className="mt-8" />
                  <h2 className="text-2xl font-medium mt-4">Team Updated.</h2>
                  <p className="text-sm mt-4 mb-8 max-w-[420px]">
                    Excited to host your team for WoW 2025.
                    <br />
                    Earn badges and have fun before the event.
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
