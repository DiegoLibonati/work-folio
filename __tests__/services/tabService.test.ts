import { http, HttpResponse } from "msw";

import tabService from "@/services/tabService";

import { mockMswServer } from "@tests/__mocks__/mswServer.mock";
import { mockTabs } from "@tests/__mocks__/tabs.mock";

describe("tabService", () => {
  describe("getAll", () => {
    describe("when fetch succeeds", () => {
      it("should hit the /react-tabs-project endpoint", async () => {
        let capturedUrl = "";
        mockMswServer.use(
          http.get("/react-tabs-project", ({ request }) => {
            capturedUrl = new URL(request.url).pathname;
            return HttpResponse.json(mockTabs);
          })
        );

        await tabService.getAll();

        expect(capturedUrl).toBe("/react-tabs-project");
      });

      it("should return the tabs from the response", async () => {
        const result = await tabService.getAll();

        expect(result).toEqual(mockTabs);
      });
    });

    describe("when the server returns an error", () => {
      it("should throw an error with status 404", async () => {
        mockMswServer.use(
          http.get("/react-tabs-project", () => {
            return new HttpResponse(null, { status: 404 });
          })
        );

        await expect(tabService.getAll()).rejects.toThrow("HTTP error! status: 404");
      });

      it("should throw an error with status 500", async () => {
        mockMswServer.use(
          http.get("/react-tabs-project", () => {
            return new HttpResponse(null, { status: 500 });
          })
        );

        await expect(tabService.getAll()).rejects.toThrow("HTTP error! status: 500");
      });
    });

    describe("when there is a network error", () => {
      it("should propagate the network error", async () => {
        mockMswServer.use(
          http.get("/react-tabs-project", () => {
            return HttpResponse.error();
          })
        );

        await expect(tabService.getAll()).rejects.toThrow();
      });
    });
  });
});
