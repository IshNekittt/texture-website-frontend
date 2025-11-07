import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className={styles.heroContainer}>
      {/* Плейсхолдер для GIF-фону. Додати src, якщо знайдете потрібний GIF */}
      {/* <img src="/path/to/your/background.gif" alt="" className={styles.backgroundGif} /> */}

      <div className={styles.content}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Pixel
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Discover a vast library of high-quality textures for your next
          creative project.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link to="/catalogue" className={styles.ctaButton}>
            Explore Catalogue
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
