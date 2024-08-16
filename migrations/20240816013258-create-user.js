'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('user', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			surname: {
				type: Sequelize.STRING,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: Sequelize.STRING(64),
				allowNull: false,
			},
			confirmedEmail: {
				type: Sequelize.BOOLEAN,
			},
			token: {
				type: Sequelize.STRING,
			},
			expires: {
				type: Sequelize.DATE,
			},
			pfp: {
				type: Sequelize.STRING(64),
			},
			createdAt: {
				type: Sequelize.DATE,
			},
			updatedAt: {
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('user');
	},
};
