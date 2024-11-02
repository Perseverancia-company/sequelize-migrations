"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		// Alter the table to add the userId column and foreign key constraint
		try {
			// Try to change the column to add the foreign key constraint
			await queryInterface.changeColumn("oauth-access-token", "userId", {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: "user", // Adjust this to match your User table name
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			});
		} catch (error) {
			// If changing the column fails, create the column instead
			await queryInterface.addColumn("oauth-access-token", "userId", {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: "user",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			});
		}
	},
	down: async (queryInterface, Sequelize) => {
		try {
			// Add the userId column and set up the foreign key relationship
			await queryInterface.addColumn("oauth-access-token", "userId", {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: "user",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			});
		} catch (err) {
			// Remove the foreign key and column for userId
			await queryInterface.changeColumn("oauth-access-token", "userId", {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: "user", // Ensure this matches the name of your 'user' table
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			});
		}
	},
};
