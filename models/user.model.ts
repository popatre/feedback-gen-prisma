import { User } from "@prisma/client";
import prisma from "../db/connection";

export const postUser = async (email: string): Promise<User> => {
    const user = await prisma.user.create({
        data: {
            email: email,
        },
    });
    return user;
};
