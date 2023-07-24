"use client";

import { ReactNode } from "react";
import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase";
import { UserContext } from "@/lib/context";
import Login from "@/components/Login";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";

type Props = { children: ReactNode };

export default function AuthContextProvider({ children }: Props) {
    const [user, setUser] = useState<User | null>(null);
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

    return (
        <UserContext.Provider value={user}>
            <Navbar />
            {!user ? <Login /> : children}
        </UserContext.Provider>
    );
}
