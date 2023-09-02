import { render, renderHook, screen, within } from "@testing-library/react";
import BlockPage from "../../app/[block]/page";
import * as useSingleBlockQuery from "../../hooks/useSingleBlockQuery";
import { createBlockTicketsData } from "@/db/data/utils/createBlockData";
import { TRPCError } from "@trpc/server";

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
