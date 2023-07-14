"use client";

type Feedback = { guidance: string; www: string; ebi: string };
type Props = {
    mustData: Feedback[];
    shouldData: Feedback[];
    couldData: Feedback[];
};

import { useState } from "react";
import Checklist from "./Checklist";

export default function GuidanceGrid({
    mustData,
    shouldData,
    couldData,
}: Props) {
    const [wwwFeedback, setWwwFeedback] = useState<string[]>([]);
    const [ebiFeedback, setEbiFeedback] = useState<string[]>([]);

    const addPositiveFeedback = (feedback: string, event) => {
        if (event.target.checked) {
            setWwwFeedback((prevState) => {
                return [...prevState, feedback];
            });
        } else {
            setWwwFeedback((prevState) => {
                return prevState.filter((element) => element !== feedback);
            });
        }
    };

    const addEbiFeedback = (feedback: string, event) => {
        if (event.target.checked) {
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
        <main>
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

            <section>
                <h2>What went well...</h2>
                {wwwFeedback.map((feedback) => {
                    return <p>{feedback}</p>;
                })}
            </section>
            <section>
                <h2>Even better..</h2>
                {ebiFeedback.map((feedback) => {
                    return <p>{feedback}</p>;
                })}
            </section>
        </main>
    );
}
