import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("⚠️ Debes definir MONGODB_URI en tu archivo .env.local");
}

// Usamos una variable global para cachear la conexión
let cached = (global as any).mongoose || { conn: null, promise: null };

export default async function dbConnect() {
  if (cached.conn) {
    return cached.conn; // si ya está conectado, lo devuelve
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  (global as any).mongoose = cached;
  return cached.conn;
}