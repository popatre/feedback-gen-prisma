import { Feedback } from "@prisma/client";
import prisma from "../db/connection";

type FeedbackUpdate = { www: string; ebi: string };

export const updateFeedbackByFeedbackId = async (
    feedbackId: number,
    update: FeedbackUpdate
) => {
    const updatedFeedback = await prisma.feedback.update({
        where: {
            feedback_id: feedbackId,
        },
        data: {
            ...update,
        },
    });
    return updatedFeedback;
};
