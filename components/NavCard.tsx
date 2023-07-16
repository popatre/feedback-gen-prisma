import Link from "next/link";
import React from "react";

type Props = { description: string; url: string };

export default function NavCard({ description, url }: Props) {
    return (
        <article className="border-solid border-2 border-black rounded-md p-10 bg-white">
            <Link href={url}>
                <p>{description}</p>
            </Link>
        </article>
    );
}
