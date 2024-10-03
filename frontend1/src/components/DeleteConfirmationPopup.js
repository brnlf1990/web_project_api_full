import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteConfirmation({ isOpen, onClose, onDeleteCard, card }) {
  const handleDeleteSubmit = (event) => {
    event.preventDefault();
    onDeleteCard({ card });
  };

  return (
    <PopupWithForm
      name="card-delete__container"
      title="Tem certeza?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDeleteSubmit}
    >
      <button className="popup__submit-button" type="submit">
        Sim
      </button>
    </PopupWithForm>
  );
}

export default DeleteConfirmation;
