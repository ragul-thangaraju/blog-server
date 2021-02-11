const Path = require("path");
const dbconfig = require("../config/config").config;
const { connect } = require("../services/util/db");
const Mongoose = require("mongoose");
Mongoose.Promise = global.Promise;
const db = {};

connect();
Mongoose.set("debug", dbconfig.debugging);
const getFiles = path => {
  path = path[path.length - 1] !== "/" ? path + "/" : path;
  let files = [];
  try {
    try {
      files = require("fs")
        .readdirSync(Path.resolve(__dirname, "./"))
        .filter(file => {
          return file.slice(-3) === ".js";
        });
    } catch (e) {
      console.log(e);
      process.exit();
    }
  } catch (e) {
    console.log(e);
    process.exit();
  }
  return files.map(file => {
    return Path.resolve(__dirname, "./", file);
  });
};

global.Models = {};

getFiles("models").forEach(async modelFile => {
  let modelInterface = require(modelFile);
  let schema = Mongoose.Schema(modelInterface.schema, {
    versionKey: false
  });
  let name = Path.basename(modelFile, ".js");
  if (modelInterface.statics) {
    for (let modelStatic in modelInterface.statics) {
      schema.statics[modelStatic] = modelInterface.statics[modelStatic];
    }
  }
  if (modelInterface.methods) {
    for (let modelMethod in modelInterface.methods) {
      schema.methods[modelMethod] = modelInterface.methods[modelMethod];
    }
  }
  if (modelInterface.onSchema) {
    for (let type in modelInterface.onSchema) {
      for (let func in modelInterface.onSchema[type]) {
        if (Array.isArray(modelInterface.onSchema[type][func])) {
          for (var i = 0; i < modelInterface.onSchema[type][func].length; i++) {
            schema[type](func, modelInterface.onSchema[type][func][i]);
          }
        } else {
          schema[type](func, modelInterface.onSchema[type][func]);
        }
      }
    }
  }

  let modelName = name.split(".")[0];
  const collectionName = modelName;
  modelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
  Models[modelName] = Mongoose.model(modelName, schema, collectionName);
});

db.Models = Models;

module.exports = db;
