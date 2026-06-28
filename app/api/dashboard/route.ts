import { NextRequest } from "next/server";
import { Category } from "@prisma/client";
import { getDashboardData } from "@/lib/actions/expenses";
import { requireSession } from "@/lib/auth/session";
import {
  errorResponse,
  handleApiError,
  successResponse,
} from "@/lib/utils/api-response";

/**
 * GET /api/dashboard — returns summary, expenses, and insight metrics for the user.
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

    const data = await getDashboardData(session.user.id, { category, search });
    return successResponse(data);
  } catch (error) {
    return handleApiError(error);
  }
}
