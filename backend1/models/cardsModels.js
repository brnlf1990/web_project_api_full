
const { required } = require("joi");
const mongoose = require("mongoose");
const validator = require("validator");
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
        return /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(link);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
    required: [true, "URL required"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "_id",
    required:true,
  },
  likes: {
    type:  [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("cards", cardsSchema);
