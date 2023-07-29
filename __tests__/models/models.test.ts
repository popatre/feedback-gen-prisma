import * as data from "../../db/data/test-data/index";
import seed from "../../db/seeds/seed";
import client from "../../db/connection";
import { selectAllBlocks, selectSingleBlock } from "../../models/block.model";
import { selectTicketByIdWithEmail } from "../../models/ticket.model";
import { insertGuidance, selectAllGuidance } from "../../models/guidance.model";
import {
    createFeedback,
    isExistingFeedback,
    updateFeedbackByFeedbackId,
} from "../../models/feedback.model";
import getTableIds from "../../db/utils/getTableIds";
import { postUser } from "../../models/user.model";

beforeEach(() => seed(data));
afterAll(() => client.$disconnect());

describe("blocks", () => {
    test("should get all blocks", async () => {
        const blocks = await selectAllBlocks();
        expect(blocks).toBeInstanceOf(Array);
        expect(blocks).toHaveLength(2);
        blocks.forEach((block) => {
            expect(block).toMatchObject({
                block_name: expect.any(String),
            });
        });
    });
    test("should fetch single block data", async () => {
        const block = await selectSingleBlock("fe");
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
        const nonExistingBlock = await selectSingleBlock(
            "non_existing_block_id"
        );
        expect(nonExistingBlock).toBeNull();
    });
});

describe("tickets", () => {
    test("should return ticket data for id given", async () => {
        const feTicketOne = await selectTicketByIdWithEmail(
            "BE1",
            "test@gmail.com"
        );
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
        const feTicketOne = await selectTicketByIdWithEmail(
            "BE1",
            "test@gmail.com"
        );
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
        const nonTicket = await selectTicketByIdWithEmail(
            "not_a_ticket",
            "test@gmail.com"
        );
        expect(nonTicket).toBeNull();
    });
    test("should return ticket with feedback from email", async () => {
        const feTicketOne = await selectTicketByIdWithEmail(
            "BE1",
            "test@gmail.com"
        );
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
        const feTicketOne = await selectTicketByIdWithEmail(
            "BE1",
            "test2@gmail.com"
        );
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
        const feTicketOne = await selectTicketByIdWithEmail(
            "FE1",
            "test2@gmail.com"
        );
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

describe("guidance", () => {
    test("should return all guidance for all tickets", async () => {
        const guidance = await selectAllGuidance();
        expect(guidance).toBeInstanceOf(Array);
        expect(guidance).toHaveLength(30);
        guidance.forEach((criterion) => {
            expect(criterion).toMatchObject({
                guidance_id: expect.any(String),
                ticket_id: expect.any(String),
                type: expect.any(String),
                guidance: expect.any(String),
            });
        });
    });
    describe("insertGuidance", () => {
        test("should insert new guidance by ticket id", async () => {
            const newGuidance = { type: "could", guidance: "Im new guidance" };

            const postedGuidance = await insertGuidance("FE1", newGuidance);
            expect(postedGuidance).toMatchObject({
                guidance_id: expect.any(String),
                ticket_id: "FE1",
                type: "could",
                guidance: "Im new guidance",
            });
        });
        test("should handle ticket id not in db", async () => {
            const newGuidance = { type: "could", guidance: "Im new guidance" };

            const notTicketId = await insertGuidance("FE999999", newGuidance);
            expect(notTicketId).toBeNull();
        });
        test("should reject when missing keys on post object", async () => {
            const newGuidance = { type: "could" } as {
                type: string;
                guidance: string;
            };

            const notTicketId = await insertGuidance("FE1", newGuidance);
            expect(notTicketId).toBeNull();
        });
        test("should reject when invalid type given", async () => {
            const newGuidance = { type: "notAType", guidance: "new guidance" };

            const notTicketId = await insertGuidance("FE1", newGuidance);
            expect(notTicketId).toBeNull();
        });
    });
});

describe("users", () => {
    test("should add user", async () => {
        const newEmail = "test999@gmail.com";
        const newUser = await postUser(newEmail);
        expect(newUser).toEqual({ email: newEmail });
    });
});

describe("feedback", () => {
    describe("postFeedback", () => {
        test("should add new feedback with user id and guidance id", async () => {
            const email = "test3@gmail.com";
            const guidanceId = "12";
            const feedback = { www: "This is good", ebi: "This is bad" };
            const newFeedback = await createFeedback(
                feedback,
                guidanceId,
                email
            );
            expect(newFeedback).toMatchObject({
                guidance_id: "12",
                user_email: "test3@gmail.com",
                www: "This is good",
                ebi: "This is bad",
            });
        });
        test("should return null for not found userEmail", async () => {
            const email = "notEmail@gmail.com";
            const guidanceId = "12";
            const feedback = { www: "This is good", ebi: "This is bad" };
            const isNull = await createFeedback(feedback, guidanceId, email);
            expect(isNull).toBeNull();
        });
        test("should return null for guidanceId not in the db", async () => {
            const email = "test3@gmail.com";
            const guidanceId = "0000000000";
            const feedback = { www: "This is good", ebi: "This is bad" };
            const isNull = await createFeedback(feedback, guidanceId, email);
            expect(isNull).toBeNull();
        });
        test("should return null when missing keys from post object", async () => {
            const email = "test3@gmail.com";
            const guidanceId = "12";
            const feedback = { www: "This is good" } as {
                www: string;
                ebi: string;
            };
            const isNull = await createFeedback(feedback, guidanceId, email);
            expect(isNull).toBeNull();
        });
    });
    describe("patchFeedback", () => {
        test("should add feedback to given guidance", async () => {
            const patch = { www: "im a new www", ebi: "im a new ebi" };
            const feedbackIds = await getTableIds("Feedback", "feedback_id");
            const currentId = feedbackIds[0];
            const updatedFeedback = await updateFeedbackByFeedbackId(
                +currentId,
                patch
            );
            expect(updatedFeedback).toMatchObject({ ...patch });
        });
        test("should update when passed single key", async () => {
            const patch = { www: "im a new www" } as {
                www: string;
                ebi: string;
            };
            const feedbackIds = await getTableIds("Feedback", "feedback_id");
            const currentId = feedbackIds[0];
            const updatedFeedback = await updateFeedbackByFeedbackId(
                +currentId,
                patch
            );
            expect(updatedFeedback).toMatchObject({ ...patch });
        });
        test("should return null for id not in db", async () => {
            const patch = { www: "im a new www", ebi: "im a new ebi" };
            const notCurrentId = "0";
            const failedPatch = await updateFeedbackByFeedbackId(
                +notCurrentId,
                patch
            );
            expect(failedPatch).toBeNull();
        });
    });
    describe("checkIfFeedbackExists", () => {
        test("should check if feedback exists for user and guidanceId", async () => {
            const email = "test@gmail.com";
            const guidanceId = "1";
            const isFeedbackExisting = await isExistingFeedback(
                email,
                guidanceId
            );
            expect(isFeedbackExisting).toBe(true);
        });
        test("should confirm feedback does not already exist", async () => {
            const email = "test3@gmail.com";
            const guidanceId = "1";
            const isFeedbackExisting = await isExistingFeedback(
                email,
                guidanceId
            );
            expect(isFeedbackExisting).toBe(false);
        });
    });
});
