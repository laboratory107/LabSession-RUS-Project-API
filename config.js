const dbConfig = {
    authentication: {
      options: {
        userName: "", // TODO: update
        password: "lozinka123!" // TODO: update
      },
      type: "default"
    },
    server: ".database.windows.net", // TODO: update
    options: {
      database: "BuildingData", //TODO: update
      encrypt: true
    }
};
  
module.exports = dbConfig;