import { NextResponse } from "next/server";

export async function GET() {
    const feedback = {
        ticketDescription: "Ticket 12 - Error Handling",
        mustData: [
            {
                guidance: "Link to the deployed version of the app",
                www: "Has link to netlify deployed app ✅",
                ebi: "Please add a link to the deployed app",
            },
            {
                guidance: "Link to the back end repo",
                www: "Has link to backend repo ✅",
                ebi: "Please add a link to your backend repo",
            },
            {
                guidance: "Link to hosted api",
                www: "Has link to backend api ✅",
                ebi: "Please add a link to the api server you used for the data",
            },
            {
                guidance:
                    "Provides general info about the app and a description of what the project is",
                www: "Good overview on the app and project and what is does",
                ebi: "Please add a bit more info about the app and what the aim of the project was",
            },
            {
                guidance: "Should tell user how to navigate the app",
                www: "Good instructions on how to navigate the app",
                ebi: "Please add a little more info on how to navigate and use the app - e.g. logging in, posting etc",
            },
            {
                guidance: "Instructs user on how to run the project locally",
                www: "Good instructions on how to run the project locally",
                ebi: "Please add some instructions on how to clone and run the project locally",
            },
        ],
        shouldData: [
            {
                guidance:
                    "Should have some styling considerations, should be clear to read and have relevant headings",
                www: "Good markdown styling considerations - nice and easy to read",
                ebi: "Could benefit from some styling considerings/headings to make it a bit easier to read/professional looking",
            },
            {
                guidance:
                    "Specifies the minimum version of Node required to run the project locally",
                www: "Added minimum version of node required ✅",
                ebi: "Please add the minimum version of node required. You can just use the version you use, as you know the project runs on that version",
            },
        ],
        couldData: [],
    };

    return NextResponse.json({ feedback });
}
