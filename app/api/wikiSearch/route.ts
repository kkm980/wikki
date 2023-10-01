import { AuthOptions, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import connectDB from "../../../lib/mongodb";
import { authOptions } from "../auth/[...nextauth]/route";

// Connect to the MongoDB database
connectDB();

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    // Extract the 'searchValue' from the JSON request body
    const { searchValue } = await request.json();

    // Construct the Wikipedia API URL based on the search value
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchValue}&origin=*&format=json`;

    // Get the user session using Next.js authentication
    const session = await getServerSession(authOptions as AuthOptions);

    if (!session) {
      // If the user is not logged in, return a 401 Unauthorized response
      return NextResponse.json({ message: "Not logged in" }, { status: 401 });
    }

    // Make a GET request to the Wikipedia API
    const resp = await axios.get(url);

    if (resp.status === 200) {
      // Extract and save relevant data from the Wikipedia API response
      const responseData = resp.data.query.search;
      // Create an array to store saved Wiki documents
      const savedWikis = [];

      // Iterate through responseData and save each Wiki document
      for (let i = 0; i < responseData.length; i++) {
        
        savedWikis.push({
          contents: responseData[i].snippet, // Adjust this to the correct field in your API response
          success: true,
          email: session.user.email,
          text: responseData[i].title
        });
      }

      // Return the saved Wiki documents as a JSON response
      return NextResponse.json(savedWikis);
    } else {
      // Handle errors when fetching data from the Wikipedia API
      return NextResponse.json({ message: "Error fetching data" }, { status: 505 });
    }
  } catch (error: any) {
    // Handle unexpected errors and return a 500 Internal Server Error response
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
