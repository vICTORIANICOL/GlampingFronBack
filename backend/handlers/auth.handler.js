// bcryptjs er et JavaScript-bibliotek, der bruges til at hashe og validere adgangskoder (passwords) på en sikker måde
import bcryptjs from "bcryptjs";
// JWT står for JSON Web Token, og bruges til at sende sikker og verificerbar information mellem to parter som et JSON-objekt.
import jwt from "jsonwebtoken";
// import userModel from "../models/user.model.js";
import dbConnect from "../dbConnect.js";

// Funktion til at logge en bruger ind, baseret på credentials (email og password)
export const signInUser = async (credentials) => {
  try {
    // Sørg for at der er forbindelse til databasen
    await dbConnect();

    // Find brugeren i databasen ud fra den angivne email

    /* NÅR I HAR LAVET MODELLEN KAN DETTE INDKOMMENTERES */

    // const user = await userModel.findOne({ email: credentials.email });

    /* TEST UDEN MODEL - NÅR I HAR LAVET MODELLEN KAN DETTE SLETTES */
    const hashedPassword = await bcryptjs.hash("admin", 10); // lav en hash til testbrug
    const user = {
      email: "media@college.com",
      hashedPassword,
      name: "Test User",
      role: "admin",
      image: "https://via.placeholder.com/150",
    };

    /* TEST SLUT */

    // Hvis brugeren ikke findes, returnér en fejl
    if (!user) {
      return {
        status: "error",
        message: "Invalid email or password",
        data: null,
        code: 401, // HTTP-statuskode for "Unauthorized"
      };
    }

    // Sammenlign den indtastede adgangskode med den hash'ede adgangskode fra databasen
    const validPass = await bcryptjs.compare(
      credentials.password,
      user.hashedPassword
    );

    // Hvis adgangskoden ikke matcher, returnér fejl
    if (!validPass) {
      return {
        status: "error",
        message: "Invalid email or password",
        data: null,
        code: 401,
      };
    }

    // Hent JWT-secret fra miljøvariabler – skal bruges til at signere tokenet
    const jwtSecret = process.env.JWT_SECRET;

    // Hent udløbstid for token (standard: 1 time, hvis ikke angivet)
    const jwtExpiry = process.env.JWT_EXPIRES_IN || "1h";

    // Hvis secret mangler, log fejl og returnér serverfejl
    if (!jwtSecret) {
      console.error("Missing JWT_SECRET in environment variables");
      return {
        status: "error",
        message: "Server configuration error",
        data: null,
        code: 500,
      };
    }

    // Opret JWT-token med relevante brugerdata (kun det nødvendige!)
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
        image: user.image,
        role: user.role,
      },
      jwtSecret, // signering med hemmelig nøgle
      { expiresIn: jwtExpiry } // angiv hvor længe token er gyldig
    );

    // Hvis alt er OK, returnér succes og token
    return {
      status: "ok",
      message: `${user.role} signed in successfully`, // evt. "admin signed in successfully"
      data: { token }, // Token skal gemmes på klienten (f.eks. localStorage eller cookie)
      code: 200,
    };
  } catch (error) {
    console.error("Error in signInUser handler:", error);

    return {
      status: "error",
      message: "Internal server error",
      data: null,
      code: 500,
    };
  }
};
