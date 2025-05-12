import styles from "./imgComponent.module.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import staysData from "../../data/stays.json";
import weekendImg from "../../assets/stays/weekend.jpg";
import familyImg from "../../assets/stays/familiepakken.jpg";
import tentImg from "../../assets/stays/tentlights.jpg";

const Stays = () => {
  const weekendStay = staysData.stays.find(
    (stay) => stay.title.toLowerCase() === "weekendtur"
  );
  const familyStay = staysData.stays.find(
    (stay) => stay.title.toLowerCase() === "familiepakken"
  );
  const romanticStay = staysData.stays.find(
    (stay) => stay.title.toLowerCase() === "romantisk getaway"
  );

  return { weekendStay, familyStay, romanticStay };
};

export default function ImgComponent({ page }) {
  const navigate = useNavigate();
  const { weekendStay, familyStay, romanticStay } = Stays();

  if (page === "ophold") {
    return (
      <>
        {/* Weekendtur Card */}
        {weekendStay && (
          <div className={styles.stayCardWrapper}>
            <div className={styles.stayCardImageContainer}>
              <img
                src={weekendImg}
                alt={weekendStay.title}
                className={styles.stayImage}
              />
              <div className={styles.stayOverlay}></div>
              <div className={styles.stayInfoBox}>
                <h3 className={styles.stayTitle}>{weekendStay.title}</h3>
                <p className={styles.stayPersons}>
                  {weekendStay.numberOfPersons} personer
                </p>
                <p className={styles.stayPrice}>Fra {weekendStay.price},-</p>
              </div>
            </div>
            <button
              className={styles.readMoreButton}
              onClick={() => navigate("/weekendtur")}
            >
              Læs mere
            </button>
          </div>
        )}

        {/* Familiepakken Card */}
        {familyStay && (
          <div className={styles.stayCardWrapper}>
            <div className={styles.stayCardImageContainer}>
              <img
                src={familyImg}
                alt={familyStay.title}
                className={styles.stayImage}
              />
              <div className={styles.stayOverlay}></div>
              <div className={styles.stayInfoBox}>
                <h3 className={styles.stayTitle}>{familyStay.title}</h3>
                <p className={styles.stayPersons}>
                  {familyStay.numberOfPersons} personer
                </p>
                <p className={styles.stayPrice}>Fra {familyStay.price},-</p>
              </div>
            </div>
            <button
              className={styles.readMoreButton}
              onClick={() => navigate("/familiepakken")}
            >
              Læs mere
            </button>
          </div>
        )}

        {/* Romantisk Getaway Card */}
        {romanticStay && (
          <div className={styles.stayCardWrapper}>
            <div className={styles.stayCardImageContainer}>
              <img
                src={tentImg}
                alt={romanticStay.title}
                className={styles.stayImage}
              />
              <div className={styles.stayOverlay}></div>
              <div className={styles.stayInfoBox}>
                <h3 className={styles.stayTitle}>{romanticStay.title}</h3>
                <p className={styles.stayPersons}>
                  {romanticStay.numberOfPersons} personer
                </p>
                <p className={styles.stayPrice}>Fra {romanticStay.price},-</p>
              </div>
            </div>
            <button
              className={styles.readMoreButton}
              onClick={() => navigate("/romantiskgetaway")}
            >
              Læs mere
            </button>
          </div>
        )}
      </>
    );
  }

  return null;
}
