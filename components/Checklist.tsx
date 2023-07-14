type Feedback = { guidance: string; www: string; ebi: string };

type Props = {
    title: string;
    feedbackData: Feedback[];
    addPositiveFeedback: (feedback: string, event) => void;
    addEbiFeedback: (feedback: string, event) => void;
};

export default function Checklist({
    title,
    feedbackData,
    addPositiveFeedback,
    addEbiFeedback,
}: Props) {
    return (
        <section>
            <h2>{title}</h2>
            {feedbackData.map((element) => {
                return (
                    <div className="grid-container">
                        <input type="checkbox" name="done" />
                        <input
                            type="checkbox"
                            name="www"
                            onClick={(event) =>
                                addPositiveFeedback(element.www, event)
                            }
                        />
                        <input
                            type="checkbox"
                            name="ebi"
                            onClick={(event) =>
                                addEbiFeedback(element.ebi, event)
                            }
                        />
                        <p>{element.guidance}</p>
                    </div>
                );
            })}
        </section>
    );
}
