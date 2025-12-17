import { createApiClient } from "./api-client";

const client = createApiClient();

type getRequestParamsType = {
    page: number;
    limit: number;
    search: string;
}

export const sharedPlans = {
   getPlans: (): Promise<any> =>
    client.get("/plans?limit=10000").then(({ data }) => data),
}

export const adminPlans = {
  getPlans: ({
    search, page, limit
  }: getRequestParamsType): Promise<any> =>
    client.get(`/admin/plans?page=${page}&limit=${limit}${
      search ? `&search=${search}` : ""
    }`).then(({ data }) => data),
    
    togglePlan: ({id, visibility,}: { id: string; visibility: boolean }): Promise<any> =>
        client.patch(`/admin/plans/${id}`, { visibility })
    .then(({ data }) => data),

getPlansInvestments: ({
    search, page, limit,id
  }: getRequestParamsType & { id: string }): Promise<any> =>
    client.get(`/admin/plans/investments/${id}?page=${page}&limit=${limit}${
      search ? `&search=${search}` : ""
    }`).then(({ data }) => data),

   createPlan: (data: any): Promise<any> => client.post(`/admin/plans`, data)
   .then(({ data }) => data),
};
