const Ctrl = require('./controller');

var app = module.exports = express.Router();
app.route(env.API_PREFIX + '/createRegister').post(Ctrl.createRegister);
app.route(env.API_PREFIX + '/createLogin').post(Ctrl.createLogin);