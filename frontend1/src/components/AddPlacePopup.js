import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onClose, isOpen, onAddPlaceSubmit }) {
  const newCardName = React.useRef(null);
  const newCardLink = React.useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddPlaceSubmit({
      name: newCardName.current.value,
      link: newCardLink.current.value,
    });
  };
  return (
    <PopupWithForm
      name="add-popup__container"
      title="Novo local"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        placeholder="Título"
        className="popup__form-input add-popup__form-input"
        id="popup__card-title-insert"
        minLength="2"
        maxLength="30"
        ref={newCardName}
        required
      />
      <span className="popup__card-title-insert-error"></span>
      <input
        type="url"
        name="image"
        placeholder="Link da imagem"
        className="popup__form-input add-popup__form-input"
        id="popup__link-insert"
        ref={newCardLink}
        required
      />
      <span className="popup__link-insert-error"></span>

      <button className="popup__submit-button" type="submit">
        Salvar
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
