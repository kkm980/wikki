import { AuthOptions, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from 'next/server';
import { authOptions, handler } from "../auth/[...nextauth]/route";
import axios from 'axios'; // Use ES6 import syntax
import connectDB from "../../../lib/mongodb";
import mongoose from "mongoose";

// Connect to the MongoDB database
connectDB();

const Schema = mongoose.Schema;

// Define the schema with the timestamps option
const wikiSchema = new Schema({
  contents: Schema.Types.Mixed,
  success: Boolean,
  text: String,
  email: String
}, { timestamps: true });

// Create the model
const Wiki = mongoose.models.wiki || mongoose.model("wiki", wikiSchema);

export async function POST(request: NextRequest, { params }) {
  try {
    // Retrieve the tag from the request JSON body
    const { tag } = await request.json();

    // Get the user session
    const session = await getServerSession(authOptions as AuthOptions);

    if (session) {

      // Create a new Wiki document
      const new_wiki = new Wiki({
        contents: tag.contents,
        success: tag.success||true,
        text: tag.text,
        email: session.user.email
      });

      // Save the Wiki document to the database
      const savedWiki = await new_wiki.save();

      // Respond with the saved Wiki data
      const response = NextResponse.json(savedWiki);

      return response;
    } else {
      // User is not logged in, return a 404 status and message
      // return { message: "Not logged in", customStatus: "404" };
      return NextResponse.json({ error: "Not loggedin" }, { status: 404 });
    }
  } catch (error) {
    // Handle unexpected errors and return a 500 Internal Server Error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}