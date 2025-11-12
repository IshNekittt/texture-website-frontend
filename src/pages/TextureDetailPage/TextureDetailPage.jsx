import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import clsx from "clsx";
import { IoDownloadOutline, IoClose } from "react-icons/io5";
import { File } from "megajs";

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

export default function TextureDetailPage() {
  const { textureId } = useParams();
  const dispatch = useDispatch();

  const texture = useSelector(selectCurrentTexture);
  const isLoading = useSelector(selectTexturesIsLoading);
  const error = useSelector(selectTexturesError);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadStreamRef = useRef(null);
  const toastIdRef = useRef(null);

  useEffect(() => {
    return () => {
      if (downloadStreamRef.current) {
        downloadStreamRef.current.destroy();
      }
    };
  }, []);

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

  const handleDownload = async () => {
    if (!texture || !texture.fileUrl || isDownloading) return;

    if (texture.fileUrl.includes("mega.nz")) {
      toastIdRef.current = toast.loading("Preparing download...");

      try {
        const file = File.fromURL(texture.fileUrl);
        await file.loadAttributes();

        setIsDownloading(true);
        toast.loading(`Downloading "${file.name}"...`, {
          id: toastIdRef.current,
        });

        const downloadedBlob = await new Promise((resolve, reject) => {
          const stream = file.download();
          downloadStreamRef.current = stream;
          const chunks = [];

          stream.on("data", (chunk) => {
            chunks.push(chunk);
          });

          stream.on("end", () => {
            downloadStreamRef.current = null;
            resolve(new Blob(chunks));
          });

          stream.on("error", (err) => {
            downloadStreamRef.current = null;
            reject(err);
          });
        });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(downloadedBlob);
        link.download = file.name || "download.zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);

        toast.success(`Downloaded successfully!`, {
          id: toastIdRef.current,
        });
      } catch (err) {
        if (
          !err.message?.includes(
            "Cannot call write after a stream was destroyed"
          )
        ) {
          toast.error("Failed to download from MEGA", {
            id: toastIdRef.current,
          });
        }
      } finally {
        setIsDownloading(false);
        downloadStreamRef.current = null;
        toastIdRef.current = null;
      }
    } else {
      toast.error("Unsupported file URL for download");
    }
  };

  const handleCancel = () => {
    if (downloadStreamRef.current) {
      downloadStreamRef.current.destroy();
      toast.success("Canceled successfully!", { id: toastIdRef.current });
    }
  };

  if (isLoading || !texture) {
    return <Loader isLoading={true} />;
  }

  if (texture._id !== textureId) {
    return <Loader isLoading={true} />;
  }

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

          <button
            onClick={isDownloading ? handleCancel : handleDownload}
            className={clsx(
              styles.downloadButton,
              isDownloading && styles.cancelButton
            )}
          >
            <span>{isDownloading ? "Cancel" : "Download"}</span>
            {isDownloading ? (
              <IoClose size={22} className={styles.downloadIcon} />
            ) : (
              <IoDownloadOutline size={22} className={styles.downloadIcon} />
            )}
          </button>

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
