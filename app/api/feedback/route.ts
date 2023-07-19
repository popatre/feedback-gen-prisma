import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const ticketNum = searchParams.get("ticket");
    const block = searchParams.get("block");

    if (!ticketNum || !block) {
        return NextResponse.json(
            {
                status: 400,
                statusText: "Bad request - no block and/or ticket",
            },
            { status: 400 }
        );
    }

    const modulePath = path.join(
        process.cwd(),
        "data",
        block,
        `ticket${ticketNum}.json`
    );
    try {
        const feedback = await fs.readFile(modulePath, "utf8");
        return NextResponse.json({ feedback: JSON.parse(feedback) });
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
