import { Link } from "react-router-dom"; // 1. Імпортуємо Link
import styles from "./TextureList.module.css";

const TextureCard = ({ texture }) => {
  const previewImage =
    texture.imagesUrls?.[0] || "https://via.placeholder.com/300";

  return (
    <div className={styles.card}>
      <img
        src={previewImage}
        alt={texture.textureName}
        className={styles.cardImage}
      />
      <h3 className={styles.cardTitle}>{texture.textureName}</h3>
    </div>
  );
};

export default function TextureList({ textures }) {
  if (!textures || textures.length === 0) {
    return (
      <p className={styles.emptyMessage}>
        No textures found. Try adjusting your filters.
      </p>
    );
  }

  return (
    <div className={styles.list}>
      {textures.map((texture) => (
        // 2. Огортаємо кожну картку в Link
        <Link
          key={texture._id}
          to={`/catalogue/${texture._id}`}
          className={styles.cardLink}
        >
          <TextureCard texture={texture} />
        </Link>
      ))}
    </div>
  );
}
