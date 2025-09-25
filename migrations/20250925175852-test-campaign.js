"use strict";

const TABLE_NAME = "test-campaign";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(TABLE_NAME, {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			startDate: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				allowNull: false,
			},
			endDate: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			status: {
				type: Sequelize.ENUM(
					"pending",
					"in_progress",
					"completed",
					"aborted"
				),
				defaultValue: "in_progress",
				allowNull: false,
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable(TABLE_NAME);
	},
};
