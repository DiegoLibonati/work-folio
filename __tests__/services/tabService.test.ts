import tabService from "@/services/tabService";

import { mockTabs } from "@tests/__mocks__/tabs.mock";

const mockFetchSuccess = (data: unknown): void => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => await data,
  } as Response);
};

const mockFetchError = (status: number): void => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status,
  } as Response);
};

const mockFetchNetworkError = (message = "Network error"): void => {
  global.fetch = jest.fn().mockRejectedValue(new Error(message));
};

describe("tabService", () => {
  describe("getAll", () => {
    describe("when fetch succeeds", () => {
      it("should call fetch with the correct endpoint", async () => {
        mockFetchSuccess(mockTabs);
        await tabService.getAll();
        expect(global.fetch).toHaveBeenCalledWith("/react-tabs-project");
        expect(global.fetch).toHaveBeenCalledTimes(1);
      });

      it("should return the tabs from the response", async () => {
        mockFetchSuccess(mockTabs);
        const result = await tabService.getAll();
        expect(result).toEqual(mockTabs);
      });
    });

    describe("when the server returns an error", () => {
      it("should throw an error with status 404", async () => {
        mockFetchError(404);
        await expect(tabService.getAll()).rejects.toThrow("HTTP error! status: 404");
      });

      it("should throw an error with status 500", async () => {
        mockFetchError(500);
        await expect(tabService.getAll()).rejects.toThrow("HTTP error! status: 500");
      });
    });

    describe("when there is a network error", () => {
      it("should propagate the network error", async () => {
        mockFetchNetworkError("Failed to fetch");
        await expect(tabService.getAll()).rejects.toThrow("Failed to fetch");
      });
    });
  });
});
