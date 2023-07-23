"use client";

import { ReactNode } from "react";
import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase";
import { UserContext } from "@/lib/context";

type Props = { children: ReactNode };

export default function AuthContextProvider({ children }: Props) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
