"use client";

import { Guidance, Feedback, GuidanceType } from "../types/types";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Modal from "react-modal";
import CheckBoxWrapper from "@/wrappers/CheckBoxWrapper";
import useModal from "@/hooks/useModal";
import FeedbackForm from "./FeedbackForm";
import { useState, useRef } from "react";
import GuidanceAdder from "./GuidanceAdder";
import useUserContext from "@/hooks/useUserContext";
import EditGuidanceForm from "./EditGuidanceForm";
import Button from "./Button";
import DeleteForm from "./DeleteForm";
import * as _ from "lodash";

type Props = {
    title: GuidanceType;
    feedbackData: Guidance[];
    addPositiveFeedback: (feedback: string, isChecked: boolean) => void;
    addEbiFeedback: (feedback: string, isChecked: boolean) => void;
};

export default function Checklist({
    title,
    feedbackData,
    addPositiveFeedback,
    addEbiFeedback,
}: Props) {
    const { modalIsOpen, openModal, closeModal, customStyles } = useModal();

    const [editTitle, setEditTitle] = useState("Default");
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [feedbackInput, setFeedbackinput] = useState({
        www: "",
        ebi: "",
    });
    const [feedback, setFeedback] = useState(feedbackData);
    const feedbackIdRef = useRef<number | null>(null);
    const guidanceIdRef = useRef<string | null>(null);
    const currentGuidanceRef = useRef<{ guidance: string; id: string } | null>(
        null
    );

    const { adminMode } = useUserContext();

    const handleNewGuidance = (guidance: Guidance) => {
        setFeedback((prevGuidance) => {
            return [...prevGuidance, guidance];
        });
    };

    const handleEditGuidance = (guidanceBody: string, guidanceId: string) => {
        setFeedback((prevGuidance) => {
            return prevGuidance.map((guidanceElement) => {
                if (guidanceElement.guidance_id === guidanceId) {
                    const guidanceClone = { ...guidanceElement };
                    guidanceClone.guidance = guidanceBody;
                    return guidanceClone;
                } else {
                    return guidanceElement;
                }
            });
        });
    };

    const deleteGuidance = (guidanceId: string) => {
        setFeedback((prevGuidance) => {
            return prevGuidance.filter(
                (guide) => guide.guidance_id !== guidanceId
            );
        });
    };

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
                {!adminMode && (
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
                )}
                {adminMode && !confirmDelete && (
                    <EditGuidanceForm
                        closeModal={closeModal}
                        currentGuidance={currentGuidanceRef}
                        handleEditGuidance={handleEditGuidance}
                    />
                )}

                {confirmDelete && (
                    <DeleteForm
                        closeModal={closeModal}
                        guidanceIdRef={guidanceIdRef}
                        deleteGuidance={deleteGuidance}
                    />
                )}
            </Modal>
            <h2 className="feedback__title">{_.capitalize(title)}</h2>
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
                        <li>{element.guidance}</li>

                        {!adminMode && (
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
                        )}
                        {adminMode && (
                            <div className="flex gap-3">
                                <Button
                                    className="bg-green-600 hover:bg-green-700 text-xs text-white font-bold py-1 px-2 rounded max-h-6"
                                    label="edit"
                                    handleClick={() => {
                                        currentGuidanceRef.current = {
                                            guidance: element.guidance,
                                            id: element.guidance_id,
                                        };
                                        openModal();
                                    }}
                                />
                                <Button
                                    className="bg-red-600 hover:bg-red-700 text-xs text-white font-bold py-1 px-2 rounded max-h-6"
                                    label="del"
                                    handleClick={() => {
                                        openModal();
                                        setConfirmDelete(true);
                                        guidanceIdRef.current =
                                            element.guidance_id;
                                    }}
                                />
                            </div>
                        )}
                    </CheckBoxWrapper>
                );
            })}
            {adminMode && (
                <GuidanceAdder
                    guidanceType={title}
                    handleNewGuidance={handleNewGuidance}
                />
            )}
        </section>
    ) : (
        <section>
            <h2 className="feedback__title">{title}</h2>
            <p>No {title} criteria for this ticket</p>
            {adminMode && (
                <GuidanceAdder
                    guidanceType={title}
                    handleNewGuidance={handleNewGuidance}
                />
            )}
        </section>
    );
}
