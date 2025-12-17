import { createApiClient } from "./api-client";

const client = createApiClient();

export const permissions = {
    getPermissions: ({
        search, page, limit, 
      }: {search: string, page: number, limit: number}
    ): Promise<any> => client.get(`/admin/permission?page=${page}&limit=${limit}${
          search ? `&search=${search}` : ""
        }`)
          .then(({ data }) => data),
}