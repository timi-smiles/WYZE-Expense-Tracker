import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";

const MIN_PASSWORD_LENGTH = 8;
const BCRYPT_ROUNDS = 12;

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResult {
  success: boolean;
  errors?: string[];
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

/**
 * Validates registration input fields.
 */
export function validateRegisterInput(input: RegisterInput): string[] {
  const errors: string[] = [];
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();

  if (name.length < 2) {
    errors.push("Name must be at least 2 characters.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Please enter a valid email address.");
  }

  if (input.password.length < MIN_PASSWORD_LENGTH) {
    errors.push(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  }

  return errors;
}

/**
 * Creates a new user account with a hashed password.
 */
export async function registerUser(input: RegisterInput): Promise<RegisterResult> {
  const errors = validateRegisterInput(input);

  if (errors.length > 0) {
    return { success: false, errors };
  }

  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return { success: false, errors: ["An account with this email already exists."] };
  }

  const passwordHash = await bcrypt.hash(input.password, BCRYPT_ROUNDS);

  const user = await prisma.user.create({
    data: { name, email, passwordHash },
    select: { id: true, name: true, email: true },
  });

  return { success: true, user };
}
