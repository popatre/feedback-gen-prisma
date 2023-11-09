import { render, screen } from "@testing-library/react";
import Home from "../../app/page";

describe("HomePage", () => {
    test("should render available blocks", () => {
        render(<Home />);
        const { getByText } = screen;

        expect(getByText("Front End")).toBeInTheDocument();
    });
    test("should have links to block pages", async () => {
        render(<Home />);

        const { getByRole } = screen;

        const frontEndLink = getByRole("link", { name: "Front End" });

        expect(frontEndLink).toHaveAttribute("href", "/fe");
    });
});
