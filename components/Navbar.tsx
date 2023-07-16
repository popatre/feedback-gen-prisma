import React from "react";
import Link from "next/link";

type Props = {};

export default function Navbar({}: Props) {
    const pages = [
        { name: "Home", url: "/" },
        { name: "Front End", url: "/fe" },
    ];
    return (
        <nav className="mb-10 nav-bar">
            <ul className=" w-1/3 flex flex-row justify-around py-5">
                {pages.map((page) => {
                    return (
                        <li className="font-semibold text-white hover:text-black ml-3">
                            <Link href={page.url}>{page.name}</Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
