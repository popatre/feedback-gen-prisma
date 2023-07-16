import NavCard from "@/components/NavCard";
import React from "react";

type Props = {};

export default function Page({}: Props) {
    const fePages = [
        {
            url: "/fe/ticket1",
            description: "1. Create React project and public repo",
        },
        { url: "/fe/ticket2", description: "2. Enable CORS" },
        { url: "/fe/ticket3", description: "3. Planning" },
        { url: "/fe/ticket4", description: "4. View all articles" },
        { url: "/fe/ticket5", description: "5. Planning" },
        {
            url: "/fe/ticket6",
            description: "6. View list of comments associated with an article",
        },
        { url: "/fe/ticket7", description: "7. Vote on article" },
        { url: "/fe/ticket8", description: "8. Post article comment" },
        { url: "/fe/ticket9", description: "9.View articles by topic" },
        { url: "/fe/ticket10", description: "10. Sort articles" },
        { url: "/fe/ticket11", description: "11. Delete comment" },
        { url: "/fe/ticket12", description: "12. Delete comment" },
        { url: "/fe/ticket13", description: "13. Error Handling" },
        { url: "/fe/ticket14", description: "14. Deploy App" },
        { url: "/fe/ticket15", description: "15. README" },
    ];

    return (
        <section className="grid-flow-row nav__grid h-screen">
            {fePages.map((page) => {
                return (
                    <NavCard
                        key={page.url}
                        description={page.description}
                        url={page.url}
                    />
                );
            })}
        </section>
    );
}
