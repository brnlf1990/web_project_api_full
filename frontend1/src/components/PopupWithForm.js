import React from "react";
import closeButton from "../images/Close_Icon.png";

import "../blocks/Popup.css";
import "../blocks/PopupCardDelete.css";
import "../blocks/PopupPhotoUpdate.css";
import "../blocks/Add-popup.css";

function PopupWithForm({ name, title, isOpen, onClose, onSubmit, children }) {
  return (
    <div className={"popup"}>
      <div className={`popup__image-fade ${isOpen ? "active" : ""}`}></div>
      <div className={`popup ${name} ${isOpen ? "popup__opened" : ""}`}>
        <span className="popup__close-button" onClick={onClose}>
          <img src={closeButton} className="popup__close-image" alt="close" />
        </span>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
