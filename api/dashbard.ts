import { createApiClient } from "./api-client";

const client = createApiClient();

export const adminDashboard = {
  getDashboardSummary: (): Promise<any> =>
    client.get("/admin/dashboard/summary").then(({ data }) => data),
  getROIPerPlan: (): Promise<any> =>
    client.get("/admin/dashboard/roi-per-plan").then(({ data }) => data),
  getInvestmentDistribution: (): Promise<any> =>
    client.get("/admin/dashboard/investment-distribution").then(({ data }) => data),
};

export const investorDashboard = {
  getDashboardSummary: (id: string): Promise<any> =>
    client.get(`/investor/dashboard/${id}/summary`).then(({ data }) => data),
  getMonthlyProfitGrowth: (id: string): Promise<any> =>
    client.get(`/investor/dashboard/${id}/monhly-profit-growth`).then(({ data }) => data),
  getInvestmentVsProfit: (id: string): Promise<any> =>
    client.get(`/investor/dashboard/${id}/investment-vs-profit`).then(({ data }) => data),
  getPortfolioAllocation: (id: string): Promise<any> =>
    client.get(`/investor/dashboard/${id}/portfolio-allocation`).then(({ data }) => data),
};