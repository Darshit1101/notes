const Ctrl = require('./controller');

var app = module.exports = express.Router();
app.route(env.API_PREFIX + '/addnote').post(Ctrl.addNote);
app.route(env.API_PREFIX + '/getAllNotes').post(Ctrl.getAllNotes);
app.route(env.API_PREFIX + '/deleteCard').delete(Ctrl.deleteCard);
app.route(env.API_PREFIX + '/editNote').post(Ctrl.editNote);