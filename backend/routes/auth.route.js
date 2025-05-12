import express from "express";
import { signInUser } from "../handlers/auth.handler.js";

const authRoute = express.Router();

// Post login-data
authRoute.post("/auth/signin", async (req, res) => {
  try {
    const result = await signInUser(req.body);

    if (result.status === "error") {
      return res.status(result.code || 400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Unexpected error during sign-in:", error);
    return res.status(500).json({
      status: "error",
      message: "Unexpected server error",
    });
  }
});

export default authRoute;


