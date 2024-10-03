import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef(null);

  React.useEffect(() => {
    if (currentUser && avatarRef.current) {
      avatarRef.current.value = currentUser.avatar || ""; 
    }
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
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
        ref={avatarRef}
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
