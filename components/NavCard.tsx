import Link from "next/link";
import React from "react";

type Props = { description: string; url: string };

export default function NavCard({ description, url }: Props) {
    return (
        <Link href={url}>
            <article className="nav-card border-solid border-2 rounded-md p-10 h-[100%]  shadow-md hover:bg-sky-300 flex justify-left items-center ">
                <p role="heading" className="text-white font-semibold">
                    {description}
                </p>
            </article>
        </Link>
    );
}
