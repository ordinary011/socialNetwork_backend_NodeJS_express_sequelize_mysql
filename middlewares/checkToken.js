const ControllerError = require('../error/ControllerError');
const tokenVerify = require('../helpers/tokenVerify');

module.exports = (req, res, next) => {
	try {
		const authToken = req.get('Authorization');
		const confirmToken = req.query.t;

		let user = {};

		if (authToken) user = tokenVerify(authToken, 'auth');
		if (confirmToken) user = tokenVerify(confirmToken, 'confirm');

		if (!user) throw new ControllerError('No token', 401, 'checkToken');

		req.user = user;
		next();
	} catch (e) {
		next(new ControllerError(e.message, e.status, 'checkToken'));
	}
};
