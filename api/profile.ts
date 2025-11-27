import { createApiClient } from "./api-client";

const client = createApiClient();

export const investorProfile = {
  getProfileInfo: (id: string): Promise<any> =>
    client.get(`/investor/profile/${id}`)
  .then(({ data }) => data),
  updateProfileInfo: ({id, data}:{id: string, data: any}): Promise<any> =>
    client.patch(`/investor/profile/${id}`, data)
  .then(({ data }) => data),
  updatePassword: ({id, data}:{id: string, data: any}): Promise<any> =>
    client.patch(`/investor/profile/password/${id}`, data)
  .then(({ data }) => data),
  verifyKyc: (data: any): Promise<any> =>
    client.post(`/investor/kyc/verify-kyc`, data).then(({ data }) => data),
  getKycDocumentRequirements: (): Promise<any> => client.get(`/investor/kyc/documents?limit=1000`)
  .then(({ data }) => data),
};