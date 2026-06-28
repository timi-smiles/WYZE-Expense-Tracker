import { getExpenseSummary } from "@/lib/actions/expenses";
import { requireSession } from "@/lib/auth/session";
import { handleApiError, successResponse } from "@/lib/utils/api-response";

/**
 * GET /api/summary — returns total and per-category expense totals for the user.
 */
export async function GET() {
  try {
    const { session, unauthorized } = await requireSession();
    if (unauthorized) return unauthorized;

    const summary = await getExpenseSummary(session.user.id);
    return successResponse(summary);
  } catch (error) {
    return handleApiError(error);
  }
}
