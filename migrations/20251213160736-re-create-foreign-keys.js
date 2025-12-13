"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const APP_TABLE_NAME = "app";
		const PACKAGE_TABLE_NAME = "package";

		// Update dependent tables
		const DEPENDENT_TABLES = [
			"app-output",
			"group-app-junction",
			"tag-app-junction",
			"app-config",
		];

		for (const TABLE_NAME of DEPENDENT_TABLES) {
			// 1. ADD NEW FOREIGN KEY COLUMN ('appId')
			await queryInterface.addColumn(TABLE_NAME, "appId", {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: APP_TABLE_NAME,
					key: "id", // References the NEW Primary Key of the 'app' table
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			});
		}

		console.log(
			"\n--- COMPLETE: All tables successfully transformed and related. ---"
		);
	},
	async down(queryInterface, Sequelize) {
		// A down migration is too complex to do
	},
};
