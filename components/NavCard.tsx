import Link from "next/link";
import React from "react";

type Props = { description: string; url: string };

export default function NavCard({ description, url }: Props) {
    return (
        <Link href={url}>
            <article className="border-solid border-2 border-black rounded-md p-10 bg-purple-200 h-[100%] max-h-[200px] shadow-2xl hover:bg-purple-300">
                <p>{description}</p>
            </article>
        </Link>
    );
}
