"use strict";

const TABLE_NAME = "oauth2-client";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		// Remove id column
		await queryInterface.removeColumn(TABLE_NAME, "id");

		// Update clientId column
		await queryInterface.changeColumn(TABLE_NAME, "clientId", {
			type: Sequelize.UUID,
			primaryKey: true,
			unique: true,
		});

		// Add new columns
		await queryInterface.addColumn(TABLE_NAME, "authorizedOrigins", {
			type: Sequelize.STRING,
			comment: "Comma-separated list of authorized origins",
		});

		await queryInterface.addColumn(TABLE_NAME, "authorizedRedirects", {
			type: Sequelize.STRING,
			comment: "Comma-separated list of authorized redirects",
		});

		await queryInterface.addColumn(TABLE_NAME, "grantTypes", {
			type: Sequelize.STRING,
			comment: "Comma-separated list of grant types",
		});

		await queryInterface.addColumn(TABLE_NAME, "authorizationScopes", {
			type: Sequelize.STRING,
			comment: "Space-separated list of authorization scopes",
		});
	},
	down: async (queryInterface, Sequelize) => {
		// Remove new columns
		await queryInterface.removeColumn(TABLE_NAME, "authorizedOrigins");
		await queryInterface.removeColumn(TABLE_NAME, "authorizedRedirects");
		await queryInterface.removeColumn(TABLE_NAME, "grantTypes");
		await queryInterface.removeColumn(TABLE_NAME, "authorizationScopes");

		// Revert clientId column
		await queryInterface.changeColumn(TABLE_NAME, "clientId", {
			type: Sequelize.STRING,
			unique: true,
		});

		// Re-add id column
		await queryInterface.addColumn(TABLE_NAME, "id", {
			type: Sequelize.BIGINT,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		});
	},
};
