import type { AppRouter } from "../server/routers/_app";
import { createTRPCReact } from "@trpc/react-query";
import { createTRPCNext } from "@trpc/next";

export const trpc = createTRPCReact<AppRouter>();
