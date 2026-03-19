/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { useAuthContext } from '@/context/AuthContext';
const decodeTeamName = (slug: string) => {
  return slug.split('-').map(decodeURIComponent).join(' ');
};

type UserInfo = {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  registrationDetails: { isTeamLead: number };
};

export default function TeamPage() {
  const user = useAuthContext();
  const { teamName } = useParams();
  const [teamData, setTeamData] = useState<any>(null);
  const [participantData, setParticipantData] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!teamName || typeof teamName !== 'string' || !user || !user.uid) return;

    const fetchTeam = async () => {
      const decodedName = decodeTeamName(teamName);

      const q = query(
        collection(db, 'teams'),
        where('participants', 'array-contains', user.uid)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const team = querySnapshot.docs[0].data();
        setTeamData(team);

        // Fetch participant user data
        const usersCollection = collection(db, 'users');
        const userFetchPromises = team.participants.map(async (uid: string) => {
          const userDoc = await getDoc(doc(usersCollection, uid));
          return {
            ...(userDoc.data() as Omit<UserInfo, 'uid'>),
            uid,
          };
        });

        const users = await Promise.all(userFetchPromises);
        setParticipantData(users);
      } else {
        setTeamData(null);
        setParticipantData([]);
      }

      setLoading(false);
    };

    fetchTeam();
  }, [teamName, user]);

  if (loading) return <p>Loading team...</p>;
  if (!teamData) return <p>Team not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        {teamData.teamName} #{teamData.teamNumber}
      </h1>
      <h2 className="mt-6 text-2xl font-semibold">Participants:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {participantData.map((participant) => (
          <div
            key={participant.uid}
            className="bg-white shadow-md rounded-xl p-4 flex items-center space-x-4"
          >
            <img
              src={participant.photoURL}
              alt={participant.displayName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-lg text-gray-800">
                {participant.displayName}{' '}
                {participant.registrationDetails.isTeamLead === 1 && (
                  <span className='text-blue-500'>(Lead)</span>
                )}{' '}
                {participant.uid === user?.uid && (
                  <span className="text-green-500">(You)</span>
                )}
              </p>
              <p className="text-sm text-gray-600">{participant.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
