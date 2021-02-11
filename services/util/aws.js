"use strict";
const AWS = require("aws-sdk");
const { config } = require("../../config/config");

AWS.config.update({
  accessKeyId: config.awsBucket.accessKey,
  secretAccessKey: config.awsBucket.secretKey,
  signatureVersion: "v4",
  region: "ap-south-1",
});

module.exports = AWS;
