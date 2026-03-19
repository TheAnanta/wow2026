"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Loader from "@/components/LoadingAnimation/page";

export const AuthContext = React.createContext<User | null>(null);

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.JSX.Element;
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {loading ? (
        <div className="flex flex-col place-items-center place-content-center h-[80vh] m-0">
          <Loader />
        </div>
      ) : (
        children
      )}
      {/* <div className="flex flex-col place-items-center place-content-center h-[80vh] m-0">
        <Loader />
      </div> */}
    </AuthContext.Provider>
  );
};
