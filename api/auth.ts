import { createApiClient } from "./api-client";

const client = createApiClient();

type UserRegistration = {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  role: 'investor' | 'admin' | 'user';  
};

export const auth = {
  login: (payload: any): Promise<any> =>
    client
      .post("/auth/login", { ...payload, account_type: "candidate" })
      .then(({ data }) => data),

  logout: (): Promise<any> =>
    client.post("/auth/logout").then(({ data }) => data),

  register: (payload: UserRegistration): Promise<any> =>
    client
      .post("/auth/register", { ...payload, account_type: "candidate" })
      .then(({ data }) => data),

  resetPassword: (payload: {
  email: string,
  newPassword: string
}): Promise<any> =>
    client
      .post(`/auth/reset-password`, { ...payload })
      .then(({ data }) => data),

  veryfyOtp: (payload: {
    investorId: string;
    otp: string;
    type?: string
  }): Promise<any> =>
    client
      .post(`/auth/verify-otp`, { ...payload })
      .then(({ data }) => data),

  forgotPassword: (payload: {email: string}): Promise<any> =>
    client
      .post(`/auth/forgot-password`, { ...payload })
      .then(({ data }) => data),

  resendOtp: (payload: {email: string}): Promise<any> =>
    client
      .post(`/auth/resend-otp`, { ...payload })
      .then(({ data }) => data),
};
