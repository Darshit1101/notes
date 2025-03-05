global.modalForLogin = require('./login');
global.modalForNote = require('./note');
global.modalErrorLog = connection.model('errorLog', new Schema({}, { strict: false }), 'errorLog');