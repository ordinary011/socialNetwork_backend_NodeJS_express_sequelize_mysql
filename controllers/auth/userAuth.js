const db = require('../../dataBase').getInstance();
const tokenSign = require('../../helpers/tokenSign').auth;
const ControllerError = require('../../error/ControllerError');
const { checkHashedPassword } = require('../../helpers/passwordHasher');

module.exports = async (req, res, next) => {
	try {
		const UserModel = db.getModel('User');

		const { email = '', password = '' } = req.body;
		if (!email || !password)
			throw new ControllerError('your request should include both email and password', 400);

		const isPresent = await UserModel.findOne({
			where: { email }
		});
		if (!isPresent) throw new ControllerError('Sorry there is no user with such email in the db', 400);

		const { id, name, gender_id, password: hashedPassword } = isPresent;

		// const isPassOK = await checkHashedPassword(password, hashedPassword);
        // if (!isPassOK) throw new Error('sorry wrong password');

		const tokens = tokenSign({ id, name, gender_id });

		res.json({
			success: true,
			msg: tokens
		});
	} catch (e) {
		next(new ControllerError(e.message, e.status, 'auth/authUser'))
	}
};
