const TABLE_NAME = "configuration";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable(TABLE_NAME, {
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
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable(TABLE_NAME);
	},
};
