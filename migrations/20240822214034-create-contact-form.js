'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('contact-form', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING(128),
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING(128),
				validate: {
					isEmail: {
						msg: "Please enter a valid email address.",
					},
				},
			},
			phoneNumber: {
				type: Sequelize.STRING(128),
			},
			message: {
				type: Sequelize.TEXT,
				allowNull: false,
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
		await queryInterface.dropTable('contact-form');
	},
};
