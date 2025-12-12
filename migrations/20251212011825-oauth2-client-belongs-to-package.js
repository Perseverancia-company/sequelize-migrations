"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const TABLE_NAME = "oauth2-client";
		const PACKAGE_TABLE_NAME = "package";

		// --- 1. REMOVE 'name' COLUMN ---
		console.log(`Removing column 'name' from ${TABLE_NAME}...`);
		await queryInterface.removeColumn(TABLE_NAME, "name");

		// --- 2. ADD 'packageId' COLUMN with NOT NULL ---
		console.log(`Adding column 'packageId' to ${TABLE_NAME}...`);
		await queryInterface.addColumn(TABLE_NAME, "packageId", {
			type: Sequelize.INTEGER,
			allowNull: false,
			// Define the foreign key constraint
			references: {
				model: PACKAGE_TABLE_NAME, // Name of the parent table
				key: "id", // Primary key field of the parent table
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		});

		console.log(
			`Refactor of '${TABLE_NAME}' complete: 'name' removed, 'packageId' added and constrained, and 'clientId' set to NOT NULL.`
		);
	},
	async down(queryInterface, Sequelize) {
		const TABLE_NAME = "oauth2-client";

		// --- REVERT: 2. Remove 'packageId' column ---
		await queryInterface.removeColumn(TABLE_NAME, "packageId");

		// --- REVERT: 1. Re-add the 'name' column (if it was necessary to keep the old schema functional) ---
		await queryInterface.addColumn(TABLE_NAME, "name", {
			type: Sequelize.STRING,
			allowNull: true,
		});
	},
};
