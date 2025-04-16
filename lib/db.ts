import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

let cached: {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
} = {
  conn: null,
  promise: null
};

async function dbConnect() {
  try {
    if (cached.conn) {
      console.log('Using cached database connection');
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      };

      console.log('Connecting to MongoDB...');
      cached.promise = mongoose.connect(MONGODB_URI!, opts);
    }

    try {
      cached.conn = await cached.promise;
      console.log('Successfully connected to MongoDB');
    } catch (e) {
      cached.promise = null;
      console.error('MongoDB connection error:', e);
      throw e;
    }

    return cached.conn;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

export default dbConnect;