import { filterType } from "@/app/admin/transactions/page";
import { createApiClient } from "./api-client";

const client = createApiClient();

type getRequestParamsType = {
  page: number;
  limit: number;
  search: string;
}

export const adminTransactions = {
  getTransactionsSummary: (): Promise<any> =>
    client.get("/admin/transactions/summary").then(({ data }) => data),
  getTransactions: ({
    search, page, limit, type, status, paymentMethod, startDateFrom, startDateTo,
    createdFrom, createdTo, transactionId
  }: getRequestParamsType & { type: string } & filterType
  ): Promise<any> =>
    client.get(`/admin/transactions?page=${page}&limit=${limit}${search ? `&search=${search}` : ""
      }${type ? `&type=${type}` : ""}${status ? `&status=${status}` : ""
      }${paymentMethod ? `&paymentMethod=${paymentMethod}` : ""}${startDateFrom ? `&startDateFrom=${startDateFrom}` : ""
      }${startDateTo ? `&startDateTo=${startDateTo}` : ""}${createdFrom ? `&createdFrom=${createdFrom}` : ""
      }${createdTo ? `&createdTo=${createdTo}` : ""}${transactionId ? `&transactionId=${transactionId}` : ""
      }`)
      .then(({ data }) => data),

  reviewTransaction: ({ id, status, reason }: { id: string; status: string, reason?: string }): Promise<any> =>
    client.patch(`/admin/transactions/review/${id}`, { status, reason })
      .then(({ data }) => data),
  processPayout: ({ id }: { id: string }): Promise<any> =>
    client.patch(`/admin/transactions/payout/${id}`)
      .then(({ data }) => data),
};

export const investorTransactions = {
  getTransactions: ({
    search, page, limit, id
  }: getRequestParamsType & { id: string }
  ): Promise<any> =>
    client.get(`/investor/transactions/${id}?page=${page}&limit=${limit}${search ? `&search=${search}` : ""
      }`)
      .then(({ data }) => data),
  getTransactionsSummary: (id: string): Promise<any> =>
    client.get(`/investor/transactions/summary/${id}`).then(({ data }) => data),
  getLoginLink: ({ investmentId, investorId }: { investmentId: string, investorId: string }): Promise<any> =>
    client.get(`/investor/transactions/get-login-link/${investmentId}/${investorId}`).then(({ data }) => data),
};
