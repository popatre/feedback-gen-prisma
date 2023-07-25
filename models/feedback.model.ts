import prisma from "../db/connection";

type Feedback = { www: string; ebi: string };

export const updateFeedbackByFeedbackId = async (
    feedbackId: number,
    update: Feedback
) => {
    try {
        const updatedFeedback = await prisma.feedback.update({
            where: {
                feedback_id: feedbackId,
            },
            data: {
                ...update,
            },
        });
        return updatedFeedback;
    } catch (error) {
        return null;
    }
};

export const createFeedback = async (
    feedback: Feedback,
    guidanceId: string,
    email: string
) => {
    try {
        const newFeedback = await prisma.feedback.create({
            data: {
                user_email: email,
                www: feedback.www,
                ebi: feedback.ebi,
                guidance_id: guidanceId,
            },
        });
        return newFeedback;
    } catch (error) {
        console.log("in here");
        return null;
    }
};

export const isExistingFeedback = async (email: string, guidanceId: string) => {
    const isExisting = await prisma.feedback.findFirst({
        where: {
            guidance_id: guidanceId,
            user_email: email,
        },
    });

    return isExisting !== null;
};
