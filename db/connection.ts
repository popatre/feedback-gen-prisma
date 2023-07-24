import { PrismaClient } from "@prisma/client";

let url = "";

if (process.env.NODE_ENV === "production") {
    url = process.env.DATABASE_URL || "";
} else {
    url = process.env.DATABASE_URL_DEV || "";
}
const buildClient = () => {
    const prisma = new PrismaClient({ datasources: { db: { url } } });
    return prisma;
};

const client = buildClient();

export default client;
