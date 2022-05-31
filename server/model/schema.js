const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
  filename: {
    type: String,
    unique: true,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  imageBase64: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("imgSchema", imgSchema);

module.exports = model;
