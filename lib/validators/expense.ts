import { Category } from "@prisma/client";
import { CATEGORIES } from "@/lib/constants/categories";
import { parseExpenseDate } from "@/lib/utils/format";
import type { ExpenseInput } from "@/types/expense";

export interface ValidationResult {
  success: boolean;
  data?: ExpenseInput;
  errors?: string[];
}

/**
 * Safely parses JSON from a request body.
 */
export async function parseJsonBody(
  request: Request
): Promise<{ data: unknown } | { error: string }> {
  try {
    const data = await request.json();
    return { data };
  } catch {
    return { error: "Malformed JSON in request body." };
  }
}

/**
 * Validates expense input for create and update operations.
 */
export function validateExpenseInput(body: unknown): ValidationResult {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {
      success: false,
      errors: ["Request body must be a JSON object."],
    };
  }

  const record = body as Record<string, unknown>;
  const errors: string[] = [];

  const amount = parseAmount(record.amount);
  if (amount === null) {
    errors.push("Amount must be a positive number.");
  }

  const category = parseCategory(record.category);
  if (!category) {
    errors.push("Category is required and must be a valid value.");
  }

  const date = parseDateField(record.date);
  if (!date) {
    errors.push("Date is required and must be in YYYY-MM-DD format.");
  }

  const description = parseDescription(record.description);

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      amount: amount as number,
      category: category as Category,
      description,
      date: date as string,
    },
  };
}

function parseAmount(value: unknown): number | null {
  const amount = typeof value === "string" ? Number(value) : value;

  if (typeof amount !== "number" || Number.isNaN(amount) || amount <= 0) {
    return null;
  }

  return Math.round(amount * 100) / 100;
}

function parseCategory(value: unknown): Category | null {
  if (typeof value !== "string") {
    return null;
  }

  return CATEGORIES.includes(value as Category) ? (value as Category) : null;
}

function parseDateField(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const parsed = parseExpenseDate(value);

  if (!parsed) {
    return null;
  }

  return value;
}

function parseDescription(value: unknown): string {
  if (value === undefined || value === null) {
    return "";
  }

  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, 500);
}
