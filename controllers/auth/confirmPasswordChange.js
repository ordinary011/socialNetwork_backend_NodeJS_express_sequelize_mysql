const db = require('../../dataBase').getInstance();
const tokenVerify = require('../../helpers/tokenVerify');

module.exports = async (req, res, next) => {
	try {
		const UserModel = db.getModel('User');
		
		const { password, passwordCopy } = req.query;
		if (password !== passwordCopy) throw new Error('could not confirm new password');
		
		const { user: id } = req.user;
		console.log('here!!!!')

		const isPresent = await UserModel.findByPk(id);
		if (!isPresent) throw new Error('User is not defined');

		await UserModel.update({ password }, { where: { id } });

		res.json({
			success: true,
			msg: 'updated'
		});
	} catch (e) {
		res.status(e.status || 500).json({
			success: false,
			msg: e.parent.sqlMessage || e.message
		});
	}
};
