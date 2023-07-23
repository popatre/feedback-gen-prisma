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

import CheckBoxWrapper from "@/wrappers/CheckBoxWrapper";

export default function Checklist({
    title,
    feedbackData,
    addPositiveFeedback,
    addEbiFeedback,
}: Props) {
    return feedbackData.length > 0 ? (
        <section>
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
