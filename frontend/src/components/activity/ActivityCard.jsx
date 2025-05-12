import React from "react";
import styles from "./activityCard.module.css";

// Import the images directly
import canoeImg from "../../assets/activities/kano.jpg";
import hikeImg from "../../assets/activities/naturvandring.jpg";
import yogaImg from "../../assets/activities/yoga.jpg";
import wineImg from "../../assets/activities/vinsmagning.jpg";

const imageMap = {
  Kanotur: canoeImg,
  Naturvandring: hikeImg,
  "Yoga i det fri": yogaImg,
  Vinsmagning: wineImg,
  Fællesbål: wineImg,
};

export default function ActivityCard({
  activity,
  isFavorite,
  onHeartClick,
  expanded,
  onExpandClick,
}) {
  return (
    <div className={styles.activityCardWrapper}>
      <div className={styles.activityImageContainer}>
        <img
          src={imageMap[activity.title] || ""}
          alt={activity.title}
          className={styles.activityImage}
        />
        <div className={styles.activityOverlay}></div>

        <div className={styles.activityTitleBox}>
          <h3 className={styles.activityTitle}>{activity.title}</h3>
        </div>

        <div className={styles.activityInfoBox}>
          <button
            className={`${styles.heartButton} ${
              isFavorite ? styles.active : ""
            }`}
            onClick={() => onHeartClick(activity)}
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
          <p className={styles.activityDate}>
            {activity.date || activity.weekday}
          </p>
          <p className={styles.activityTime}>{activity.time}</p>

          <button
            className={styles.readMoreButton}
            onClick={() => onExpandClick(activity.title)}
          >
            {expanded ? "Læs mindre" : "Læs mere"}
          </button>

          {expanded && (
            <div className={styles.activityDescription}>
              <p>{activity.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
