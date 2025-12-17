import { createApiClient } from "./api-client";

const client = createApiClient();

export const users = {
    getUsers: ({
        search, page, limit, 
      }: {search: string, page: number, limit: number}
    ): Promise<any> => client.get(`/admin/users?page=${page}&limit=${limit}${
          search ? `&search=${search}` : ""
        }`)
          .then(({ data }) => data),
    getUserPermissions: ({
     id,
    }: { id: string }
    ): Promise<any> => client.get(`/admin/permission/user-permssions/${id}`)
        .then(({ data }) => data),
    createUser: (payload: any): Promise<any> =>
        client.post(`/admin/users/create`, payload)
            .then(({ data }) => data),
    deleteUser: ({ id }: {id: string}): Promise<any> =>
        client.delete(`/admin/users/${id}`)
            .then(({ data }) => data),
    assignPermissionsToUser: (payload : { permissionIds : string[], userId: string}): Promise<any> =>
        client.post(`/admin/permission/assign-permissions`, payload)
            .then(({ data }) => data),
    updateUserPermissions: (payload: { permissionIds: string[], userId: string }): Promise<any> =>
        client.patch(`/admin/permission/update-user-permissions`, payload)
            .then(({ data }) => data),
}