const Ctrl = require('./controller');
const { checkAuth } = require('../../config/middleware');

var app = module.exports = express.Router();
app.route(env.API_PREFIX + '/createRegister').post(Ctrl.createRegister);
app.route(env.API_PREFIX + '/createLogin').post(Ctrl.createLogin);
app.route(env.API_PREFIX + '/deleteAccount').post(checkAuth, Ctrl.deleteAccount);
