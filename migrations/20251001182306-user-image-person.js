/**
 * Migration: Add Foreign Keys to User Table
 * This migration adds the 'profilePictureId' (Image FK) and 'personGovernmentId' (Person FK)
 * columns to the 'user' table and defines the foreign key constraints.
 */
"use strict";

module.exports = {
	/**
	 * Defines the changes to apply when migrating 'up'.
	 */
	up: async (queryInterface, Sequelize) => {
		// 1. Add profilePictureId (Foreign Key to Image Table)
		await queryInterface.addColumn("user", "profilePictureId", {
			type: Sequelize.INTEGER,
			allowNull: true, // Optional field
			comment:
				"Foreign key to the Image table for the user's profile picture.",
			references: {
				model: "image", // The table being referenced
				key: "id", // The primary key of the Image table
			},
			onUpdate: "CASCADE",
			onDelete: "SET NULL", // If the image is deleted, set this FK to null
		});

		// 2. Add personGovernmentId (Foreign Key to Person Table)
		await queryInterface.addColumn("user", "personGovernmentId", {
			type: Sequelize.INTEGER,
			allowNull: true, // Optional field
			comment: "Foreign key to the Person table (via governmentId).",
			references: {
				model: "person", // The table being referenced
				key: "governmentId", // The primary key of the Person table
			},
			onUpdate: "CASCADE",
			onDelete: "RESTRICT", // Prevent deleting a Person if a User still references it
		});
	},

	/**
	 * Defines the changes to apply when migrating 'down'.
	 */
	down: async (queryInterface, Sequelize) => {
		// 1. Remove profilePictureId column and its constraint
		await queryInterface.removeColumn("user", "profilePictureId");

		// 2. Remove personGovernmentId column and its constraint
		await queryInterface.removeColumn("user", "personGovernmentId");
	},
};
