// src/pages/TextureDetailPage/TextureDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import clsx from "clsx";
import { IoDownloadOutline } from "react-icons/io5";

import { fetchTextureById } from "../../redux/textures/operations";
import { clearCurrentTexture } from "../../redux/textures/slice";
import {
  selectCurrentTexture,
  selectTexturesIsLoading,
  selectTexturesError,
} from "../../redux/textures/selectors";

import Loader from "../../components/Loader/Loader";
import { capitalizeFirstLetter } from "../../utils/formatters";
import styles from "./TextureDetailPage.module.css";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getDownloadUrl = (url) => {
  if (!url) return "";

  if (url.includes("drive.google.com")) {
    const match = url.match(/\/d\/(.*?)\/view/);
    if (match && match[1]) {
      const fileId = match[1];
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
  }

  if (url.includes("cloudinary.com")) {
    const parts = url.split("/upload/");
    if (parts.length === 2 && !url.includes("fl_attachment")) {
      return `${parts[0]}/upload/fl_attachment/${parts[1]}`;
    }
  }

  return url;
};

export default function TextureDetailPage() {
  const { textureId } = useParams();
  const dispatch = useDispatch();

  const texture = useSelector(selectCurrentTexture);
  const isLoading = useSelector(selectTexturesIsLoading);
  const error = useSelector(selectTexturesError);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(fetchTextureById(textureId));
    return () => {
      dispatch(clearCurrentTexture());
    };
  }, [dispatch, textureId]);

  useEffect(() => {
    if (texture && texture.imagesUrls && texture.imagesUrls.length > 0) {
      if (
        selectedImage === null ||
        !texture.imagesUrls.includes(selectedImage)
      ) {
        setSelectedImage(texture.imagesUrls[0]);
      }
    }
  }, [texture, selectedImage]);

  useEffect(() => {
    if (error) {
      toast.error(`Failed to load texture data: ${error}`);
    }
  }, [error]);

  if (isLoading || !texture) {
    return <Loader isLoading={true} />;
  }

  if (texture._id !== textureId) {
    return <Loader isLoading={true} />;
  }

  const downloadUrl = getDownloadUrl(texture.fileUrl);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.gallery}>
          <div className={styles.mainImageContainer}>
            {selectedImage && (
              <img
                src={selectedImage}
                alt={texture.textureName}
                className={styles.mainImage}
              />
            )}
          </div>
          <div className={styles.thumbnails}>
            {texture.imagesUrls.map((imageUrl, index) => (
              <div
                key={index}
                className={clsx(
                  styles.thumbnail,
                  selectedImage === imageUrl && styles.activeThumbnail
                )}
                onClick={() => setSelectedImage(imageUrl)}
              >
                <img src={imageUrl} alt={`thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.descriptionSection}>
          <h2>Description</h2>
          <p>{texture.description}</p>
        </div>
      </div>

      <div className={styles.sidebar}>
        <div className={styles.details}>
          <h1 className={styles.title}>{texture.textureName}</h1>
          <p className={styles.category}>
            {capitalizeFirstLetter(texture.categoryId?.categoryName)}
          </p>
          <a href={downloadUrl} className={styles.downloadButton} download>
            <span>Download</span>
            <IoDownloadOutline size={22} className={styles.downloadIcon} />
          </a>
          <div className={styles.metaDetails}>
            <div className={styles.metaItem}>
              <span>Published</span>
              <span>{formatDate(texture.createdAt)}</span>
            </div>
            <div className={styles.metaItem}>
              <span>Last update</span>
              <span>{formatDate(texture.updatedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
