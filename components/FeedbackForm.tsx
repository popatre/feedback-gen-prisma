import useUpdateFeedback from "@/hooks/useUpdateFeedback";
import React, { ChangeEvent, MutableRefObject } from "react";

type Props = {
    editTitle: string;
    setFeedbackinput: React.Dispatch<
        React.SetStateAction<{
            www: string;
            ebi: string;
        }>
    >;
    feedbackInput: { www: string; ebi: string };
    setEditTitle: React.Dispatch<React.SetStateAction<string>>;
    closeModal: () => void;
    feedbackIdRef: MutableRefObject<number | null>;
};

const FeedbackForm = ({
    editTitle,
    feedbackInput,
    setFeedbackinput,
    setEditTitle,
    closeModal,
    feedbackIdRef,
}: Props) => {
    const { handleFeedbackUpdate, isLoading, isSuccess } = useUpdateFeedback();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const feedbackId = Number(feedbackIdRef.current);
        handleFeedbackUpdate(
            feedbackId,
            feedbackInput.www,
            feedbackInput.ebi
        ).then(() => {
            setEditTitle("");
            setFeedbackinput({ www: "", ebi: "" });
            feedbackIdRef.current = null;

            setTimeout(() => {
                closeModal();
            }, 1500);
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, id } = e.target;
        setFeedbackinput((prevInput) => {
            return { ...prevInput, [id]: value };
        });
    };

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
            {!isSuccess ? (
                <button disabled={isLoading} type="submit">
                    {!isLoading ? "Submit" : "Updating Feedback"}
                </button>
            ) : (
                <h2>Feedback Updated!</h2>
            )}
        </form>
    );
};

export default FeedbackForm;
