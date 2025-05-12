import useAuth from "../hooks/useAuth";
import styles from "../styles/Login.module.css";

export default function Login() {
  const {
    signIn,
    email,
    setEmail,
    password,
    setPassword,
    error,
    signedIn,
    user,
  } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn();
  };

  if (signedIn) {
    return <p style={{ color: "green" }}>Du er logget ind som {user?.name}</p>;
  }

  return (
    <form className={styles.loginContainer} onSubmit={handleSubmit}>
      <h2>Log ind som admin</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Adgangskode"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log ind</button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
