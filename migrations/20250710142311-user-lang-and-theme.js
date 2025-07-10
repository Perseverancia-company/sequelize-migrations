"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * In this migration, we are adding 'theme' and 'language' columns to the 'users' table.
		 * These columns will store user preferences for the application's theme and language.
		 *
		 * - 'theme' will be a string (VARCHAR(32)) with a default value of 'default' and cannot be null.
		 * - 'language' will be a string (VARCHAR(32)) with a default value of 'en' and cannot be null.
		 */
		await queryInterface.addColumn("user", "theme", {
			type: Sequelize.STRING(32), // Matches the STRING(32) in your User model
			allowNull: false,
			defaultValue: "system", // Set a sensible default theme
			after: "pfp", // Optional: specify where to add the column, e.g., after 'pfp'
		});
		await queryInterface.addColumn("user", "language", {
			type: Sequelize.STRING(32), // Matches the STRING(32) in your User model
			allowNull: false,
			defaultValue: "en", // Set a sensible default language (e.g., English)
			after: "theme", // Optional: add after the 'theme' column
		});
	},
	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * In the 'down' migration, we are removing the 'theme' and 'language' columns
		 * to revert the changes made in the 'up' migration.
		 */
		await queryInterface.removeColumn("users", "language");
		await queryInterface.removeColumn("users", "theme");
	},
};
