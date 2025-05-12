import express from "express";
import cors from "cors";
import dbConnect from "./dbConnect.js";
import dotenv from "dotenv";

// Routes
import stayRoutes from "./routes/stay.route.js";
import activityRoutes from "./routes/activity.route.js";
import reviewRoutes from "./routes/review.route.js";
import userRoutes from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

// Indlæs miljøvariabler
dotenv.config({ path: `.env.local`, override: true });

// Opret Express-server
const app = express();
const PORT = process.env.SERVER_PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/stays", stayRoutes);
app.use("/activities", activityRoutes);
app.use("/reviews", reviewRoutes);
app.use("/users", userRoutes);
app.use(authRouter);



// Root route
app.get("/", (req, res) => {
  res.send("🌲Glamping API er live! 🌄");
});

// Start server & connect DB
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Serveren kører på http://localhost:${PORT}`);
  });
});
