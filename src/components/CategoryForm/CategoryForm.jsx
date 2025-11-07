// src/components/CategoryForm/CategoryForm.jsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "../TextureForm/TextureForm.module.css";

const categorySchema = yup.object().shape({
  categoryName: yup
    .string()
    .min(2)
    .max(50)
    .required("Category name is required"),
});

export default function CategoryForm({
  initialValues,
  onSubmit,
  onCancel,
  buttonText = "Submit",
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      categoryName: initialValues?.categoryName || "",
    },
    resolver: yupResolver(categorySchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="categoryName">Category Name</label>
        <input id="categoryName" {...register("categoryName")} />
        {errors.categoryName && (
          <p className={styles.error}>{errors.categoryName.message}</p>
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
