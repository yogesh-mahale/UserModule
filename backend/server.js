var express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require("./routes/config/index");
const UnExpectedErrorHandler = require("./routes/helpers/UnExpectedErrorHandler");
// const relation = require("./routes/modules/relation");

const NoSQLService = require("./routes/helpers/NoSQLDbUtil");

// Instantiate
const app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50MB' }));


// Define required response headers.
app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
  
    next();
});

// var whitelist = 
var corsOptions = {
    origin: [
      'http://localhost:4200', 
      'http://localhost:4000', 
      'http://localhost:9090', 
      'http://localhost:3000'    
    ]
  }


app.use(cors(corsOptions));

NoSQLService.connect();
var router = express.Router();

const userRoutes = require('./routes/modules/User/routes.config');
router.use(userRoutes);

app.use('/', router);

process.on("uncaughtException", UnExpectedErrorHandler.unExpectedErrorHandler);
process.on("unhandledRejectin", UnExpectedErrorHandler.unExpectedErrorHandler);

const PORT = process.env.PORT;
var server = app.listen(PORT, function() {
    console.log("Started application on port %d", PORT);
});

server.timeout = 35000;
