
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("oauth-access-token", {
			id: {
				type: Sequelize.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			clientId: {
				type: Sequelize.STRING,
			},
			accessToken: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Access token is required",
					},
				},
			},
			accessTokenExpiresAt: {
				type: Sequelize.DATE,
			},
			scopes: {
				type: Sequelize.STRING,
			},
			userId: {
				type: Sequelize.BIGINT,
				references: {
					model: "user",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			createdAt: {
				type: Sequelize.DATE,
			},
			updatedAt: {
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("oauth-access-token");
	},
};
