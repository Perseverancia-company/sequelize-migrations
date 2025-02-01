const TABLE_NAME = "configuration";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable(
			TABLE_NAME,
			{
				key: {
					type: Sequelize.STRING,
					primaryKey: true,
					allowNull: false,
					validate: {
						notEmpty: {
							msg: "Key is required",
						},
					},
				},
				value: {
					type: Sequelize.TEXT,
					allowNull: false,
					validate: {
						notEmpty: {
							msg: "Value is required",
						},
					},
				},
			},
			{
				timestamps: false,
				tableName: TABLE_NAME,
				modelName: TABLE_NAME,
			}
		);
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable(TABLE_NAME);
	},
};
