import * as data from "../../db/data/index";
import seed from "../../db/seeds/seed";
import client from "../../db/connection";
import { selectAllBlocks, selectSingleBlock } from "../../models/block.model";
import { selectTicketByIdWithEmail } from "../../models/ticket.model";
import { selectAllGuidance } from "../../models/guidance.model";

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
                    guidance_id: expect.any(Number),
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
                    guidance_id: expect.any(Number),
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
                        guidance_id: expect.any(Number),
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
                    guidance_id: expect.any(Number),
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
                    guidance_id: expect.any(Number),
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
                        guidance_id: expect.any(Number),
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
                guidance_id: expect.any(Number),
                ticket_id: expect.any(String),
                type: expect.any(String),
                guidance: expect.any(String),
            });
        });
    });
});

describe("patchFeedback", () => {});
