import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [avatar, setAvatar] = React.useState("");
  React.useEffect(() => {
    if (currentUser) {
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser]);

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar
    });
  }

  return (
    <PopupWithForm
      name="photo-update-popup__container"
      title="Alterar a foto do perfil"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <input
        type="url"
        name="image"
        placeholder="Link da imagem"
        className="popup__form-input photo-update-popup__form-input"
        id="popup__link-photo"
        value={avatar}
        onChange={handleAvatarChange}
        required
      />
      <span className="popup__link-photo-error"></span>

      <button className="popup__submit-button" type="submit">
        Salvar
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
