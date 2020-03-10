// const friendCount = await FriendModel.findALL({              WORKS TOO
const friendCount = await FriendModel.findOne({
    where: {
        [Op.or]: [
            {
                user_id: id
            },
            {
                friend_id: id
            }
        ]
    },
    attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'number_of_friends']]
});

res.json(friendCount);
