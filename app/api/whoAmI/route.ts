import { AuthOptions, getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions, handler } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    // Retrieve the user session
    const session = await getServerSession(authOptions as AuthOptions);

    // Check if a user session exists
    if (session && session.user) {
      // User is logged in, return user's name
      return NextResponse.json({ name: session.user.name });
    } else {
      // User is not logged in
      return NextResponse.json({ name: "Not Logged In" });
    }
  } catch (error: any) {
    // Handle unexpected errors and return a 500 Internal Server Error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
