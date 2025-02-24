const Ctrl = require('./controller');
const { checkAuth } = require('../../config/middleware');

var app = module.exports = express.Router();
app.route(env.API_PREFIX + '/addnote').post(checkAuth, Ctrl.addNote);
app.route(env.API_PREFIX + '/getAllNotes').post(checkAuth, Ctrl.getAllNotes);
app.route(env.API_PREFIX + '/deleteCard').delete(checkAuth, Ctrl.deleteCard);
app.route(env.API_PREFIX + '/editNote').post(checkAuth, Ctrl.editNote);