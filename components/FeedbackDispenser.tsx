import React from "react";

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
    return (
        <article className="shadow-xl min-h-[250px]  my-10 bg-purple-100">
            <h2 className="feedback__subtitle">{header}</h2>
            <ul className="py-5 px-3">
                {feedback.map((feedback) => {
                    return feedbackType === "www" ? (
                        <li>- {feedback}</li>
                    ) : (
                        <li>- [ ] {feedback}</li>
                    );
                })}
            </ul>
        </article>
    );
}
