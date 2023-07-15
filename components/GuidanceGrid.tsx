"use client";

type Feedback = { guidance: string; www: string; ebi: string };
type Props = {
    mustData: Feedback[];
    shouldData: Feedback[];
    couldData: Feedback[];
};

import { useState, ChangeEvent } from "react";
import Checklist from "./Checklist";

export default function GuidanceGrid({
    mustData,
    shouldData,
    couldData,
}: Props) {
    const [wwwFeedback, setWwwFeedback] = useState<string[]>([]);
    const [ebiFeedback, setEbiFeedback] = useState<string[]>([]);

    const addPositiveFeedback = (
        feedback: string,
        event: ChangeEvent<HTMLInputElement>
    ) => {
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

    const addEbiFeedback = (
        feedback: string,
        event: ChangeEvent<HTMLInputElement>
    ) => {
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
        <main className="container">
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

            <section className="shadow-xl ">
                <h2>What went well...</h2>
                <ul className="py-5 px-3">
                    {wwwFeedback.map((feedback) => {
                        return <li>- {feedback}</li>;
                    })}
                </ul>
            </section>
            <section className="shadow-xl py-2 border-2 border-black min-h-[150px]">
                <h2>Even better..</h2>
                <ul className="px-3">
                    {ebiFeedback.map((feedback) => {
                        return <li>- [ ] {feedback}</li>;
                    })}
                </ul>
            </section>
        </main>
    );
}
