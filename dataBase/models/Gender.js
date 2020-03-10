module.exports = (sequelize, DataTypes) => {
	const Gender = sequelize.define(
		'Gender',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true
			},
			gender: {
				type: DataTypes.STRING
			}
		},
		{
			tableName: 'gender',
			timestamps: false
		}
    );
    return Gender
};
