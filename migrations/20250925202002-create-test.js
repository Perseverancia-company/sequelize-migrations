"use strict";

const TABLE_NAME = "test";

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
			testName: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			testableId: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			testableType: {
				type: Sequelize.ENUM("app", "package"),
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable(TABLE_NAME);
	},
};
