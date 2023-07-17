import { NextResponse } from "next/server";

export async function GET() {
    const feedback = {
        ticketDescription: "Ticket 9 - View articles by topic",
        mustData: [
            {
                guidance:
                    "There are some UI elements to navigate to each topics page (links / dropdown etc.)",
                www: "Nice links to get to the different topics - good UI",
                ebi: "We need some links or a dropdown with links to view and navigate to the topics pages",
            },
            {
                guidance:
                    "Each topics pages updates the URL eg. /topics/football",
                www: "Topics links update the URL to an appropriate path 👍",
                ebi: "When a user clicks the different topics, it should update the url at the top - you can use this in your api query",
            },
            {
                guidance: "Only displays articles by the current topic",
                www: "Excellent work getting the correct articles for the selected topics",
                ebi: "Please make sure we get the correct articles for the selected topic",
            },
            {
                guidance:
                    "navigating to a page fetches the data afresh and not pass down a filter version of state",
                www: "Good fetching of the fresh data when the component/pages mounts 👍",
                ebi: "We need to do a fresh request for the api data for a certain topic, and not filter on the frontend and pass through state",
            },
            {
                guidance:
                    "useEffect dependencies must be correct and avoid infinite loops",
                www: "Nice useEffect with the correct dependencies ",
                ebi: "Please look at your useEffect dependencies to make sure if not an infinite loop/requests the data again when necessary",
            },
        ],
        shouldData: [
            {
                guidance:
                    "If the UI between all topics and articles by topic is consistent they should re-use the same component (optional as it might not be the case from their plan)",
                www: "Excellent work reusing the same component as all articles ⭐️",
                ebi: "As your interface for all articles is the same as the ones by a certain topic, ideally you'd DRY-up your code and re-use the ame component. The display is the same, the only difference will be the amount of articles it renders - so make sense to re-use it",
            },
            {
                guidance:
                    "Articles list component should be re-used - Same as above?",
                www: "Excellent work reusing the same component as all articles ⭐️",
                ebi: "As your interface for all articles is the same as the ones by a certain topic, ideally you'd DRY-up your code and re-use the ame component. The display is the same, the only difference will be the amount of articles it renders - so make sense to re-use it",
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