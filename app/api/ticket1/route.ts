import { NextResponse } from "next/server";

export async function GET() {
    const feedback = {
        ticketDescription: "Ticket 1 - Create React project and public repo",
        mustData: [
            {
                guidance:
                    "Make sure the React app is in the root of the repo and not in a nested folder made by Vite, if they've done this by accident they can just drag the app files out and delete the nested folder",
                www: "",
                ebi: "Your React app is in a nested folder. You can un-nested it by drag and dropping it. Ideally, you want the React folder in the root of the directory",
            },
        ],
        shouldData: [],
        couldData: [],
    };

    return NextResponse.json({ feedback });
}
