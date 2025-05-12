import styles from "./ReviewCard.module.css";

export default function ReviewCard({ name, age, type, children }) {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{name}, {age} år</p>
      <p className={styles.subtitle}>{type}</p>
      <p className={styles.text}>{children}</p>
    </div>
  );
}
