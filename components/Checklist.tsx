"use client";

type Guidance = { guidance: string; feedback: Feedback[] };
type Feedback = {
    feedback_id: number;
    www: string;
    ebi: string;
    user_email: string;
    guidance_id: number;
};

type Props = {
    title: string;
    feedbackData: Guidance[];
    addPositiveFeedback: (feedback: string, isChecked: boolean) => void;
    addEbiFeedback: (feedback: string, isChecked: boolean) => void;
};
import Modal from "react-modal";
import CheckBoxWrapper from "@/wrappers/CheckBoxWrapper";
import useModal from "@/hooks/useModal";
import FeedbackForm from "./FeedbackForm";
import { useState, useRef } from "react";

export default function Checklist({
    title,
    feedbackData,
    addPositiveFeedback,
    addEbiFeedback,
}: Props) {
    const { modalIsOpen, openModal, closeModal, customStyles } = useModal();
    const [editTitle, setEditTitle] = useState("Default");
    const [feedbackInput, setFeedbackinput] = useState({
        www: "",
        ebi: "",
    });
    const [feedback, setFeedback] = useState(feedbackData);
    const feedbackIdRef = useRef<number | null>(null);

    const updateFeedback = (
        feedbackId: number,
        updateObj: { www?: string; ebi?: string }
    ) => {
        setFeedback((prevFeedback) => {
            return prevFeedback.map((element) => {
                if (
                    element.feedback.some(
                        (feedback) => feedback.feedback_id === feedbackId
                    )
                ) {
                    return {
                        ...element,
                        feedback: element.feedback.map((feedback) => {
                            if (feedback.feedback_id === feedbackId) {
                                return { ...feedback, ...updateObj };
                            } else {
                                return feedback;
                            }
                        }),
                    };
                } else {
                    return element;
                }
            });
        });
    };

    const editFeedback = (
        guidance: string,
        www: string,
        ebi: string,
        feedbackId: number
    ) => {
        setEditTitle(guidance);
        setFeedbackinput({ www, ebi });
        feedbackIdRef.current = feedbackId;
        openModal();
    };

    return feedback.length > 0 ? (
        <section>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <FeedbackForm
                    editTitle={editTitle}
                    feedbackInput={feedbackInput}
                    setFeedbackinput={setFeedbackinput}
                    setEditTitle={setEditTitle}
                    closeModal={closeModal}
                    feedbackIdRef={feedbackIdRef}
                    updateFeedback={updateFeedback}
                />
            </Modal>
            <h2 className="feedback__title">{title}</h2>
            <div className="box-labels">
                <p>✅</p>
                <p>👏</p>
                <p>⁉️</p>
            </div>
            {feedback.map((element, index) => {
                return (
                    <CheckBoxWrapper
                        key={index}
                        wwwFeedback={element.feedback[0].www}
                        ebiFeedback={element.feedback[0].ebi}
                        addPositiveFeedback={addPositiveFeedback}
                        addEbiFeedback={addEbiFeedback}
                    >
                        <p>{element.guidance}</p>
                        <button
                            onClick={() =>
                                editFeedback(
                                    element.guidance,
                                    element.feedback[0].www,
                                    element.feedback[0].ebi,
                                    element.feedback[0].feedback_id
                                )
                            }
                        >
                            Edit
                        </button>
                    </CheckBoxWrapper>
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
