"use strict";

const TABLE = "user";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.changeColumn(TABLE, "password", {
			type: Sequelize.STRING(256),
			allowNull: false,
		});
	},

	async down(queryInterface, Sequelize) {
		// Reverting back to default STRING (usually 255) if necessary
		await queryInterface.changeColumn(TABLE, "password", {
			type: Sequelize.STRING(64),
			allowNull: false,
		});
	},
};
