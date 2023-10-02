import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import mongoose from "mongoose";
import connectDB from "../../../../lib/mongodb";

// Connect to the MongoDB database
connectDB();

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

// Define the user schema
const userSchema = new Schema({
  name: String,
  photo: String,
  access_token: String,
  id_token: String,
  accountId: String,
  email_verified: Boolean,
  email: String,
  role: {
    type: String, // Change this line to specify the type as "String"
    enum: ["admin", "user"],
    default: "user",
  },
}, { timestamps: true });

// Create the User model
const User = mongoose.models.user || mongoose.model("user", userSchema);

// Configure authentication options
export const authOptions = {
  secret: "next-auth-secret",
  providers: [
    GoogleProvider({
      clientId: "415607369128-qnj90obcj6lq10bumn3qbd5q3ijreb04.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        // Check if the user already exists in the database
        const isUserExist = await User.findOne({ email: profile?.email });
        if (isUserExist) return true;

        // Create a new user if they don't exist
        const newUser = new User({
          name: profile?.name,
          access_token: account?.access_token,
          accountId: account?.providerAccountId,
          email_verified: profile?.email_verified,
          email: profile?.email,
          id_token: account?.id_token,
          photo: profile?.picture,
        });
        await newUser.save();
        return true;
      }
      return true;
    },
  },
};

// Export the authentication handler
export const handler = NextAuth(authOptions as AuthOptions);

// Export the authentication handler for GET and POST requests
export { handler as GET, handler as POST };
