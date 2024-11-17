const validator = require("validator");
const cardsRouter = require("express").Router();
const { celebrate } = require("celebrate");
const Joi = require("joi");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const {
  getCards,
  addCard,
  deleteCard,
  likeCard,
  dislike,
} = require("../controlers/cards");

cardsRouter.get("/", getCards);

cardsRouter.post("/", celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(validateURL),
    owner: Joi.string(),
  }),
}), addCard);

cardsRouter.put("/likes/:_id", likeCard);

cardsRouter.delete("/:_id", deleteCard);

cardsRouter.put("/dislike/:_id", dislike);

module.exports = cardsRouter;
