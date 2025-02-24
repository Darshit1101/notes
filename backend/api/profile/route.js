const Ctrl = require('./controller');
const { checkAuth } = require('../../config/middleware');

var app = module.exports = express.Router();
app.route(env.API_PREFIX + '/getProfile').get(checkAuth, Ctrl.getProfile);