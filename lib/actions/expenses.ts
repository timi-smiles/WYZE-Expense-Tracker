import { Category } from "@prisma/client";
import { CATEGORIES } from "@/lib/constants/categories";
import { prisma } from "@/lib/db/prisma";
import {
  getCurrentMonthRange,
  getPreviousMonthRange,
  parseExpenseDate,
  serializeExpense,
} from "@/lib/utils/format";
import type {
  DashboardData,
  ExpenseInput,
  ExpenseSummary,
} from "@/types/expense";

interface ExpenseFilters {
  category?: Category | null;
  search?: string | null;
}

/**
 * Retrieves all expenses for a user ordered by date descending.
 */
export async function getAllExpenses(userId: string, filters: ExpenseFilters = {}) {
  const { category, search } = filters;

  const expenses = await prisma.expense.findMany({
    where: {
      userId,
      ...(category ? { category } : {}),
      ...(search
        ? {
            OR: [
              { description: { contains: search, mode: "insensitive" } },
              { category: { equals: categoryFromSearch(search) } },
            ],
          }
        : {}),
    },
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });

  return expenses.map(serializeExpense);
}

/**
 * Retrieves a single expense by id for a specific user.
 */
export async function getExpenseById(userId: string, id: string) {
  const expense = await prisma.expense.findFirst({
    where: { id, userId },
  });

  return expense ? serializeExpense(expense) : null;
}

/**
 * Creates a new expense after validating the payload.
 */
export async function createExpense(userId: string, input: ExpenseInput) {
  const expense = await prisma.expense.create({
    data: {
      userId,
      amount: input.amount,
      category: input.category,
      description: input.description ?? "",
      date: parseExpenseDate(input.date)!,
    },
  });

  return serializeExpense(expense);
}

/**
 * Updates an existing expense by id for a specific user.
 */
export async function updateExpense(
  userId: string,
  id: string,
  input: ExpenseInput
) {
  const existing = await getExpenseById(userId, id);

  if (!existing) {
    return null;
  }

  const expense = await prisma.expense.update({
    where: { id },
    data: {
      amount: input.amount,
      category: input.category,
      description: input.description ?? "",
      date: parseExpenseDate(input.date)!,
    },
  });

  return serializeExpense(expense);
}

/**
 * Deletes an expense by id for a specific user.
 */
export async function deleteExpense(userId: string, id: string) {
  const existing = await getExpenseById(userId, id);

  if (!existing) {
    return false;
  }

  await prisma.expense.delete({ where: { id } });
  return true;
}

/**
 * Builds expense summary totals for all time and the current month.
 */
export async function getExpenseSummary(userId: string): Promise<ExpenseSummary> {
  const { start, end } = getCurrentMonthRange();

  const [totalAggregate, monthlyAggregate, groupedTotals, monthlyGrouped] =
    await Promise.all([
    prisma.expense.aggregate({
      where: { userId },
      _sum: { amount: true },
    }),
    prisma.expense.aggregate({
      where: { userId, date: { gte: start, lte: end } },
      _sum: { amount: true },
    }),
    prisma.expense.groupBy({
      by: ["category"],
      where: { userId },
      _sum: { amount: true },
    }),
    prisma.expense.groupBy({
      by: ["category"],
      where: { userId, date: { gte: start, lte: end } },
      _sum: { amount: true },
    }),
  ]);

  const totalsByCategory = new Map(
    groupedTotals.map((item) => [item.category, Number(item._sum.amount ?? 0)])
  );
  const monthlyTotalsByCategory = new Map(
    monthlyGrouped.map((item) => [item.category, Number(item._sum.amount ?? 0)])
  );

  return {
    total: Number(totalAggregate._sum.amount ?? 0),
    monthlyTotal: Number(monthlyAggregate._sum.amount ?? 0),
    byCategory: CATEGORIES.map((category) => ({
      category,
      total: totalsByCategory.get(category) ?? 0,
    })),
    monthlyByCategory: CATEGORIES.map((category) => ({
      category,
      total: monthlyTotalsByCategory.get(category) ?? 0,
    })),
  };
}

/**
 * Loads dashboard metrics including insights-friendly aggregates.
 */
export async function getDashboardData(
  userId: string,
  filters: ExpenseFilters = {}
): Promise<DashboardData> {
  const { start, end } = getCurrentMonthRange();
  const { start: prevStart, end: prevEnd } = getPreviousMonthRange();

  const [
    summary,
    expenses,
    monthlyCount,
    lastMonthAggregate,
    largestThisMonth,
  ] = await Promise.all([
    getExpenseSummary(userId),
    getAllExpenses(userId, filters),
    prisma.expense.count({
      where: { userId, date: { gte: start, lte: end } },
    }),
    prisma.expense.aggregate({
      where: { userId, date: { gte: prevStart, lte: prevEnd } },
      _sum: { amount: true },
    }),
    prisma.expense.findFirst({
      where: { userId, date: { gte: start, lte: end } },
      orderBy: { amount: "desc" },
    }),
  ]);

  const lastMonthTotal = Number(lastMonthAggregate._sum.amount ?? 0);
  const monthlyChangePercent =
    lastMonthTotal === 0
      ? null
      : ((summary.monthlyTotal - lastMonthTotal) / lastMonthTotal) * 100;

  const topCategory = [...summary.monthlyByCategory]
    .filter((item) => item.total > 0)
    .sort((a, b) => b.total - a.total)[0];

  return {
    summary,
    expenses,
    insights: {
      monthlyCount,
      lastMonthTotal,
      monthlyChangePercent,
      topCategory: topCategory ?? null,
      largestExpenseThisMonth: largestThisMonth
        ? serializeExpense(largestThisMonth)
        : null,
    },
  };
}

function categoryFromSearch(search: string): Category | undefined {
  const normalized = search.trim().toLowerCase();
  return CATEGORIES.find((category) => category.toLowerCase() === normalized);
}
