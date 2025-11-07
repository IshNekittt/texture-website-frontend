import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { selectAllCategories } from "../../redux/categories/selectors";
import styles from "./TextureForm.module.css";

const textureSchema = yup.object().shape({
  textureName: yup
    .string()
    .min(3)
    .max(100)
    .required("Texture name is required"),
  categoryId: yup.string().required("Category is required"),
  description: yup.string(),
  imagesUrls: yup.string().required("At least one image URL is required"),
  fileUrl: yup
    .string()
    .url("Must be a valid URL")
    .required("File URL is required"),
});

export default function TextureForm({
  initialValues,
  onSubmit,
  onCancel,
  buttonText = "Submit",
}) {
  const categories = useSelector(selectAllCategories);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      textureName: initialValues?.textureName || "",
      categoryId: initialValues?.categoryId?._id || "",
      description: initialValues?.description || "",
      imagesUrls: initialValues?.imagesUrls?.join(", ") || "",
      fileUrl: initialValues?.fileUrl || "",
    },
    resolver: yupResolver(textureSchema),
  });

  const handleFormSubmit = (data) => {
    const processedData = {
      ...data,
      imagesUrls: data.imagesUrls.split(",").map((url) => url.trim()),
    };
    onSubmit(processedData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="textureName">Texture Name</label>
        <input id="textureName" {...register("textureName")} />
        {errors.textureName && (
          <p className={styles.error}>{errors.textureName.message}</p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="categoryId">Category</label>
        <div className={styles.selectWrapper}>
          <select id="categoryId" {...register("categoryId")}>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>
        {errors.categoryId && (
          <p className={styles.error}>{errors.categoryId.message}</p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          {...register("description")}
          rows="4"
        ></textarea>
      </div>

      <div className={styles.field}>
        <label htmlFor="imagesUrls">Image URLs (comma-separated)</label>
        <input id="imagesUrls" {...register("imagesUrls")} />
        {errors.imagesUrls && (
          <p className={styles.error}>{errors.imagesUrls.message}</p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="fileUrl">File URL (e.g., ZIP file)</label>
        <input id="fileUrl" type="url" {...register("fileUrl")} />
        {errors.fileUrl && (
          <p className={styles.error}>{errors.fileUrl.message}</p>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={onCancel}
          className={`${styles.button} ${styles.cancelButton}`}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${styles.button} ${styles.submitButton}`}
        >
          {isSubmitting ? "Submitting..." : buttonText}
        </button>
      </div>
    </form>
  );
}
