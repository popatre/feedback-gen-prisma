"use client";

type Feedback = { guidance: string; www: string; ebi: string };

type Props = {
    title: string;
    feedbackData: Feedback[];
    addPositiveFeedback: (feedback: string, event) => void;
    addEbiFeedback: (feedback: string, event) => void;
};

import CompleteWrapper from "@/wrappers/CompleteWrapper";
import { useState } from "react";

export default function Checklist({
    title,
    feedbackData,
    addPositiveFeedback,
    addEbiFeedback,
}: Props) {
    const [complete, setComplete] = useState("");

    return (
        <section>
            <h2>{title}</h2>
            {feedbackData.map((element) => {
                return (
                    <CompleteWrapper>
                        <input
                            type="checkbox"
                            name="www"
                            onClick={(event) =>
                                addPositiveFeedback(element.www, event)
                            }
                        />
                        <input
                            type="checkbox"
                            name="ebi"
                            onClick={(event) =>
                                addEbiFeedback(element.ebi, event)
                            }
                        />
                        <p>{element.guidance}</p>
                    </CompleteWrapper>
                );
            })}
        </section>
    );
}
