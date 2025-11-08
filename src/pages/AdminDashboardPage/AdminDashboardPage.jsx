import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logoutAdmin } from "../../redux/admin/slice";
import { clearApiKey } from "../../api/axios";

import { fetchTextures, deleteTexture } from "../../redux/textures/operations";
import {
  selectAllTextures,
  selectTexturesIsLoading,
} from "../../redux/textures/selectors";

import {
  fetchCategories,
  deleteCategory,
} from "../../redux/categories/operations";
import {
  selectAllCategories,
  selectCategoriesIsLoading,
} from "../../redux/categories/selectors";

import Loader from "../../components/Loader/Loader";
import styles from "./AdminDashboardPage.module.css";

export default function AdminDashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const textures = useSelector(selectAllTextures);
  const isTexturesLoading = useSelector(selectTexturesIsLoading);

  const categories = useSelector(selectAllCategories);
  const areCategoriesLoading = useSelector(selectCategoriesIsLoading);

  useEffect(() => {
    dispatch(fetchTextures({ perPage: 100 }));
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleLogout = () => {
    clearApiKey();
    dispatch(logoutAdmin());
    navigate("/admin/login");
  };

  const handleAddTexture = () => navigate("/admin/textures/add");
  const handleEditTexture = (id) => navigate(`/admin/textures/edit/${id}`);
  const handleDeleteTexture = (id, name) => {
    if (window.confirm(`Are you sure you want to delete texture "${name}"?`)) {
      dispatch(deleteTexture(id));
    }
  };

  const handleAddCategory = () => navigate("/admin/categories/add");
  const handleEditCategory = (id) => navigate(`/admin/categories/edit/${id}`);
  const handleDeleteCategory = (id, name) => {
    if (
      window.confirm(
        `Are you sure you want to delete category "${name}"? This might affect existing textures.`
      )
    ) {
      dispatch(deleteCategory(id));
    }
  };

  const isLoading = isTexturesLoading || areCategoriesLoading;

  return (
    <div className={styles.container}>
      <Loader isLoading={isLoading} />

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Admin Dashboard</h1>
          <p className={styles.subtitle}>Content Management</p>
        </div>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Log Out
        </button>
      </div>

      <div className={styles.sectionHeader}>
        <h2>Textures</h2>
        <button onClick={handleAddTexture} className={styles.addButton}>
          + Add New Texture
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Preview</th>
              <th>Name</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              textures.map((texture) => (
                <tr key={texture._id}>
                  <td>
                    <img
                      src={
                        texture.imagesUrls?.[0] ||
                        "https://via.placeholder.com/100"
                      }
                      alt={texture.textureName}
                      className={styles.previewImage}
                    />
                  </td>
                  <td>{texture.textureName}</td>
                  <td>{texture.categoryId?.categoryName || "N/A"}</td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button
                        onClick={() => handleEditTexture(texture._id)}
                        className={styles.editButton}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteTexture(texture._id, texture.textureName)
                        }
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            {isLoading && (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  Loading...
                </td>
              </tr>
            )}
            {!isLoading && textures.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No textures found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.sectionHeader}>
        <h2>Categories</h2>
        <button onClick={handleAddCategory} className={styles.addButton}>
          + Add New Category
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th style={{ textAlign: "right", paddingRight: "16px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              categories.map((cat) => (
                <tr key={cat._id}>
                  <td>{cat.categoryName}</td>
                  <td>
                    <div
                      className={styles.actionButtons}
                      style={{ justifyContent: "flex-end" }}
                    >
                      <button
                        onClick={() => handleEditCategory(cat._id)}
                        className={styles.editButton}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteCategory(cat._id, cat.categoryName)
                        }
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            {!isLoading && categories.length === 0 && (
              <tr>
                <td
                  colSpan="2"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
