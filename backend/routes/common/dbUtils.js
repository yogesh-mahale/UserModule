const { Sequelize, DataTypes, Model } = require('sequelize');
const config = require('../config/index');

const sequelize = new Sequelize(config.dbConfig.scheme, config.dbConfig.user, config.dbConfig.password, {
    host: config.dbConfig.server,
    dialect: config.dbConfig.database, 
    port: config.dbConfig.port,
    logging: console.log,
    pool: {
        max: 5,
        min: 1,
        acquire: 30000,
        idle: 10000
    },
    retry: {
        max: 3
    },
});

(async function() {
    try {
        await sequelize.authenticate();
        console.log("Connected to the database...", config.dbConfig.port);

        sequelize.sync({force: false}); // force fully drop db and recreate it
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

exports.sequelize = sequelize;
