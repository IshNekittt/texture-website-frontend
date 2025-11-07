import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>404 - Page Not Found</h2>
      <p className={styles.message}>
        Looks like you're lost. Let's get you back home.
      </p>
      <Link to="/" className={styles.link}>
        Go to Homepage
      </Link>
    </div>
  );
}
