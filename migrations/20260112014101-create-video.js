"use strict";

const TABLE = "video";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(TABLE, {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},

			// Core Properties
			fileName: {
				type: Sequelize.STRING(128),
				allowNull: false,
				comment: "Human-readable name or title of the video",
			},
			filePath: {
				type: Sequelize.STRING(255),
				allowNull: false,
				comment: "Path to the file on the storage system",
			},
			fileUrl: {
				type: Sequelize.STRING(255),
				allowNull: false,
				comment: "Publicly accessible URL",
			},

			// Metadata and Descriptors
			description: {
				type: Sequelize.TEXT,
				comment: "Longer description of the video content",
			},
			mimeType: {
				type: Sequelize.STRING(50),
				allowNull: false,
				comment: "MIME type (e.g., video/flv)",
			},
			fileSizeKB: {
				type: Sequelize.INTEGER,
				comment: "File size in Kilobytes",
			},
			isPublic: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
				comment: "Controls public accessibility",
			},

			// Timestamps
			createdAt: Sequelize.DATE,
		});
	},
	async down(queryInterface, Sequelize) {
		// Drop the table to revert the migration
		await queryInterface.dropTable(TABLE_NAME);
	},
};
