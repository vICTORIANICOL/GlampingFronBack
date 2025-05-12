import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import ActivityCard from "../../components/activity/ActivityCard"; // Import ActivityCard component
import styles from "./minListe.module.css";
import Sec1 from "../../components/sec1/Sec1";

export default function MinListe() {
  const [favorites, setFavorites] = useState([]);
  const [expanded, setExpanded] = useState({}); // State to track expanded descriptions

  // Load favorites from localStorage when component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Remove a favorite from the list by title
  const removeFavorite = (activity) => {
    Sec1;
    const updatedFavorites = favorites.filter(
      (item) => item.title !== activity.title
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Handle expand/collapse of description
  const toggleExpand = (title) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [title]: !prevExpanded[title], // Toggle expanded state
    }));
  };

  return (
    <>
      <Header page="minliste" />
      <Sec1
        title={`Antal aktiviteter på listen: ${favorites.length}`}
        text={false}
        showImage={false}
        showButton={false}
      />
      <div className={styles.container}>
        {favorites.length === 0 ? (
          <p className={styles.ptag}>Du har ingen favoritaktiviteter endnu.</p>
        ) : (
          <ul className={styles.favoriteList}>
            {favorites.map((activity, index) => (
              <li key={index} className={styles.favoriteItem}>
                {/* Use the ActivityCard component to render each favorite activity */}
                <ActivityCard
                  activity={activity}
                  isFavorite={true} // Since it's already in favorites, it’s always a favorite
                  onHeartClick={removeFavorite} // Pass removeFavorite function
                  expanded={expanded[activity.title]} // Pass expanded state
                  onExpandClick={toggleExpand} // Pass toggleExpand function
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
