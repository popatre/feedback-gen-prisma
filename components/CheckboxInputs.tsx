import React, { useState, ChangeEvent, useEffect } from "react";

type Props = {
    name: string;
    addPositiveFeedback: (name: string, isChecked: boolean) => void;
    addEbiFeedback: (name: string, isChecked: boolean) => void;
    feedback: string;
    disabled: boolean;
};

const CheckboxInputs = ({
    name,
    addPositiveFeedback,
    addEbiFeedback,
    feedback,
    disabled,
}: Props) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (disabled) {
            setIsChecked(false);
            if (name === "www") {
                addPositiveFeedback(feedback, false);
            } else {
                addEbiFeedback(feedback, false);
            }
        }
    }, [disabled]);

    const handleChange = (
        event: ChangeEvent<HTMLInputElement>,
        feedback: string
    ) => {
        const isCurrentlyChecked = event.target.checked;
        setIsChecked(isCurrentlyChecked);
        if (name === "www") {
            addPositiveFeedback(feedback, isCurrentlyChecked);
        } else {
            addEbiFeedback(feedback, isCurrentlyChecked);
        }
    };

    return (
        <input
            type="checkbox"
            name={name}
            checked={isChecked}
            disabled={disabled}
            onChange={(e) => handleChange(e, feedback)}
        />
    );
};

export default CheckboxInputs;
