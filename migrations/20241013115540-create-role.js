module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("role", {
			name: {
				type: Sequelize.STRING,
				primaryKey: true,
			},
			description: {
				type: Sequelize.STRING,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("role");
	},
};
