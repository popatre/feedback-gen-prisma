import {
    deleteGuidance,
    insertGuidance,
    updateGuidance,
} from "../../models/guidance.model";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { TrpcErrorCodes } from "@/types/types";

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
    patchGuidance: publicProcedure
        .input(
            z.object({
                guidanceId: z.string(),
                guidanceData: z.object({
                    guidance: z.string(),
                }),
            })
        )
        .mutation(async ({ input }) => {
            try {
                const updatedGuidance = await updateGuidance(
                    input.guidanceId,
                    input.guidanceData
                );
                return updatedGuidance;
            } catch (error: any) {
                const trpcErrorCodes: { [key: number]: TrpcErrorCodes } = {
                    400: "BAD_REQUEST",
                    404: "NOT_FOUND",
                };
                if (error.msg && error.status) {
                    throw new TRPCError({
                        code: trpcErrorCodes[error.status],
                        message: error.msg,
                    });
                } else {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: "Bad request",
                    });
                }
            }
        }),
    deleteGuidance: publicProcedure
        .input(z.string())
        .mutation(async ({ input }) => {
            const isDeleted = await deleteGuidance(input);

            if (!isDeleted) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "guidance not found",
                });
            }
            return isDeleted;
        }),
});

export type GuidanceRouter = typeof guidanceRouter;
