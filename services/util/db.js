"use strict";
const Mongoose = require("mongoose");
const { config } = require("../../config/config");
const err = console.error;
const log = console.log;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: false,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4,
};

module.exports = {
  connect: () => {
    Mongoose.connect(config.mongodb, options);

    Mongoose.connection.on("error", (e) => {
      err("Mongoose can not open connection");
      err(e);
      process.exit();
    });

    Mongoose.connection.on("connected", () => {
      log("Connection DB OK");
    });

    Mongoose.connection.on("disconnected", () => {
      err("Connection DB lost");

      setTimeout(() => {
        Mongoose.connect(config.mongodb, { useNewUrlParser: true });
        err("DB reconnection");
      }, 15000);
    });
  },
};
