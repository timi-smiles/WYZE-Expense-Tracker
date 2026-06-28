import { API_ROUTES } from "@/lib/constants/api-routes";
import type {
  ApiError,
  DashboardData,
  Expense,
  ExpenseInput,
  ExpenseSummary,
} from "@/types/expense";

interface ApiResponse<T> {
  data: T;
}

/**
 * Parses API error responses into a readable message.
 */
async function parseErrorResponse(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as ApiError;
    const details = body.details?.length ? ` ${body.details.join(" ")}` : "";
    return `${body.error}${details}`;
  } catch {
    return "An unexpected error occurred.";
  }
}

function buildQuery(category?: string | null, search?: string): string {
  const params = new URLSearchParams();

  if (category && category !== "All") {
    params.set("category", category);
  }

  if (search?.trim()) {
    params.set("search", search.trim());
  }

  const query = params.toString();
  return query ? `?${query}` : "";
}

/**
 * Fetches dashboard data including summary, expenses, and insights.
 */
export async function fetchDashboard(
  category?: string | null,
  search?: string
): Promise<DashboardData> {
  const response = await fetch(
    `${API_ROUTES.dashboard}${buildQuery(category, search)}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(await parseErrorResponse(response));
  }

  const body = (await response.json()) as ApiResponse<DashboardData>;
  return body.data;
}

/**
 * Fetches all expenses, optionally filtered by category or search.
 */
export async function fetchExpenses(
  category?: string | null,
  search?: string
): Promise<Expense[]> {
  const response = await fetch(
    `${API_ROUTES.expenses}${buildQuery(category, search)}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(await parseErrorResponse(response));
  }

  const body = (await response.json()) as ApiResponse<Expense[]>;
  return body.data;
}

/**
 * Fetches expense summary totals.
 */
export async function fetchSummary(): Promise<ExpenseSummary> {
  const response = await fetch(API_ROUTES.summary, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(await parseErrorResponse(response));
  }

  const body = (await response.json()) as ApiResponse<ExpenseSummary>;
  return body.data;
}

/**
 * Creates a new expense via the API.
 */
export async function createExpenseRequest(
  input: ExpenseInput
): Promise<Expense> {
  const response = await fetch(API_ROUTES.expenses, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(await parseErrorResponse(response));
  }

  const body = (await response.json()) as ApiResponse<Expense>;
  return body.data;
}

/**
 * Updates an existing expense via the API.
 */
export async function updateExpenseRequest(
  id: string,
  input: ExpenseInput
): Promise<Expense> {
  const response = await fetch(API_ROUTES.expenseById(id), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(await parseErrorResponse(response));
  }

  const body = (await response.json()) as ApiResponse<Expense>;
  return body.data;
}

/**
 * Deletes an expense via the API.
 */
export async function deleteExpenseRequest(id: string): Promise<void> {
  const response = await fetch(API_ROUTES.expenseById(id), {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(await parseErrorResponse(response));
  }
}

/**
 * Registers a new user account.
 */
export async function registerUserRequest(input: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await fetch(API_ROUTES.register, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(await parseErrorResponse(response));
  }

  return response.json();
}
