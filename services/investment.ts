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
    client.get(`/admin/investments?page=${page}&limit=${limit}${search ? `&search=${search}` : ""
      }`).then(({ data }) => data),
  getInvestmentSummary: (): Promise<any> =>
    client.get(`/admin/investments/summary`).then(({ data }) => data),
};

export const investorInvestments = {
  getInvestments: ({
    search, page, limit, id
  }: getRequestParamsType & { id: string }): Promise<any> =>
    client.get(`/investor/investments/${id}?page=${page}&limit=${limit}${search ? `&search=${search}` : ""
      }`).then(({ data }) => data),
  getInvestmentSummary: (id: string): Promise<any> =>
    client.get(`/investor/investments/${id}/summary`).then(({ data }) => data),
  requestWithdrawal: (id: string): Promise<any> =>
    client.get(`/investor/investments/${id}/request-withdrawal`).then(({ data }) => data),
  initiateInvestment: (data: any): Promise<any> =>
    client.post(`/investor/investments`, data).then(({ data }) => data),
  createPaymentIntent: (data: {
    amount: number;
    currency: string;
    investorId: string;
    planId: string;
    startDate: string;
    investmentGoal: string;
    agreement: boolean;
    paymentMethod: string;
  }): Promise<any> =>
    client.post(`/investor/investments/create-payment-intent`, data).then(({ data }) => data),
};