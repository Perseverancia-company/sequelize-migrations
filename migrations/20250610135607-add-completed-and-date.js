"use strict";

const { DataTypes, QueryInterface, Sequelize } = require("sequelize");

/**
 * Sequelize migration to add 'completed' and 'completedAt' fields to the 'task' table.
 */
module.exports = {
	/**
	 * Defines the actions to be performed when migrating up (applying the migration).
	 * Adds the 'completed' and 'completedAt' columns to the 'task' table.
	 *
	 * @param queryInterface The QueryInterface object to interact with the database.
	 * @param Sequelize The Sequelize instance.
	 */
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("task", "completed", {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
			after: "order", // Position the new column after the 'order' column
		});

		await queryInterface.addColumn("task", "completedAt", {
			type: DataTypes.DATE,
			allowNull: true, // It can be null if the task is not yet completed
			defaultValue: null, // Default to null
			after: "completed", // Position the new column after the 'completed' column
		});
	},

	/**
	 * Defines the actions to be performed when migrating down (reverting the migration).
	 * Removes the 'completed' and 'completedAt' columns from the 'task' table.
	 *
	 * @param queryInterface The QueryInterface object to interact with the database.
	 * @param Sequelize The Sequelize instance.
	 */
	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("task", "completedAt");
		await queryInterface.removeColumn("task", "completed");
	},
};
