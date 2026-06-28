import { NextResponse } from "next/server";
import type { ApiError } from "@/types/expense";

/**
 * Returns a standardized JSON success response.
 */
export function successResponse<T>(data: T, status = 200): NextResponse {
  return NextResponse.json({ data }, { status });
}

/**
 * Returns a standardized JSON error response without exposing internal details.
 */
export function errorResponse(
  message: string,
  status: number,
  details?: string[]
): NextResponse {
  const body: ApiError = { error: message };

  if (details?.length) {
    body.details = details;
  }

  return NextResponse.json(body, { status });
}

/**
 * Handles unexpected errors and maps known Prisma errors to safe responses.
 */
export function handleApiError(error: unknown): NextResponse {
  console.error("[API Error]", error);

  if (isPrismaNotFoundError(error)) {
    return errorResponse("Resource not found.", 404);
  }

  return errorResponse("Something went wrong. Please try again later.", 500);
}

function isPrismaNotFoundError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2025"
  );
}
