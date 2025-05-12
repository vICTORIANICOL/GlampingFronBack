import React from "react";
import { useParams } from "react-router-dom";
import staysData from "../../data/stays.json";
import styles from "./stayDetailPage.module.css"; // you'll create this CSS
import weekendImg from "../../assets/stays/weekend.jpg";
import familyImg from "../../assets/stays/familiepakken.jpg";
import tentImg from "../../assets/stays/tentlights.jpg";

const imageMap = {
  weekendtur: weekendImg,
  familiepakken: familyImg,
  romantiskgetaway: tentImg,
};

export default function StayDetailPage() {
  const { stayName } = useParams(); // expects a param like "weekendtur", "familiepakken", etc.

  const stay = staysData.stays.find(
    (s) => s.title.toLowerCase().replace(/\s/g, "") === stayName
  );

  const imageSrc = imageMap[stayName.toLowerCase()];

  if (!stay) return <p>Ophold ikke fundet</p>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.imageContainer}>
        <img src={imageSrc} alt={stay.title} className={styles.image} />
        <div className={styles.overlay}></div>
        <h1 className={styles.imageTitle}>{stay.title}</h1>
      </div>

      <div className={styles.descriptionBox}>
        <h1 className={styles.titleText}>
          Tag væk en weekend, med en du holder af
        </h1>
        <p className={styles.descriptionText}>{stay.description}</p>

        <ul className={styles.includesList}>
          {stay.includes.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <p className={styles.price}>Pris: {stay.price},-</p>

        <button className={styles.bookButton}>Book nu</button>
      </div>
    </div>
  );
}
