import handleUser from "../../db/utils/handleUser";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const userRouter = router({
    login: publicProcedure
        .input(z.string())
        .mutation(({ input }) => handleUser(input)),
});

export type UserRouter = typeof userRouter;
