import { selectAllBlocks, selectSingleBlock } from "@/models/block.model";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { updateFeedbackByFeedbackId } from "@/models/feedback.model";

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
});

export type FeedbackRouter = typeof feedbackRouter;
