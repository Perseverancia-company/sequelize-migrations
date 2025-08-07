/**
 * Migration to add the 'userId' field to the 'personal_log' table.
 */
"use strict";

module.exports = {
	/**
	 * The 'up' function adds the 'userId' column.
	 * @param {import('sequelize').QueryInterface} queryInterface
	 * @param {import('sequelize').Sequelize} Sequelize
	 */
	async up(queryInterface, Sequelize) {
		// Add the foreign key column to the existing 'personal_log' table.
		await queryInterface.addColumn("personal-log", "userId", {
			type: Sequelize.BIGINT,
			allowNull: true,
			// Create a foreign key reference to the 'users' table.
			references: {
				model: "user",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		});
	},

	/**
	 * The 'down' function removes the 'userId' column, reverting the change.
	 * @param {import('sequelize').QueryInterface} queryInterface
	 * @param {import('sequelize').Sequelize} Sequelize
	 */
	async down(queryInterface, Sequelize) {
		// Remove the 'userId' column from the 'personal_log' table.
		await queryInterface.removeColumn("personal_log", "userId");
	},
};
