/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
// Fetch all users data from Firestore
import { collection, doc, getDoc, getDocs, limit, query, } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { use, useEffect, useState } from "react";

type User = {
    id: string;
    username?: string;
    email?: string;
    photoURL?: string;
    company?: {
        name?: string;
    }
    ;
};

function Page() {

    const [users, setUsers] = useState<User[]>([]);
    const [searchterm, setSearchTerm] = useState("");
    useEffect(() => {
        const fetchUsers = async () => {
            const userQuery = query(collection(db, "users"), limit(1000));
            const docSnap = await getDocs(userQuery);
            if (!docSnap.empty) {
                const usersList = docSnap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log(usersList);
                setUsers(usersList);
            } else {
                console.log("No documents!");
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user => {
        const target = `${user.username || ""} ${user.email || ""} ${user.company?.name || ""}`.toLowerCase();
        return target.includes(searchterm.toLowerCase());
    });

    console.log(filteredUsers)

    return (
        <div className="flex flex-col p-8 gap-8">
            <input
                type="text"
                placeholder="Search users by name, email, or university"
                value={searchterm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="font-normal p-2 pl-5 border-2 dark:border-gray-500 rounded-3xl min-h-18 focus:outline-none"
            />
            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map(user => (
                    <div
                        key={user.id}
                        className="bg-[#174ea6] rounded-2xl shadow-md p-6 flex flex-col items-center text-center gap-4"
                    >
                        <img
                            src={user.photoURL || "/default-avatar.png"}
                            alt={user.username || "User Photo"}
                            referrerPolicy="no-referrer"
                            className="w-24 h-24 rounded-full object-cover border"
                        />
                        <div className="text-black font-bold text-xl w-full break-words">{user.username ? user.username.toUpperCase() : "Unknown"}</div>
                        <div className="text-gray-900">{user.email || "No Email"}</div>
                        <div className="text-sm text-gray-500">{user.company?.name || "No University"}</div>
                        <a
                            href={`/admin/users/edit-user?id=${user.id}`}
                            className="bg-white text-blue-500 font-bold px-4 py-2 rounded hover:bg-gray-100 w-full text-center">
                            Edit
                        </a>
                    </div>
                ))}
                {
                    filteredUsers.length === 0 && (
                        <div className="col-span-3 text-center text-gray-500">
                            No users found.
                        </div>
                    )
                }
            </div>
        </div>
    );
}
export default Page;