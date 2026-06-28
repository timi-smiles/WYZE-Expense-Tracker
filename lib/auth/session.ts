import { auth } from "@/auth";
import { errorResponse } from "@/lib/utils/api-response";

/**
 * Returns the authenticated session or a 401 response.
 */
export async function requireSession() {
  const session = await auth();

  if (!session?.user?.id) {
    return { session: null, unauthorized: errorResponse("Unauthorized.", 401) };
  }

  return { session, unauthorized: null };
}
