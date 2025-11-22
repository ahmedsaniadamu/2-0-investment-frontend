import { createApiClient } from "./api-client";

const client = createApiClient();

type getRequestParamsType = {
    page: number;
    limit: number;
    search: string;
}

export const adminInvestments = {
  getInvestments: ({
    search, page, limit
  }: getRequestParamsType): Promise<any> =>
    client.get(`/admin/investments?page=${page}&limit=${limit}${
      search ? `&search=${search}` : ""
    }`).then(({ data }) => data),
getInvestmentSummary: (): Promise<any> =>
    client.get(`/admin/investments/summary`).then(({ data }) => data),
};
