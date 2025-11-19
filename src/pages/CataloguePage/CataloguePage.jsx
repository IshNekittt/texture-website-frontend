import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
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

  const textures = useSelector(selectAllTextures);
  const isLoading = useSelector(selectTexturesIsLoading);
  const { page, perPage, hasNextPage } = useSelector(selectTexturesPagination);

  useEffect(() => {
    if (!hasNextPage && textures.length > 0) {
      toast.success("You've reached the end of the list");
    }
  }, [hasNextPage, textures.length]);

  useEffect(() => {
    dispatch(clearTextures());

    const searchParams = new URLSearchParams(location.search);
    const params = Object.fromEntries(searchParams);

    dispatch(
      fetchTextures({
        ...params,
        page,
        perPage,
      })
    );
  }, [location.search, dispatch]);

  const observer = useRef();
  const lastTextureElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          const searchParams = new URLSearchParams(location.search);
          const params = Object.fromEntries(searchParams);
          dispatch(
            fetchTextures({
              ...params,
              page: page + 1,
              perPage,
            })
          );
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, dispatch, page, location.search]
  );

  return (
    <div className={styles.container}>
      <Filters />
      <Loader isLoading={isLoading && textures.length === 0} />
      <TextureList textures={textures} lastTextureRef={lastTextureElementRef} />
      {isLoading && textures.length > 0 && <p>Loading more...</p>}
    </div>
  );
}
