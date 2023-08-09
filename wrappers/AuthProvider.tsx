"use client";

import { ReactNode } from "react";
import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase";
import { UserContext } from "@/lib/context";
import Login from "@/components/Login";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import { UserContextData, UserFirebase } from "@/types/types";

type Props = { children: ReactNode };

export default function AuthContextProvider({ children }: Props) {
    const [user, setUser] = useState<UserFirebase>(null);
    const [adminMode, setAdminMode] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                setIsLoading(false);
            } else {
                setUser(null);
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);
    if (isLoading) return <Loading />;

    const value: UserContextData = {
        email: user?.email || "",
        displayName: user?.displayName || "",
        adminMode,
        setAdminMode,
    };

    return (
        <UserContext.Provider value={value}>
            <Navbar />
            {!user ? <Login /> : children}
        </UserContext.Provider>
    );
}
