"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
                    ? `- feedbackItem`
                    : `- [ ] ${feedbackItem}`;
            })
            .join("\n");

        navigator.clipboard
            .writeText(listContent)
            .then(() => {
                setIsCopied(true);
                console.log("im copied");
                toast.success("📄 Copied to clipboard!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    setIsCopied(false);
                }, 2000);
            })
            .catch((error) => {
                console.error("Failed to copy list to clipboard:", error);
            });
    };

    return (
        <article className="relative shadow-xl min-h-[250px] my-10 sticky-note">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme="light"
            />
            <button className="copy-btn" onClick={handleCopyToClipboard}>
                {!isCopied ? `Copy to Clipboard` : `Copied!`}
            </button>
            <h2 className="feedback__subtitle">{header}</h2>
            <ul className="py-5 px-3">
                {feedback.map((feedbackItem, index) => {
                    const listItemContent =
                        feedbackType === "www"
                            ? `- feedbackItem`
                            : `- [ ] ${feedbackItem}`;

                    return <li key={index}>{listItemContent}</li>;
                })}
            </ul>
        </article>
    );
}
