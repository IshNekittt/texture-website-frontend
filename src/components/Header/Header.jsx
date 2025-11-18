import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  IoSearchOutline,
  IoSunnyOutline,
  IoMoonOutline,
  IoArrowBack,
} from "react-icons/io5";
import clsx from "clsx";
import { selectTheme, toggleTheme } from "../../redux/theme/slice";
import styles from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { textureId } = useParams();

  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const currentTheme = useSelector(selectTheme);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setLocalSearchQuery(searchParams.get("searchQuery") || "");
  }, [location.search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(location.search);

    if (localSearchQuery.trim()) {
      searchParams.set("searchQuery", localSearchQuery.trim());
    } else {
      searchParams.delete("searchQuery");
    }
    searchParams.set("page", "1");

    navigate(`/catalogue?${searchParams.toString()}`);
  };

  const showBackButton = !!textureId;
  const handleGoBack = () => navigate(location.state?.from || "/catalogue");
  const handleThemeToggle = () => dispatch(toggleTheme());

  return (
    <header className={styles.header}>
      <div className={styles.headerNav}>
        <button
          onClick={handleGoBack}
          className={clsx(
            styles.backButton,
            !showBackButton && styles.backButtonHidden
          )}
          disabled={!showBackButton}
        >
          <IoArrowBack size={24} />
        </button>
        <Link to="/" className={styles.siteTitle}>
          Pixel
        </Link>
      </div>
      <div className={styles.headerControls}>
        <form className={styles.searchWrapper} onSubmit={handleSearchSubmit}>
          <button
            type="submit"
            className={styles.searchButton}
            aria-label="Search"
          >
            <IoSearchOutline className={styles.searchIcon} />
          </button>
          <input
            type="search"
            placeholder="Search textures..."
            className={styles.searchBar}
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
          />
        </form>
        <button className={styles.themeToggle} onClick={handleThemeToggle}>
          {currentTheme === "light" ? (
            <IoMoonOutline size={22} />
          ) : (
            <IoSunnyOutline size={22} className={styles.iconOffset} />
          )}
        </button>
      </div>
    </header>
  );
}
