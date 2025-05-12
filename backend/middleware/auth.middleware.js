// JWT står for JSON Web Token, og det bruges til at sende sikker og verificerbar information mellem to parter som et JSON-objekt.
// Den bruges ofte i autentificering.
import jwt from "jsonwebtoken";

// Middleware-funktion til at håndtere autentificering via JWT (funktion der kører mellem request og response)
const auth = (req, res, next) => {
  // Tjekker om brug af JWT er slået til via miljøvariabel (USE_JWT)
  // Hvis USE_JWT er sat til "false", bruges der ikke auth-header

  const useAuthHeader = process.env.USE_JWT !== "false"; // String-sammenligning (vær opmærksom på at det er en tekstværdi)

  // Hvis autentificering ikke er slået til, gå videre til næste middleware/route
  if (!useAuthHeader) return next(); // Auth er deaktiveret

  // Henter Authorization-header fra HTTP-forespørgslen (typisk: "Bearer <token>")
  const tokenHeader = req.headers["authorization"];

  // Hvis der ikke findes en authorization-header, returnér fejl (401: Unauthorized)
  if (!tokenHeader) {
    return res
      .status(401)
      .json({ status: "error", message: "No access without token." });
  }

  // Splitter headeren og tager selve token-delen (efter "Bearer ")
  const token = tokenHeader.split(" ")[1];

  // Hvis token mangler i headeren (forkert format), returnér fejl
  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "Token format invalid." });
  }

  // Sikrer at hemmelig JWT-nøgle er sat i miljøvariabler (nødvendig for at validere token)
  if (!process.env.JWT_SECRET) {
    console.error("Missing JWT_SECRET in env");
    return res
      .status(500)
      .json({ status: "error", message: "Server configuration error" });
  }

  try {
    // Validerer tokenet med jwt.verify og den hemmelige nøgle
    // Hvis det er gyldigt, bliver token'et dekodet
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Gemmer den dekodede brugerinformation på req-objektet, så den er tilgængelig i resten af requesten
    req.user = decoded;

    // Går videre til næste middleware eller route-handler
    return next();
  } catch (err) {
    // Tokenet kunne ikke valideres – det er sandsynligvis udløbet eller ugyldigt
    console.error("Invalid token:", err);
    return res.status(401).json({
      status: "error",
      message: "Invalid token - please sign in again.",
    });
  }
};

// Eksporterer middleware-funktionen, så den kan bruges i fx Express-routes
export default auth;
