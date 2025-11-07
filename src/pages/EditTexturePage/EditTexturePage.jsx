import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchTextureById,
  updateTexture,
} from "../../redux/textures/operations";
import {
  selectCurrentTexture,
  selectTexturesIsLoading,
} from "../../redux/textures/selectors";
import TextureForm from "../../components/TextureForm/TextureForm";
import Loader from "../../components/Loader/Loader";
import styles from "./EditTexturePage.module.css";

export default function EditTexturePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { textureId } = useParams();

  const texture = useSelector(selectCurrentTexture);
  const isLoading = useSelector(selectTexturesIsLoading);

  useEffect(() => {
    dispatch(fetchTextureById(textureId));
  }, [dispatch, textureId]);

  const handleUpdateTexture = async (textureData) => {
    const resultAction = await dispatch(
      updateTexture({ textureId, textureData })
    );

    if (updateTexture.fulfilled.match(resultAction)) {
      navigate("/admin/dashboard");
    }
  };

  const handleCancel = () => navigate("/admin/dashboard");

  if (isLoading || !texture) {
    return <Loader isLoading={true} />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Texture</h1>
      <TextureForm
        onSubmit={handleUpdateTexture}
        onCancel={handleCancel}
        initialValues={texture}
        buttonText="Save Changes"
      />
    </div>
  );
}
