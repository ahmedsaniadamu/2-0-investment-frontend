import { createApiClient } from "./api-client";

const client = createApiClient();

type getRequestParamsType = {
    page: number;
    limit: number;
    search: string;
}

export const adminKyc = {
  getKycDocuments: ({
    search, page, limit
  }: getRequestParamsType): Promise<any> =>
    client.get(`/admin/kyc-management/documents?page=${page}&limit=${limit}${
      search ? `&search=${search}` : ""
    }`).then(({ data }) => data),
    getInvestorsKyc: ({
    search, page, limit
  }: getRequestParamsType): Promise<any> =>
    client.get(`/admin/kyc-management/investors-kyc?page=${page}&limit=${limit}${
      search ? `&search=${search}` : ""
    }`).then(({ data }) => data),
    createKycDocument: (data: any) => client.post(`/admin/kyc-management/documents`, data)
    .then(({ data }) => data),
    updateKycDocument: ({data,id}: {id: string, data: any}) => client.patch(`/admin/kyc-management/documents/${id}`, data)
    .then(({ data }) => data),
    deleteKycDocument: (id: string) => client.delete(`/admin/kyc-management/documents/${id}`)
    .then(({ data }) => data),
    getInvestorsKycSummary: (): Promise<any> =>
    client.get("/admin/kyc-management/investors/summary").then(({ data }) => data),
    reviewInvestorKyc: ({id, status, reason}: { id: string; status: string, reason?: string }): Promise<any> =>
    client.post(`/admin/kyc-management/review-investor-kyc-request/${id}`, { status, reason })
    .then(({ data }) => data),
};
