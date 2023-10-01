import { AuthOptions, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from 'next/server';
import connectDB from "../../../lib/mongodb";
import mongoose from "mongoose";
import axios from 'axios';
import { authOptions } from "../auth/[...nextauth]/route";

// Connect to the MongoDB database
connectDB();

// Define the Mongoose schema for the Wiki data
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const wikiSchema = new Schema({
  contents: Schema.Types.Mixed, // Mixed type allows storing various data types
  success: Boolean,
  text: String,
  email: String,
}, { timestamps: true });

// Define the Mongoose model for Wiki
const Wiki = mongoose.models.wiki || mongoose.model("wiki", wikiSchema);

export async function POST(request: NextRequest, { params }) {
  try {
    // Parse the request JSON body to extract the "date" parameter
    const { date } = await request.json();

    // Retrieve the user session
    const session = await getServerSession(authOptions as AuthOptions);

    // Initialize the dateInfo with the current date and time
    let dateInfo = new Date();

    if (session) {
      // Extract the user's email from the session
      const email = session.user.email;

      // Calculate the date range based on the selected "date" parameter
      switch (date) {
        case 'day':
          dateInfo.setDate(dateInfo.getDate() - 1);
          break;
        case 'week':
          dateInfo.setDate(dateInfo.getDate() - 7);
          break;
        case 'month':
          dateInfo.setMonth(dateInfo.getMonth() - 1);
          break;
        case 'hour':
          dateInfo.setHours(dateInfo.getHours() - 1);
        default:
          break;
      }

      // Find wikis created by the user within the specified date range
      const wikis = await Wiki.find({
        email,
        createdAt: { $gte: dateInfo }
      }).sort({ createdAt: -1 });

      // Return a JSON response with the retrieved wikis
      return NextResponse.json(wikis);
    } else {
      // Handle errors when there is no user session
      return { message: "User session not found", customStatus: "401" };
    }
  } catch (error: any) {
    // Handle unexpected errors and return a 500 Internal Server Error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}