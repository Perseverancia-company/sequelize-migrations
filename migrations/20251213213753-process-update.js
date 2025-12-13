"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const TABLE_NAME = "process";
		const PACKAGE_TABLE_NAME = "package";

		// --- 0. DESTRUCTIVE PREPARATION ---
		// Wipe all data, as we are changing the Primary Key and adding NOT NULL constraints.
		console.log(
			`WARNING: Deleting all existing data from ${TABLE_NAME} to prepare for Primary Key change.`
		);
		await queryInterface.bulkDelete(TABLE_NAME, null, {});

		// --- 1. REMOVE OLD PRIMARY KEY CONSTRAINT & NAME COLUMN ---
		console.log(
			`Removing Primary Key status from 'name' and dropping the column...`
		);

		// Remove PK status from 'name'
		// Assuming 'name' was a STRING used as the old Primary Key.
		await queryInterface.changeColumn(TABLE_NAME, "name", {
			type: Sequelize.STRING(255), // Use appropriate string type
			primaryKey: false,
			allowNull: true,
		});

		// Remove the 'name' column
		await queryInterface.removeColumn(TABLE_NAME, "name");

		// --- 2. ADD NEW PRIMARY KEY ('id') ---
		console.log(`Adding 'id' column as the new Primary Key...`);

		// 2. Add the column structure
		await queryInterface.addColumn(TABLE_NAME, "id", {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		});

		// --- 3. ADD FOREIGN KEY ('packageId') ---
		console.log(`Adding 'packageId' column and Foreign Key constraint...`);
		await queryInterface.addColumn(TABLE_NAME, "packageId", {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: PACKAGE_TABLE_NAME,
				key: "id",
			},
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		});

		console.log(`Model '${TABLE_NAME}' successfully transformed.`);
	},

	async down(queryInterface, Sequelize) {
		const TABLE_NAME = "process";

		// Since this is a highly destructive migration, the down function drops the table.
		console.log(
			`WARNING: Reverting this migration is highly destructive. Dropping table ${TABLE_NAME}.`
		);
		await queryInterface.dropTable(TABLE_NAME);
	},
};
