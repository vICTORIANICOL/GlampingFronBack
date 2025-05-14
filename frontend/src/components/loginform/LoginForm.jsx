import UseAuth from "../hooks/useAuth";
import styles from "./loginForm.module.css";

const LoginForm = () => {
  const { email, setEmail, setPassword, isLoading, error, signIn } = UseAuth();

  return (
    <div className={styles.container}>
      <form onSubmit={signIn}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <h2>Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} //sets the value of the password state variable to the value of the input field
        />

        <button className={styles.loginBtn} type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
