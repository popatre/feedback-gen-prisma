import { insertGuidance } from "@/models/guidance.model";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

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
        .mutation(async ({ input }) => {
            try {
                const newGuidance = await insertGuidance(
                    input.ticketId,
                    input.guidanceData
                );
                return newGuidance;
            } catch (error: any) {
                if (error.msg) {
                    if (error.status === 400) {
                        throw new TRPCError({
                            code: "BAD_REQUEST",
                            message: error.msg,
                        });
                    }
                } else {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "Not found ",
                    });
                }
            }
        }),
});

export type GuidanceRouter = typeof guidanceRouter;
