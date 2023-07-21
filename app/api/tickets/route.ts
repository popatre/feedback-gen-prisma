import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const block = searchParams.get("block");

    if (!block) {
        return NextResponse.json(
            {
                status: 404,
                statusText: "Block not Found",
            },
            { status: 404 }
        );
    }

    const modulePath = path.join(
        process.cwd(),
        "data",
        block,
        "ticketList.json"
    );
    try {
        const tickets = await fs.readFile(modulePath, "utf8");
        return NextResponse.json({ tickets: JSON.parse(tickets) });
    } catch (error) {
        return NextResponse.json(
            {
                status: 404,
                statusText: "Not Found",
            },
            { status: 404 }
        );
    }

    //return NextResponse.json({ feedback: JSON.parse(feedback) });
}
