// src/pages/CataloguePage/CataloguePage.jsx
import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchTextures } from "../../redux/textures/operations";
import { clearTextures } from "../../redux/textures/slice";
import {
  selectAllTextures,
  selectTexturesIsLoading,
  selectTexturesPagination,
} from "../../redux/textures/selectors";
import Loader from "../../components/Loader/Loader";
import Filters from "../../components/Filters/Filters";
import TextureList from "../../components/TextureList/TextureList";
import styles from "./CataloguePage.module.css";

export default function CataloguePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const textures = useSelector(selectAllTextures);
  const isLoading = useSelector(selectTexturesIsLoading);
  const { page, hasNextPage } = useSelector(selectTexturesPagination);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    // Якщо це не перша сторінка, ми не очищуємо
    if ((searchParams.get("page") || "1") === "1") {
      dispatch(clearTextures());
    }
    dispatch(fetchTextures(Object.fromEntries(searchParams)));
  }, [location.search, dispatch]);

  const observer = useRef();
  const lastTextureElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          const searchParams = new URLSearchParams(location.search);
          searchParams.set("page", page + 1);
          navigate(`${location.pathname}?${searchParams.toString()}`);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, navigate, location, page]
  );

  return (
    <div className={styles.container}>
      <Filters />
      <Loader isLoading={isLoading && textures.length === 0} />
      <TextureList textures={textures} lastTextureRef={lastTextureElementRef} />
      {isLoading && textures.length > 0 && <p>Loading more...</p>}
      {!hasNextPage && textures.length > 0 && (
        <p>You have reached the end of the list.</p>
      )}
    </div>
  );
}
