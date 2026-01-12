"use strict";

const TABLE_NAME = "book";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(TABLE_NAME, {
			id: {
				type: Sequelize.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			// In case of not having the author name, just put an empty string
			author: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			releaseDate: {
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		// Drop the table to revert the migration
		await queryInterface.dropTable(TABLE_NAME);
	},
};
