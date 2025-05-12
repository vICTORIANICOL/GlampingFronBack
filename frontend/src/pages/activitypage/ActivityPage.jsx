import React, { useState } from "react";

import Header from "../../components/header/Header";
import ActivityCard from "../../components/activity/ActivityCard";
import activitiesData from "../../data/activities.json";
import styles from "./activityPage.module.css";
import Sec1 from "../../components/sec1/Sec1";

const ActivityPage = () => {
  // State for favorites and expanded view of activity descriptions
  const [favorites, setFavorites] = useState({});
  const [expanded, setExpanded] = useState({});

  // Handle heart button click (add/remove from favorites)
  const toggleFavorite = (activity) => {
    setFavorites((prevFavorites) => {
      const newFavorites = {
        ...prevFavorites,
        [activity.title]: !prevFavorites[activity.title],
      };

      // Optionally save to localStorage
      if (newFavorites[activity.title]) {
        const existingFavorites = JSON.parse(
          localStorage.getItem("favorites") || "[]"
        );
        localStorage.setItem(
          "favorites",
          JSON.stringify([...existingFavorites, activity])
        );
      } else {
        const existingFavorites = JSON.parse(
          localStorage.getItem("favorites") || "[]"
        );
        const updatedFavorites = existingFavorites.filter(
          (item) => item.title !== activity.title
        );
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      }

      return newFavorites;
    });
  };

  // Handle expand/collapse of description
  const toggleExpand = (title) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [title]: !prevExpanded[title],
    }));
  };

  return (
    <div className={styles.activityPageContainer}>
      <Header page="aktiviteter" />
      <Sec1
        title="Ingen skal kede sig hos Gitte"
        text="Glamping er mere end blot en indkvartering - det er en mulighed for at fordybe dig i naturen og skabe minder, der varer livet ud. Uanset om du foretrækker en eventyrlig kanotur, en oplysende naturvandring, hjertevarm samvær omkring bålet, smagfulde oplevelser som vinsmagning eller morgenyoga, der giver dig indre ro og balance i naturens skød - vil vi hos Gittes Glamping imødekomme dine ønsker."
        showImage={false}
        showButton={false}
      />
      <div className={styles.activityCardContainer}>
        {activitiesData.activities.map((activity, index) => (
          <ActivityCard
            key={index}
            activity={activity}
            isFavorite={favorites[activity.title]}
            onHeartClick={toggleFavorite}
            expanded={expanded[activity.title]}
            onExpandClick={toggleExpand}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityPage;
