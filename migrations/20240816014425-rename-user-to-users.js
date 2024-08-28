'use strict';

// This was a bad idea, tables should have singular name and not have uppercase charactesr
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.renameTable('user', 'Users');
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.renameTable('Users', 'user');
	},
};
