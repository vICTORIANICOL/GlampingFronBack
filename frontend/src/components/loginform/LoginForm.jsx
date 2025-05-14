import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validationSchema";
import UseAuth from "../hooks/useAuth";
import { toast } from "react-toastify"; //
import styles from "./loginForm.module.css";

const LoginForm = () => {
  const { signIn, isLoading, error } = UseAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // ✅ Updated onSubmit with toast messages
  const onSubmit = async (data) => {
    try {
      const result = await signIn(data.email, data.password);
      console.log("Login result:", result);
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Noget gik galt!");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <h2>Sign In</h2>

        <input type="email" placeholder="Email" {...register("email")} />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}

        <button className={styles.loginBtn} disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
