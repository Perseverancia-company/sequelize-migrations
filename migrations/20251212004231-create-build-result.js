"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const TABLE_NAME = "build-result";

		await queryInterface.createTable(TABLE_NAME, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			packageId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				// Define the foreign key constraint
				references: {
					model: "package", // Name of the parent table (assuming 'package' table exists)
					key: "id", // Primary key field of the parent table
				},
				// Ensure integrity when the package is updated or deleted
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			success: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
			},
			log: {
				allowNull: false,
				type: Sequelize.TEXT, // Appropriate for potentially long log output
			},
			// Note: Since 'timestamps: false' is set in the model, we omit createdAt/updatedAt
		});

		console.log(
			`Table '${TABLE_NAME}' created successfully with foreign key to 'package'.`
		);
	},

	async down(queryInterface, Sequelize) {
		// Drop the table to revert the migration
		await queryInterface.dropTable("build-result");
	},
};
