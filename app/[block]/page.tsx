import NavCard from "@/components/NavCard";
import React from "react";

type Ticket = { url: string; description: string };
type Tickets = Ticket[];

type Props = { params: { block: string } };

export default async function Page({ params }: Props) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/tickets?block=${params.block}`,
        {
            next: { revalidate: 0 },
            method: "GET",
        }
    );

    if (res.status === 404) {
        return <p>Something went wrong...</p>;
    }

    const { tickets }: { tickets: Tickets } = await res.json();

    return (
        <section className="grid-flow-row nav__grid  pb-20">
            {tickets.map((ticket) => {
                return (
                    <NavCard
                        key={ticket.url}
                        description={ticket.description}
                        url={ticket.url}
                    />
                );
            })}
        </section>
    );
}
