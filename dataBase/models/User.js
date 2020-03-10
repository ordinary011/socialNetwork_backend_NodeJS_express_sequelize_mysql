module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				type: DataTypes.STRING
			},
			surname: {
				type: DataTypes.STRING
			},
			email: {
				type: DataTypes.STRING
			},
			password: {
				type: DataTypes.STRING
			},
			gender_id: {
				type: DataTypes.INTEGER,
				foreignKey: true
			}
		},
		{
			tableName: 'user',
			timestamps: false
		}
	);

	const Gender = sequelize.import('./Gender.js');
	User.belongsTo(Gender, { foreignKey: 'gender_id' });
	return User;
};
