import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTexture } from "../../redux/textures/operations";
import TextureForm from "../../components/TextureForm/TextureForm";
import styles from "./AddTexturePage.module.css";

export default function AddTexturePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateTexture = async (textureData) => {
    const resultAction = await dispatch(createTexture(textureData));
    if (createTexture.fulfilled.match(resultAction)) {
      navigate("/admin/dashboard");
    }
  };

  const handleCancel = () => navigate("/admin/dashboard");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New Texture</h1>
      <TextureForm
        onSubmit={handleCreateTexture}
        onCancel={handleCancel}
        buttonText="Add Texture"
      />
    </div>
  );
}
