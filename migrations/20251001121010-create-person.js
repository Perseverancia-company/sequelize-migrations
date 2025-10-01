/**
 * Migration: Create Person Table
 * * This migration creates the 'person' table, using the 'governmentId' (DNI) as the
 * primary key (INTEGER) and configuring the other fields as defined in the model.
 */
"use strict";

module.exports = {
	/**
	 * Defines the changes to apply when migrating 'up'.
	 */
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("person", {
			governmentId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true, // Set as Primary Key
				comment:
					"Official identification document ID (Argentinian DNI), serving as the primary key.",
			},
			name: {
				type: Sequelize.STRING(128),
				allowNull: false,
				comment: "First name of the person.",
			},
			surname: {
				type: Sequelize.STRING(128),
				allowNull: false,
				comment: "Last name or surname of the person.",
			},
			birthday: {
				// Use DATEONLY for storing dates without time information
				type: Sequelize.DATEONLY,
				allowNull: false,
				comment: "The person's date of birth.",
			},
			gender: {
				// BOOLEAN: True = Man, False = Woman
				type: Sequelize.BOOLEAN,
				allowNull: false,
				comment: "The person's gender. True = Man, False = Woman.",
			},
			// Note: No timestamps (createdAt, updatedAt) included here.
		});
	},

	/**
	 * Defines the changes to apply when migrating 'down' (reversing the 'up' migration).
	 */
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("person");
	},
};
