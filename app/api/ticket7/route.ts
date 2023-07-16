import { NextResponse } from "next/server";

export async function GET() {
    const feedback = {
        ticketDescription: "Ticket 7 - Vote on article",
        mustData: [
            {
                guidance:
                    "UI is updated with vote++ clearly to show the user has voted.",
                www: "Good clear feedback that the vote count has changed",
                ebi: "We need some feedback that the votes from increased/decreased for a better user experience",
            },
            {
                guidance:
                    "Total number of votes is incremented when vote submitted",
                www: "",
                ebi: "",
            },
            {
                guidance: "Votes must be persistent between refreshes",
                www: "Good to see the db being updated with the vote increment",
                ebi: "We need to make sure we're updating the database. At the moment, the votes aren't persistent between refreshes",
            },
            {
                guidance: "User is notified if patch request fails",
                www: "Excellent UX getting some feedback when the vote patch fails",
                ebi: "We need some feedback when the vote patch fails for a better UX. At the moment, it looks like the db has been updated successfully when i try to patch with the network disconnected",
            },
        ],
        shouldData: [
            {
                guidance:
                    "Changes to the number of displayed votes should be handled optimistically",
                www: "Excellent job handling the votes optimistically - creates a better and quicker UX/UI",
                ebi: "Ideally we need to handle the votes optimistically to create a better and quicker user experience/interface. At the moment, we're waiting for the server before it updates which can be sluggish on a slow server/Internet connection",
            },
            {
                guidance:
                    "The number of votes should not be re-fetched from the api to handle multiple users",
                www: "Excellent handling of the votes",
                ebi: "We need to not re-fetch the votes from the api. If multiple people are clicking this button, it could lead to some confusing feedback when it upvotes/downvotes the wrong number of times",
            },
            {
                guidance:
                    "Requests to api should be handled separately in a utils file using axios i.e. getArticles",
                www: "Good to see the axios requests extracted into their own folder - nice and reusable",
                ebi: "Would be good to see the axios requests extracted into their own folder - make them more reusable/maintainable",
            },
            {
                guidance: "Considerations for responsive design should be made",
                www: "Some nice responsiveness in your designs - keep it up! 👍",
                ebi: "Would be good for this to be a little more responsive - will make it easier further down the line if you start thinking about it now",
            },
            {
                guidance: "Basic layout design implemented",
                www: "Nice layout to far.",
                ebi: "I'd make sure this matches your designs/layout",
            },
        ],
        couldData: [
            {
                guidance: "Users can down vote as well as up vote",
                www: "Nice to be able to down vote as well as up",
                ebi: "Optional: Might be nice to be able to down vote as well as up",
            },
            {
                guidance:
                    "Users should only be able to vote once in either direction (does not have to persist between refreshes)",
                www: "Excellent work on getting the vote button to only vote once in either direction",
                ebi: "Optional: Could make it so that they can only vote once in either direction i.e. only down or upvote once",
            },
            {
                guidance:
                    "Components are fully styled with considerations for accessibility",
                www: "Nicely design components and even thoughts for accessibility as well! Excellent! 👏",
                ebi: "Optional: Could think about accessibility in your components",
            },
            {
                guidance: "UI responds to API timeout errors - advanced!",
                www: "Excellent thinking about API timeout errors!",
                ebi: "Optional: For an extra challenge, could think about handling API timeout errors",
            },
        ],
    };

    return NextResponse.json({ feedback });
}
