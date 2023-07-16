import Link from "next/link";
import React from "react";

type Props = { description: string; url: string };

export default function NavCard({ description, url }: Props) {
    return (
        <Link href={url}>
            <article className="border-solid border-2 border-black rounded-md p-10 bg-white h-[100%] max-h-[200px] shadow-lg">
                <p>{description}</p>
            </article>
        </Link>
    );
}
