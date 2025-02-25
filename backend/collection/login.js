var model = new Schema({
    fn: { // Full Name
        type: String
    },
    e: {// Email
        type: String,
    },
    pd: { // Password
        type: String,
    },
    ti: {//tracking id
        type: String
    },
    pver: {//password version
        type: Number
    },
    udt: {//update date
        type: Date
    },
});

module.exports = connection.model('login', model, 'login');
