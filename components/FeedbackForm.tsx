import useUpdateFeedback from "@/hooks/useUpdateFeedback";
import { Feedback } from "@prisma/client";
import React, { ChangeEvent, MutableRefObject, useEffect } from "react";

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
    guidanceIdRef: MutableRefObject<string | null>;
    updateFeedback: (feedbackObj: Feedback) => void;
};

const FeedbackForm = ({
    editTitle,
    feedbackInput,
    setFeedbackinput,
    setEditTitle,
    closeModal,
    feedbackIdRef,
    guidanceIdRef,
    updateFeedback,
}: Props) => {
    const { handleFeedbackUpdate, isLoading, isSuccess, feedback } =
        useUpdateFeedback();

    useEffect(() => {
        if (feedback) {
            updateFeedback(feedback);
            setEditTitle("");
            setFeedbackinput({ www: "", ebi: "" });
            feedbackIdRef.current = null;

            setTimeout(() => {
                closeModal();
            }, 1000);
        }
    }, [feedback]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const feedbackId = feedbackIdRef.current;
        const guidanceId = String(guidanceIdRef.current);

        await handleFeedbackUpdate(
            "jonathan.mcguire@northcoders.com",
            feedbackInput.www,
            feedbackInput.ebi,
            guidanceId,
            feedbackId
        );
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
