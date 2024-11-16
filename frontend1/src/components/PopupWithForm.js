import React from "react";
import closeButton from "../images/Close_Icon.png";

import "../blocks/Popup.css";
import "../blocks/PopupCardDelete.css";
import "../blocks/PopupPhotoUpdate.css";
import "../blocks/Add-popup.css";

function PopupWithForm({ name, title, isOpen, onClose, onSubmit, children }) {
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose(); 
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown); 
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div className={"popup"}>
      <div onClick={onClose} className={`popup__image-fade ${isOpen ? "active" : ""}`}></div>
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
