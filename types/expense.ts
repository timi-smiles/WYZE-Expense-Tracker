import { Category } from "@prisma/client";

export type { Category };

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseInput {
  amount: number;
  category: Category;
  description?: string;
  date: string;
}

export interface CategorySummary {
  category: Category;
  total: number;
}

export interface ExpenseSummary {
  total: number;
  monthlyTotal: number;
  byCategory: CategorySummary[];
  monthlyByCategory: CategorySummary[];
}

export interface ExpenseInsights {
  monthlyCount: number;
  lastMonthTotal: number;
  monthlyChangePercent: number | null;
  topCategory: CategorySummary | null;
  largestExpenseThisMonth: Expense | null;
}

export interface DashboardData {
  summary: ExpenseSummary;
  expenses: Expense[];
  insights: ExpenseInsights;
}

export interface ApiError {
  error: string;
  details?: string[];
}

export interface ApiSuccess<T> {
  data: T;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}
