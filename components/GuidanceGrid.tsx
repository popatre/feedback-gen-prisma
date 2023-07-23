"use client";

type Feedback = { guidance: string; www: string; ebi: string };
type Props = {
    mustData: Feedback[];
    shouldData: Feedback[];
    couldData: Feedback[];
};

import { useState, ChangeEvent } from "react";
import Checklist from "./Checklist";
import FeedbackDispenser from "./FeedbackDispenser";

export default function GuidanceGrid({
    mustData,
    shouldData,
    couldData,
}: Props) {
    const [wwwFeedback, setWwwFeedback] = useState<string[]>([]);
    const [ebiFeedback, setEbiFeedback] = useState<string[]>([]);

    const addPositiveFeedback = (feedback: string, isChecked: boolean) => {
        if (isChecked) {
            setWwwFeedback((prevState) => {
                return [...prevState, feedback];
            });
        } else {
            setWwwFeedback((prevState) => {
                return prevState.filter((element) => element !== feedback);
            });
        }
    };

    const addEbiFeedback = (feedback: string, isChecked: boolean) => {
        if (isChecked) {
            setEbiFeedback((prevState) => {
                return [...prevState, feedback];
            });
        } else {
            setEbiFeedback((prevState) => {
                return prevState.filter((element) => element !== feedback);
            });
        }
    };

    return (
        <main className="container">
            <div className="container__checkboxes">
                <Checklist
                    title="Must"
                    feedbackData={mustData}
                    addPositiveFeedback={addPositiveFeedback}
                    addEbiFeedback={addEbiFeedback}
                />
                <Checklist
                    title="Should"
                    feedbackData={shouldData}
                    addPositiveFeedback={addPositiveFeedback}
                    addEbiFeedback={addEbiFeedback}
                />
                <Checklist
                    title="Could"
                    feedbackData={couldData}
                    addPositiveFeedback={addPositiveFeedback}
                    addEbiFeedback={addEbiFeedback}
                />
            </div>
            <section className="container__feedback">
                <FeedbackDispenser
                    header="What went well..."
                    feedback={wwwFeedback}
                    feedbackType="www"
                />
                <FeedbackDispenser
                    header="Even Better If..."
                    feedback={ebiFeedback}
                    feedbackType="ebi"
                />
            </section>
        </main>
    );
}
