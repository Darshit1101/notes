var model = new Schema({
    fn: { // Full Name
        type: String
    },
    e: {// Email
        type: String,
    },
    pd: { // Password
        type: String,
    }
});

module.exports = connection.model('login', model, 'login');
