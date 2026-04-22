import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { CompanyExpProps } from "@/types/props";

import CompanyExp from "@/components/CompanyExp/CompanyExp";

const renderComponent = (props: Partial<CompanyExpProps> = {}): RenderResult => {
  const defaultProps: CompanyExpProps = {
    company: "TOMMY",
    title: "Full Stack Web Developer",
    dates: "December 2015 - Present",
    duties: ["Duty one", "Duty two"],
    ...props,
  };
  return render(<CompanyExp {...defaultProps} />);
};

describe("CompanyExp", () => {
  describe("rendering", () => {
    it("should render with tabpanel role", () => {
      renderComponent();
      expect(screen.getByRole("tabpanel")).toBeInTheDocument();
    });

    it("should render the title", () => {
      renderComponent({ title: "Full Stack Web Developer" });
      expect(
        screen.getByRole("heading", { level: 2, name: "Full Stack Web Developer" })
      ).toBeInTheDocument();
    });

    it("should render the company name", () => {
      renderComponent({ company: "TOMMY" });
      expect(screen.getByRole("heading", { level: 3, name: "TOMMY" })).toBeInTheDocument();
    });

    it("should render the dates", () => {
      renderComponent({ dates: "December 2015 - Present" });
      expect(
        screen.getByRole("heading", { level: 4, name: "December 2015 - Present" })
      ).toBeInTheDocument();
    });

    it("should render all duty items", () => {
      const duties = ["Duty one", "Duty two", "Duty three"];
      renderComponent({ duties });
      duties.forEach((duty) => {
        expect(screen.getByText(duty)).toBeInTheDocument();
      });
    });

    it("should render the correct number of duty items", () => {
      renderComponent({ duties: ["Duty one", "Duty two"] });
      expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });

    it("should render empty list when duties is empty", () => {
      renderComponent({ duties: [] });
      expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });

    it("should have correct aria-label with company name", () => {
      renderComponent({ company: "TOMMY" });
      expect(screen.getByRole("tabpanel")).toHaveAttribute(
        "aria-label",
        "TOMMY work experience details"
      );
    });

    it("should have fallback aria-label when company is empty string", () => {
      renderComponent({ company: "" });
      expect(screen.getByRole("tabpanel")).toHaveAttribute(
        "aria-label",
        "Selected company work experience details"
      );
    });
  });
});
