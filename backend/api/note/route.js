const Ctrl = require('./controller');

var app = module.exports = express.Router();
app.route(env.API_PREFIX + '/addnote').post(Ctrl.addNote);
app.route(env.API_PREFIX + '/getAllNotes').get(Ctrl.getAllNotes);