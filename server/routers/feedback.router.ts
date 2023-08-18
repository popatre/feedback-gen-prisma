import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import {
    createFeedback,
    updateFeedbackByFeedbackId,
} from "../../models/feedback.model";
import { handleFeedback } from "../../db/utils/handleFeedback";

type FeedbackUpdate = { www: string; ebi: string };

export const feedbackRouter = router({
    patchFeedback: publicProcedure
        .input(
            z.object({
                id: z.number(),
                update: z.object({ www: z.string(), ebi: z.string() }),
            })
        )
        .mutation(({ input }) =>
            updateFeedbackByFeedbackId(input.id, input.update)
        ),
    postFeedback: publicProcedure
        .input(
            z.object({
                email: z.string(),
                feedback: z.object({ www: z.string(), ebi: z.string() }),
                guidanceId: z.string(),
            })
        )
        .mutation(({ input }) =>
            createFeedback(input.feedback, input.guidanceId, input.email)
        ),
    processFeedback: publicProcedure
        .input(
            z.object({
                email: z.string(),
                feedback: z.object({ www: z.string(), ebi: z.string() }),
                guidanceId: z.string(),
                feedbackId: z.number().nullable().optional(),
            })
        )
        .mutation(({ input }) =>
            handleFeedback(
                input.feedback,
                input.guidanceId,
                input.email,
                input.feedbackId
            )
        ),
});

export type FeedbackRouter = typeof feedbackRouter;
