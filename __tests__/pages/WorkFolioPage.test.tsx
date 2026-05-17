import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";

import type { RenderResult } from "@testing-library/react";

import WorkFolioPage from "@/pages/WorkFolioPage/WorkFolioPage";

import { mockMswServer } from "@tests/__mocks__/mswServer.mock";
import { mockTabs } from "@tests/__mocks__/tabs.mock";

const renderPage = (): RenderResult => render(<WorkFolioPage />);

describe("WorkFolioPage", () => {
  describe("loading state", () => {
    it("should show loading spinner while fetching", async () => {
      renderPage();

      expect(screen.getByRole("status", { name: /loading/i })).toBeInTheDocument();

      await waitForElementToBeRemoved(() => screen.queryByRole("status", { name: /loading/i }));
    });

    it("should render main with aria-busy true while loading", async () => {
      renderPage();

      expect(screen.getByRole("main", { name: /loading work experience data/i })).toHaveAttribute(
        "aria-busy",
        "true"
      );

      await waitForElementToBeRemoved(() =>
        screen.queryByRole("main", { name: /loading work experience data/i })
      );
    });
  });

  describe("after successful fetch", () => {
    it("should render a tab for each job", async () => {
      renderPage();

      const tabs = await screen.findAllByRole("tab");

      expect(tabs).toHaveLength(mockTabs.length);
    });

    it("should set the first tab as active by default", async () => {
      renderPage();

      const tabs = await screen.findAllByRole("tab");

      expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    });

    it("should render the first company experience panel by default", async () => {
      renderPage();

      const heading = await screen.findByRole("heading", { level: 2, name: mockTabs[0]!.title });

      expect(heading).toBeInTheDocument();
    });

    it("should render the tablist with the correct aria-label", async () => {
      renderPage();

      await screen.findAllByRole("tab");

      expect(screen.getByRole("tablist")).toHaveAttribute(
        "aria-label",
        "Work experience companies"
      );
    });
  });

  describe("tab switching", () => {
    it("should mark the clicked tab as active and deactivate the others", async () => {
      const user = userEvent.setup();
      renderPage();
      const tabs = await screen.findAllByRole("tab");

      await user.click(tabs[1]!);

      expect(tabs[1]).toHaveAttribute("aria-selected", "true");
      expect(tabs[0]).toHaveAttribute("aria-selected", "false");
    });

    it("should display the selected company details after clicking a tab", async () => {
      const user = userEvent.setup();
      renderPage();
      const secondTab = await screen.findByRole("tab", {
        name: new RegExp(`view ${mockTabs[1]!.company} experience`, "i"),
      });

      await user.click(secondTab);

      expect(
        screen.getByRole("heading", { level: 2, name: mockTabs[1]!.title })
      ).toBeInTheDocument();
    });
  });

  describe("with empty data", () => {
    it("should render no tabs when fetch returns an empty array", async () => {
      mockMswServer.use(
        http.get("/react-tabs-project", () => {
          return HttpResponse.json([]);
        })
      );

      renderPage();

      await screen.findByRole("main", { name: "Work experience" });
      expect(screen.queryAllByRole("tab")).toHaveLength(0);
    });

    it("should not render a company experience panel when no jobs are returned", async () => {
      mockMswServer.use(
        http.get("/react-tabs-project", () => {
          return HttpResponse.json([]);
        })
      );

      renderPage();

      await screen.findByRole("main", { name: "Work experience" });
      expect(screen.queryByRole("tabpanel")).not.toBeInTheDocument();
    });
  });
});
