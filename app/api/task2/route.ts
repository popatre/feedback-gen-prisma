import { NextResponse } from "next/server";

export async function GET() {
    const feedback = {
        mustData: [
            {
                guidance: "Do they have this",
                www: "nice one",
                ebi: "rubbish stuff9999",
            },
        ],
        shouldData: [
            {
                guidance: "more should",
                www: "nice one",
                ebi: "rubbish stuff1234",
            },
        ],
        couldData: [
            {
                guidance: "more could",
                www: "nice one",
                ebi: "rubbish stuffffff",
            },
        ],
    };

    return NextResponse.json({ feedback });
}
