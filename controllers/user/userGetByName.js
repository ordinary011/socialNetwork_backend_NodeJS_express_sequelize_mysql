const Op = require('sequelize').Op;
const db = require('../../dataBase').getInstance();
const tokenVerify = require('../../helpers/tokenVerify');

module.exports = async (req, res, next) => {
	try {
		const UserModel = db.getModel('User');
		const GenderModel = db.getModel('Gender');

		const { name = '' } = req.query;

		const token = req.get('Authorization');

		const { id, name: userName } = tokenVerify.auth(token, 'auth');

		const isPresent = await UserModel.findOne({
			attributes: ['name', 'surname', 'gender_id'],
			where: {
				id,
				name: userName
			},
			include: [GenderModel]
		});
		if (!isPresent) throw new Error('not valid user');

		// if name is not present - find all users
		if (!name) {
			const allUsers = await UserModel.findAll({
				attributes: ['name', 'surname', 'gender_id'],
				include: [GenderModel]
			});
			return res.json({
				success: true,
				msg: allUsers
			});
		}

		const foundUsers = await UserModel.findAll({
			attributes: ['name', 'surname', 'gender_id'],
			where: {
				[Op.or]: [
					{ name: { [Op.like]: `%${name}%` } },
					{ surname: { [Op.like]: `%${name}%` } }
				]
			},
			include: [GenderModel]
		});

		res.json({
			success: true,
			msg: foundUsers
		});
	} catch (e) {
		console.log(e);
		res.status(400).json({
			success: false,
			msg: e.message
		});
	}
};
