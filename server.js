"use strict";

const Hapi = require("@hapi/hapi");
const { config } = require("./config/config");

const server = Hapi.server({
  port: config.port,
  host: config.host
});

const registerPlugin = async () => {
  await server.register([
    {
      plugin: require("hapi-auth-bearer-token"),
    },
    {
      plugin: require("./services/routes/index"),
    },
    {
      plugin: require('hapi-allow-cors-headers'),
    },
  ]);

  init();
};

const init = async () => {
  await server.start();
  console.log("Server running on %s", config.port);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

registerPlugin();
