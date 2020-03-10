const ControllerError = require('../../error/ControllerError');
const tokenVerify = require('../../helpers/tokenVerify');
const tokenSign = require('../../helpers/tokenSign').auth;

module.exports = (req, res, next) => {
    try {
        const token = req.get('Authorization');

        const user = tokenVerify(token, 'refresh');

        delete user.exp, user.iat;
        
        const tokens = tokenSign(user);

        res.json({
            success: true,
            message: tokens
        })
    } catch (e) {
        next(new ControllerError(e.message, e.status, 'refreshToken'))
    }
};