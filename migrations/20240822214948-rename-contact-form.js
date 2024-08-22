'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('ContactForms', {
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
			message: {
				type: Sequelize.TEXT,
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
			fromWebsite: {
				type: Sequelize.STRING(128),
				validate: {
					isUrl: {
						msg: "Please enter a valid URL.",
					}
				}
			},
			fromApp: {
				type: Sequelize.STRING(128),
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
		await queryInterface.dropTable('ContactForms');
	},
};
