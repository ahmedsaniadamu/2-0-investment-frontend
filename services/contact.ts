import { createApiClient } from "./api-client";

const client = createApiClient();

export const contactService = {
    sendMessage: (data: {
        name: string;
        email: string;
        subject: string;
        message: string;
    }): Promise<any> =>
        client.post(`contact-us`, data).then(({ data }) => data),
};