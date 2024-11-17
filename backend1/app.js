process.env.JWT_SECRET='474844007821d905d6d4f43d136fafc18d27b333d5d0aadb91a903f3e885a381';
process.env.PORT = '3001';
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { celebrate, errors } = require("celebrate");
const cors = require("cors");
const Joi = require("joi");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { requestLogger, errorLog } = require("./middleware/logger");
//require("dotenv").config();
const auth = require("./middleware/auth");
mongoose.connect("mongodb://localhost:27017/aroundb");
const allowedCors = [
  "https://around-project.strangled.net",
  "http://around-project.strangled.net",
  "http://localhost:3000",
];
const { addUsers, login } = require("./controlers/users");

const { PORT } = process.env;
const app = express();
app.use(
  cors({
    origin: allowedCors,
    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    credentials: true,
  }),
);
app.options("*", cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().lowercase().trim()
        .required(),
      password: Joi.string().min(8).trim().required(),
    }),
  }),
  addUsers,
);
app.post("/signin", login);

app.use(auth);
app.use("/users", usersRouter);

app.use("/cards", cardsRouter);

app.use(errors());

app.use(errorLog);
app.use((err, req, res, next) => {
  if (!err.status) {
    res.status(500).send({ message: err.message });
    return;
  }

  res.status(err.status).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
