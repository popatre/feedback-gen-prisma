import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import {
    createFeedback,
    updateFeedbackByFeedbackId,
} from "@/models/feedback.model";

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
});

export type FeedbackRouter = typeof feedbackRouter;
