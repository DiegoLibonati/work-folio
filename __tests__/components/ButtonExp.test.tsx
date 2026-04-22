import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { ButtonExpProps } from "@/types/props";

import ButtonExp from "@/components/ButtonExp/ButtonExp";

const renderComponent = (props: Partial<ButtonExpProps> = {}): RenderResult => {
  const defaultProps: ButtonExpProps = {
    company: "TOMMY",
    isActive: false,
    handleActiveCompany: jest.fn(),
    ...props,
  };
  return render(<ButtonExp {...defaultProps} />);
};

describe("ButtonExp", () => {
  describe("rendering", () => {
    it("should render the company name", () => {
      renderComponent({ company: "TOMMY" });
      expect(screen.getByText("TOMMY")).toBeInTheDocument();
    });

    it("should render with tab role", () => {
      renderComponent();
      expect(screen.getByRole("tab")).toBeInTheDocument();
    });

    it("should have aria-label with the company name", () => {
      renderComponent({ company: "BIGDROP" });
      expect(screen.getByRole("tab")).toHaveAttribute("aria-label", "View BIGDROP experience");
    });

    it("should have aria-selected false when not active", () => {
      renderComponent({ isActive: false });
      expect(screen.getByRole("tab")).toHaveAttribute("aria-selected", "false");
    });

    it("should have aria-selected true when active", () => {
      renderComponent({ isActive: true });
      expect(screen.getByRole("tab")).toHaveAttribute("aria-selected", "true");
    });

    it("should apply active class when isActive is true", () => {
      renderComponent({ isActive: true });
      expect(screen.getByRole("tab")).toHaveClass("button-exp--active");
    });

    it("should not apply active class when isActive is false", () => {
      renderComponent({ isActive: false });
      expect(screen.getByRole("tab")).not.toHaveClass("button-exp--active");
    });
  });

  describe("behavior", () => {
    it("should call handleActiveCompany when clicked", async () => {
      const mockHandleActiveCompany = jest.fn();
      renderComponent({ handleActiveCompany: mockHandleActiveCompany });
      const user = userEvent.setup();
      await user.click(screen.getByRole("tab"));
      expect(mockHandleActiveCompany).toHaveBeenCalledTimes(1);
    });
  });
});
