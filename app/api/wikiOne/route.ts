import { AuthOptions, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from 'next/server';
import { authOptions, handler } from "../auth/[...nextauth]/route";
import connectDB from "../../../lib/mongodb";

// Connect to the MongoDB database
connectDB();

export async function POST(request: NextRequest, { params }) {
  try {
    // Retrieve the tag from the request JSON body
    const { tag } = await request.json();

    // Wikipedia API URL
    const url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=${tag}`;

    // Get the user session
    const session = await getServerSession(authOptions as AuthOptions);

    if (session) {
      // Fetch data from the Wikipedia API
      const resp = await fetch(url);

      // Define a function to extract contents from the API response
      const extractAPIContents = (json) => {
        const { pages } = json.query;
        return Object.keys(pages).map(id => pages[id].extract);
      };

      // Parse the API response as JSON
      const json = await resp.json();
      const contents = extractAPIContents(json);

      // Respond with the saved Wiki data
      const response = NextResponse.json({
        contents: contents,
        success: true,
        text: tag,
        email: session.user.email
      });

      return response;
    } else {
      // User is not logged in, return a 404 status and message
      return { message: "Not logged in", customStatus: "404" };
    }
  } catch (error) {
    // Handle unexpected errors and return a 500 Internal Server Error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

