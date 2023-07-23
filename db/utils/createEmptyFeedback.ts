//needed for when a user first signs up - popular db with empty feedback for them to patch to

import prisma from "../connection";
import getTableIds from "./getTableIds";

export default async function createEmptyFeedback(email: string) {
    const guidanceIds = await getTableIds("Guidance", "guidance_id");

    const feedbackPromises = guidanceIds.map((guidanceId) =>
        prisma.feedback.create({
            data: {
                www: "",
                ebi: "",
                user_email: email,
                guidance_id: +guidanceId,
            },
        })
    );

    await Promise.all(feedbackPromises);
}
