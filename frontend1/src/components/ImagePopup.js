import React from "react";
import closeButton from "../images/Close_Icon.png";

function ImagePopup({ card, onClose }) {
  return (
    <div className="popup__image">
      <div className={`popup__image-fade ${card ? "active" : ""}`}></div>
      <div
        className={`popup popup__image-container ${
          card ? "popup__opened" : ""
        }`}
      >
        {card && (
          <img src={card.link} alt={card.name} className="popup__image-zoom" />
        )}
        <span className="popup__close-button" onClick={onClose}>
          <img
            src={closeButton}
            className="popup__image-close-image"
            alt="close image"
          />
        </span>
        <p className="popup__image-title">{card ? card.name : ""}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
