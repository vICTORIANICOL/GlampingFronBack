import styles from "./header.module.css";
import logo from "../../assets/logo.png";

export default function Header({ page }) {
  if (page === "home") {
    return (
      <header className={styles.Home}>
        <div className={styles.overlay}></div>

        <img src={logo} alt="Logo" className={styles.logo} />
        <h1 className={styles.gittes}>Gittes</h1>
        <h2 className={styles.glamping}>Glamping</h2>
        <button className={styles.button}>BOOK NU</button>
      </header>
    );
  }

  if (page === "ophold") {
    return (
      <header className={styles.ophold}>
        <div className={styles.Opholdoverlay}></div>

        <img src={logo} alt="Logo" className={styles.logo} />
        <h1 className={styles.gittes}>Vores Ophold</h1>
      </header>
    );
  }

  /* if (page === "weekendtur") {
    return (
      <header className={styles.weekendtur}>
        <div className={styles.Opholdoverlay}></div>

        <img src={logo} alt="Logo" className={styles.logo} />
        <h1 className={styles.gittes}>Weekendtur</h1>
      </header>
    );
  } */

  if (page === "kontakt") {
    return (
      <header className={styles.kontakt}>
        <div className={styles.Kontaktoverlay}></div>

        <img src={logo} alt="Logo" className={styles.logo} />
        <h1 className={styles.gittes}>kontakt</h1>
      </header>
    );
  }

  if (page === "aktiviteter") {
    return (
      <header className={styles.aktiviteter}>
        <div className={styles.aktiviteteroverlay}></div>

        <img src={logo} alt="Logo" className={styles.logo} />
        <h1 className={styles.gittes}>Aktiviteter</h1>
      </header>
    );
  }

  if (page === "minliste") {
    return (
      <header className={styles.MinListe}>
        <div className={styles.Minlisteoverlay}></div>

        <img src={logo} alt="Logo" className={styles.logo} />
        <h1 className={styles.gittes}>Min Liste</h1>
      </header>
    );
  }

  return null;
}
