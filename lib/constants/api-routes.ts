export const API_ROUTES = {
  expenses: "/api/expenses",
  expenseById: (id: string) => `/api/expenses/${id}`,
  summary: "/api/summary",
  dashboard: "/api/dashboard",
  register: "/api/auth/register",
} as const;
