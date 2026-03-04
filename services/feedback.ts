import { createApiClient } from "./api-client";
import { getRequestParamsType } from "./investment";

const client = createApiClient();

export const feedbackService = {
    submitFeedback: (data: {
        investorId: string;
        rating: number;
        comment: string;
    }): Promise<any> =>
        client.post(`feedback/create`, data).then(({ data }) => data),
    getLandingPageFeedback: async (): Promise<any> => {
        return await client.get(`landing-feedbacks`).then(({ data }) => data)
    },
    getFeedbackSummary: async (): Promise<any> => {
        return await client.get(`admin/feedback/summary`).then(({ data }) => data)
    },
    getFeedbackLists: async ({
        search, page, limit
    }: getRequestParamsType): Promise<any> => {
        return await client.get(`admin/feedback?search=${search}&page=${page}&limit=${limit}`).then(({ data }) => data)
    },
    deleteFeedback: async (id: string): Promise<any> => {
        return await client.delete(`admin/feedback/${id}`).then(({ data }) => data)
    },

};
