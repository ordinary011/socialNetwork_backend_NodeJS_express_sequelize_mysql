const Op = require('sequelize').Op;
const db = require('../../dataBase').getInstance();

module.exports = async (req, res, next) => {
	try {
		const FriendModel = db.getModel('Friend');

		const {id} = req.user;

		const userToDelete = req.params.id;
		if (!userToDelete || userToDelete < 1) throw new Error("bad userID, can't delete");

		await FriendModel.destroy({
			where: {
				[Op.or]: [
					{
						user_id: id,
						friend_id: userToDelete
					},
					{
						friend_id: id,
						user_id: userToDelete
					}
				]
			}
		});

		res.json({
			success: true,
			msg: 'deleted OK'
		});
	} catch (e) {
		res.status(e.status || 500)
            .json({
                success: false,
                msg: e.parent.sqlMessage || e.message
            })
	}
};
