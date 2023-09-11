import { inferRouterOutputs } from "@trpc/server";
import { ticketRouter } from "../ticket.router";

export type TicketRouter = typeof ticketRouter;

export type TicketRouterOuput = inferRouterOutputs<TicketRouter>;

export type SingleTicketGuidanceType = TicketRouterOuput["getTicketById"];

export type SingleFeedbackType =
    TicketRouterOuput["getTicketById"]["guidance"][0]["feedback"];
