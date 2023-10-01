// authMiddleware.ts

import { AuthOptions, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

// Define a custom property on the NextRequest type
declare module "next/server" {
  interface NextRequest {
    userEmail?: string;
  }
}

export async function checkAuthMiddleware(request: NextRequest, response: NextResponse, next: () => void) {
  // Check if the user is logged in using the Next.js session
  const session = await getServerSession(authOptions as AuthOptions);

  // If the user is not logged in, continue with the next middleware or route
  if (!session?.user?.email) {
    return next();
  }

  // If the user is logged in, set the user's email in the request query parameters
  request.nextUrl.searchParams.set("userEmail", session?.user.email);
  next();
}

