const { connect, set } = require("mongoose");
const config = require("../../routes/config/index");


class NoSQLService {
  static async connect() {
    set("debug", true);
    // const { unsername, password, host, port, name } = {
    //   unsername: EnvConfig.envConfig.MONGO_USERNAME,
    //   password: EnvConfig.envConfig.MONGO_PASSWORD,
    //   host: EnvConfig.envConfig.MONGO_HOST,
    //   port: EnvConfig.envConfig.MONGO_PORT,
    //   name: EnvConfig.envConfig.MONGO_DBNAME,
    // };
    // const mongoUrl = `mongodb://${unsername}:${password}@${host}:${port}/${name}?authSource=admin&readPreference=primary&&ssl=false&retryWrites=true`;
    const mongoUrl = `mongodb://localhost:27017/UserDb`;
    if (!this.isConnected()) {
      connect(mongoUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        socketTimeoutMS: 60000,
        connectTimeoutMS: 60000,
      })
        .then(async (connection) => {
          console.info(`Connected to Mongo database`);
          this.setConnection(connection);
        })
        .catch((err) => {
          console.warn(`Mongo connection error`, err);
        });
    } else {
      console.info(`Database Already Connected`);
    }
  }

  static setConnection(connection) {
    this.mongoConnection = connection;
    this.mongoConnection.connection.on("disconnected", () => {
      console.info("Database connection closed");
    });
  }

  static isConnected() {
    if (this.mongoConnection && this.mongoConnection.connection) {
      const { readyState } = this.mongoConnection.connection;
      console.info(`MongoDB ready state = ${readyState}`);
      return readyState === 1;
    }
    return false;
  }

  static getConnection() {
    return this.mongoConnection;
  }

  static disconnect() {
    this.mongoConnection.connection.close(() => {
      this.mongoConnection = undefined;
      process.exit(0);
    });
  }
}

module.exports = NoSQLService;