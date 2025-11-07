import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./components/Layout";
import Loader from "./components/Loader/Loader";
import { fetchCategories } from "./redux/categories/operations";
import { selectTheme } from "./redux/theme/slice";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const CataloguePage = lazy(() => import("./pages/CataloguePage/CataloguePage"));
const TextureDetailPage = lazy(() =>
  import("./pages/TextureDetailPage/TextureDetailPage")
);
const ErrorPage = lazy(() => import("./pages/ErrorPage/ErrorPage"));

const AdminLoginPage = lazy(() =>
  import("./pages/AdminLoginPage/AdminLoginPage")
);
const AdminRoute = lazy(() => import("./components/AdminRoute"));
const AdminDashboardPage = lazy(() =>
  import("./pages/AdminDashboardPage/AdminDashboardPage")
);
const AddTexturePage = lazy(() =>
  import("./pages/AddTexturePage/AddTexturePage")
);
const EditTexturePage = lazy(() =>
  import("./pages/EditTexturePage/EditTexturePage")
);
const AddCategoryPage = lazy(() =>
  import("./pages/AddCategoryPage/AddCategoryPage")
);
const EditCategoryPage = lazy(() =>
  import("./pages/EditCategoryPage/EditCategoryPage")
);

export default function App() {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.dataset.theme = currentTheme;
  }, [currentTheme]);

  return (
    <Suspense fallback={<Loader isLoading={true} />}>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/catalogue" element={<Layout />}>
          <Route index element={<CataloguePage />} />
          <Route path=":textureId" element={<TextureDetailPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route path="/admin" element={<AdminRoute />}>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="textures/add" element={<AddTexturePage />} />
          <Route
            path="textures/edit/:textureId"
            element={<EditTexturePage />}
          />
          <Route path="categories/add" element={<AddCategoryPage />} />
          <Route
            path="categories/edit/:categoryId"
            element={<EditCategoryPage />}
          />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
}
