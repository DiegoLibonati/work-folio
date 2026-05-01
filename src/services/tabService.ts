import type { Tab } from "@/types/app";
import type { ResponseDirect } from "@/types/responses";

const tabService = {
  getAll: async (): Promise<ResponseDirect<Tab[]>> => {
    const response = await fetch("/react-tabs-project");

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return (await response.json()) as ResponseDirect<Tab[]>;
  },
};

export default tabService;
