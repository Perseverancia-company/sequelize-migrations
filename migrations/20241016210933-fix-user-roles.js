"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("user-roles", "id", {
			type: Sequelize.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("user-roles", "id");
	},
};
