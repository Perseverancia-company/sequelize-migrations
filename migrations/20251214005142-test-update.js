"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const TABLE_NAME = "test";
		const PACKAGE_TABLE_NAME = "package";

		// --- 0. DESTRUCTIVE PREPARATION ---
		// Wipe all data, as we are removing columns that were required (NOT NULL).
		console.log(`WARNING: Deleting all existing data from ${TABLE_NAME}.`);
		await queryInterface.bulkDelete(TABLE_NAME, null, {});

		// --- 1. REMOVE POLYMORPHIC COLUMNS ---
		console.log(
			`Removing polymorphic columns 'testableId' and 'testableType'...`
		);

		// Remove the polymorphic ID column
		await queryInterface.removeColumn(TABLE_NAME, "testableId");

		// Remove the polymorphic TYPE column
		await queryInterface.removeColumn(TABLE_NAME, "testableType");

		// --- 2. ADD FOREIGN KEY ('packageId') ---
		console.log(`Adding 'packageId' column and Foreign Key constraint...`);

		// 2. Add the column structure
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
			`Model '${TABLE_NAME}' successfully cleaned and linked to Package (testName is NOT unique).`
		);
	},
	async down(queryInterface, Sequelize) {
	},
};
