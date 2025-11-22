import { createApiClient } from "./api-client";

const client = createApiClient();

type getRequestParamsType = {
    page: number;
    limit: number;
    search: string;
}

export const adminInvestors = {
  getInvestorsSummary: (): Promise<any> =>
    client.get("/admin/investors/summary").then(({ data }) => data),
  getInvestorProfile: (id:string): Promise<any> =>
    client.get(`/admin/investors/${id}/profile`).then(({ data }) => data),
  getInvestors: ({
    search, page, limit
  }: getRequestParamsType): Promise<any> =>
    client.get(`/admin/investors?page=${page}&limit=${limit}${
      search ? `&search=${search}` : ""
    }`).then(({ data }) => data),
   getInvestorTransactions: ({id, search, page, limit}: { id: string } & getRequestParamsType): Promise<any> => client
   .get(`/admin/investors/${id}/transactions?page=${page}&limit=${limit}${
      search ? `&search=${search}` : ""
   }`).then(({ data }) => data),
   getInvestorInvestments: ({id, search, page, limit}: { id: string } & getRequestParamsType): Promise<any> => client
   .get(`/admin/investors/${id}/investments?page=${page}&limit=${limit}${
      search ? `&search=${search}` : ""
   }`).then(({ data }) => data),
   getInvestorInvestmentsSummary: ({id}: { id: string }): Promise<any> => client
   .get(`/admin/investments/${id}/summary`).then(({ data }) => data),
   getInvestorTransactionsSummary: ({id}: { id: string }): Promise<any> => client
   .get(`/admin/transactions/${id}/summary`).then(({ data }) => data),
};
