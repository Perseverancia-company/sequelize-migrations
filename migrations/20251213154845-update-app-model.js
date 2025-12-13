"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const TABLE_NAME = "app";
		const PACKAGE_TABLE_NAME = "package";

		// --- 0. DESTRUCTIVE PREPARATION ---
		// Since we are changing the Primary Key from 'name' (string) to 'id' (integer, auto-increment)
		// and adding a NOT NULL Foreign Key, we must delete all existing data to avoid constraint violations.
		console.log(
			`WARNING: Deleting all existing data from ${TABLE_NAME} to prepare for Primary Key change and new constraints.`
		);
		await queryInterface.bulkDelete(TABLE_NAME, null, {});

		// --- 1. REMOVE OLD PRIMARY KEY CONSTRAINT & NAME COLUMN ---
		// We first remove the old PK constraint on 'name'.
		// This might require knowing the exact constraint name if Sequelize didn't use a default one.
		// The safest way is to change the column definition first, then remove it.
		console.log(
			`Removing Primary Key status from 'name' and dropping the column...`
		);

		// Remove PK status from 'name'
		await queryInterface.changeColumn(TABLE_NAME, "name", {
			type: Sequelize.STRING(128),
			primaryKey: false,
			allowNull: true,
		});

		// Remove the 'name' column
		await queryInterface.removeColumn(TABLE_NAME, "name");

		// --- 2. ADD NEW PRIMARY KEY ('id') ---
		console.log(`Adding 'id' column as the new Primary Key...`);
		await queryInterface.addColumn(TABLE_NAME, "id", {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true, // Is often ignored in addColumn, so we omit it here
			allowNull: false,
		});

		// --- 3. ADD FOREIGN KEY ('packageId') ---
		console.log(`Adding 'packageId' column and Foreign Key constraint...`);
		await queryInterface.addColumn(TABLE_NAME, "packageId", {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: "package", // Name of the parent table
				key: "id", // Primary key field of the parent table
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		});

		// --- 4. REMOVE TIMESTAMPS ---
		console.log(
			`Removing 'createdAt' and 'updatedAt' timestamp columns...`
		);
		await queryInterface.removeColumn(TABLE_NAME, "createdAt");
		await queryInterface.removeColumn(TABLE_NAME, "updatedAt");

		console.log(`Model '${TABLE_NAME}' successfully transformed.`);
	},
	async down(queryInterface, Sequelize) {
		// A down migration is too complex to do
	},
};
