import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../redux/categories/operations";
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import styles from "../AddTexturePage/AddTexturePage.module.css";

export default function AddCategoryPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    const result = await dispatch(createCategory(data));
    if (createCategory.fulfilled.match(result)) {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New Category</h1>
      <CategoryForm onSubmit={handleCreate} buttonText="Add Category" />
    </div>
  );
}
