const mongoose = require("mongoose");
const config = require("../../config");
const connect = async () => {
  try {
    //mongodb cloud connection
    const con = mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connect;
