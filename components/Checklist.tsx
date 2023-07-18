"use client";

type Feedback = { guidance: string; www: string; ebi: string };

type Props = {
    title: string;
    feedbackData: Feedback[];
    addPositiveFeedback: (feedback: string, isChecked: boolean) => void;
    addEbiFeedback: (feedback: string, isChecked: boolean) => void;
};

import CompleteWrapper from "@/wrappers/CompleteWrapper";
import CheckboxInput from "./CheckboxInputs";
import { useState } from "react";

export default function Checklist({
    title,
    feedbackData,
    addPositiveFeedback,
    addEbiFeedback,
}: Props) {
    const [complete, setComplete] = useState(false);

    return feedbackData.length > 0 ? (
        <section>
            <h2 className="feedback__title">{title}</h2>
            <div className="box-labels">
                <p>✅</p>
                <p>👏</p>
                <p>⁉️</p>
            </div>
            {feedbackData.map((element, index) => {
                return (
                    <CompleteWrapper
                        key={index}
                        wwwFeedback={element.www}
                        ebiFeedback={element.ebi}
                        addPositiveFeedback={addPositiveFeedback}
                        addEbiFeedback={addEbiFeedback}
                    >
                        {/* <CheckboxInput
                            name="www"
                            feedback={element.www}
                            addPositiveFeedback={addPositiveFeedback}
                            addEbiFeedback={addEbiFeedback}
                            disabled={true}
                        />
                        <CheckboxInput
                            name="ebi"
                            feedback={element.ebi}
                            addPositiveFeedback={addPositiveFeedback}
                            addEbiFeedback={addEbiFeedback}
                            disabled={false}
                        /> */}

                        <p>{element.guidance}</p>
                    </CompleteWrapper>
                );
            })}
        </section>
    ) : (
        <section>
            <h2 className="feedback__title">{title}</h2>
            <p>No {title} criteria for this ticket</p>
        </section>
    );
}
