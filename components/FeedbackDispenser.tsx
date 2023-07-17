"use client";

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type Props = {
    header: string;
    feedback: string[];
    feedbackType: "ebi" | "www";
};

export default function FeedbackDispenser({
    header,
    feedback,
    feedbackType,
}: Props) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyToClipboard = () => {
        const listContent = feedback
            .map((feedbackItem) => {
                return feedbackType === "www"
                    ? `- ${feedbackItem}`
                    : `- [ ] ${feedbackItem}`;
            })
            .join("\n");

        navigator.clipboard
            .writeText(listContent)
            .then(() => {
                setIsCopied(true);
                toast.success("📄 Copied to clipboard!");
                setTimeout(() => {
                    setIsCopied(false);
                }, 2000);
            })
            .catch(() => {
                toast.error("❌ Something Went Wrong");
            });
    };

    return (
        <article className="relative shadow-xl min-h-[250px] my-10 sticky-note">
            <Toaster position="top-center" reverseOrder={false} />
            <button className="copy-btn" onClick={handleCopyToClipboard}>
                {!isCopied ? `Copy to Clipboard` : `Copied!`}
            </button>
            <h2 className="feedback__subtitle">{header}</h2>
            <ul className="py-5 px-3">
                {feedback.map((feedbackItem, index) => {
                    const listItemContent =
                        feedbackType === "www"
                            ? `- ${feedbackItem}`
                            : `- [ ] ${feedbackItem}`;

                    return <li key={index}>{listItemContent}</li>;
                })}
            </ul>
        </article>
    );
}
