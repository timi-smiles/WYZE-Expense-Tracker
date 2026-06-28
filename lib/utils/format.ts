import type { Expense as PrismaExpense } from "@prisma/client";
import type { Expense } from "@/types/expense";

/**
 * Strips invalid characters and limits decimal places while typing an amount.
 */
export function sanitizeAmountInput(raw: string): string {
  const cleaned = raw.replace(/[^\d.]/g, "");

  if (!cleaned) {
    return "";
  }

  const dotIndex = cleaned.indexOf(".");

  if (dotIndex === -1) {
    return cleaned;
  }

  const whole = cleaned.slice(0, dotIndex);
  const decimal = cleaned.slice(dotIndex + 1).replace(/\./g, "").slice(0, 2);

  if (cleaned.endsWith(".") && decimal.length === 0) {
    return `${whole}.`;
  }

  return decimal.length > 0 ? `${whole}.${decimal}` : whole;
}

/**
 * Normalizes a typed amount to two decimal places for display and storage.
 */
export function formatAmountInput(value: string): string {
  const trimmed = value.trim();

  if (!trimmed || trimmed === ".") {
    return "";
  }

  const amount = Number.parseFloat(trimmed);

  if (Number.isNaN(amount)) {
    return "";
  }

  return amount.toFixed(2);
}

/**
 * Formats a currency value for display in Nigerian Naira (NGN).
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats an ISO date string for readable display.
 */
export function formatDate(dateString: string): string {
  const date = new Date(`${dateString}T00:00:00`);

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

/**
 * Returns today's date as YYYY-MM-DD in local time.
 */
export function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/**
 * Returns the first and last day of the current month as Date objects.
 */
export function getCurrentMonthRange(): { start: Date; end: Date } {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return { start, end };
}

/**
 * Returns the first and last day of the previous month as Date objects.
 */
export function getPreviousMonthRange(): { start: Date; end: Date } {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const end = new Date(now.getFullYear(), now.getMonth(), 0);

  return { start, end };
}

/**
 * Converts a Prisma expense record into an API-safe shape with numeric amount.
 */
export function serializeExpense(expense: PrismaExpense): Expense {
  return {
    id: expense.id,
    amount: Number(expense.amount),
    category: expense.category,
    description: expense.description,
    date: expense.date.toISOString().slice(0, 10),
    createdAt: expense.createdAt.toISOString(),
    updatedAt: expense.updatedAt.toISOString(),
  };
}

/**
 * Parses a YYYY-MM-DD string into a Date suitable for Prisma date fields.
 */
export function parseExpenseDate(dateString: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return null;
  }

  const date = new Date(`${dateString}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}
