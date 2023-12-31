import { TRPCError } from "@trpc/server";
import { appRouter } from "../../../server/routers/_app";
import seed from "../../../db/seeds/seed";
import * as data from "../../../db/data/test-data/index";

import client from "../../../db/connection";
import getTableIds from "../../../db/utils/getTableIds";

beforeEach(() => seed(data));

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
    test("should return error for non-existing block", async () => {
        const caller = appRouter.createCaller({});

        await expect(
            caller.block.getBlockById("non_existing_block_id")
        ).rejects.toBeInstanceOf(TRPCError);

        await expect(
            caller.block.getBlockById("non_existing_block_id")
        ).rejects.toMatchObject({ code: "NOT_FOUND" });
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
            expect(feTicketOne.guidance).toBeTruthy();
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
        test("should return error when passed ticket id not in db", async () => {
            const caller = appRouter.createCaller({});

            await expect(
                caller.ticket.getTicketById({
                    id: "not_a_ticket",
                    email: "test@gmail.com",
                })
            ).rejects.toBeInstanceOf(TRPCError);
        });
        test("should return ticket with associated feedback from email", async () => {
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
        test("should handle ticket with no feedback", async () => {
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
        test("should handle ticket with partial feedback for guidance criteria", async () => {
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
                ticket_id: expect.any(String),
                block_name: "be",
                ticket_number: 5,
                description: "Im a new ticket",
            });
        });
        test.todo("post ticket to block name not found");
    });
    describe("editTicket", () => {
        test("should edit ticket by ticket_id", async () => {
            const ticketId = "FE1";
            const ticketNumber = 12;
            const description = "Im new";

            const caller = appRouter.createCaller({});
            const editedTicket = await caller.ticket.patchTicket({
                ticketId,
                ticketNumber,
                description,
            });
            expect(editedTicket).toMatchObject({
                ticket_id: ticketId,
                ticket_number: ticketNumber,
                description,
                block_name: "fe",
            });
        });
        test("should throw error when editing not found ticket id", async () => {
            const ticketId = "FE99999999999";
            const ticketNumber = 12;
            const description = "Im new";

            const caller = appRouter.createCaller({});
            await expect(
                caller.ticket.patchTicket({
                    ticketId,
                    ticketNumber,
                    description,
                })
            ).rejects.toBeInstanceOf(TRPCError);
            await expect(
                caller.ticket.patchTicket({
                    ticketId,
                    ticketNumber,
                    description,
                })
            ).rejects.toMatchObject({
                code: "NOT_FOUND",
                message: "ticket not found",
            });
        });
    });
    describe("deleteTicket", () => {
        test("should delete ticket by ticket id", async () => {
            const ticketId = "FE1";
            const caller = appRouter.createCaller({});
            const isDeleted = await caller.ticket.deleteTicket(ticketId);
            expect(isDeleted).toBe(true);
        });
        test("should throw error when trying to delete id not found", async () => {
            const ticketId = "FE999999999";
            const caller = appRouter.createCaller({});

            await expect(
                caller.ticket.deleteTicket(ticketId)
            ).rejects.toBeInstanceOf(TRPCError);
            await expect(
                caller.ticket.deleteTicket(ticketId)
            ).rejects.toMatchObject({
                code: "NOT_FOUND",
                message: "ticket not found",
            });
        });
    });
});

describe("guidance", () => {
    describe("insertGuidance", () => {
        test("should insert new guidance by ticket id", async () => {
            const newGuidance: { type: "could"; guidance: string } = {
                type: "could",
                guidance: "Im new guidance",
            };

            const caller = appRouter.createCaller({});
            const postedGuidance = await caller.guidance.postGuidance({
                ticketId: "FE1",
                guidanceData: newGuidance,
            });

            expect(postedGuidance).toMatchObject({
                guidance_id: expect.any(String),
                ticket_id: "FE1",
                type: "could",
                guidance: "Im new guidance",
            });
        });
        test("should throw error for ticket id not in db", async () => {
            const newGuidance: { type: "could"; guidance: string } = {
                type: "could",
                guidance: "Im new guidance",
            };

            const caller = appRouter.createCaller({});

            await expect(
                caller.guidance.postGuidance({
                    ticketId: "FE999999",
                    guidanceData: newGuidance,
                })
            ).rejects.toBeInstanceOf(TRPCError);

            await expect(
                caller.guidance.postGuidance({
                    ticketId: "FE999999",
                    guidanceData: newGuidance,
                })
            ).rejects.toMatchObject({
                code: "NOT_FOUND",
            });
        });
    });
    describe("updateGuidance", () => {
        test("should update guidance by id", async () => {
            const guidanceId = "1";
            const update = { guidance: "Im an update" };

            const caller = appRouter.createCaller({});
            const updatedGuidance = await caller.guidance.patchGuidance({
                guidanceId: guidanceId,
                guidanceData: update,
            });

            expect(updatedGuidance).toMatchObject({
                guidance_id: guidanceId,
                guidance: update.guidance,
                ticket_id: "FE1",
                type: "must",
            });
        });
        test("should handle guidance id not in db", async () => {
            const guidanceId = "99999";
            const update = { guidance: "Im an update" };

            const caller = appRouter.createCaller({});

            await expect(
                caller.guidance.patchGuidance({
                    guidanceId: guidanceId,
                    guidanceData: update,
                })
            ).rejects.toBeInstanceOf(TRPCError);
        });
    });
    describe("deleteGuidance", () => {
        test("should delete guidance by guidance id", async () => {
            const guidanceId = "1";

            const caller = appRouter.createCaller({});
            await caller.guidance.deleteGuidance(guidanceId);

            const response = await client.feedback.findMany({
                where: {
                    guidance_id: guidanceId,
                },
            });
            expect(response).toHaveLength(0);
        });
        test("should handle deletion of of guidance id not in db", async () => {
            const notId = "99999";

            const caller = appRouter.createCaller({});

            await expect(
                caller.guidance.deleteGuidance(notId)
            ).rejects.toBeInstanceOf(TRPCError);
        });
    });
});

describe("feedback", () => {
    describe("postFeedback", () => {
        test("should add new feedback with user id and guidance id", async () => {
            const email = "test3@gmail.com";
            const guidanceId = "12";
            const feedback = { www: "This is good", ebi: "This is bad" };

            const caller = appRouter.createCaller({});
            const newFeedback = await caller.feedback.postFeedback({
                email: email,
                feedback: feedback,
                guidanceId: guidanceId,
            });

            expect(newFeedback).toMatchObject({
                guidance_id: "12",
                user_email: "test3@gmail.com",
                www: "This is good",
                ebi: "This is bad",
            });
        });
        test("should throw error for not found userEmail", async () => {
            const email = "notEmail@gmail.com";
            const guidanceId = "12";
            const feedback = { www: "This is good", ebi: "This is bad" };

            const caller = appRouter.createCaller({});
            await expect(
                caller.feedback.postFeedback({
                    email: email,
                    feedback: feedback,
                    guidanceId: guidanceId,
                })
            ).rejects.toBeInstanceOf(TRPCError);
        });
        test("should throw error for guidanceId not in the db", async () => {
            const email = "test3@gmail.com";
            const guidanceId = "0000000000";
            const feedback = { www: "This is good", ebi: "This is bad" };

            const caller = appRouter.createCaller({});

            await expect(
                caller.feedback.postFeedback({
                    email: email,
                    feedback: feedback,
                    guidanceId: guidanceId,
                })
            ).rejects.toBeInstanceOf(TRPCError);
        });
        test("should reject when missing keys from post object", async () => {
            const email = "test3@gmail.com";
            const guidanceId = "12";
            const feedback = { www: "This is good" } as {
                www: string;
                ebi: string;
            };

            const caller = appRouter.createCaller({});

            await expect(
                caller.feedback.postFeedback({
                    email: email,
                    feedback: feedback,
                    guidanceId: guidanceId,
                })
            ).rejects.toBeInstanceOf(TRPCError);
        });
    });
    describe("patchFeedback", () => {
        test("should add feedback to given guidance", async () => {
            const patch = { www: "im a new www", ebi: "im a new ebi" };
            const feedbackIds = await getTableIds("Feedback", "feedback_id");
            const currentId = feedbackIds[0];

            const caller = appRouter.createCaller({});
            const updatedFeedback = await caller.feedback.patchFeedback({
                id: +currentId,
                update: patch,
            });

            expect(updatedFeedback).toMatchObject({ ...patch });
        });
        test("should reject when missing keys", async () => {
            const patch = { www: "im a new www" } as {
                www: string;
                ebi: string;
            };
            const feedbackIds = await getTableIds("Feedback", "feedback_id");
            const currentId = feedbackIds[0];

            const caller = appRouter.createCaller({});

            await expect(
                caller.feedback.patchFeedback({
                    id: +currentId,
                    update: patch,
                })
            ).rejects.toBeInstanceOf(TRPCError);
        });
        test("should return throw error for id not in db", async () => {
            const patch = { www: "im a new www", ebi: "im a new ebi" };
            const notCurrentId = "0";

            const caller = appRouter.createCaller({});

            await expect(
                caller.feedback.patchFeedback({
                    id: +notCurrentId,
                    update: patch,
                })
            ).rejects.toBeInstanceOf(TRPCError);
        });
    });
});
