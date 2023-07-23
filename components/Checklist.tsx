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
import { useState } from "react";

export default function Checklist({
    title,
    feedbackData,
    addPositiveFeedback,
    addEbiFeedback,
}: Props) {
    const { modalIsOpen, openModal, closeModal, customStyles } = useModal();
    const [editTitle, setEditTitle] = useState("Default");
    const [feedbackInput, setFeedbackinput] = useState({ www: "", ebi: "" });

    const editFeedback = (guidance: string, www: string, ebi: string) => {
        setEditTitle(guidance);
        setFeedbackinput({ www, ebi });
        openModal();
    };

    return feedbackData.length > 0 ? (
        <section>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <FeedbackForm
                    editTitle={editTitle}
                    feedbackInput={feedbackInput}
                    setFeedbackinput={setFeedbackinput}
                    setEditTitle={setEditTitle}
                />
            </Modal>
            <h2 className="feedback__title">{title}</h2>
            <div className="box-labels">
                <p>✅</p>
                <p>👏</p>
                <p>⁉️</p>
            </div>
            {feedbackData.map((element, index) => {
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
                                    element.feedback[0].ebi
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
