import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { DutieItemProps } from "@/types/props";

import DutieItem from "@/components/DutieItem/DutieItem";

const renderComponent = (props: Partial<DutieItemProps> = {}): RenderResult => {
  const defaultProps: DutieItemProps = {
    dutie: "Default duty text",
    ...props,
  };
  return render(
    <ul>
      <DutieItem {...defaultProps} />
    </ul>
  );
};

describe("DutieItem", () => {
  describe("rendering", () => {
    it("should render the duty text", () => {
      renderComponent({ dutie: "Some duty text" });
      expect(screen.getByText("Some duty text")).toBeInTheDocument();
    });

    it("should render as a list item", () => {
      renderComponent();
      expect(screen.getByRole("listitem")).toBeInTheDocument();
    });

    it("should render an icon with aria-hidden", () => {
      const { container } = renderComponent();
      const icon = container.querySelector<SVGElement>("svg");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("should render different duty texts correctly", () => {
      const duty = "Another specific duty";
      renderComponent({ dutie: duty });
      expect(screen.getByText(duty)).toBeInTheDocument();
    });
  });
});
