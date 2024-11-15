"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn("process", "pid", {
			type: Sequelize.INTEGER,
			allowNull: true, // Allow null values
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn("process", "pid", {
			type: Sequelize.INTEGER,
			allowNull: false, // Revert to disallow null
		});
	},
};
