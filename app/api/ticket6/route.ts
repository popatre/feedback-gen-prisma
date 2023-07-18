import { NextResponse } from "next/server";

export async function GET() {
    const feedback = {
        ticketDescription:
            "Ticket 6 - View list of comments associated with an article",
        mustData: [
            {
                guidance:
                    "User must be able to view a list of comments for each article",
                www: "Excellent work displaying the comments",
                ebi: "We need to be able to see all the comments for the individual article",
            },
            {
                guidance: "Comments should be viewable for a given article",
                www: "Good that we've got the comments for the correct article showing 👍",
                ebi: "We need to be able to see all the comments for the individual article",
            },
            {
                guidance:
                    "Components should not be too large. Consider dedicated components for rendering comments to avoid a Single Article component becoming bloated",
                www: "Lovely stuff creating a separate component for the comments; stops the components getting too big and bloated",
                ebi: "The article component is getting a bit big. Consider dedicated components for rendering comments to avoid a Single Article component becoming bloated",
            },

            {
                guidance:
                    "isLoading pattern is followed with visual feedback to inform user",
                www: "Excellent see some loading feedback to let us know something is happening",
                ebi: "We need some loading feedback for a better UX - let the user know that something is happening/comments are being requested",
            },
        ],
        shouldData: [
            {
                guidance: "UI consideration for articles with no comments.",
                www: "Nice work on handling the articles that have no comments",
                ebi: "Would be good for the articles which have no comments to get a little messages saying so e.g. 'No comments to show - why not be the first to add one?'",
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
                www: "Nice layout so far.",
                ebi: "I'd make sure this matches your designs/layout",
            },

            {
                guidance: "timestamp is formatted to human readable format",
                www: "Timestamp is readable",
                ebi: "Would be better to have the timestamp formatted in a bit more of a human readable way, than the default",
            },
            {
                guidance: "loading component extracted for reusability",
                www: "Excellent work extracting the loading into its own component - make its nice and re-useable",
                ebi: "Might be nice to have the loading component extracted into its own component that you can then just reuse when you need a loading component",
            },
        ],
        couldData: [
            {
                guidance:
                    "Components are fully styled with considerations for accessibility",
                www: "Nicely design components and even thoughts for accessibility as well! Excellent! 👏",
                ebi: "Optional: Could think about accessibility in your components",
            },
            {
                guidance:
                    "Make sure the data is presented in an interesting way",
                www: "Nice presentation of the data in a more interesting way",
                ebi: "Optional: Would be good for this data to be presented in a bit more of an exciting way. Can look at this website for ideas: https://www.refactoringui.com/previews/labels-are-a-last-resort",
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
