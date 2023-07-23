import React, { useState, ChangeEvent } from "react";

type Props = {
    editTitle: string;
    setFeedbackinput: React.Dispatch<
        React.SetStateAction<{ www: string; ebi: string }>
    >;
    feedbackInput: { www: string; ebi: string };
    setEditTitle: React.Dispatch<React.SetStateAction<string>>;
};

const FeedbackForm = ({
    editTitle,
    feedbackInput,
    setFeedbackinput,
    setEditTitle,
}: Props) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({ editTitle, feedbackInput });

        setEditTitle("");
        setFeedbackinput({ www: "", ebi: "" });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, id } = e.target;
        setFeedbackinput((prevInput) => {
            return { ...prevInput, [id]: value };
        });
    };

    //use hook to submit/patch

    return (
        <form onSubmit={handleSubmit}>
            <h2>{editTitle}</h2>
            <div>
                <label htmlFor="wwwInput">What went well:</label>
                <input
                    type="text"
                    id="www"
                    value={feedbackInput.www}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="ebiInput">Even Better if:</label>
                <input
                    type="text"
                    id="ebi"
                    value={feedbackInput.ebi}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default FeedbackForm;
