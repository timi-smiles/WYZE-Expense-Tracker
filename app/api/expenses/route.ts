import { NextRequest } from "next/server";
import { Category } from "@prisma/client";
import { createExpense, getAllExpenses } from "@/lib/actions/expenses";
import { requireSession } from "@/lib/auth/session";
import { MESSAGES } from "@/lib/constants/messages";
import {
  errorResponse,
  handleApiError,
  successResponse,
} from "@/lib/utils/api-response";
import {
  parseJsonBody,
  validateExpenseInput,
} from "@/lib/validators/expense";

/**
 * GET /api/expenses — list expenses for the authenticated user.
 */
export async function GET(request: NextRequest) {
  try {
    const { session, unauthorized } = await requireSession();
    if (unauthorized) return unauthorized;

    const categoryParam = request.nextUrl.searchParams.get("category");
    const search = request.nextUrl.searchParams.get("search");
    let category: Category | null = null;

    if (categoryParam) {
      if (!Object.values(Category).includes(categoryParam as Category)) {
        return errorResponse("Invalid category filter.", 400);
      }

      category = categoryParam as Category;
    }

    const expenses = await getAllExpenses(session.user.id, {
      category,
      search,
    });

    return successResponse(expenses);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/expenses — create a new expense for the authenticated user.
 */
export async function POST(request: Request) {
  try {
    const { session, unauthorized } = await requireSession();
    if (unauthorized) return unauthorized;

    const parsedBody = await parseJsonBody(request);

    if ("error" in parsedBody) {
      return errorResponse(parsedBody.error, 400);
    }

    const validation = validateExpenseInput(parsedBody.data);

    if (!validation.success || !validation.data) {
      return errorResponse(
        MESSAGES.validationFailed,
        400,
        validation.errors
      );
    }

    const expense = await createExpense(session.user.id, validation.data);
    return successResponse(expense, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
