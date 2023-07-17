import { NextResponse } from "next/server";

export async function GET() {
    const feedback = {
        ticketDescription: "Ticket 10 - Sort articles",
        mustData: [
            {
                guidance: "Clear UI to enable user to sort article list",
                www: "Lovely UI to enable users to sort easily",
                ebi: "We need some UI to enable users to access the sort features",
            },
            {
                guidance:
                    "User is able to sort articles by date/votes/comment count and order by ascending/descending",
                www: "Good stuff including all the different sort options",
                ebi: "A user should be able to sort articles by date/votes/comment count and order by ascending/descending",
            },
            {
                guidance:
                    "Default sorting values are in place (to date descending unless otherwise specified in plan)",
                www: "Excellent having the default sorting values in place",
                ebi: "Please could you add the default sorting values in to let a user know how they are already sorted/ordered",
            },
            {
                guidance:
                    "Sorting works for both all articles and articles by topic",
                www: "Good sorting on both all articles and articles by a certain topic",
                ebi: "Please make sure we can sort on both all articles and articles by a certain topic",
            },
            {
                guidance: "Form inputs are controlled",
                www: "Nice controlled components on your form inputs/dropdown",
                ebi: "The form inputs/dropdowns need to be controlled so that React knows whats going on, on the page",
            },
        ],
        shouldData: [
            {
                guidance:
                    " should amend api request with updated queries (not do a .sort())",
                www: "Well done using your server api query to sort the data. You've done the hard work of sorting on the backend, so make sense to make use of it 👍",
                ebi: "Your server has sort queries available to sort the data for you. Try use them instead of a .sort on the frontend",
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
        ],
        couldData: [
            {
                guidance:
                    "useSearchParams to use queries rather than state to manage the sort options",
                www: "Well done getting useSearchParams to work! 👏",
                ebi: "Optional: Could have a look at useSearchParams to get the sorting to work via th url, instead of state",
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
