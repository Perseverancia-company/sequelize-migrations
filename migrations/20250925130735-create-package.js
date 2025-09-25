"use strict";

const TABLE_NAME = "package";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(TABLE_NAME, {
			name: {
				type: Sequelize.STRING(255),
				allowNull: false,
				unique: true,
				primaryKey: true,
			},
			version: {
				type: Sequelize.STRING(32),
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			isPrivate: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
			},
			lastUpdated: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				allowNull: false,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable(TABLE_NAME);
	},
};
