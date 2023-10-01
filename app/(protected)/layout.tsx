import { AuthOptions, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

// Define a React component named RootLayout
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Retrieve the user session from the server using getServerSession
  const session = await getServerSession(authOptions as AuthOptions);

  // Check if there's no session or no user in the session
  if (!session || !session.user) {
    // Redirect to the signin route if not authenticated
    redirect("/api/auth/signin");
  }

  // Render the main content within a <main> element
  return <main>{children}</main>;
}

