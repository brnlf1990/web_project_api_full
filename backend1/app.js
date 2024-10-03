
const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const bodyParser = require("body-parser");
const cardsRouter = require("./routes/cards");
const { cardValidationSchema } = require('./models/cardsModels');
const { userValidationSchema } = require('./models/usersModels');
const { celebrate, errors } = require('celebrate');
const {requestLogger, errorLog} = require('./middlware/logger')
require('dotenv').config()
const auth = require('./middlware/auth')
const Joi = require("joi");
mongoose.connect("mongodb://localhost:27017/aroundb");
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};
const {
  addUsers,
  login
} = require("./controlers/users");
const { PORT } = process.env;
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post("/signup",celebrate({
  body:Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().required().custom(validateURL),
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().min(8).trim().required(),
  })
}),addUsers);
app.post("/signin",celebrate({
  body:Joi.object().keys({
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().min(8).trim().required(),
  })
}), login);

app.use(auth)
app.use("/users", usersRouter);


app.use("/cards", celebrate({
  body:Joi.object().keys({
  name: Joi.string().min(2).max(30).required(),
  link: Joi.string().required().custom(validateURL),
  owner: Joi.string().required(),
    })
}),cardsRouter);


app.use(errorLog);
app.use(errors());
app.use((err, req, res, next) => {
  if (!err.status){
    res.status(500).send({message:err.message})
    return
  }


 res.status(err.status).send({message:err.message})
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
