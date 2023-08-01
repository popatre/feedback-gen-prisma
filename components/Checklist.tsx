"use client";

import { Guidance, Feedback } from "../types/types";
import { AiOutlinePlusCircle } from "react-icons/ai";

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
    const guidanceIdRef = useRef<string | null>(null);

    const updateFeedback = (feedbackObj: Feedback) => {
        setFeedback((prevFeedback) => {
            const existingGuidanceIndex = prevFeedback.findIndex(
                (guidance) => guidance.guidance_id === feedbackObj.guidance_id
            );

            const existingFeedbackIndex = prevFeedback[
                existingGuidanceIndex
            ].feedback.findIndex(
                (feedback) => feedback.feedback_id === feedbackObj.feedback_id
            );

            if (existingFeedbackIndex !== -1) {
                // If feedback already exists
                return prevFeedback.map((guidance) => {
                    return {
                        ...guidance,
                        feedback: guidance.feedback.map((feedback, fIndex) =>
                            fIndex === existingFeedbackIndex &&
                            guidance.guidance_id === feedbackObj.guidance_id
                                ? { ...feedback, ...feedbackObj }
                                : feedback
                        ),
                    };
                });
            } else {
                // If feedback doesn't exist
                return prevFeedback.map((guidance) => {
                    if (guidance.guidance_id === feedbackObj.guidance_id) {
                        return {
                            ...guidance,
                            feedback: [...guidance.feedback, feedbackObj],
                        };
                    } else {
                        return { ...guidance, feedback: [] };
                    }
                });
            }
        });
    };

    const editFeedback = (
        guidance: string,
        www: string,
        ebi: string,
        feedbackId: number,
        guidanceId: string
    ) => {
        setEditTitle(guidance);
        setFeedbackinput({ www, ebi });
        feedbackIdRef.current = feedbackId;
        guidanceIdRef.current = guidanceId;
        openModal();
    };

    return feedback.length > 0 ? (
        <section>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Feedback form"
                ariaHideApp={false}
            >
                <FeedbackForm
                    editTitle={editTitle}
                    feedbackInput={feedbackInput}
                    setFeedbackinput={setFeedbackinput}
                    setEditTitle={setEditTitle}
                    closeModal={closeModal}
                    feedbackIdRef={feedbackIdRef}
                    guidanceIdRef={guidanceIdRef}
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
                        wwwFeedback={element.feedback[0]?.www}
                        ebiFeedback={element.feedback[0]?.ebi}
                        addPositiveFeedback={addPositiveFeedback}
                        addEbiFeedback={addEbiFeedback}
                    >
                        <p>{element.guidance}</p>

                        <button
                            onClick={() =>
                                editFeedback(
                                    element.guidance,
                                    element.feedback[0]?.www,
                                    element.feedback[0]?.ebi,
                                    element.feedback[0]?.feedback_id,
                                    element.guidance_id
                                )
                            }
                        >
                            <AiOutlinePlusCircle />
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
