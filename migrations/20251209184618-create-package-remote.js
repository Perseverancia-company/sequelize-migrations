"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const TABLE_NAME = "package-remote";

		await queryInterface.createTable(TABLE_NAME, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			packageId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "package", // Name of the parent table
					key: "id", // Primary key field of the parent table
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			// Remote URL
			url: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
		});

		console.log(`Table '${TABLE_NAME}' created successfully.`);
	},

	async down(queryInterface, Sequelize) {
		// Drop the table to revert the migration
		await queryInterface.dropTable("package-remote");
	},
};
