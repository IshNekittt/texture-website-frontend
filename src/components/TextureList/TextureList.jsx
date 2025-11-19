import { Link, useLocation } from "react-router-dom";
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

export default function TextureList({ textures, lastTextureRef }) {
  const location = useLocation();

  if (!textures || textures.length === 0) {
    return (
      <p className={styles.emptyMessage}>
        No textures found. Try adjusting your filters.
      </p>
    );
  }

  return (
    <div className={styles.list}>
      {textures.map((texture, index) => (
        <Link
          ref={textures.length === index + 1 ? lastTextureRef : null}
          key={texture._id}
          to={`/catalogue/${texture._id}`}
          state={{ from: location }}
          className={styles.cardLink}
        >
          <TextureCard texture={texture} />
        </Link>
      ))}
    </div>
  );
}
