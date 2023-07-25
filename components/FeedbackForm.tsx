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
    updateFeedback: (
        feedbackId: number,
        updateObj: { www?: string; ebi?: string }
    ) => void;
};

const FeedbackForm = ({
    editTitle,
    feedbackInput,
    setFeedbackinput,
    setEditTitle,
    closeModal,
    feedbackIdRef,
    updateFeedback,
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
            updateFeedback(feedbackId, feedbackInput);
            setEditTitle("");
            setFeedbackinput({ www: "", ebi: "" });
            feedbackIdRef.current = null;

            setTimeout(() => {
                closeModal();
            }, 1000);
        });
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { value, id } = e.target;
        setFeedbackinput((prevInput) => {
            return { ...prevInput, [id]: value };
        });
    };

    return (
        <form className="my-10 mx-10 " onSubmit={handleSubmit}>
            <h2 className="font-bold mb-10 text-lg">{editTitle}</h2>
            {!isSuccess && (
                <div className="flex flex-col">
                    <label className="font-semibold " htmlFor="wwwInput">
                        What went well:
                    </label>
                    <textarea
                        className="mb-5 border-2"
                        id="www"
                        rows={4}
                        value={feedbackInput.www}
                        onChange={handleChange}
                        required={true}
                    />
                </div>
            )}
            {!isSuccess && (
                <div className="flex flex-col">
                    <label className="font-semibold" htmlFor="ebiInput">
                        Even Better if:
                    </label>
                    <textarea
                        className="mb-5 border-2"
                        id="ebi"
                        rows={4}
                        value={feedbackInput.ebi}
                        onChange={handleChange}
                        required={true}
                    />
                </div>
            )}
            <div className="form-btns flex justify-around">
                {!isSuccess ? (
                    <button
                        className="bg-green-600 hover:bg-green-700 text-xs text-white font-bold py-3 px-4 rounded my-1"
                        disabled={isLoading}
                        type="submit"
                    >
                        {!isLoading ? "Submit" : "Updating Feedback"}
                    </button>
                ) : (
                    <h2 className="font-bold text-xl">Feedback Updated!</h2>
                )}
                {!isSuccess && !isLoading && (
                    <button
                        className="bg-rose-600 hover:bg-rose-700 text-xs text-white font-bold py-3 px-4 rounded my-1 mx-5"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default FeedbackForm;
