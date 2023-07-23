import client from "../connection";
import { Prisma } from "@prisma/client";
import { User, Block, Ticket, Guidance, Feedback } from "@prisma/client";

type OmitGuidanceId = Omit<Guidance, "guidance_id">;
type OmitFeedbackId = Omit<Feedback, "feedback_id">;

type GuidanceData = OmitGuidanceId;
type FeedbackData = OmitFeedbackId;

type SeedData = {
    usersData: User[];
    blockData: Block[];
    ticketData: Ticket[];
    guidanceData: GuidanceData[];
    feedbackData: FeedbackData[];
};

async function seed({
    usersData,
    blockData,
    ticketData,
    guidanceData,
    feedbackData,
}: SeedData) {
    await client.feedback.deleteMany();
    await client.guidance.deleteMany();
    await client.ticket.deleteMany();
    await client.block.deleteMany();
    await client.user.deleteMany();

    await client.user.createMany({
        data: usersData,
    });
    await client.block.createMany({
        data: blockData,
    });
    await client.ticket.createMany({
        data: ticketData,
    });
    await client.guidance.createMany({
        data: guidanceData as Prisma.Enumerable<Prisma.GuidanceCreateManyInput>,
    });
    await client.feedback.createMany({
        data: feedbackData as Prisma.Enumerable<Prisma.FeedbackCreateManyInput>,
    });

    // const result =
    //     await client.$queryRaw`ALTER SEQUENCE feedback_feedback_id_seq RESTART WITH 1;`;
}

export default seed;
