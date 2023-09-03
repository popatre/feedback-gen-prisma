import {
    render,
    renderHook,
    screen,
    waitFor,
    within,
} from "@testing-library/react";
import BlockPage from "../../app/[block]/page";
import userEvent from "@testing-library/user-event";
import * as useSingleBlockQuery from "../../hooks/useSingleBlockQuery";
import {
    createBlockTicketsData,
    createTicketData,
} from "@/db/data/utils/createBlockData";
import * as useUserContext from "../../hooks/useUserContext";
import * as useUpdateTicket from "../../hooks/useUpdateTicket";
import * as useDeleteTicket from "../../hooks/useDeleteTicket";
import Modal from "react-modal";

jest.mock(`../../hooks/useSingleBlockQuery`, () => {
    const originalModule = jest.requireActual(
        `../../hooks/useSingleBlockQuery`
    );
    return {
        ...originalModule,
        __esModule: true,
    };
});

export const useSingleBlockQuerySpy = jest.spyOn(
    useSingleBlockQuery,
    "useSingleBlockQuery"
);

jest.mock(`../../hooks/useUserContext`, () => {
    const originalModule = jest.requireActual(`../../hooks/useUserContext`);
    return {
        ...originalModule,
        __esModule: true,
    };
});

export const useUserContextSpy = jest.spyOn(useUserContext, "default");

jest.mock(`../../hooks/useUpdateTicket`, () => {
    const originalModule = jest.requireActual(`../../hooks/useUpdateTicket`);
    return {
        ...originalModule,
        __esModule: true,
    };
});
export const useUpdateTicketSpy = jest.spyOn(useUpdateTicket, "default");

jest.mock(`../../hooks/useDeleteTicket`, () => {
    const originalModule = jest.requireActual(`../../hooks/useDeleteTicket`);
    return {
        ...originalModule,
        __esModule: true,
    };
});

export const useDeleteTicketSpy = jest.spyOn(useDeleteTicket, "default");

beforeEach(() => {
    jest.resetAllMocks();
});

describe("BlockPage", () => {
    test("should render block tickets", () => {
        const block = { block: "be" };

        useSingleBlockQuerySpy.mockReturnValue({
            block: {
                tickets: createBlockTicketsData("be"),
                block_name: "be",
            },
            isLoading: false,
            isError: false,
            error: null,
        });
        useUserContextSpy.mockReturnValue({
            adminMode: false,
            email: "hi@email.com",
            displayName: "JB",
            setAdminMode: () => {},
        });

        render(<BlockPage params={block} />);
        const ticketBoxes = screen.getAllByRole("listitem");
        expect(ticketBoxes).toHaveLength(3);
    });
    test("should render loading spinner and no tickets for block", () => {
        const block = { block: "be" };

        useSingleBlockQuerySpy.mockReturnValue({
            block: {
                tickets: createBlockTicketsData("be"),
                block_name: "be",
            },
            isLoading: true,
            isError: false,
            error: null,
        });
        useUserContextSpy.mockReturnValue({
            adminMode: false,
            email: "hi@email.com",
            displayName: "JB",
            setAdminMode: () => {},
        });

        render(<BlockPage params={block} />);
        const loadingSpinner = screen.getByRole("alert");
        expect(loadingSpinner).toBeInTheDocument();
        const ticketBoxes = screen.queryAllByRole("listitem");
        expect(ticketBoxes).toHaveLength(0);
    });
    test("displays errors message when data fetch fails", () => {
        const block = { block: "bee" };

        useSingleBlockQuerySpy.mockReturnValue({
            block: {
                tickets: createBlockTicketsData("be"),
                block_name: "be",
            },
            isLoading: false,
            isError: true,
            error: {
                message: "block not found",
                data: {
                    code: "NOT_FOUND",
                    httpStatus: 404,
                    stack: "...",
                    path: "user.notfound",
                },
                shape: null,
            },
        });
        useUserContextSpy.mockReturnValue({
            adminMode: false,
            email: "hi@email.com",
            displayName: "JB",
            setAdminMode: () => {},
        });
        render(<BlockPage params={block} />);

        const errorMessage = screen.getByRole("heading", {
            name: "404 - block not found",
            level: 2,
        });
        expect(errorMessage).toBeInTheDocument();
        const ticketBoxes = screen.queryAllByRole("listitem");
        expect(ticketBoxes).toHaveLength(0);
    });
    test("should allow tickets to be edited", async () => {
        const user = userEvent.setup();
        const block = { block: "be" };
        useSingleBlockQuerySpy.mockReturnValue({
            block: {
                tickets: createBlockTicketsData("be"),
                block_name: "be",
            },
            isLoading: false,
            isError: false,
            error: null,
        });
        useUserContextSpy.mockReturnValue({
            adminMode: true,
            email: "hi@email.com",
            displayName: "JB",
            setAdminMode: () => {},
        });

        const updateTicketMock = jest.fn();

        useUpdateTicketSpy.mockReturnValue({
            // ticket: createTicketData("be"),
            ticket: undefined,
            isLoading: false,
            isError: false,
            isSuccess: false,
            updateTicket: updateTicketMock,
        });

        Modal.setAppElement("body");

        render(<BlockPage params={block} />);

        const editButtons = screen.getAllByRole("button", { name: "edit" });
        expect(editButtons).toHaveLength(3);
        await user.click(editButtons[0]);
        const editModal = await screen.findByRole("dialog", { hidden: true });

        const modalTitle = within(editModal).getByText("Edit Ticket");
        const ticketNumLabel = within(editModal).getByText("Ticket Number");
        const ticketDescLabel =
            within(editModal).getByText("Ticket Description");

        expect(modalTitle).toBeInTheDocument();
        expect(ticketNumLabel).toBeInTheDocument();
        expect(ticketDescLabel).toBeInTheDocument();

        const ticketNumberInput = within(editModal).getByRole("spinbutton", {
            hidden: true,
        });

        const descriptionInput = within(editModal).getByRole("textbox", {
            hidden: true,
        });

        await userEvent.type(descriptionInput, " Im an edit");
        expect(descriptionInput).toHaveValue("desc Im an edit");

        await userEvent.type(ticketNumberInput, "2");
        expect(ticketNumberInput).toHaveValue(12);

        await userEvent.click(
            screen.getByRole("button", { name: "Update", hidden: true })
        );

        expect(updateTicketMock).toHaveBeenCalledTimes(1);
        expect(updateTicketMock).toHaveBeenCalledWith(
            12,
            "1",
            "desc Im an edit"
        );
        setTimeout(() => {
            expect(editModal).not.toBeInTheDocument();
        }, 2000);
    });
    test("can cancel and confirm ticket deletion", async () => {
        const user = userEvent.setup();
        const block = { block: "be" };
        useSingleBlockQuerySpy.mockReturnValue({
            block: {
                tickets: createBlockTicketsData("be"),
                block_name: "be",
            },
            isLoading: false,
            isError: false,
            error: null,
        });
        useUserContextSpy.mockReturnValue({
            adminMode: true,
            email: "hi@email.com",
            displayName: "JB",
            setAdminMode: () => {},
        });

        const deleteTicketMock = jest.fn();

        useDeleteTicketSpy.mockReturnValue({
            // ticket: createTicketData("be"),
            isDeleted: undefined,
            isLoading: false,
            isError: false,
            isSuccess: false,
            deleteTicket: deleteTicketMock,
        });

        Modal.setAppElement("body");

        render(<BlockPage params={block} />);

        const deleteButtons = screen.getAllByRole("button", { name: "Del" });
        expect(deleteButtons).toHaveLength(3);
        await user.click(deleteButtons[0]);
        const deleteModal = await screen.findByRole("dialog", { hidden: true });

        const modalTitle = within(deleteModal).getByText(
            "Are you sure you want to delete this ticket?"
        );

        expect(modalTitle).toBeInTheDocument();

        const confirmButton = within(deleteModal).getByRole("button", {
            name: "Confirm",
            hidden: true,
        });
        const cancelButton = within(deleteModal).getByRole("button", {
            name: "Cancel",
            hidden: true,
        });

        expect(confirmButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();

        await userEvent.click(cancelButton);

        expect(deleteTicketMock).not.toHaveBeenCalled();

        await waitFor(() => {
            expect(deleteModal).not.toBeInTheDocument();
        });

        await user.click(deleteButtons[0]);

        screen.debug(deleteModal);

        await userEvent.click(confirmButton);

        waitFor(() => {
            expect(deleteTicketMock).toHaveBeenCalledTimes(1);
            expect(deleteTicketMock).toHaveBeenCalledWith("1");
            expect(deleteModal).not.toBeInTheDocument();
        });
    });
});
