
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
const cors = require("cors");
mongoose.connect("mongodb://localhost:27017/aroundb");
const allowedCors = [
  'https://around-project.strangled.net',
  'http://around-project.strangled.net',
  'localhost:3000'
];
const {
  addUsers,
  login
} = require("./controlers/users");
const { PORT } = process.env;
const app = express();
app.use(cors({
  origin:allowedCors,
  methods:['GET', 'PUT', 'PATCH','DELETE'],
  allowedHeaders:['Content-Type', 'Authorization']

}));
app.options('*', cors())
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post("/signup",celebrate({
  body:Joi.object().keys({

    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().min(8).trim().required(),
  })
}),addUsers);
app.post("/signin", login);

app.use(auth)
app.use("/users", usersRouter);


app.use("/cards", cardsRouter);

app.use(errors());

app.use(errorLog);
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
