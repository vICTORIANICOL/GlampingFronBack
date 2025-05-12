import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import styles from "./feedback.module.css";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("http://localhost:5000/reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Fejl ved hentning af reviews:", err);
      }
    }

    fetchReviews();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.badge}>
        <h2 className={styles.heading}>Vores gæster <br /> udtaler</h2>
    	</div>

      {reviews.map((review) => (
        <ReviewCard
          key={review._id}
          name={review.name}
          age={review.age}
          type={review.stay}
        >
          {review.review}
        </ReviewCard>
      ))}
    </section>
  );
}
