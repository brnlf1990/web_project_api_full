
const mongoose = require("mongoose");
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');




const cardsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      validator: function (link) {
        return /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w._~:/?%#\[\]@!$&'()*+,;=]*[\w._~:/?%#\[\]@!$&'()*+,;=])?$/gi.test(
          link
        );
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
    required: [true, "URL required"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("cards", cardsSchema);
