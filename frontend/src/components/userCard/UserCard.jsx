import { useAuthContext } from "../../context/AuthContext";
import styles from "./userCard.module.css";

export default function UserCard() {
  const { user, signedIn, signOut } = useAuthContext();

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
