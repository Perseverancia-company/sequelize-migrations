"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn("oauth2-client", "clientSecret", {
			type: Sequelize.STRING,
			allowNull: false, // Ensure clientSecret cannot be null
			// Add a comment for clarity (optional)
			comment: "The client secret must be at least 32 bytes long",
		});
	},
	down: async (queryInterface, Sequelize) => {
		// Optionally, revert back to allowing nulls for clientSecret if needed
		await queryInterface.changeColumn("oauth2-client", "clientSecret", {
			type: Sequelize.STRING,
			allowNull: true,
		});
	},
};
