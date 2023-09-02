import { render, renderHook, screen, within } from "@testing-library/react";
import BlockPage from "../../app/[block]/page";
import * as useSingleBlockQuery from "../../hooks/useSingleBlockQuery";
import { createBlockTicketsData } from "@/db/data/utils/createBlockData";

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
        const ticketBoxes = screen.getAllByRole("heading");
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
        const ticketBoxes = screen.queryAllByRole("heading");
        expect(ticketBoxes).toHaveLength(0);
    });
    test.todo("error while fetching");
});
