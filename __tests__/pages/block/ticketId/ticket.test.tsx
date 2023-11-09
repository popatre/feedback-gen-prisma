import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as useUserContext from "../../../../hooks/useUserContext";
import * as useGetTicketById from "../../../../hooks/useGetTicketById";
import TicketPage from "../../../../app/[block]/[ticket_id]/page";
import { createTicketGuidanceAndFeedback } from "@/db/data/utils/createTicketData";

jest.mock(`../../../../hooks/useUserContext`, () => {
    const originalModule = jest.requireActual(
        `../../../../hooks/useUserContext`
    );
    return {
        ...originalModule,
        __esModule: true,
    };
});

export const useUserContextSpy = jest.spyOn(useUserContext, "default");

jest.mock(`../../../../hooks/useGetTicketById`, () => {
    const originalModule = jest.requireActual(
        `../../../../hooks/useGetTicketById`
    );
    return {
        ...originalModule,
        __esModule: true,
    };
});

export const useGetTicketByIdSpy = jest.spyOn(useGetTicketById, "default");

beforeEach(() => {
    jest.resetAllMocks();
});

test("should render ticket page with expected content", async () => {
    useUserContextSpy.mockReturnValue({
        adminMode: false,
        email: "hi@northcoders.com",
        displayName: "JB",
        setAdminMode: () => {},
    });

    const testTicketData = createTicketGuidanceAndFeedback();

    useGetTicketByIdSpy.mockReturnValue({
        ticket: testTicketData,
        isLoading: false,
    });

    const ticket = { ticket_id: "1" };
    render(<TicketPage params={ticket} />);

    screen.getByRole("heading", {
        name: "1. Im front end ticket 1",
    });

    const mustLabel = screen.getByRole("heading", {
        name: /must/i,
    });
    const shouldLabel = screen.getByRole("heading", {
        name: /should/i,
    });
    const couldLabel = screen.getByRole("heading", {
        name: /could/i,
    });
    const mustGuidanceForSection = mustLabel.closest("section") as HTMLElement;
    const mustGuidance = within(mustGuidanceForSection).getAllByRole(
        "listitem"
    );
    expect(mustGuidance).toHaveLength(2);
    within(mustGuidanceForSection).getByText(
        testTicketData.guidance[0].guidance
    );
    within(mustGuidanceForSection).getByText(
        testTicketData.guidance[1].guidance
    );

    const shouldGuidanceForSection = shouldLabel.closest(
        "section"
    ) as HTMLElement;
    const shouldGuidance = within(shouldGuidanceForSection).getAllByRole(
        "listitem"
    );
    expect(shouldGuidance).toHaveLength(1);
    within(shouldGuidanceForSection).getByText(
        testTicketData.guidance[2].guidance
    );
    const couldGuidanceForSection = couldLabel.closest(
        "section"
    ) as HTMLElement;
    const couldGuidance = within(couldGuidanceForSection).getAllByRole(
        "listitem"
    );
    expect(couldGuidance).toHaveLength(1);
    within(couldGuidanceForSection).getByText(
        testTicketData.guidance[3].guidance
    );
});
test("should render WWW and EBI feedback after box selection", async () => {
    useUserContextSpy.mockReturnValue({
        adminMode: false,
        email: "hi@northcoders.com",
        displayName: "JB",
        setAdminMode: () => {},
    });

    const testTicketData = createTicketGuidanceAndFeedback();

    useGetTicketByIdSpy.mockReturnValue({
        ticket: testTicketData,
        isLoading: false,
    });

    const ticket = { ticket_id: "1" };
    render(<TicketPage params={ticket} />);

    const mustLabel = screen.getByRole("heading", {
        name: /must/i,
    });

    const user = userEvent.setup();

    const mustGuidanceForSection = mustLabel.closest("section") as HTMLElement;
    const [completeBox, wwwBox, ebiBox] = within(
        mustGuidanceForSection
    ).getAllByRole("checkbox");
    expect(wwwBox).toBeDisabled();
    expect(ebiBox).toBeEnabled();

    await user.click(completeBox);

    expect(ebiBox).toBeDisabled();

    await user.click(wwwBox);

    screen.getByText(`- ${testTicketData.guidance[0].feedback[0].www}`);

    await user.click(wwwBox);

    const wwwFeedback = screen.queryByText(
        `- ${testTicketData.guidance[0].feedback[0].www}`
    );
    expect(wwwFeedback).not.toBeInTheDocument();

    await user.click(completeBox);

    await user.click(ebiBox);

    screen.getByText(`- [ ] ${testTicketData.guidance[0].feedback[0].ebi}`);
});
test.todo("updating feedback through modal");
test.todo("adding guidance through admin mode");
test.todo("editing guidance through admin mode");
test.todo("deleting guidance through admin mode");
