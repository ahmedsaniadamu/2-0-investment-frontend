import { createApiClient } from "./api-client";

const client = createApiClient();

export const fileManagement = {
  uploadFile: (data: any): Promise<any> =>
    client.post(`upload/kyc-document`, {
      file: data,
    }, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(({ data }) => data),
};