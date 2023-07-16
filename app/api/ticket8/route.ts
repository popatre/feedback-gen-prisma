import { NextResponse } from "next/server";

export async function GET() {
    const feedback = {
        ticketDescription: "Ticket 8 - Post article comment",
        mustData: [
            {
                guidance: "Posting functionality should work and be persistent",
                www: "Excellent job getting the posting to work and update the db",
                ebi: "We need the post to be persistent - at the moment, the comment disappears after i refresh the page",
            },
            {
                guidance:
                    "Forms must be controlled (both value and handleChange set for inputs)",
                www: "Excellent form as a controlled component! 👏",
                ebi: "Your form needs to be a controlled component. At the moment, the React is not in control of the value of the form",
            },
            {
                guidance:
                    "Basic validation must be included. e.g. blank comments cannot be posted",
                www: "Good work on validation for blank comments",
                ebi: "Please add some validation to stop someone posting a blank comment",
            },
            {
                guidance:
                    "Comments are posted as a hard coded user or - if implemented - the current logged in user",
                www: "Nicely done using the current user of the app",
                ebi: "Please could you post the comments as either a hardcoded user, or the user set in context",
            },
            {
                guidance:
                    "If comment post is done optimistically, appropriate error handling to remove comment and alert user if it fails",
                www: "Well done getting the comment to be posted optimistically - handling the errors as well when it doesnt post",
                ebi: "Nice that you've gone down the optimistic route for posting a comment. However, when the post fails, we need to make sure the page is updated to reflect this - at the moment, its looks like its been successful even when theres no internet connection",
            },
            {
                guidance:
                    "If comment is posted on successful POST to BE, isLoading pattern, form is disabled, user is alerted if it fails",
                www: "Good use of feedback to the user about the progress of the post i.e. success, loading, failed",
                ebi: "Please add some feedback about it being posted (loading), has been posted (some kind of success message or post being shown in the list), failed (some kind of error message). Ideally, the post button need to be disabled while its posting to avoid multiple posting of the same comment",
            },
            {
                guidance:
                    "on success, regardless of the rendering decision, comment should not be re-fetched from the api. Update state locally.",
                www: "Excellent updating of the comment state locally and not making a new request to the api",
                ebi: "You need to update the comments locally and not re-fetch this data. If someone else is using the app, could be confusing if they've also posted a comment and suddenly you've got multiple comments, after you've only posted one",
            },
        ],
        shouldData: [
            {
                guidance:
                    "Forms that stay on the page should be reset after posting",
                www: "Excellent having the form reset after posting so that we can easily post again - lovely UX ",
                ebi: "Your form should ideally reset after posting to avoid someone having to clear everything themselves if they want to post again",
            },
            {
                guidance:
                    "Text input for comment should be multi-line i.e. textarea over input",
                www: "Nice textarea for the comment so they can add multiple line comments",
                ebi: "Would be better to used a textarea for the comment so they can add multiple line comments - instead of input",
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
            {
                guidance: "loading component extracted for reusability",
                www: "Excellent work extracting the loading into its own component - make its nice and re-useable",
                ebi: "Might be nice to have the loading component extracted into its own component that you can then just reuse when you need a loading component",
            },
        ],
        couldData: [
            {
                guidance:
                    "if users can log out, users are not able to post a comment if not logged in",
                www: "Nice work disabling the forms so a user can't post if they're not logged in",
                ebi: "Optional: As you've got a logout button, would be good if they couldn't add a comment if not logged in",
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
