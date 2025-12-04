import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaCode, FaPaintBrush, FaCube, FaDatabase } from "react-icons/fa";
import styles from "./HomePage.module.css";

const teamMembers = [
  {
    id: 1,
    role: "Full Stack Developer",
    description:
      "Architected and implemented the entire Backend and Frontend ecosystem",
    icon: <FaCode />,
  },
  {
    id: 2,
    role: "Texture Artist",
    description:
      "Created high-quality textures and adapted them seamlessly to 3D models",
    icon: <FaPaintBrush />,
  },
  {
    id: 3,
    role: "3D Modeler",
    description:
      "Designed 3D models and compiled the comprehensive project documentation",
    icon: <FaCube />,
  },
  {
    id: 4,
    role: "Database Architect",
    description:
      "Designed the Database structure and crafted the project presentation",
    icon: <FaDatabase />,
    isFemale: true,
  },
];

const OrbitingPixel = ({ scrollYProgress, config }) => {
  const { initialAngle, radius, y, size, speed, opacity } = config;

  const scrollAngle = useTransform(scrollYProgress, [0, 1], [0, 360 * speed]);

  const currentAngle = useTransform(scrollAngle, (a) => initialAngle + a);

  const x = useTransform(
    currentAngle,
    (deg) => radius * Math.sin((deg * Math.PI) / 180)
  );
  const z = useTransform(
    currentAngle,
    (deg) => radius * Math.cos((deg * Math.PI) / 180)
  );

  const rotateY = useTransform(currentAngle, (deg) => deg);

  return (
    <motion.div
      className={styles.pixel}
      style={{
        width: size,
        height: size,
        opacity: opacity,
        x,
        y,
        z,
        rotateY,
      }}
    />
  );
};

const PixelHurricane = () => {
  const { scrollYProgress } = useScroll();

  const pixels = useMemo(() => {
    const items = [];
    const count = 100;

    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        radius: 400 + Math.random() * 400,
        initialAngle: Math.random() * 360,
        y: (Math.random() - 0.5) * 150 + "vh",
        size: 15 + Math.random() * 35,
        speed: 0.5 + Math.random() * 1.0,
        opacity: 0.2 + Math.random() * 0.6,
      });
    }
    return items;
  }, []);

  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.sceneWrapper}>
        {pixels.map((p) => (
          <OrbitingPixel
            key={p.id}
            config={p}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
};

export default function HomePage() {
  const currentYear = new Date().getFullYear();
  return (
    <div className={styles.pageWrapper}>
      <PixelHurricane />

      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
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
            creative project
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

        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span>Scroll to meet the team</span>
          <div className={styles.arrowDown}>↓</div>
        </motion.div>
      </section>

      <section className={styles.teamSection}>
        <motion.h2
          className={styles.teamTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Project Team
        </motion.h2>

        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className={styles.teamCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.iconWrapper}>{member.icon}</div>
              <h3 className={styles.roleTitle}>{member.role}</h3>
              <p className={styles.roleDescription}>{member.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; {currentYear} Pixel. All rights reserved.</p>
      </footer>
    </div>
  );
}
