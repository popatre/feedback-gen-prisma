"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "@/lib/context";
import { useRouter } from "next/navigation";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    User,
} from "firebase/auth";
import { auth, provider } from "../lib/firebase";
import { trpc } from "@/utils/trpc";
import useHandleUserLogin from "@/hooks/useHandleUserLogin";

type Props = {};

export default function Navbar({}: Props) {
    const user = useContext(UserContext);
    const router = useRouter();

    const { handleLogin } = useHandleUserLogin();

    useEffect(() => {
        if (user) {
            const login = async () => {
                if (user !== null) {
                    const userEmail = user.email ?? "";
                    try {
                        await handleLogin(userEmail);
                    } catch (error) {}
                }
            };
            login();
        }
    }, [user]);

    const handleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
            router.push("/");
        } catch (error) {
            console.log("gone wrong");
        }
    };

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                router.push("/");
            })
            .catch((error) => {
                console.log("gone wrong");
            });
    };

    const pages = [
        { name: "Home", url: "/" },
        { name: "Front End", url: "/fe" },
    ];
    return (
        <nav className="mb-10 nav-bar">
            <ul className=" w-1/3 flex flex-row justify-around py-5">
                {pages.map((page) => {
                    return (
                        <li
                            key={page.url}
                            className="font-semibold text-white hover:text-black ml-3"
                        >
                            <Link href={page.url}>{page.name}</Link>
                        </li>
                    );
                })}
            </ul>
            {!user?.email ? (
                <button onClick={handleSignIn}>Login</button>
            ) : (
                <>
                    <p>Welcome {user?.email}</p>
                    <button onClick={handleSignOut}>Sign Out</button>
                </>
            )}
        </nav>
    );
}
