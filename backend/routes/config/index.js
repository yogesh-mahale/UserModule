const dotenv = require('dotenv');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const envFound = dotenv.config();
if (!envFound) {
    // This error should crash whole process
    throw new Error('Couldn\'t find .env file: env setup required to run application.')
}


module.exports = {
    nodeEnv : process.env.NODE_ENV || 'production',

    deploymentEnv : process.env.DEPLOYMENT_ENV || 'production',

    /**
     * Server Config.
     */
    port             : parseInt(process.env.PORT,10),
    serverTimeout    : parseInt(process.env.SERVER_TIMEOUT, 10),

    logs: {
        level: process.env.LOG_LEVEL,
    },

    dbConfig : {
        database : process.env.DB_NAME,
        server   : process.env.DB_SERVER,
        user     : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        scheme   : process.env.DB_SCHEME,
        port     : process.env.DB_PORT,
    },

    corsOptions : {
        origin      : process.env.CORS_ORIGIN,
        credentials : process.env.CORS_WITH_CREDENTIALS
    },
};

