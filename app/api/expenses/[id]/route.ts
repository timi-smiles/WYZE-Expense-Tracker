import {
  deleteExpense,
  getExpenseById,
  updateExpense,
} from "@/lib/actions/expenses";
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

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/expenses/:id — retrieve a single expense for the authenticated user.
 */
export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { session, unauthorized } = await requireSession();
    if (unauthorized) return unauthorized;

    const { id } = await params;
    const expense = await getExpenseById(session.user.id, id);

    if (!expense) {
      return errorResponse(MESSAGES.expenseNotFound, 404);
    }

    return successResponse(expense);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT /api/expenses/:id — update an existing expense for the authenticated user.
 */
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { session, unauthorized } = await requireSession();
    if (unauthorized) return unauthorized;

    const { id } = await params;
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

    const expense = await updateExpense(
      session.user.id,
      id,
      validation.data
    );

    if (!expense) {
      return errorResponse(MESSAGES.expenseNotFound, 404);
    }

    return successResponse(expense);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE /api/expenses/:id — remove an expense for the authenticated user.
 */
export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const { session, unauthorized } = await requireSession();
    if (unauthorized) return unauthorized;

    const { id } = await params;
    const deleted = await deleteExpense(session.user.id, id);

    if (!deleted) {
      return errorResponse(MESSAGES.expenseNotFound, 404);
    }

    return successResponse({ message: MESSAGES.expenseDeleted });
  } catch (error) {
    return handleApiError(error);
  }
}
