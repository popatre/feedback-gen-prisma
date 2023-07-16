import { NextResponse } from "next/server";

export async function GET() {
    const feedback = {
        ticketDescription: "Ticket 11 - Delete Comment",
        mustData: [
            {
                guidance:
                    "The current logged in user can delete their own comments (logged in user can be hardcoded)",
                www: "Great work making it so that only a logged in user can delete comments",
                ebi: "Please make it so that someone needs to be logged in before they can delete comments - just means someone can go crazy and delete all the comments on the site",
            },
            {
                guidance:
                    "UI should be updated accordingly once a comment is deleted",
                www: "Nice feedback/updating of the UI when a comment gets deleted. ",
                ebi: "We need some feedback/UI updating when a comment gets deleted",
            },
            {
                guidance:
                    " Comments should not be re-fetched from the api to account for other users",
                www: "Good work not refetching the comments after deleting - could lead to confusing behaviour if multiple people are adding/deleting comments at the same time 👍",
                ebi: "Please change it so that the comments aren't fetched again from the api after deleting. This could lead to confusing behaviour if multiple people are adding/deleting comments at the same time",
            },
            {
                guidance:
                    "if comment is optimistically deleted, appropriate error handling and UI updates are shown for success and failure states",
                www: "Good optimistic deleting! Nicely handled of the error state when it doesnt successfully delete in the api",
                ebi: "We need to handle the error state when it doesnt successfully delete in the api - at the moment, it looks like I can successfully delete comments even when theres no Internet connection",
            },
            {
                guidance:
                    "if comment is removed on successful DELETE, UI updates to show isDeleting state with clear updates on success and failure states",
                www: "Good user feedback on the success/failure of the deleting",
                ebi: "We need to handle the error state when it doesn't successfully delete in the api - the user needs to know something has gone wrong/it hasn't successfully deleted. ",
            },
            {
                guidance:
                    "User must not be able to delete other users comments",
                www: "Nice handling of the user being able to only delete their own comments",
                ebi: "Please could you refactor so that the logged in user should only be able to delete their own comments, instead of everyone's",
            },
        ],
        shouldData: [
            {
                guidance:
                    "Delete button should not be rendered for users who aren't logged in",
                www: "Excellent not even having the option/button to delete if not logged in",
                ebi: "You could prevent someone not logged in from deleting the comments by not even showing the delete button for non-logged in users of the app",
            },

            {
                guidance:
                    "User should not be able to click the delete button more than once per comment",
                www: "Good one preventing a user from clicking the delete button multiple times for a single comments",
                ebi: "Would be good if you disabled the delete button after clicking so they can't click it multiple times to delete the same comment",
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
