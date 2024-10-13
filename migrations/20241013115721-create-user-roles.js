module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("user-roles", {
			userId: {
				type: Sequelize.BIGINT,
				references: {
					model: "user",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			roleName: {
				type: Sequelize.STRING,
				references: {
					model: "role",
					key: "name",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
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
		await queryInterface.dropTable("user-roles");
	},
};
