"use strict";

/**
 * Migration for creating the 'image' table.
 */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	/**
	 * Executes the migration (creating the table).
	 * @param queryInterface The Sequelize QueryInterface object.
	 */
	async up(queryInterface, DataTypes) {
		await queryInterface.createTable("image", {
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},

			// --- Core Properties ---
			fileName: {
				type: DataTypes.STRING(128),
				allowNull: false,
				comment: "Human-readable name or title of the image",
			},
			filePath: {
				type: DataTypes.STRING(255),
				allowNull: false,
				unique: true, // Ensuring path is unique
				comment: "Path to the file on the storage system",
			},
			fileUrl: {
				type: DataTypes.STRING(255),
				allowNull: false,
				unique: true, // Ensuring URL is unique
				comment: "Publicly accessible URL",
			},

			// --- Metadata and Descriptors ---
			description: {
				type: DataTypes.TEXT,
				comment: "Longer description of the image content",
			},
			mimeType: {
				type: DataTypes.STRING(50),
				allowNull: false,
				comment: "MIME type (e.g., image/jpeg)",
			},
			fileSizeKB: {
				type: DataTypes.INTEGER,
				comment: "File size in Kilobytes",
			},
			isPublic: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
				comment: "Controls public accessibility",
			},

			// --- Timestamps ---
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			// Note: 'updatedAt' is deliberately omitted here.
		});
	},

	/**
	 * Undoes the migration (dropping the table).
	 * @param queryInterface The Sequelize QueryInterface object.
	 */
	async down(queryInterface) {
		await queryInterface.dropTable("image");
	},
};
