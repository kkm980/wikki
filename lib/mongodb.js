// mongoose.js

import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://kantk9802:n3087u8lXAldfLgF@wikki.pgck4dq.mongodb.net/";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
