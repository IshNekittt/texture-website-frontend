import { useEffect } from "react";
import { GridLoader } from "react-spinners";
import styles from "./Loader.module.css";

const Loader = ({ isLoading = false }) => {
  useEffect(() => {
    if (isLoading) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isLoading]);

  if (!isLoading) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <GridLoader
        color="#00bfff"
        loading={true}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
