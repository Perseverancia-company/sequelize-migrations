"use strict";

const TABLE_NAME = "test-result";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(TABLE_NAME, {
			id: {
				type: Sequelize.BIGINT,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			testId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "test", // Name of the target table in the DB
					key: "id", // Primary key of the target table
				},
				onDelete: "CASCADE",
			},
			campaignId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "test-campaign",
					key: "id",
				},
				onDelete: "CASCADE",
			},
			startTime: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			endTime: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			outcome: {
				type: Sequelize.ENUM("passed", "failed", "skipped", "error"),
				allowNull: false,
			},
			errorMessage: {
				type: Sequelize.TEXT,
				allowNull: true,
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable(TABLE_NAME);
	},
};
