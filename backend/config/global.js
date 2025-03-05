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

//write short Schema (mongoose.Schema.Types.ObjectId)
global.ObjectId = require('mongoose').Types.ObjectId;

//Other Files
global.msgObj = require('../message.json');

//create auth token
global.createAuthToken = (userData) => {
    let token = jwt.sign({ ti: userData.ti, id: userData._id, email: userData.e }, process.env.JWT_SECRET_KEY, { expiresIn: '2400h' });
    return token;
}

//create entry and error collection
global.addErrorLog = function (ti, error, message) {
    var objData = {
        ti: ti,
        error: error,
        message: message,
        cdt: new Date()
    };
    var obj = new modalErrorLog(objData);
    obj.save();
};