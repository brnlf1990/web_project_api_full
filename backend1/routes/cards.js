
const cardsRouter = require("express").Router();



const {
  getCards,
  addCard,
  deleteCard,
  likeCard,
  dislike,
} = require("../controlers/cards");

cardsRouter.get("/", getCards);

cardsRouter.post("/", addCard);

cardsRouter.put("/:_id/likes", likeCard);

cardsRouter.delete("/:_id", deleteCard);

cardsRouter.delete("/:_id/dislike", dislike);

module.exports = cardsRouter;
