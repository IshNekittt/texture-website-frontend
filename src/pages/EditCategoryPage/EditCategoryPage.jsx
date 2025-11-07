import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchCategoryById,
  updateCategory,
} from "../../redux/categories/operations";
import {
  selectCurrentCategory,
  selectCategoriesIsLoading,
} from "../../redux/categories/selectors";

import CategoryForm from "../../components/CategoryForm/CategoryForm";
import Loader from "../../components/Loader/Loader";
import styles from "../AddTexturePage/AddTexturePage.module.css";

export default function EditCategoryPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const category = useSelector(selectCurrentCategory);
  const isLoading = useSelector(selectCategoriesIsLoading);

  useEffect(() => {
    dispatch(fetchCategoryById(categoryId));
  }, [dispatch, categoryId]);

  const handleUpdate = async (categoryData) => {
    const result = await dispatch(updateCategory({ categoryId, categoryData }));
    if (updateCategory.fulfilled.match(result)) {
      navigate("/admin/dashboard");
    }
  };

  if (isLoading && !category) {
    return <Loader isLoading={true} />;
  }

  if (!isLoading && !category) {
    return <p>Category not found.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Category</h1>
      {category && (
        <CategoryForm
          onSubmit={handleUpdate}
          initialValues={category}
          onCancel={() => navigate("/admin/dashboard")}
          buttonText="Save Changes"
        />
      )}
    </div>
  );
}
