import styles from "./userCard.module.css";
import useAuth from "../../hooks/useAuth";

export default function UserCard() {
  const { user, signedIn, signOut } = useAuth();

  if (!signedIn) return null;

  return (
    <div className={styles.card}>
      <p>
        Logged in as <strong>{user?.email || "User"}</strong>
      </p>
      <button className={styles.logoutBtn} onClick={signOut}>
        Log out
      </button>
    </div>
  );
}
