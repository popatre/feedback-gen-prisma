import client from "../connection";
import { Prisma } from "@prisma/client";
import { Block, Ticket, Guidance } from "@prisma/client";

type OmitGuidanceId = Omit<Guidance, "guidance_id">;

type GuidanceData = OmitGuidanceId;

type SeedData = {
    blockData: Block[];
    ticketData: Ticket[];
    guidanceData: GuidanceData[];
};

async function seed({ blockData, ticketData, guidanceData }: SeedData) {
    await client.feedback.deleteMany();
    await client.guidance.deleteMany();
    await client.ticket.deleteMany();
    await client.block.deleteMany();
    await client.user.deleteMany();

    await client.block.createMany({
        data: blockData,
    });
    await client.ticket.createMany({
        data: ticketData,
    });
    await client.guidance.createMany({
        data: guidanceData as Prisma.Enumerable<Prisma.GuidanceCreateManyInput>,
    });
}

export default seed;
