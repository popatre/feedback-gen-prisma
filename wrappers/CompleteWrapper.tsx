import CheckboxInputs from "@/components/CheckboxInputs";
import React, { useState, ReactNode, ChangeEvent, cloneElement } from "react";

type Props = {
    children: ReactNode | null | undefined;
    wwwFeedback: string;
    ebiFeedback: string;
    addPositiveFeedback: (feedback: string, isChecked: boolean) => void;
    addEbiFeedback: (feedback: string, isChecked: boolean) => void;
};

type ChildProps = {
    disabled: boolean;
};

export default function CompleteWrapper({
    children,
    wwwFeedback,
    ebiFeedback,
    addPositiveFeedback,
    addEbiFeedback,
}: Props) {
    const [complete, setComplete] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setComplete(isChecked);
    };

    return (
        <div
            className={
                complete ? "complete grid-container " : "grid-container "
            }
        >
            <input
                type="checkbox"
                name="done"
                checked={complete}
                onChange={handleChange}
            />
            <CheckboxInputs
                name="www"
                feedback={wwwFeedback}
                addPositiveFeedback={addPositiveFeedback}
                addEbiFeedback={addEbiFeedback}
                disabled={!complete}
            />
            <CheckboxInputs
                name="ebi"
                feedback={ebiFeedback}
                addPositiveFeedback={addPositiveFeedback}
                addEbiFeedback={addEbiFeedback}
                disabled={complete}
            />
            {children}
        </div>
    );
}
