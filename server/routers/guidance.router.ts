import { insertGuidance } from "@/models/guidance.model";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const guidanceRouter = router({
    postGuidance: publicProcedure
        .input(
            z.object({
                ticketId: z.string(),
                guidanceData: z.object({
                    type: z.string(),
                    guidance: z.string(),
                }),
            })
        )
        .mutation(({ input }) =>
            insertGuidance(input.ticketId, input.guidanceData)
        ),
});

export type GuidanceRouter = typeof guidanceRouter;
