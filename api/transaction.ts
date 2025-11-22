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
     createdFrom, createdTo,
  }: getRequestParamsType & { type: string } & filterType
): Promise<any> =>
    client.get(`/admin/transactions?page=${page}&limit=${limit}${
      search ? `&search=${search}` : ""
    }${type ? `&type=${type}` : ""}${
        status ? `&status=${status}` : ""
      }${paymentMethod ? `&paymentMethod=${paymentMethod}` : ""}${
        startDateFrom ? `&startDateFrom=${startDateFrom}` : ""
      }${startDateTo ? `&startDateTo=${startDateTo}` : ""}${
        createdFrom ? `&createdFrom=${createdFrom}` : ""
      }${createdTo ? `&createdTo=${createdTo}` : ""}`)
      .then(({ data }) => data),

 reviewTransaction: ({id, status, reason}: { id: string; status: string, reason?: string }): Promise<any> =>
    client.patch(`/admin/transactions/review/${id}`, { status, reason })
 .then(({ data }) => data),
};
