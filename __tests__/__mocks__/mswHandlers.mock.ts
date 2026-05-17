import { http, HttpResponse } from "msw";

import { mockTabs } from "@tests/__mocks__/tabs.mock";

export const mockMswHandlers = [
  http.get("/react-tabs-project", () => {
    return HttpResponse.json(mockTabs);
  }),
];
