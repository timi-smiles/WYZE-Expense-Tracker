import { registerUser } from "@/lib/actions/auth";
import {
  errorResponse,
  handleApiError,
  successResponse,
} from "@/lib/utils/api-response";
import { parseJsonBody } from "@/lib/validators/expense";

/**
 * POST /api/auth/register — creates a new user account.
 */
export async function POST(request: Request) {
  try {
    const parsedBody = await parseJsonBody(request);

    if ("error" in parsedBody) {
      return errorResponse(parsedBody.error, 400);
    }

    const body = parsedBody.data;

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return errorResponse("Invalid request body.", 400);
    }

    const record = body as Record<string, unknown>;

    const result = await registerUser({
      name: typeof record.name === "string" ? record.name : "",
      email: typeof record.email === "string" ? record.email : "",
      password: typeof record.password === "string" ? record.password : "",
    });

    if (!result.success || !result.user) {
      return errorResponse("Registration failed.", 400, result.errors);
    }

    return successResponse(result.user, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
