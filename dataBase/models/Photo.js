module.exports = (sequelize, DataTypes) => {
	const Photo = sequelize.define(
		'Photo',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true
			},
			user_id: {
				type: DataTypes.INTEGER,
				foreignKey: true
			},
			path: {
                type: DataTypes.STRING,
                allowNull: false
			}
		},
		{
			tableName: 'photos',
			timestamps: false
		}
	);
	const User = sequelize.import('./User.js');
    Photo.belongsTo(User, { foreignKey: 'user_id' });
    
	return Photo;
};
