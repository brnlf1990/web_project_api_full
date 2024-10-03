import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setDescription(currentUser.about || "");
    }
  }, [currentUser]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="popup__container"
      title="Editar perfil"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Nome"
        className="popup__form-input"
        id="popup__name-insert"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameChange}
        required
      />
      <span className="popup__name-insert-error"></span>
      <input
        type="text"
        name="about"
        placeholder="Sobre mim"
        className="popup__form-input"
        id="popup__aboutMe-insert"
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleDescriptionChange}
        required
      />
      <span className="popup__aboutMe-insert-error"></span>
      <button className="popup__submit-button" type="submit">
        Salvar
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
