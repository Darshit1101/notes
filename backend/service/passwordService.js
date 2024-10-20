const bcrypt = require('bcrypt');
const saltRounds = 12;

exports.createHashPwd = function (password) {
    return bcrypt.hashSync(password, saltRounds);
};

exports.comparePwd = function (password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  };