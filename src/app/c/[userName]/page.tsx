/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */

"use client";

import { JSX, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiGithub, FiGlobe, FiInstagram, FiLinkedin } from "react-icons/fi";
import {
  collection,
  addDoc,
  query,
  getDocs,
  where,
  and,
  or,
  getCountFromServer,
  updateDoc,
  doc,
  limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase"; // Adjust the import path based on your project structure
import { useAuthContext } from "@/context/AuthContext";
import Loader from "@/components/LoadingAnimation/page";
import mainData from "@/data/config.json"; // Adjust the import path based on your project structure

interface Social {
  provider: "github" | "instagram" | "linkedin" | "website";
  name: string;
}

const tracks = [
  {
    title: "Mobile",
    img: "https://io.google/2024/app/images/io24-stacks-m.webp",
    desc: "...",
  },
  {
    title: "Web",
    img: "https://io.google/2024/app/images/io24-stacks-w.webp",
    desc: "...",
  },
  {
    title: "Machine Learning",
    img: "https://io.google/2024/app/images/io24-stacks-ml.webp",
    desc: "...",
  },
  {
    title: "Cloud",
    img: "https://io.google/2024/app/images/io24-stacks-c.webp",
    desc: "...",
  },
  {
    title: "Startups",
    img: "https://io.google/2024/app/images/io24-stacks-iot.webp",
    desc: "...",
  },
  {
    title: "Community",
    img: "https://io.google/2024/app/images/io24-stacks-iot.webp",
    desc: "...",
  },
  {
    title: "Others",
    img: "https://io.google/2024/app/images/io24-stacks-iot.webp",
    desc: "...",
  },
];

const iconMap: Record<Social["provider"], JSX.Element> = {
  github: <FiGithub size={20} />,
  instagram: <FiInstagram size={20} />,
  linkedin: <FiLinkedin size={20} />,
  website: <FiGlobe size={20} />, // Assuming 'website' uses a check icon
};

export default function PeerPage() {
  useEffect(() => {
    document.title = `Connect - ${mainData.eventInfo.name} | ${mainData.communityName}`;
    document
      .querySelector("meta[property='og:title']")
      ?.setAttribute(
        "content",
        `Connect - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
    document
      .querySelector("meta[name='twitter:title']")
      ?.setAttribute(
        "content",
        `Connect - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
  }, []); // Set title and meta tags on component mount

  const params = useParams();
  const router = useRouter();
  const peerUserName = params.userName as string;
  const user = useAuthContext();

  const [peerDetails, setPeerDetails] = useState<any>(null);
  const [choosenTechStacks, setChoosenTechStacks] = useState<string[]>([]);
  const [isAlreadyNetworked, setIsAlreadyNetworked] = useState(false);
  const [docID, setDocID] = useState("");
  const [peerId, setPeerId] = useState("");
  const [targetId, setTargetId] = useState("");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  useEffect(() => {
    console.log("useEffect triggered");
    if (peerUserName && peerUserName.trim() != "") {
      fetchPeersData();
    }
  }, [peerUserName]);

  const fetchPeersData = async () => {
    try {
      const userQuery = query(
        collection(db, "users"),
        where("username", "==", peerUserName),
        limit(1)
      );
      const snapshot = await getDocs(userQuery);
      let fetchedUserDetails = {} as any;
      let userId = "";
      snapshot.forEach((doc) => {
        (fetchedUserDetails = doc.data() as any), (userId = doc.id);
      });
      setPeerDetails(fetchedUserDetails);
      setPeerId(userId);
      const isNetworked = await checkNetworked(userId);
      console.log("isnetworked =", isNetworked);
      setIsAlreadyNetworked(isNetworked);

      if (!isNetworked) {
        console.log("creating connection");
        await createConnection(userId);
      }
    } catch (error) {
      console.error("Error in fetching Peer:", error);
      alert("Error in fetching Peer, Please try again!");
    }
  };

  const checkNetworked = async (peerId: string): Promise<boolean> => {
    try {
      const targetUserId = user?.uid;
      if (!targetUserId) return false;

      setTargetId(targetUserId);

      const q = query(
        collection(db, "connections"),
        or(
          and(
            where("connectA", "==", peerId),
            where("connectB", "==", targetUserId)
          ),
          and(
            where("connectA", "==", targetUserId),
            where("connectB", "==", peerId)
          )
        )
      );

      const snapshot = await getCountFromServer(q);
      const count = snapshot.data().count;
      return count !== 0;
    } catch (error) {
      console.error("Error in checking network status:", error);
      return false;
    }
  };

  const createConnection = async (peerId: string) => {
    try {
      const docRef = await addDoc(collection(db, "connections"), {
        connectA: user?.uid,
        connectB: peerId,
        domains: choosenTechStacks || [],
      });
      setDocID(docRef.id);
    } catch (error) {
      console.error("Error in creating connection:", error);
      alert("Error in updating network.");
    }
  };

  const onSubmit = async () => {
    try {
      setIsSubmitLoading(true);
      await updateDoc(doc(db, "connections", docID), {
        domains: choosenTechStacks,
      });
      setIsSubmitLoading(false);
      router.push("/network?refresh=true");
    } catch (error) {
      setIsSubmitLoading(false);
      console.error("Error in submitting domains:", error);
    }
  };

  if (!peerDetails) {
    return <Loader />;
  }

  const userDomain = "Mobile"; // Adjust this based on your logic

  return (
    <div className="px-4 py-6">
      <h1 className="mt-5 text-3xl font-bold">Learn. Connect. Grow.</h1>
      <div className={`mt-6 ${!isAlreadyNetworked ? "max-w-screen-xl" : ""}`}>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className={`w-full lg:w-1/3`}>
            <div
              className={`relative p-4 rounded-3xl m-3 max-w-[350px] max-h-[500px] mx-auto flex flex-col aspect-[0.7]`}
              style={{
                backgroundColor:
                  userDomain === "Mobile" ? "#CEE6C1" : "#c3ecf6",
              }}
            >
              <img
                src="/mobile.png"
                height="120"
                className="absolute top-3.5 left-3.5 size-40 object-contain object-top"
                alt="Badge"
              />
              <img
                src={peerDetails.photoURL}
                className="h-60 w-full rounded-xl object-cover"
                alt="Peer"
              />
              <div className="w-full mt-3 flex flex-col">
                <div className="flex items-center gap-2 h-max">
                  <h2 className="text-xl font-semibold mt-3 leading-5 google-font">
                    {peerDetails.displayName}
                  </h2>
                  {isAlreadyNetworked && (
                    <span className="mt-3 text-[#34a853] !leading-5 !text-lg material-symbols-sharp !font-bold">
                      verified
                    </span>
                  )}
                </div>
                <p className="opacity-50 mb-1 font-semibold google-font">
                  @{peerDetails.username}
                </p>
                <p className="text-sm google-font">
                  {peerDetails.company?.designation},{" "}
                  {peerDetails.company?.name}
                </p>
                {peerDetails.communityTitle && (
                  <p className="text-sm google-font">
                    {peerDetails.communityTitle}
                  </p>
                )}
                <div className="flex gap-3 my-3">
                  {peerDetails.socials?.map((social: Social) => (
                    <a
                      key={social.name}
                      href={
                        social.provider === "instagram"
                          ? `https://www.instagram.com/${social.name}`
                          : social.provider === "github"
                          ? `https://github.com/${social.name}`
                          : social.provider === "linkedin"
                          ? `https://www.linkedin.com/in/${social.name}`
                          : ""
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black"
                    >
                      {iconMap[social?.provider]}
                    </a>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 my-2">
                  {peerDetails.domainsInterested?.map((domain: any) => (
                    <p
                      key={domain}
                      className="bg-black/12 py-auto flex items-center h-8 text-xs px-3 rounded-full"
                    >
                      #{domain}
                    </p>
                  ))}
                </div>
                <p className="absolute right-4 bottom-3 opacity-40 font-semibold text-sm google-font">
                  #{peerDetails.domainsInterested?.[0] || "Developer"}
                </p>
              </div>
            </div>
          </div>
          {!isAlreadyNetworked && (
            <div className="w-full lg:w-2/3">
              <h3 className="text-xl font-semibold mb-4">
                What was the convo about?
              </h3>
              <div className="flex flex-wrap gap-4">
                {tracks.map((track: any) => (
                  <label
                    key={track.title}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={choosenTechStacks.includes(track.title)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setChoosenTechStacks([
                            ...choosenTechStacks,
                            track.title,
                          ]);
                        } else {
                          setChoosenTechStacks(
                            choosenTechStacks.filter((t) => t !== track.title)
                          );
                        }
                      }}
                    />
                    <span>{track.title}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={onSubmit}
                disabled={isSubmitLoading}
                className="mt-4 float-right bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {isSubmitLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
