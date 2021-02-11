const config = (() => {
  if (process.env.NODE_ENV) {
    console.log("Environment : " + process.env.NODE_ENV);
  }
  switch (process.env.NODE_ENV) {
    case "local":
      return {
        host: "localhost",
        port: 5000,
        secret: "thisissecret",
        mongodb:
          "mongodb+srv://admin:admin@ragul.3diua.mongodb.net/Ragul?retryWrites=true&w=majority",
      };

    case "development":
      return {
        host: "localhost",
        port: 5000,
        secret: "thisissecret",
        mongodb:
          "mongodb+srv://admin:admin@ragul.3diua.mongodb.net/Ragul?retryWrites=true&w=majority",
      };

    default:
      return {
        host: "localhost",
        port: 5000,
        secret: "thisissecret",
        mongodb:
          "mongodb+srv://admin:admin@ragul.3diua.mongodb.net/Ragul?retryWrites=true&w=majority",
      };
  }
})();

module.exports = {
  config: config,
};
