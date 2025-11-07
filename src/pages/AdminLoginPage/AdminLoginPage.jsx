import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { loginAdmin } from "../../redux/admin/slice";
import { setApiKey, clearApiKey, api } from "../../api/axios";
import styles from "./AdminLoginPage.module.css";

export default function AdminLoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { apiKey } = data;
    setApiKey(apiKey);

    try {
      const response = await api.get("/textures/check-auth");

      if (response.status === 200) {
        dispatch(loginAdmin(apiKey));
        toast.success("Authentication successful!");
        navigate("/admin/dashboard", { replace: true });
      } else {
        throw new Error("Invalid API Key");
      }
    } catch (error) {
      clearApiKey();
      toast.error("Invalid API Key!");
      setError("apiKey", {
        type: "manual",
        message: "The provided API key is incorrect.",
      });
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.title}>Admin Access</h1>
        <p className={styles.subtitle}>Enter the API key to manage content.</p>

        <div className={styles.inputWrapper}>
          <label htmlFor="apiKey" className={styles.label}>
            API Key
          </label>
          <input
            id="apiKey"
            type="password"
            className={styles.input}
            {...register("apiKey", { required: "API Key is required" })}
          />
          {errors.apiKey && (
            <p className={styles.error}>{errors.apiKey.message}</p>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="submit"
            className={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Sign In"}
          </button>

          <Link to="/" className={`${styles.button} ${styles.backButton}`}>
            Back to Homepage
          </Link>
        </div>
      </form>
    </div>
  );
}
