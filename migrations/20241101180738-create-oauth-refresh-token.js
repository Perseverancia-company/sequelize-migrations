"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("oauth-refresh-token", {
			id: {
				type: Sequelize.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			refreshToken: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			refreshTokenExpiresAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			scope: {
				type: Sequelize.STRING,
				allowNull: false,
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
			clientId: {
				type: Sequelize.STRING,
				references: {
					model: "oauth2-client",
					key: "clientId",
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
		await queryInterface.dropTable("oauth-refresh-token");
	},
};
