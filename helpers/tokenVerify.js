const jwt = require('jsonwebtoken');
const {secret, passSecret, refreshSecret} = require('../constants/secret');

module.exports = (token, method) => {
	let secretWord = '';

    if (method === 'auth') secretWord = secret;
    if (method === 'confirm') secretWord = passSecret;
    if (method === 'refresh') secretWord = refreshSecret;

    if (!token) throw new Error("token was not delivered for verification");
    let user = null;

    jwt.verify(token, secretWord, (err, decoded) => {
        if (err) throw new Error('Not valid token');
        user = decoded;
    });

    return user;
}
