import React from "react";
import "../blocks/Cards.css";
import bucketButton from "../images/trash.png";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const {currentUser, setCurrentUser} = React.useContext(CurrentUserContext)
  
  const isOwn =  card.owner === currentUser._id;

  const cardDeleteButtonClassName = `templates__card_remove-button ${
    
    isOwn
      ? "templates__card_remove-button_visible"
      : "templates__card_remove-button_hidden"
  }`;
  
  
  const isLiked = card.likes.some((like) => like._id === currentUser._id);
  
  const cardLikeButtonClassName = () =>`templates__card-button ${
    isLiked ?   "templates__card-button-active": "" 
  }`;
  
  
  const likesCount = card && card.likes ? card.likes.length : 0;

  const handleClick = () => {
  
    onCardClick(card);
  };

  const handleLikeClick = () => {
    
    
    onCardLike(card);
  };
  const handleCardDelete = () => {
    onCardDelete(card);
  };
  return (
    <div className="templates__card">
      <img
        alt="card images"
        className="templates-card__image"
        src={card.link}
        onClick={handleClick}
      />
      <button className={cardDeleteButtonClassName}>
        <img
          src={bucketButton}
          onClick={handleCardDelete}
          alt="trash bucket image"
        />
      </button>
      <div className="templates__card__description-container">
        <h2 className="templates__card__description">{card.name}</h2>
        <button
          className={cardLikeButtonClassName()}
          onClick={handleLikeClick}
        ></button>
        <p className="templates__card-likes-count">{likesCount}</p>
      </div>
    </div>
  );
}

export default Card;
