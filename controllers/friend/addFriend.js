const Op = require('sequelize').Op;
const db = require('../../dataBase').getInstance();

module.exports = async (req, res, next) => {
	try {
		const FriendModel = db.getModel('Friend');

		const {id} = req.user;

		const userToAdd = req.params.id;
		if (!userToAdd || userToAdd < 1 || id == userToAdd) throw new Error("bad id, can't add to friends");

		const isFriend = await FriendModel.findOne({
			where: {
				[Op.or]: [
					{
						user_id: id,
						friend_id: userToAdd
					},
					{
						friend_id: id,
						user_id: userToAdd
					}
				]
			}
		});
		if(isFriend) throw new Error('you are already friends with this user');

		await FriendModel.create({
			user_id: id,
			friend_id: userToAdd
		});

		res.json({
			success: true,
			msg: 'added to friendList'
		});
	} catch (e) {
		res.status(e.status || 500)
            .json({
                success: false,
                msg: e.parent.sqlMessage || e.message
            })
	}
};
