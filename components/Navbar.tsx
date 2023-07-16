import React from "react";
import Link from "next/link";

type Props = {};

export default function Navbar({}: Props) {
    const pages = [
        { name: "Home", url: "/" },
        { name: "Front End", url: "/fe" },
    ];
    return (
        <nav className="bg-purple-400 mb-10">
            <ul className=" w-1/4 flex flex-row justify-around py-5">
                {pages.map((page) => {
                    return (
                        <li>
                            <Link href={page.url}>{page.name}</Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
