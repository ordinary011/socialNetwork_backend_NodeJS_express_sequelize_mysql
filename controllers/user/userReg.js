const db = require('../../dataBase').getInstance();
const {hashPassword} = require('../../helpers/passwordHasher');
const ControllerError = require('../../error/ControllerError');

module.exports = async (req, res, next) => {
	try {
		const UserModel = db.getModel('User');
		const PhotoModel = db.getModel('Photo');

		const { name, surname, email, password, gender_id = 3 } = req.body;
		if (!name || !surname || !email || !password)
			throw new Error('One of the fields was missed during registration');

		const hashedPassword = await hashPassword(password.toString());

		const createdUser = await UserModel.create({
			name,
			surname,
			email,
			password: hashedPassword,
			gender_id
		});
		
		// if (req.files) {
        //     let {photo} = req.files;
        //     const {id} = createdUser.dataValues;
        //     await PhotoModel.create({
        //         user_id: id,
        //         path: photo[0].path
        //     });
        // }

        delete createdUser.dataValues.password;
       
		res.json({
			success: true,
			msg: createdUser
		});
	} catch (e) {
        next(new ControllerError(e.message, e.status, 'creatingOfAUser'))
	}
};
