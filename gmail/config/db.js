const mongoose = require("mongoose");

const MONGOURI = `mongodb+srv://Eebru:${process.env.MONGOPASS}@testcluster31-10-20.bph2m.mongodb.net/${process.env.MONGODATABASE}?retryWrites=true&w=majority`;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database Connected!!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;