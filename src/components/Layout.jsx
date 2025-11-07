import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.headerWrapper}>
        <div className={styles.headerContent}>
          <Header />
        </div>
      </div>

      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}
