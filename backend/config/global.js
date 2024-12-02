//express
global.express = require('express');
global.app = express();
app.use(express.json());

//cors
const cors = require("cors");
app.use(cors());

//token
global.jwt = require('jsonwebtoken');

//env
global.dotenv = require('dotenv');
global.env = dotenv.config().parsed;

//mongoose connection
global.mongoose = require('mongoose');
mongoose.Promise = global.Promise;
global.connection = mongoose.createConnection(process.env.MONGO_CONNECTION_URL);
global.Schema = mongoose.Schema;

//Other Files
global.msgObj = require('../message.json');