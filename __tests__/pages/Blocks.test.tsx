import { render, screen, waitFor, within } from "@testing-library/react";
import BlockPage from "../../app/[block]/page";
import userEvent from "@testing-library/user-event";
import { createBlockTicketsData } from "@/db/data/utils/createBlockData";
import * as useSingleBlockQuery from "../../hooks/useSingleBlockQuery";
import * as useUserContext from "../../hooks/useUserContext";
import * as useUpdateTicket from "../../hooks/useUpdateTicket";
import * as useDeleteTicket from "../../hooks/useDeleteTicket";
import * as usePostTicket from "../../hooks/usePostTicket";
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

jest.mock(`../../hooks/usePostTicket`, () => {
    const originalModule = jest.requireActual(`../../hooks/usePostTicket`);
    return {
        ...originalModule,
        __esModule: true,
    };
});

export const usePostTicketSpy = jest.spyOn(usePostTicket, "default");

beforeEach(() => {
    jest.resetAllMocks();
});

describe("BlockPage", () => {
    describe("blockTickets", () => {
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
    });
    describe("adminMode - edit tickets", () => {
        test("can cancel and confirm ticket editing", async () => {
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
                error: null,
                updateTicket: updateTicketMock,
            });

            Modal.setAppElement("body");

            render(<BlockPage params={block} />);

            const editButtons = screen.getAllByRole("button", { name: "edit" });
            expect(editButtons).toHaveLength(3);
            await user.click(editButtons[0]);
            const editModal = await screen.findByRole("dialog", {
                hidden: true,
            });

            const modalTitle = within(editModal).getByText("Edit Ticket");
            expect(modalTitle).toBeInTheDocument();

            await userEvent.click(
                screen.getByRole("button", { name: "Cancel", hidden: true })
            );

            await waitFor(() => {
                expect(editModal).not.toBeInTheDocument();
            });

            expect(updateTicketMock).not.toHaveBeenCalled();

            await user.click(editButtons[0]);
            const editModal2 = await screen.findByRole("dialog", {
                hidden: true,
            });

            const ticketNumLabel =
                within(editModal2).getByText("Ticket Number");
            const ticketDescLabel =
                within(editModal2).getByText("Ticket Description");

            expect(ticketNumLabel).toBeInTheDocument();
            expect(ticketDescLabel).toBeInTheDocument();

            const ticketNumberInput = within(editModal2).getByRole(
                "spinbutton",
                {
                    hidden: true,
                }
            );

            const descriptionInput = within(editModal2).getByRole("textbox", {
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

            //reset mock to edit ticket?
        });
        test("should disable submit button whilst submitting/loading", async () => {
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
                isLoading: true,
                isError: false,
                isSuccess: false,
                error: null,
                updateTicket: updateTicketMock,
            });

            Modal.setAppElement("body");

            render(<BlockPage params={block} />);

            const editButtons = screen.getAllByRole("button", { name: "edit" });
            await user.click(editButtons[0]);
            const editModal = await screen.findByRole("dialog", {
                hidden: true,
            });

            const modalTitle = within(editModal).queryByText("Edit Ticket");
            expect(modalTitle).toBeInTheDocument();

            const ticketNumLabel =
                within(editModal).queryByText("Ticket Number");
            const ticketDescLabel =
                within(editModal).getByText("Ticket Description");

            const ticketNumberInput = within(editModal).queryByRole(
                "spinbutton",
                {
                    hidden: true,
                }
            );

            const descriptionInput = within(editModal).queryByRole("textbox", {
                hidden: true,
            });
            expect(ticketNumLabel).toBeInTheDocument();
            expect(ticketDescLabel).toBeInTheDocument();
            expect(ticketNumberInput).toBeInTheDocument();
            expect(descriptionInput).toBeInTheDocument();

            expect(
                within(editModal).getByRole("button", {
                    name: "Working on it...",
                    hidden: true,
                })
            ).toBeDisabled();
        });
        test("edit modal handles and displays error", async () => {
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
                isError: true,
                isSuccess: false,
                error: {
                    message: "something went wrong",
                    data: {
                        code: "BAD_REQUEST",
                        httpStatus: 400,
                        stack: "...",
                        path: "user.notfound",
                    },
                    shape: null,
                },
                updateTicket: updateTicketMock,
            });

            Modal.setAppElement("body");

            render(<BlockPage params={block} />);

            const editButtons = screen.getAllByRole("button", { name: "edit" });
            await user.click(editButtons[0]);
            const editModal = await screen.findByRole("dialog", {
                hidden: true,
            });

            const ticketNumLabel =
                within(editModal).queryByText("Ticket Number");
            const ticketDescLabel =
                within(editModal).queryByText("Ticket Description");

            const ticketNumberInput = within(editModal).queryByRole(
                "spinbutton",
                {
                    hidden: true,
                }
            );

            const descriptionInput = within(editModal).queryByRole("textbox", {
                hidden: true,
            });
            expect(ticketNumLabel).not.toBeInTheDocument();
            expect(ticketDescLabel).not.toBeInTheDocument();
            expect(ticketNumberInput).not.toBeInTheDocument();
            expect(descriptionInput).not.toBeInTheDocument();

            expect(
                within(editModal).getByRole("heading", {
                    name: `BAD_REQUEST - something went wrong`,
                    hidden: true,
                    level: 2,
                })
            ).toBeInTheDocument();
        });
    });
    describe("adminMode - delete ticket", () => {
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

            const deleteButtons = screen.getAllByRole("button", {
                name: "Del",
            });
            expect(deleteButtons).toHaveLength(3);
            await user.click(deleteButtons[0]);
            const deleteModal = await screen.findByRole("dialog", {
                hidden: true,
            });

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

            const deleteModal2 = await screen.findByRole("dialog", {
                hidden: true,
            });

            const confirmButton2 = within(deleteModal2).getByRole("button", {
                name: "Confirm",
                hidden: true,
            });

            await userEvent.click(confirmButton2);

            expect(deleteTicketMock).toHaveBeenCalledTimes(1);
            expect(deleteTicketMock).toHaveBeenCalledWith("1");
            //reset mock here to add a ticket?
        });
        test("should disable submit button whilst submitting/loading", async () => {
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
                isLoading: true,
                isError: false,
                isSuccess: false,
                deleteTicket: deleteTicketMock,
            });

            Modal.setAppElement("body");

            render(<BlockPage params={block} />);

            const deleteButtons = screen.getAllByRole("button", {
                name: "Del",
            });
            await user.click(deleteButtons[0]);
            const deleteModal = await screen.findByRole("dialog", {
                hidden: true,
            });

            expect(
                within(deleteModal).getByRole("button", {
                    name: "Working on it...",
                    hidden: true,
                })
            ).toBeDisabled();
        });
        test.todo("error");
    });
    describe("adminMode - add new ticket", () => {
        test("should provide modal to add new ticket", async () => {
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

            const handleTicketMock = jest.fn();

            usePostTicketSpy.mockReturnValue({
                ticket: undefined,
                isLoading: false,
                isError: false,
                isSuccess: false,
                handleTicketPost: handleTicketMock,
            });

            Modal.setAppElement("body");

            render(<BlockPage params={block} />);

            const addTicketButton = screen.getByText(/Add New Ticket/);
            expect(addTicketButton).toBeInTheDocument();

            await userEvent.click(addTicketButton);

            const addTicketModal = await screen.findByRole("dialog", {
                hidden: true,
            });
            const modalTitle =
                within(addTicketModal).getByText("Create New Ticket");
            expect(modalTitle).toBeInTheDocument();

            await userEvent.click(
                screen.getByRole("button", { name: "Cancel", hidden: true })
            );

            await waitFor(() => {
                expect(addTicketModal).not.toBeInTheDocument();
            });

            expect(handleTicketMock).not.toHaveBeenCalled();

            await userEvent.click(addTicketButton);

            const addTicketModal2 = await screen.findByRole("dialog", {
                hidden: true,
            });

            const ticketNumLabel =
                within(addTicketModal2).getByText("Ticket Number");
            const ticketDescLabel =
                within(addTicketModal2).getByText("Ticket Description");

            expect(ticketNumLabel).toBeInTheDocument();
            expect(ticketDescLabel).toBeInTheDocument();

            const ticketNumberInput = within(addTicketModal2).getByRole(
                "spinbutton",
                {
                    hidden: true,
                }
            );

            const descriptionInput = within(addTicketModal2).getByRole(
                "textbox",
                {
                    hidden: true,
                }
            );

            await userEvent.type(descriptionInput, "Im a new ticket");
            expect(descriptionInput).toHaveValue("Im a new ticket");

            await userEvent.type(ticketNumberInput, "2");
            expect(ticketNumberInput).toHaveValue(2);

            await userEvent.click(
                screen.getByRole("button", { name: "Add Ticket", hidden: true })
            );

            expect(handleTicketMock).toHaveBeenCalledTimes(1);
            expect(handleTicketMock).toHaveBeenCalledWith(2, "Im a new ticket");
        });
        test.todo("loading");
        test.todo("error");
    });
});
