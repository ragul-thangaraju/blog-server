const routeDatas = [require("../blog/index")];
const { config } = require("../../config/config");
const Jwt = require("jwt-simple");
const blogModal = require("../blog/modal");

const routes = {
  register: async function (server, options) {
    server.auth.strategy("auth", "bearer-access-token", {
      allowQueryToken: true,
      allowMultipleHeaders: true,
      accessTokenName: "access_token",
      validate: async (request, token) => {
        const isValid = await blogModal.getValidUser(token);
        if (isValid) {
          const credentials = { token: { _id: isValid._id } };
          const artifacts = { test: "info" };
          return { isValid, credentials, artifacts };
        } else {
          const isValid = false;
          return { isValid };
        }
      },
    });

    routeDatas.forEach(function (route) {
      server.route(route);
    });
  },
  name: "route",
  version: "1",
};

module.exports = routes;
