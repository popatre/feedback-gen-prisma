"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "@/lib/context";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import useHandleUserLogin from "@/hooks/useHandleUserLogin";
import Loading from "./Loading";

type Props = {};

export default function Navbar({}: Props) {
    const user = useContext(UserContext);
    const router = useRouter();

    const { handleLogin, isLoading, isError } = useHandleUserLogin();

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

    if (isLoading) return <Loading />;
    if (isError) return <p>Something went wrong...</p>;

    return (
        <nav className="mb-10 nav-bar">
            <ul className="flex flex-row justify-around py-5">
                {user &&
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
            <aside className="flex flex-row justify-end mr-10">
                {!user?.email ? null : (
                    <>
                        <p className="mr-10 self-center text-white">
                            Hi, {user?.displayName}
                        </p>
                        <button
                            onClick={handleSignOut}
                            className="bg-green-600 hover:bg-blue-700 text-xs text-white font-bold py-1 px-2 rounded my-1"
                        >
                            Sign Out
                        </button>
                    </>
                )}
            </aside>
        </nav>
    );
}
