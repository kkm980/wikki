import { AuthOptions, getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  // Retrieve the user session
  const session = await getServerSession(authOptions as AuthOptions);

  // Log the user's email
  console.log(session?.user?.email, "user email");

  // Return a JSON response with the user's email
  return NextResponse.json({ name: session?.user?.email });
}