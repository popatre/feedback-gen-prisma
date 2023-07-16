"use client";

type Feedback = { guidance: string; www: string; ebi: string };

type Props = {
    title: string;
    feedbackData: Feedback[];
    addPositiveFeedback: (
        feedback: string,
        event: ChangeEvent<HTMLInputElement>
    ) => void;
    addEbiFeedback: (
        feedback: string,
        event: ChangeEvent<HTMLInputElement>
    ) => void;
};

import CompleteWrapper from "@/wrappers/CompleteWrapper";
import { ChangeEvent } from "react";

export default function Checklist({
    title,
    feedbackData,
    addPositiveFeedback,
    addEbiFeedback,
}: Props) {
    return (
        <section>
            <h2 className="feedback__title">{title}</h2>
            <div className="box-labels">
                <p>✅</p>
                <p>👏</p>
                <p>⁉️</p>
            </div>
            {feedbackData.map((element) => {
                return (
                    <CompleteWrapper>
                        <input
                            type="checkbox"
                            name="www"
                            onChange={(event) =>
                                addPositiveFeedback(element.www, event)
                            }
                        />
                        <input
                            type="checkbox"
                            name="ebi"
                            onChange={(event) =>
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
