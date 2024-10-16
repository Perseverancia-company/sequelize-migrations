"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("user-roles", "createdAt");
		await queryInterface.removeColumn("user-roles", "updatedAt");
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("user-roles", "createdAt", {
			type: Sequelize.DATE,
		});
		await queryInterface.addColumn("user-roles", "updatedAt", {
			type: Sequelize.DATE,
		});
	},
};
