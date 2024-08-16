'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.renameTable('user', 'Users');
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.renameTable('Users', 'user');
	},
};
