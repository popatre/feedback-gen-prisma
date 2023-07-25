import {
    createFeedback,
    isExistingFeedback,
    updateFeedbackByFeedbackId,
} from "../../models/feedback.model";

export const handleFeedback = async (
    feedback: { www: string; ebi: string },
    guidanceId: string,
    email: string,
    feedbackId?: number | null
) => {
    try {
        const isFeedback = await isExistingFeedback(email, guidanceId);

        if (!isFeedback) {
            const newPost = await createFeedback(feedback, guidanceId, email);
            return newPost;
        } else if (typeof feedbackId === "number") {
            const patchedFeedback = await updateFeedbackByFeedbackId(
                feedbackId,
                feedback
            );
            return patchedFeedback;
        }
    } catch (error) {
        return null;
    }
};
