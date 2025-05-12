import React from "react";
import styles from "./footer.module.css";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.iconContainer}>
        <div className={styles.socialIcons}>
          <FaFacebookF size={40} color="#2A4F57" />
        </div>
        <div className={styles.socialIcons}>
          <FaInstagram size={40} color="#2A4F57" />
        </div>
      </div>
      <div className={styles.logoTextContainer}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <p className={styles.brandName}>Gittes Glamping</p>
      </div>
    </footer>
  );
};

export default Footer;
