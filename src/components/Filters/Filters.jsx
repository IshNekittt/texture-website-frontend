import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import { selectAllCategories } from "../../redux/categories/selectors";
import { capitalizeFirstLetter } from "../../utils/formatters";
import styles from "./Filters.module.css";

const DEFAULT_SORT = {
  sortBy: "createdAt",
  sortOrder: "desc",
};

export default function Filters() {
  const navigate = useNavigate();
  const location = useLocation();
  const categories = useSelector(selectAllCategories);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (!searchParams.has("sortBy")) {
      searchParams.set("sortBy", DEFAULT_SORT.sortBy);
      searchParams.set("sortOrder", DEFAULT_SORT.sortOrder);

      navigate(`/catalogue?${searchParams.toString()}`, { replace: true });
    }
  }, [location.search, navigate]);

  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get("categoryId") || "all";
  const currentSortBy = searchParams.get("sortBy") || "createdAt";
  const currentSortOrder = searchParams.get("sortOrder") || "desc";

  const handleFilterChange = (key, value) => {
    const searchParams = new URLSearchParams(location.search);
    if (value === "all" || !value) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
    searchParams.set("page", "1");
    navigate(`/catalogue?${searchParams.toString()}`);
  };

  const handleSortChange = (sortValue) => {
    const [sortBy, sortOrder] = sortValue.split("_");
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("sortOrder", sortOrder);
    searchParams.set("page", "1");
    navigate(`/catalogue?${searchParams.toString()}`);
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.categoryFilters}>
        <button
          onClick={() => handleFilterChange("categoryId", "all")}
          className={clsx(currentCategory === "all" && styles.active)}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => handleFilterChange("categoryId", cat._id)}
            className={clsx(currentCategory === cat._id && styles.active)}
          >
            {capitalizeFirstLetter(cat.categoryName)}
          </button>
        ))}
      </div>
      <div className={styles.sort}>
        <select
          onChange={(e) => handleSortChange(e.target.value)}
          className={styles.sortSelect}
          value={`${currentSortBy}_${currentSortOrder}`}
        >
          <option value="createdAt_desc">Newest first</option>
          <option value="createdAt_asc">Oldest first</option>
          <option value="textureName_asc">Name (A-Z)</option>
          <option value="textureName_desc">Name (Z-A)</option>
        </select>
      </div>
    </div>
  );
}
