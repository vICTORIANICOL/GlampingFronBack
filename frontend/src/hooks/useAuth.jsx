import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function useAuth() {
  const [auth, setAuth] = useLocalStorage("auth", {});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const token = auth?.token || "";
  const signedIn = !!token;

  let user = null;
  if (token) {
    try {
      user = jwtDecode(token);
    } catch (err) {
      console.error("Ugyldig token:", err);
    }
  }

  const signIn = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:5000/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.status === "ok") {
        setAuth({ token: data.data.token });
        setEmail("");
        setPassword("");
      } else {
        setError(data.message || "Login fejlede");
      }
    } catch (err) {
      console.error("Login-fejl:", err);
      setError("Serverfejl");
    }
  };

  const signOut = () => {
    setAuth({});
  };

  return {
    signIn,
    signOut,
    token,
    user,
    signedIn,
    email,
    setEmail,
    password,
    setPassword,
    error,
  };
}