// Mongoose-biblioteket, som bruges til at forbinde og arbejde med MongoDB
import mongoose from "mongoose";
import * as dotenv from "dotenv";

// Indlæser miljøvariabler fra filen .env.local – og tillader overskrivning
dotenv.config({ path: `.env.local`, override: true });

// Tjekker om MONGODB_URI er defineret i .env.local – ellers stopper koden med fejl
if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Her bruger vi en global variabel til at "cache" forbindelsen.
// Det forhindrer, at der oprettes nye forbindelser hver gang serveren genstarter.
let cached = global.mongoose;

// Hvis global.mongoose ikke er sat endnu, initialiserer vi det som et objekt
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Asynkron funktion, som opretter forbindelsen til databasen
async function dbConnect() {
  // Hvis vi allerede har en aktiv forbindelse, returnér den
  if (cached.conn) {
    return cached.conn;
  }

  // Hvis der ikke allerede er et løfte (promise) om en forbindelse i gang
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Slår buffering fra, så fejl vises med det samme hvis der ikke er forbindelse
    };

    // Her oprettes forbindelsen – og vi gemmer promise’en i cache
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("Connected to MongoDB", process.env.MONGODB_URI);
        return mongoose;
      });
  }

  // Når promise’en er færdig, gemmes forbindelsen i cache
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    // Hvis forbindelsen fejler, nulstiller vi promise, så vi kan prøve igen næste gang
    cached.promise = null;
    throw e;
  }

  // Returnér den aktive forbindelse
  return cached.conn;
}

// Eksporterer funktionen, så den kan bruges i andre filer (fx handleren)
export default dbConnect;
