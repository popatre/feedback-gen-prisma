"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { UserContext } from "@/lib/context";
import { useRouter } from "next/navigation";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../lib/firebase";

type Props = {};

export default function Navbar({}: Props) {
    const user = useContext(UserContext);
    const router = useRouter();

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
            {!user ? (
                <button onClick={handleSignIn}>Login</button>
            ) : (
                <>
                    <p>Welcome {user.email}</p>
                    <button onClick={handleSignOut}>Sign Out</button>
                </>
            )}
        </nav>
    );
}
