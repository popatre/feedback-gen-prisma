import { TRPCError } from "@trpc/server";
import { appRouter } from "../../server/routers/_app";

describe("blocks", () => {
    test("should get all blocks", async () => {
        const caller = appRouter.createCaller({});
        const blocks = await caller.block.getAllBlocks();
        expect(blocks).toBeInstanceOf(Array);
        expect(blocks).toHaveLength(2);
        blocks.forEach((block) => {
            expect(block).toMatchObject({
                block_name: expect.any(String),
            });
        });
    });
    test("should fetch single block data", async () => {
        const caller = appRouter.createCaller({});
        const block = await caller.block.getBlockById("fe");
        expect(block).toBeInstanceOf(Object);
        expect(block).toMatchObject({
            block_name: expect.any(String),
            tickets: expect.any(Array),
        });
        if (block) {
            expect(block.tickets).toHaveLength(3);
            block.tickets.forEach((ticket) => {
                expect(ticket).toMatchObject({
                    ticket_id: expect.any(String),
                    ticket_number: expect.any(Number),
                    block_name: "fe",
                    description: expect.any(String),
                });
            });
        }
    });
    test("should return null for non-existing block", async () => {
        const caller = appRouter.createCaller({});

        await caller.block
            .getBlockById("non_existing_block_id")
            .catch((error) => {
                expect(error).toBeInstanceOf(TRPCError);
                expect(error.code).toBe("NOT_FOUND");
            });
    });
});

describe("users", () => {
    test("should add user", async () => {
        const caller = appRouter.createCaller({});
        const newEmail = "test999@gmail.com";
        const newUser = await caller.user.login(newEmail);
        expect(newUser).toEqual({ email: newEmail });
    });
});

describe("tickets", () => {
    describe("getTicket", () => {
        test("should return ticket data for id given", async () => {
            const caller = appRouter.createCaller({});
            const feTicketOne = await caller.ticket.getTicketById({
                id: "BE1",
                email: "test@gmail.com",
            });

            expect(feTicketOne).toBeInstanceOf(Object);
            expect(feTicketOne).toMatchObject({
                ticket_id: "BE1",
                ticket_number: expect.any(Number),
                block_name: "be",
                description: expect.any(String),
                guidance: expect.any(Array),
            });
        });
        test("should return ticket guidance for requested ticket", async () => {
            const caller = appRouter.createCaller({});
            const feTicketOne = await caller.ticket.getTicketById({
                id: "BE1",
                email: "test@gmail.com",
            });

            expect(feTicketOne).toBeInstanceOf(Object);
            expect(feTicketOne).toMatchObject({
                ticket_id: "BE1",
                ticket_number: expect.any(Number),
                block_name: "be",
                description: expect.any(String),
                guidance: expect.any(Array),
            });
            if (feTicketOne) {
                expect(feTicketOne.guidance).toHaveLength(6);
                feTicketOne.guidance.forEach((criterion) => {
                    expect(criterion).toMatchObject({
                        guidance_id: expect.any(String),
                        ticket_id: "BE1",
                        type: expect.any(String),
                        guidance: expect.any(String),
                    });
                });
            }
        });
        test("should return null when passed ticket id not in db", async () => {
            const caller = appRouter.createCaller({});
            const nonTicket = await caller.ticket.getTicketById({
                id: "not_a_ticket",
                email: "test@gmail.com",
            });

            expect(nonTicket).toBeNull();
        });
        test("should return ticket with feedback from email", async () => {
            const caller = appRouter.createCaller({});
            const feTicketOne = await caller.ticket.getTicketById({
                id: "BE1",
                email: "test@gmail.com",
            });

            expect(feTicketOne).toBeInstanceOf(Object);
            if (feTicketOne) {
                expect(feTicketOne.guidance).toHaveLength(6);
                feTicketOne.guidance.forEach((criterion) => {
                    expect(criterion).toMatchObject({
                        guidance_id: expect.any(String),
                        ticket_id: "BE1",
                        type: expect.any(String),
                        guidance: expect.any(String),
                        feedback: expect.any(Array),
                    });
                    criterion.feedback.forEach((feedback) => {
                        expect(feedback).toMatchObject({
                            feedback_id: expect.any(Number),
                            www: expect.any(String),
                            ebi: expect.any(String),
                            user_email: "test@gmail.com",
                            guidance_id: expect.any(String),
                        });
                    });
                    expect(criterion.feedback).toHaveLength(1);
                });
            }
        });
        test("should handle ticket with not feedback", async () => {
            const caller = appRouter.createCaller({});
            const feTicketOne = await caller.ticket.getTicketById({
                id: "BE1",
                email: "test2@gmail.com",
            });

            expect(feTicketOne).toBeInstanceOf(Object);
            if (feTicketOne) {
                expect(feTicketOne.guidance).toHaveLength(6);
                feTicketOne.guidance.forEach((criterion) => {
                    expect(criterion).toMatchObject({
                        guidance_id: expect.any(String),
                        ticket_id: "BE1",
                        type: expect.any(String),
                        guidance: expect.any(String),
                        feedback: expect.any(Array),
                    });
                    expect(criterion.feedback).toHaveLength(0);
                });
            }
        });
        test("should handle ticket with partial feedback for some guidance criteria", async () => {
            const caller = appRouter.createCaller({});
            const feTicketOne = await caller.ticket.getTicketById({
                id: "FE1",
                email: "test2@gmail.com",
            });

            expect(feTicketOne).toBeInstanceOf(Object);
            if (feTicketOne) {
                expect(feTicketOne.guidance).toHaveLength(6);
                feTicketOne.guidance.forEach((criterion) => {
                    expect(criterion).toMatchObject({
                        guidance_id: expect.any(String),
                        ticket_id: "FE1",
                        type: expect.any(String),
                        guidance: expect.any(String),
                        feedback: expect.any(Array),
                    });
                    if (criterion.feedback.length !== 0) {
                        expect(criterion.feedback).toHaveLength(1);
                    }
                    criterion.feedback.forEach((feedback) => {
                        expect(feedback).toMatchObject({
                            feedback_id: expect.any(Number),
                            www: expect.any(String),
                            ebi: expect.any(String),
                            user_email: "test2@gmail.com",
                            guidance_id: expect.any(String),
                        });
                    });
                });
            }
        });
    });

    describe("postTicket", () => {
        test("should add new ticket to relevant block", async () => {
            const caller = appRouter.createCaller({});
            const newTicket = await caller.ticket.postTicketByBlockName({
                blockName: "be",
                ticketNumber: 5,
                description: "Im a new ticket",
            });

            expect(newTicket).toMatchObject({
                block_name: "be",
                ticket_number: 5,
                description: "Im a new ticket",
            });
        });
    });
    describe("editTicket", () => {
        test("should edit ticket by ticket_id", () => {});
    });
});
