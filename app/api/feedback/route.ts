import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const ticketNum = searchParams.get("ticket");
    const block = searchParams.get("block");

    if (!ticketNum || !block) {
        return NextResponse.error();
    }

    const modulePath = path.join(
        process.cwd(),
        "data",
        block,
        `ticket${ticketNum}.json`
    );
    const feedback = await fs.readFile(modulePath, "utf8");

    return NextResponse.json({ feedback: JSON.parse(feedback) });
}
