var model = new Schema({
    tit: {//title
        type: String
    },
    des: {//description
        type: String
    },
    uid: {// user id
        type: ObjectId,
        ref: 'login', // If using authentication and associating notes with users
        required: true,
    },
    tag: { // Tag
        type: String,
    },
    ctr: {//Category
        type: String,
    },
    cdt: { //Create date
        type: Date,
    },
    upd: {//Update date
        type: Date
    }
});

module.exports = connection.model('note', model, 'note');
