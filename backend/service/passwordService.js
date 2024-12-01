const bcrypt = require('bcrypt');
const saltRounds = 12;

//User Registration or Password Update
exports.createHashPwd = function (password) {
    return bcrypt.hashSync(password, saltRounds);
};

//User Login, Password Re-verification, Multi-factor Authentication
exports.comparePwd = function (password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
};