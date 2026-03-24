/* eslint-disable @typescript-eslint/no-unused-vars */
 
 

"use client";
import Loader from "@/components/LoadingAnimation/page";
import { useEffect, useState } from "react";
import "./styles.css";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import {
    and,
    collection,
    doc,
    getCountFromServer,
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
import StarIcon from '@mui/icons-material/Star';

export default function AdminTeamConfirmation() {
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
        document.title = `Admin Team Creation - ${mainData.eventInfo.name} | ${mainData.communityName}`;
        document
            .querySelector("meta[property='og:title']")
            ?.setAttribute(
                "content",
                `Admin Team Creation - ${mainData.eventInfo.name} | ${mainData.communityName}`
            );
        document
            .querySelector("meta[name='twitter:title']")
            ?.setAttribute(
                "content",
                `Admin Team Creation - ${mainData.eventInfo.name} | ${mainData.communityName}`
            );
    }, []);

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
        isTeamLead?: boolean;
    }

    const router = useRouter();
    const [loading, setLoadingState] = useState(false);
    const [totalUsers, setTotalUsers] = useState<Attendee[]>([]);
    const [teamSearchAutocomplete, setTeamSearchAutocomplete] =
        useState<null | Attendee>(null);
    const [teamName, setTeamName] = useState<string>("");
    const [team, setTeam] = useState<Attendee[]>([]); // Store team members with possible team lead
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        // Fetch all users who have completed their application
        const fetchAttendees = async () => {
            setLoadingState(true);
            try {
                const ref = collection(db, "users");
                const snapshot = await getDocs(
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
                );

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
                        isTeamLead: false, // Initially no team lead assigned
                    } as Attendee;
                });
                setTotalUsers(result);
            } catch (error) {
                console.error("Error fetching attendees:", error);
                alert("Error fetching attendee data. Check console.");
            } finally {
                setLoadingState(false);
            }
        };

        fetchAttendees();
    }, []);

    const handleTeamLeadSelect = (attendee: Attendee) => {
        // Toggle team lead status. Only one team lead at a time.

        //If the team member is already a team lead, toggle it
        if (attendee.isTeamLead) {
            setTeam(team.map(m => m.userId === attendee.userId ? { ...m, isTeamLead: false } : m));
            return
        }

        //Make the person team lead and make every other team member a regular team member
        setTeam(team.map(m => m.userId === attendee.userId ? { ...m, isTeamLead: true } : { ...m, isTeamLead: false }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingState(true);
        setSuccessMessage(null);  // Clear any previous success message

        // Verify that exactly one team lead is selected
        const teamLeadCount = team.filter((m) => m.isTeamLead).length;

        if (teamLeadCount !== 1) {
            alert("Please select exactly one team lead.");
            setLoadingState(false);
            return;
        }
        try {
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
            // Split team members into lead and regular
            const teamLead = team.find((member) => member.isTeamLead);
            const regularTeamMembers = team.filter((member) => !member.isTeamLead);

            // Update team lead and member status in Firestore
            if (teamLead) {
                const updatableDataLead = {
                    registrationDetails: {
                        isTeamLead: 1,
                        isTeamMember: 1,
                    },
                };
                await updateDoc(doc(db, "users", teamLead.userId ?? ""), updatableDataLead);
            }

            await Promise.all(
                regularTeamMembers.map(async (e) => {
                    const updatableData = {
                        registrationDetails: {
                            isTeamMember: 1,
                        },
                    };
                    await updateDoc(doc(db, "users", e.userId ?? ""), updatableData);
                })
            );

            //CREATE TEAM TABLE
            await setDoc(doc(db, "teams", teamName.trim()), {
                teamName: teamName.trim(),
                teamNumber: teamNumber,
                participants: team.map((e) => e.userId),
            });

            setSuccessMessage("Team created successfully!");
            setTeamName("");
            setTeam([]); // Clear selected team

        } catch (error) {
            console.error("Error creating team:", error);
            alert("Error creating team. Please check console.");
        } finally {
            setLoadingState(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center py-[20px] md:py-[60px] md:px-[unset]">
            <div className="flex flex-col justify-center items-center md:rounded-xl md:border-[1.5px] border-gray-500 md:w-4/5">
                <div className="w-full md:rounded-t-xl bg-[#FBBC04] dark:bg-[#d9a204] flex flex-col md:flex-row md:items-center p-[20px] pt-[32px] pb-0 border-gray-500 border-b-[1.5px]">
                    <div className="md:grow md:pt-[30px] md:pl-[40px] pt-[20px] pb-[40px]">
                        <h1 className="text-2xl md:text-6xl font-bold">Create Team</h1>
                        <h2 className="text-xl md:text-4xl font-medium mt-2">
                            {mainData.eventInfo.name}
                        </h2>

                        <p className="mt-3 text-lg">28-29th June 2026</p>
                        <p>GITAM Deemed to be University, Visakhapatnam</p>
                    </div>
                    <img
                        src="/images/gdsc_sc.webp"
                        className="md:h-56 -scale-x-100 translate-y-1 md:translate-y-2"
                    />
                </div>
                <div className="md:w-4/5 md:mr-auto md:mt-10 p-[20px] pb-0 md:p-[unset] md:ml-auto">
                    <h3 className="text-xl font-medium">Create your team</h3>
                    <p className="mt-2 max-w-[480px] md:text-base text-sm">
                        Use the drop-down below to add team members and to create team for the hackathon.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="px-[20px] md:px-[unset] md:w-4/5"
                >
                    <div className="mb-4 py-8 rounded-3xl w-full flex flex-col space-y-4 md:space-y-8">
                        <div>
                            <div className="h-3" />
                            <h3 className="text-2xl font-medium">Enter team name</h3>
                            <div className="flex flex-col md:flex-row md:space-x-8 mt-2 gap-y-4 md:gap-y-[unset]">
                                <input
                                    type="text"
                                    id="team_name"
                                    name="team_name"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    required
                                    placeholder="Team Name"
                                    className="register-input grow"
                                />
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-3 mt-4">
                                {team.map((attendee, index) => (
                                    <div
                                        key={index}
                                        className={`inline-flex flex-col p-[20px]  w-max mt-3 rounded-xl cursor-pointer ${attendee.isTeamLead ? 'bg-blue-200 dark:bg-blue-500' : 'bg-amber-200 dark:bg-amber-500'}`}
                                        onClick={() => handleTeamLeadSelect(attendee)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <p className="text-2xl font-medium">{attendee.label}</p>
                                            <p className="text-2xl font-medium">
                                                {attendee.lastName}
                                            </p>
                                            {attendee.isTeamLead && <StarIcon color="warning" />}
                                        </div>

                                        <p className="mt-2 text-sm border-[1px] border-black px-3 py-1 rounded-full">
                                            {attendee.email}
                                        </p>
                                        <button
                                            className="mt-2 px-6 text-white bg-black h-max py-2 my-auto rounded-full cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent card click
                                                e.preventDefault();
                                                setTeam(team.filter((_, i) => i !== index));
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-x-8 items-center align-middle my-4">
                                <ThemeProvider theme={theme}>
                                    {/* <CssBaseline /> */}
                                    <Autocomplete
                                        noOptionsText="No users found."
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
                                            !o.isPaid
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
                            <p className="mt-2">
                                <b>Note</b>: Team size should be within <b>1-5 only</b>. You
                                can edit your team anytime.
                            </p>
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <button
                            type="submit"
                            className="py-2 px-6 text-blue-500 dark:text-blue-300 rounded border-neutral-300 border font-medium mb-16 mt-8 cursor-pointer"
                        >
                            Create Team
                        </button>
                    </div>
                </form>
                {successMessage && (
                    <div className="text-green-500 mb-4">{successMessage}</div>
                )}
                {loading && (
                    <div className="absolute top-0 w-full h-full flex items-center justify-center z-10 bg-opacity-50 bg-black md:ml-[80px] text-center">
                        <div className="px-[40px] md:px-[80px] pb-[40px] bg-white dark:bg-black rounded-2xl shadow-2xl mx-8 md:mx-[unset]">
                            <Loader />
                            <p className="font-medium">Creating team...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}