const dbConfig = {
    authentication: {
      options: {
        userName: "", // TODO: update
        password: "" // TODO: update
      },
      type: "default"
    },
    server: "+net", // TODO: update
    options: {
      database: "BuildingData", //TODO: update
      encrypt: true
    }
};
  
module.exports = dbConfig;