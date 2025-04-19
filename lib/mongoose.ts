import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

const MONGODB_URI = process.env.MONGODB_URI;

// Set max listeners to prevent warning
mongoose.connection.setMaxListeners(20);

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
    };

    mongoose.set("strictQuery", true);

    try {
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log("MongoDB connected successfully");
        return mongoose;
      });
    } catch (error) {
      console.error("MongoDB connection error:", error);
      cached.promise = null;
      throw error;
    }
  }
  try {
    cached.conn = (await cached.promise).connection;
  } catch (e) {
    cached.promise = null;
    console.error("Failed to establish MongoDB connection:", e);
    throw e;
  }

  return cached.conn;
}

// Remove existing listeners before adding new ones
mongoose.connection.removeAllListeners();

// Add connection error handlers
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Handle process termination
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed through app termination");
    process.exit(0);
  } catch (err) {
    console.error("Error closing MongoDB connection:", err);
    process.exit(1);
  }
});

export default dbConnect;
