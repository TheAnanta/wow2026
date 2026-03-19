/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, updateDoc, doc, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuthContext } from "@/context/AuthContext";
import speakersData from "@/data/speakers.json";
import Image from "next/image";
import { MdCheckCircle, MdOutlineCancel } from "react-icons/md";


export default function AdminManage1on1Page() {
    const router = useRouter();
    const user = useAuthContext();

    const [choosenSpeaker, setChoosenSpeaker] = useState<string>("");
    const [requestedQuestionsData, setRequestedQuestionsData] = useState<any[]>([]);


    // Redirect unauthorized users
    useEffect(() => {
        if (!user) {
            router.replace("/?refresh=true");
        }
    }, [user, router]);

    // Speaker click handler
    const handleSpeakerClick = useCallback(
        async (name: string) => {
            if (!user) {
                router.replace("/?refresh=true");
                return;
            }
            setRequestedQuestionsData([]);
            setChoosenSpeaker(name);

            const q = query(collection(db, "mentor-request"), where("mentor", "==", name));
            const snapshot = await getDocs(q);
            const questions: any[] = [];
            snapshot.forEach((docSnap) => {
                questions.push({ id: docSnap.id, ...docSnap.data() });
            });
            setRequestedQuestionsData(questions);
        },
        [user, router]
    );

    // Update request status
    const updateRequestStatus = async (
        item: any,
        status: "approved" | "rejected" | "pending",
        isApprovedStatus: boolean
    ) => {
        try {
            if (item.status === status) return;
            await updateDoc(doc(db, "mentor-request", item.id), {
                isApproved: isApprovedStatus,
                status,
            });
            setRequestedQuestionsData((prev) =>
                prev.map((q) =>
                    q.id === item.id ? { ...q, status, isApproved: isApprovedStatus } : q
                )
            );
        } catch (error) {

            console.error("Error in Updating Request Status. : ", error);
        }
    };

    return (
        <div className="container mx-auto mt-8 px-4 py-6 dark:bg-black shadow-md">
            <div className="mb-6">
                <h1 className="text-3xl font-semibold text-white mb-2">1-1 Mentorship Management</h1>
                <p className="text-white">Effortlessly manage 1-1 requests.</p>
            </div>

            <div className="grid grid-cols-2 p-4 border-2 dark:border-gray-600 gap-2 rounded-3xl">
                {/* Speakers Card */}
                <div className="col-span-1">
                    <h2 className="text-lg font-semibold mb-3 text-white">Speakers</h2>
                    <div className="overflow-y-auto h-[400px] pr-2">
                        {speakersData.map((item, idx) => (
                            <div
                                key={idx}
                                className={`flex items-center space-x-3 p-3 mb-4 rounded-md border-2 dark:border-gray-600 cursor-pointer ${choosenSpeaker === item.name ? 'bg-white text-black hover:bg-gray-100'
                                    : ''}`}
                                onClick={() => handleSpeakerClick(item.name)}
                            >
                                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                    <Image
                                        src={item.image?.length ? `/images/speakers/${item.image}` : "/img/common/avatar.png"}
                                        alt={item.name}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm">{item.company.name}, {item.company.designation}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Graph (Placeholder) */}
                {/* <div className="col-span-1 bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-400 italic">Time Allocation Graph Coming Soon...</p>
                </div> */}

                {/* Request Questions List */}
                <div className="col-span-1">
                    <h2 className="text-lg font-semibold mb-3">Requests</h2>
                    <div className="overflow-y-auto h-[400px] pr-2">
                        {requestedQuestionsData.length === 0 ? (
                            <div className="text-center py-8 text-white">
                                {choosenSpeaker === "" ? "Select a speaker to see requests." : "No requests for this speaker."}
                            </div>
                        ) : (
                            requestedQuestionsData.map((question, idx) => (
                                <div key={idx} className="mb-4 p-3 rounded-md border border-gray-200">
                                    <p className="font-bold text-lg text-white">{question.name}</p>
                                    <p className="text-sm text-white">{question.subtitle}</p>
                                    <p className="mt-2 text-white">{question.questions}</p>

                                    <div className="mt-4 flex justify-between items-center">
                                        <div className="space-x-2">
                                            <button
                                                onClick={() => updateRequestStatus(question, "rejected", false)}
                                                className="inline-flex items-center px-3 py-1.5 border rounded-md text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
                                                title="Reject Request"
                                            >
                                                <MdOutlineCancel className="mr-1.5 h-5 w-5" /> Reject
                                            </button>
                                            <button
                                                onClick={() => updateRequestStatus(question, "approved", true)}
                                                className="inline-flex items-center px-3 py-1.5 border rounded-md text-sm font-medium bg-green-100 text-green-700 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors"
                                                title="Approve Request"
                                            >
                                                <MdCheckCircle className="mr-1.5 h-5 w-5" /> Approve
                                            </button>
                                        </div>
                                        <span className={`text-sm font-medium ${question.status === "approved" ? "text-green-600" : question.status === "pending" ? "text-yellow-600" : "text-red-600"}`}>
                                            {question.status.charAt(0).toUpperCase() + question.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}