const bcrypt = require('bcrypt');

module.exports.hashPassword = async password => await bcrypt.hash(password, 10);
module.exports.checkHashedPassword = async (password, hashedPassword) => await bcrypt.compare(password, hashedPassword);
