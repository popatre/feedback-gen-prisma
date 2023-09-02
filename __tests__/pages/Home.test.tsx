import { render, renderHook, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../../app/page";

describe("HomePage", () => {
    test("should render available blocks", () => {
        render(<Home />);
        const { getByText } = screen;
        expect(getByText("Back End")).toBeInTheDocument();
        expect(getByText("Front End")).toBeInTheDocument();
    });
    test.skip("should have clickable links to block pages", async () => {
        /** How to do navigation?? */
        const user = userEvent.setup();
        render(<Home />);

        const { getByText } = screen;
        const backEndLink = getByText("Back End");
        const frontEndLink = getByText("Front End");
        await user.click(backEndLink);
    });
});
