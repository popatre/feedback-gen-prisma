"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import useHandleUserLogin from "@/hooks/useHandleUserLogin";
import Loading from "./Loading";
import useUserContext from "@/hooks/useUserContext";
import { isNorthcodersEmail } from "@/utils/helpers/isNorthcodersEmail";

type Props = {};

export default function Navbar({}: Props) {
    const router = useRouter();
    const { email, displayName, adminMode, setAdminMode } = useUserContext();

    const { handleLogin, isLoading, isError } = useHandleUserLogin();

    useEffect(() => {
        if (email && isNorthcodersEmail(email)) {
            const login = async () => {
                try {
                    await handleLogin(email);
                } catch (error) {}
            };
            login();
        }
    }, [email]);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                router.push("/");
            })
            .catch((error) => {
                console.log("gone wrong");
            });
    };

    const handleAdminMode = () => {
        if (setAdminMode) {
            setAdminMode((prevMode) => !prevMode);
        }
    };

    const pages = [
        { name: "Home", url: "/" },

        { name: "FE", url: "/fe" },
    ];

    if (isLoading) return <Loading />;

    return (
        <nav className="mb-10 nav-bar">
            <ul className="flex flex-row justify-around py-5">
                {email &&
                    isNorthcodersEmail(email) &&
                    pages.map((page) => {
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
            {email && isNorthcodersEmail(email) && (
                <button
                    className={
                        adminMode
                            ? "bg-green-500 hover:bg-green-600 text-xs text-white font-bold py-1 px-2 rounded my-1  max-w-fit"
                            : "bg-slate-500 hover:bg-slate-600 text-xs text-white font-bold py-1 px-2 rounded my-1  max-w-fit"
                    }
                    onClick={handleAdminMode}
                >
                    {adminMode ? "Admin On" : "Admin Off"}
                </button>
            )}
            <aside className="flex flex-row justify-end mr-10">
                {!email ? null : (
                    <>
                        <p className="mr-10 self-center text-white">
                            Hi, {displayName}
                        </p>
                        <button
                            onClick={handleSignOut}
                            className="bg-slate-400 hover:bg-blue-700 text-xs text-white font-bold py-1 px-2 rounded my-1"
                        >
                            Sign Out
                        </button>
                    </>
                )}
            </aside>
        </nav>
    );
}
