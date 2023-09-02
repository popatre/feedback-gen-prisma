import { inferRouterOutputs } from "@trpc/server";
import { blockRouter } from "../block.router";

export type BlockRouter = typeof blockRouter;

export type BlockRouterOuput = inferRouterOutputs<BlockRouter>;

export type BlocksType = BlockRouterOuput["getAllBlocks"];

export type SingleBlockType = BlockRouterOuput["getBlockById"];
export type BlockTicketsType = BlockRouterOuput["getBlockById"]["tickets"];
export type BlockSingleTicketType =
    BlockRouterOuput["getBlockById"]["tickets"][0];
